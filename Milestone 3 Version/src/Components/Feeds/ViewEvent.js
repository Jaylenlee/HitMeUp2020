import React from 'react';
import { StyleSheet, View, Text, SafeAreaView,
         ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';

export default class ViewEvent extends React.Component {
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
        isCreator: null,
        isLoading: true,
        duration: ''
    }

    componentDidMount() {
        const currEvent = firebaseDb.db.collection('events').doc(this.state.eventUID);
        currEvent.onSnapshot(docSnapshot => {
            if(docSnapshot.exists){
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
                    isCreator: info.creatorUID == firebaseDb.auth.currentUser.uid,
                    isLoading: false,
                    duration: info.eventDuration
                })
            }
        })
    }

    pressHandleUnattend = () => {
        this.setState({isLoading: true});
        const currUser = firebaseDb.auth.currentUser;

        firebaseDb.db.collection('events').doc(this.state.eventUID).update({
            invitees: firebase.firestore.FieldValue.arrayRemove(currUser.uid)
        })
    
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        currNotification.update({
            eventOngoing: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID)
        }).then(() => this.props.navigation.navigate("Feeds")).catch(err => console.error(err));
    }

    pressHandleEdit = () => {
        this.props.navigation.navigate("Edit", {eventInfo: this.state});
    }

    pressHandleViewAttendance = () => {
        this.props.navigation.navigate("Attendance", {eventUID: this.state.eventUID});
    }

    render(){
        const {eventName, date, time, location, estimatedSize, activityDetails, 
            isPrivate, creator, isCreator, isLoading, duration} = this.state;
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TouchableOpacity
                        style={styles.backArrow}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                    </TouchableOpacity>

                    <View style={{marginTop: -15, flex: 1, padding: 20}}>
                        <Text style={styles.userStyle}>{eventName}</Text>

                        <View style={styles.infoA}>
                            <Text style={styles.titleA}>Organiser</Text>
                            <Text style={styles.textA}>{creator}</Text>
                        </View>

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
                                <Text style={styles.title}>Duration</Text>
                                <Text style={styles.text}>{duration}</Text>
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
                            onPress={() => {
                                isCreator
                                    ? this.pressHandleEdit()
                                    : this.pressHandleUnattend()
                            }}
                        >
                            <Text style={styles.buttonText}>
                                {isCreator ? "Edit" : "Unattend"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer}
                            onPress={() => this.pressHandleViewAttendance()}
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
        marginHorizontal: 16,
        marginTop: 20
    },
    infoA: {
        alignItems: 'flex-start',
        marginHorizontal: '10%',
        marginTop: 24
    },
    titleA: {
        color: '#C3C5CD',
        fontSize: 17,
        fontWeight: '500'
    },
    textA: {
        marginTop: 4,
        color: '#4F566D',
        fontSize: 20,
        fontWeight: '300'
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
        marginTop: 16,
        alignItems: 'flex-start',
        marginHorizontal: 18,
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
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        paddingHorizontal: 24
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

