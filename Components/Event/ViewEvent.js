import React from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, AsyncStorage, StatusBar} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import {Thumbnail} from 'native-base';

export default class ViewEvent extends React.Component {
    
    state = {
        eventName: this.props.navigation.getParam("eventName",""),
        date:"",
        time: "",
        location: "",
        estimatedSize: 0,
        activityDetails: "",
        activityPlanned: false,
        eventUID: this.props.navigation.getParam("eventUID",""),
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
                activityPlanned: info.isPlanned,
            })
        })
    }
    /// Direct adding // no request
    pressHandleAccept = () => {
        const currUser = firebaseDb.auth.currentUser;
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        currNotification.update({
            eventOngoing: firebase.firestore.FieldValue.arrayUnion(this.state.eventUID),
            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID),
        }).catch(err => console.error(err));
    }

    pressHandleReject = () => {
        const currUser = firebaseDb.auth.currentUser;
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        currNotification.update({
            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID),
        }).catch(err => console.error(err));
    }

    render(){

        const {eventName, date, time, location, size, details, planned} = this.state;//.profile;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showVerticalScrollIndicator={false}>
                    <View style={styles.title}>
                    <Ionicons name="ios-arrow-back" size={24} color="black"></Ionicons>
                    <Ionicons name="md-more" size={24} color="black"></Ionicons>
                    </View>
                    <View style={{alignSelf:"center"}}>
    
                        <View style={styles.profileImage}>
                            <Thumbnail source={{uri: photo}}
                             style={styles.image} resizeMode="center">
                             </Thumbnail>
                        </View>
    
                        <View style={styles.dm}>
                            <TouchableOpacity>
                                <MaterialIcons name="chat" size={18} color="grey"></MaterialIcons>
                            </TouchableOpacity>
                        </View>
    
                        <View style={styles.active}></View>           
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, {color: "black", fontWeight: "600", fontSize: 24}]}> Event: {eventName} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Date: {date} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Time: {time} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Location: {location} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Size: {size} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Details: {details} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Planned: {planned} </Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style = {styles.buttonContainer}
                               onPress={() => {this.pressHandleAccept()}}
                            >
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.buttonContainer}
                               onPress={() => {this.pressHandleReject()}}
                            >
                                <Text style={styles.buttonText}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView> 
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#b3ffda",
        alignItems: "center",
        justifyContent: "center"
    },

    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: "#FFF",
        paddingHorizontal: 10
    },

    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },

    title: {
        marginTop: 24,
        marginHorizontal: 16,
        justifyContent: "space-between",
        flexDirection: "row"
    },

    text: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '700',
        //fontFamily: "HelveticaNeue"
    },

    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow:"hidden"
    },

    dm: {
        backgroundColor: "white",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },

    active: {
        backgroundColor: "#00ff55",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },

    add: {
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent:"center"
    },

    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },

    buttonContainer: {
        //paddingTop: 20,
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginTop: 10,
    },

    buttonsContainer: {
        paddingTop: 100,
      
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        width: 200,
    }
})
