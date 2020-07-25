import React from 'react'
import { View, TextInput, Text, StyleSheet, ScrollView,
         KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';

class EditEvent extends React.Component {
    state = {
        eventUID: "",
        eventName: "",
        duration: null,
        date: "",
        time: "",
        location: "",
        estimatedSize: null,
        activityDetails: "",
        isPrivate: null,
        isLoading: true,
        creator: "",
    };

    handleUpdateEventName = (eventName) => this.setState({ eventName });
    handleUpdateDuration = (duration) => this.setState({ duration });
    handleUpdateDate = (date) => this.setState({ date });
    handleUpdateTime = (time) => this.setState({ time });
    handleUpdateLocation = (location) => this.setState({ location });
    handleUpdateEstimatedSize = (estimatedSize) => this.setState({ estimatedSize });
    handleUpdateActivityDetails = (activityDetails) => this.setState({ activityDetails });
    handleUpdatePublic = () => this.setState({isPrivate: false });
    handleUpdatePrivate = () => this.setState({isPrivate: true });
    handleDatePickerChange = (date, dateString) => this.setState({ date: dateString });
    handleTimePickerChange = (time, timeString) => this.setState({ time: timeString });

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
            const attendees = info.attendees;
            const currNotification = firebaseDb.db.collection("notification")
            
            //removing this event from all invited users feeds/notification
            Promise.all(invitees, attendees).then(() => {
                //removing those pending
                for(let uid in invitees) {
                    promise.push(
                        currNotification.doc(invitees[uid]).update({
                            eventInvite: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID)
                        })
                    )
                }

                //removing those accepted (including creator)
                for(let uid in attendees) {
                    promise.push(
                        currNotification.doc(attendees[uid]).update({
                            eventOngoing: firebase.firestore.FieldValue.arrayRemove(this.state.eventUID),
                        })
                    )
                }
        
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
        const { eventName, duration, date, time, location, estimatedSize,
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
            <View style={styles.container}>
                <View style={styles.top}>
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Event</Text>
                </View>

                <ScrollView style={{flex: 1}}>
                    <View style={styles.form}>
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.inputTitle}>Event Name</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder={eventName}
                                onChangeText={this.handleUpdateEventName}
                                value={eventName}
                                returnKeyType="next"
                                onSubmitEditing={() => this.durationInput.focus()}
                            />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.inputTitle}>Event Duration (hours)</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder={duration}
                                onChangeText={this.handleUpdateDuration}
                                value={duration}
                                keyboardType= "numeric"
                                returnKeyType="next"
                                //onSubmitEditing={() => this.dateInput.focus()}
                                ref={(input) => {this.durationInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.inputTitle}>Start Date</Text>
                            <DatePicker
                                placeholder={"Event Start Date"}
                                style={{ marginRight: "10px"}}
                                format="YYYY-MM-DD"
                                onChange={this.handleDatePickerChange}
                             />
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.inputTitle}>Time</Text>
                            <TimePicker
                                placeholder={"Event Start Time"}
                                style={{ marginRight: "10px"}}
                                format="HH:mm"
                                onChange={this.handleTimePickerChange}
                             />
                        </View>
                        <View style={{ marginTop: 16 }}>
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
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.inputTitle}>Size</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder={estimatedSize}
                                onChangeText={this.handleUpdateEstimatedSize}
                                value={estimatedSize}
                                keyboardType= "numeric"
                                returnKeyType="next"
                                onSubmitEditing={() => this.detailsInput.focus()}
                                ref={(input) => {this.sizeInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 16 }}>
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
                            onPress={() => {
                                this.handleCancel();
                            }}
                        >
                            <Text style={{color: '#E53935', fontSize: 14}}>Cancel the Event</Text>
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
                            <Ionicons name="md-arrow-forward" size={16} color='#0D47A1'></Ionicons>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbf0ff'
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
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: '#EBECF4',
        borderBottomWidth: 1
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
        backgroundColor: '#007bde',
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
        color: '#005fab',
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
        backgroundColor: 'rgba(66, 165, 245, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 20,
    },
    addButtonNS: {
        width: 80,
        backgroundColor: '#42A5F5',
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
        alignItems: 'flex-end'
    },
    button: {
        flexDirection: 'row',
        margin: 25,
        padding: 10,
        backgroundColor: '#4199e0',
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
        marginTop: 25,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backArrow: {
    }
});

export default EditEvent;
