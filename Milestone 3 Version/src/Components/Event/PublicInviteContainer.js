import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import firebaseDb from "../Database/firebaseDb";
import * as firebase from 'firebase';

export default class PublicInviteContainer extends React.Component{
    state = {
        isLoading: true,
    }
    componentDidMount() {
        const info = this.props.navigation.getParam("event", "");
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        const username = user.displayName;
      
        firebaseDb
            .db
            .collection('events')
            .add({
                eventName: info.eventName,
                eventDuration: info.eventDuration,
                date: info.date,
                time: info.time,
                location: info.location,
                estimatedSize: info.estimatedSize,
                activityDetails: info.activityDetails,
                isPrivate: info.isPrivate,
                creator: username,
                creatorUID: uid,
                invitees: [],
                attendees: [uid],
                nonAttendees: [],
            }).then((docRef) => {
                const notificationRef = firebaseDb.db.collection('notification');
                const promise = []
                promise.push(firebaseDb.db.collection('events').doc(docRef.id).update({eventUID: docRef.id}))
                promise.push(notificationRef.doc(uid).update({
                    eventOngoing: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                }))
                Promise.all(promise).then(() => {this.setState({isLoading: false}); this.props.navigation.navigate("EventCreate")})
            }).catch(err => console.error(err))                
    }

    componentWillUnmount() {
        alert("Event has been created and posted to Public Feeds.");
    }

    render() {
        const {isLoading} = this.state
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
        return(
            <View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})
