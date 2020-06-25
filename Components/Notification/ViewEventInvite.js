import React from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, Image,
         ScrollView, TouchableOpacity, AsyncStorage, StatusBar, ImageBackground } from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import {Thumbnail} from 'native-base';


export default class ViewEventInvite extends React.Component {
    state = {
        eventUID: this.props.navigation.getParam("eventUID",""),
        eventName: '',
        date: '',
        time: '',
        location: '',
        estimatedSize: '',
        activityDetails: '',
        isPlanned: false,
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
                isPlanned: info.isPlanned,
            })
        })
    }

    pressHandleAccept = () => {
        const currUser = firebaseDb.auth.currentUser;
        var notification = firebaseDb.db.collection('notification')
        
        var promise1 = notification.doc(currUser.uid).update({
            eventOngoing: firebase.firestore.FieldValue.arrayUnion(this.state.eventUID)
        }).catch(err => console.error(err));

        var promise2 = notification.doc(currUser.uid).update({
            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID)
        }).catch(err => console.error(err));
        
        Promise.all([promise1, promise2]).then(() => this.props.navigation.navigate("EventInvite")).catch(err => console.error(err));
    }



    pressHandleReject = () => {
        console.log("reject")
        const currUser = firebaseDb.auth.currentUser;
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        currNotification.update({
            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID)
        }).then(() => this.props.navigation.navigate("EventInvite")).catch(err => console.error(err));
    }

    render(){

        const {eventName, date, time, location, estimatedSize, activityDetails, isPlanned} = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TouchableOpacity
                        style={styles.backArrow}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                    </TouchableOpacity>

                    <View style={{marginTop: 24, alignItems: 'center'}}>

                        <Text style={styles.userStyle}>{eventName}</Text>

                        <View style={styles.infoContainer}>
                            <View style={styles.info}>
                                <Text style={styles.title}>Date</Text>
                                <Text style={styles.text}>{date}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Time</Text>
                                <Text style={styles.text}>{time}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Location</Text>
                                <Text style={styles.text}>{location}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Size</Text>
                                <Text style={styles.text}>{estimatedSize}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Activity</Text>
                            <Text style={styles.text}>{activityDetails}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Planned</Text>
                            <Text style={styles.text}>{isPlanned ? "Yes" : "No"}</Text>
                        </View>

                        <View style={styles.logoutS}>
                            <TouchableOpacity
                                onPress={() => this.pressHandleAccept()}
                            >
                                <Text style={styles.logoutText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                        

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style = {styles.buttonContainer}
                                onPress={() => this.pressHandleReject()}
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
    },
    backArrow: {
        padding: 10
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 30,
        shadowOpacity: 0.4,
        borderRadius: 68
    },
    profileImage: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    userStyle: {
        marginTop : 24,
        fontSize: 16,
        fontWeight: '600',
    },
    infoContainer: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between',
        margin: 32
    },
    info: {
        alignItems: 'center',
        flex: 1,
    },
    title: {
        color: '#C3C5CD',
        fontSize: 14,
        fontWeight: '500'
    },
    text: {
        marginTop: 4,
        color: '#4F566D',
        fontSize: 18,
        fontWeight: '300'
    },
    logoutS: {
        marginTop: 50,
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#129cff'
    },
    buttonContainer: {
        backgroundColor: '#73788B',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10
    },
    buttonsContainer: {
        paddingTop: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        width: 200,
    }
})