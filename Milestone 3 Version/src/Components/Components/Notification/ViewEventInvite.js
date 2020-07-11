import React from 'react';
import { StyleSheet, View, Text, SafeAreaView,
         ScrollView, TouchableOpacity,} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';

export default class ViewEventInvite extends React.Component {
    state = {
        eventUID: this.props.navigation.getParam("eventUID",""),
        eventName: '',
        date: '',
        time: '',
        location: '',
        estimatedSize: '',
        activityDetails: '',
        isPrivate: null,
        creator: "",
    }

    componentDidMount() {
        firebaseDb.db.collection('events').doc(this.state.eventUID).onSnapshot(docSnapshot => {
            const info = docSnapshot.data()
            this.setState({
                eventName: info.eventName,
                date: info.date,
                time: info.time,
                location: info.location,
                estimatedSize: info.estimatedSize,
                activityDetails: info.activityDetails,
                isPrivate: info.isPrivate,
                creator: info.creator,
            })
        })
    }

    pressHandleAccept = () => {
        this.setState({isLoading: true});
        const currUser = firebaseDb.auth.currentUser;
        var notification = firebaseDb.db.collection('notification')
        var currEvent = firebaseDb.db.collection('events').doc(this.state.eventUID);
        
        var promise1 = notification.doc(currUser.uid).update({
            eventOngoing: firebase.firestore.FieldValue.arrayUnion(this.state.eventUID)
        }).catch(err => console.error(err));

        var promise2 = notification.doc(currUser.uid).update({
            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID)
        }).catch(err => console.error(err));
        
        var promise3 = currEvent.update({
            attendees: firebase.firestore.FieldValue.arrayUnion(currUser.uid),
            invitees: firebase.firestore.FieldValue.arrayRemove(currUser.uid)
        })

        Promise.all([promise1, promise2, promise3]).then(() => this.props.navigation.navigate("EventInvite")).catch(err => console.error(err));
    }



    pressHandleReject = () => {
        this.setState({isLoading: true});
        const promise = [];
        const currUser = firebaseDb.auth.currentUser;
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        var currEvent = firebaseDb.db.collection('events').doc(this.state.eventUID);
        promise.push(currNotification.update({
            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID)
        }))
        
        promise.push(currEvent.update({
            nonAttendees: firebase.firestore.FieldValue.arrayUnion(currUser.uid),
            invitees: firebase.firestore.FieldValue.arrayRemove(currUser.uid)
        }))
        Promise.all(promise).then(() => this.props.navigation.navigate("EventInvite")).catch(err => console.error(err));
    }

    pressHandleAttendance = () => {
        this.props.navigation.navigate("ViewInviteAttendance", {eventUID: this.state.eventUID});
    }

    render(){

        const {eventName, date, time, location, estimatedSize, activityDetails, isPrivate, creator} = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TouchableOpacity
                        style={styles.backArrow}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                    </TouchableOpacity>

                    <View style={{marginTop: -5, flex: 1, padding: 20}}>
                        <Text style={styles.userStyle}>{eventName}</Text>

                        <View style={styles.infoContainer}>
                            <View style={styles.info}>
                                <Text style={styles.title}>Organiser</Text>
                                <Text style={styles.text}>{creator}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Date</Text>
                                <Text style={styles.text}>{date}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Time</Text>
                                <Text style={styles.text}>{time}</Text>
                            </View>

                        </View>
                        <View style={styles.infoB}>
                            <Text style={styles.titleB}>Event Type</Text>
                            <Text style={styles.textB}>{isPrivate ? "Private" : "Public"}</Text>
                        </View>
                        <View style={styles.infoB}>
                            <Text style={styles.titleB}>Location</Text>
                            <Text style={styles.textB}>{location}</Text>
                        </View>
                        <View style={styles.infoB}>
                            <Text style={styles.titleB}>Activity Details</Text>
                            <Text style={styles.textB}>{activityDetails}</Text>
                        </View>
                        <View style={styles.infoB}>
                            <Text style={styles.titleB}>Participants</Text>
                            <Text style={styles.textB}>{estimatedSize}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsField}>
                        <TouchableOpacity style = {styles.buttonContainer}
                            onPress={() => this.pressHandleAccept()}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer}
                            onPress={() => this.pressHandleReject()}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer}
                            onPress={() => this.pressHandleAttendance()}
                        >
                            <Text style={styles.buttonText}>View Attendance</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1F5FE'
    },
    backArrow: {
        padding: 10
    },
    userStyle: {
        fontSize: 20,
        fontWeight: '400',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        //alignItems: 'space-around',
        marginHorizontal: 32,
        marginTop: 20
    },
    info: {
        alignItems: 'flex-start',
        marginLeft: 10
    },
    title: {
        color: '#C3C5CD',
        fontSize: 15,
        fontWeight: '500'
    },
    text: {
        marginTop: 4,
        color: '#4F566D',
        fontSize: 18,
        fontWeight: '300'
    },
    infoB: {
        marginTop: 30,
        alignItems: 'flex-start',
        marginHorizontal: 50,
        borderWidth: 1,
        borderRadius: 10,
        shadowOffset: {height: 2, width: 2},
        shadowOpacity: 0.2,
        borderColor: '#039BE5',
        padding: 10,
        backgroundColor: '#f5f5f5'
    },
    titleB: {
        color: '#90A4AE',
        fontSize: 13,
        fontWeight: '400'
    },
    textB: {
        marginTop: 5,
        color: '#4F566D',
        fontSize: 15,
        fontWeight: '300'
    },
    buttonContainer: {
        backgroundColor: '#73788B',
        paddingVertical: 10,
        marginTop: 10,
        marginRight: 10,
        alignSelf: 'center',
        borderRadius: 10
    },
    buttonsField: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        width: 200,
    }
});