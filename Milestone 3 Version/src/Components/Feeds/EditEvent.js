import React from 'react'
import { View, TextInput, Text, StyleSheet, ScrollView,
         KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';

class EditEvent extends React.Component {
    state = {
        eventUID: "",
        eventName: "",
        date: "",
        time: "",
        location: "",
        estimatedSize: "",
        activityDetails: "",
        isPrivate: null,
        isLoading: true,
        creator: "",
    };

    handleUpdateEventName = (eventName) => this.setState({ eventName });
    handleUpdateDate = (date) => this.setState({ date });
    handleUpdateTime = (time) => this.setState({ time });
    handleUpdateLocation = (location) => this.setState({ location });
    handleUpdateEstimatedSize = (estimatedSize) => this.setState({ estimatedSize });
    handleUpdateActivityDetails = (activityDetails) => this.setState({ activityDetails });
    handleUpdatePublic = () => this.setState({isPrivate: false });
    handleUpdatePrivate = () => this.setState({isPrivate: true });

    handleSave = () => {
        this.setState({isLoading: true});
        var currNotification = firebaseDb.db.collection('events').doc(this.state.eventUID);
        const {eventName, date, time, location, estimatedSize,
            activityDetails, isPrivate} = this.state;
        currNotification.update({
            eventName: eventName,
            date: date,
            time: time,
            location: location,
            estimatedSize: estimatedSize,
            activityDetails: activityDetails,
            isPrivate: isPrivate,
        }).then(() => this.props.navigation.navigate("View")).catch(err => console.error(err));
    }

    handleCancel = () => {
        this.setState({isLoading: true})
        const currEvent = firebaseDb.db.collection("events").doc(this.state.eventUID);
        currEvent.onSnapshot(docSnapshot => {
            // to do nothing after event document deleted
            if(!docSnapshot.exists) {
                return;
            }
            const promise = [];
            const info = docSnapshot.data()
            const invitees = info.invitees;
            const currNotification = firebaseDb.db.collection("notification")
            
            //removing this event from all invited users feeds/notification
            Promise.all(invitees).then(() => {
                for(let uid in invitees) {
                    promise.push(
                        currNotification.doc(invitees[uid]).update({
                            eventOngoing: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID),
                            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID)
                        })
                    )
                }
                //removing this event from the creator
                promise.push(
                    currNotification.doc(info.creatorUID).update({
                        eventOngoing: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID),
                    })
                )
                Promise.all(promise).then(() => {
                    firebaseDb
                        .db
                        .collection("events")
                        .doc(this.state.eventUID)
                        .delete() //removing this event from the database 'events' collection
                        .then(() => {this.props.navigation.navigate("Feeds")}) 
                    }
                )
            })
        })
    }

    componentDidMount() {
        this.setState({
            eventUID: this.props.navigation.getParam("eventInfo","").eventUID,
            eventName: this.props.navigation.getParam("eventInfo","").eventName,
            date: this.props.navigation.getParam("eventInfo","").date,
            time: this.props.navigation.getParam("eventInfo","").time,
            location: this.props.navigation.getParam("eventInfo","").location,
            estimatedSize: this.props.navigation.getParam("eventInfo","").estimatedSize,
            activityDetails: this.props.navigation.getParam("eventInfo","").activityDetails,
            isPrivate: this.props.navigation.getParam("eventInfo","").isPrivate,
            creator: this.props.navigation.getParam("eventInfo","").creator,
        }, () => {this.setState({isLoading: false})})
    }

    render() {
        const { eventName, date, time, location, estimatedSize,
                activityDetails, isPrivate, isLoading} = this.state;
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }                        
        return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <TouchableOpacity
                        style={styles.backArrow}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <View style={styles.top}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Edit Event</Text>
                            </View>
                        </View>

                        <View style={styles.form}>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Event Name</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder={eventName}
                                    onChangeText={this.handleUpdateEventName}
                                    value={eventName}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.dateInput.focus()}
                                />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Date</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder={date}
                                    onChangeText={this.handleUpdateDate}
                                    value={date}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.timeInput.focus()}
                                    ref={(input) => {this.dateInput = input}}
                                />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Time</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder={time}
                                    onChangeText={this.handleUpdateTime}
                                    value={time}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.locationInput.focus()}
                                    ref={(input) => {this.timeInput = input}}
                                />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Location</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder={location}
                                    onChangeText={this.handleUpdateLocation}
                                    value={location}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.sizeInput.focus()}
                                    ref={(input) => {this.locationInput = input}}
                                />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Size</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder={estimatedSize}
                                    onChangeText={this.handleUpdateEstimatedSize}
                                    value={estimatedSize}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.detailsInput.focus()}
                                    ref={(input) => {this.sizeInput = input}}
                                />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Activity Details</Text>
                                <TextInput
                                    style={styles.inputLast}
                                    autoCapitalize="none"
                                    multiline
                                    autoCorrect={false}
                                    placeholder={activityDetails}
                                    onChangeText={this.handleUpdateActivityDetails}
                                    value={activityDetails}
                                    returnKeyType="go"
                                    ref={(input) => {this.detailsInput = input}}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.divider} />
                            <View style={styles.displayPrivacy}>
                                <Text style={styles.privacyText}>{isPrivate? "Private" : "Public"}</Text>
                            </View>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.tabStyle}>
                            <TouchableOpacity
                                style={[isPrivate? styles.addButtonNS: styles.addButtonS]}
                                onPress={this.handleUpdatePublic}
                            >
                                <Text style={styles.toggButtonText}>Public</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[isPrivate? styles.addButtonS: styles.addButtonNS]}
                                onPress={this.handleUpdatePrivate}
                            >
                                <Text style={styles.toggButtonText}>Private</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cancelButtonPosition}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.handleCancel();
                                }}
                            >
                                <Text style={styles.nextButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonPosition}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    if (eventName.length && date.length && time.length && location.length &&
                                        estimatedSize.length && activityDetails.length) {
                                        this.handleSave()
                                    }
                                }}
                            >
                                <Text style={styles.nextButtonText}>Save</Text>
                                <Ionicons name="md-arrow-forward" size={16} color='#B630A2'></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEBEE'
    },
    backArrow: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    top: {
        backgroundColor: '#FFF',
        borderBottomWidth: 2,
        borderBottomColor: '#EBECF4',
        shadowColor: '#011f4b',
        shadowOffset: {height: 5},
        shadowOpacity: 0.4,
        zIndex: 10,
        padding: 10
    },
    header: {
        flex: 1,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        position: 'absolute'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        fontSize: 12,
        color: '#8A8F9E',
        textTransform:'uppercase',
        marginBottom: 5
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D',
        paddingLeft: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    inputLast: {
        borderBottomColor: '#8A8F9E',
        borderWidth: StyleSheet.hairlineWidth,
        height: 80,
        fontSize: 15,
        color: '#161F3D',
        paddingLeft: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        paddingTop: 5
    },
    divider: {
        backgroundColor: '#F06292',
        height: 2,
        flex: 1,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#BBDEFB'
    },
    displayPrivacy: {
        height: 30,
        width: 200,
        alignItems: 'center'
    },
    privacyText: {
        fontWeight: '300',
        color: '#B71C1C',
        fontSize: 18,
        paddingHorizontal: 64,
        textTransform:'uppercase'
    },
    tabStyle: {
        marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: '20%'
    },
    addButtonS: {
        width: 80,
        backgroundColor: 'rgba(239, 154, 154, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 20,
    },
    addButtonNS: {
        width: 80,
        backgroundColor: '#EF9A9A',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 20,
        shadowOffset: {height: 1, width: 1},
        shadowColor: '#455A64',
        shadowOpacity: 0.6
    },
    toggButtonText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '300'
    },
    buttonPosition: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        margin: 25,
        padding: 10,
        backgroundColor: '#DF476C',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.3
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 10
    },
    cancelButtonPosition: {
        alignItems: "center",
        marginTop: 10,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backArrow: {
        padding: 10
    },
});

export default EditEvent;