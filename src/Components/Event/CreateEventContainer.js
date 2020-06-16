import React from 'react'
import { View, Image, TextInput, Text, StyleSheet,
         KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native';
import BlueButton from '../GlobalStyles/BlueButton';
import firebaseDb from '../Database/firebaseDb';
import Header from '../GlobalStyles/Header';

class CreateEventContainer extends React.Component {
    state = {
        eventName: '',
        date: '',
        time: '',
        location: '',
        estimatedSize: '',
        activityDetails: '',
        isPlanned: false,
        createSuccessful: false
    };

    handleUpdateEventName = (eventName) => this.setState({ eventName });
    handleUpdateDate = (date) => this.setState({ date });
    handleUpdateTime = (time) => this.setState({ time });
    handleUpdateLocation = (location) => this.setState({ location });
    handleUpdateEstimatedSize = (estimatedSize) => this.setState({ estimatedSize });
    handleUpdateActivityDetails = (activityDetails) => this.setState({ activityDetails });
    handleUpdateIsPlanned = (isPlanned) => this.setState({ isPlanned: true });
    handleUpdateNotPlanned = (isPlanned) => this.setState({ isPlanned: false });

    handleCreateUser = () =>
        firebaseDb
            .db
            .collection('events')
            .add({
                eventName: this.state.eventName,
                date: this.state.date,
                time: this.state.time,
                location: this.state.location,
                estimatedSize: this.state.estimatedSize,
                activityDetails: this.state.activityDetails,
                isPlanned: this.state.isPlanned
            }).then(() => this.setState({
                eventName: '',
                date: '',
                time: '',
                location: '',
                estimatedSize: '',
                activityDetails: '',
                isPlanned: '',
                createSuccessful: true
            })).catch(err => console.error(err))

    render() {
        const { eventName, date, time, location, estimatedSize,
                activityDetails, isPlanned, createSuccessful } = this.state

        return (
            <KeyboardAvoidingView behavior="padding">
                <Header title = "Create Event"/>
                <Text style={{padding: 10}}>Personalise your own event!</Text>
                <View style={styles.contentStyle}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Event Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={this.handleUpdateEventName}
                        value={eventName}
                        returnKeyType="next"
                        onSubmitEditing={() => this.dateInput.focus()}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Date"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={this.handleUpdateDate}
                        value={date}
                        returnKeyType="next"
                        ref={(dateInput) => this.dateInput = dateInput}
                        onSubmitEditing={() => this.timeInput.focus()}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Time"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={this.handleUpdateTime}
                        value={time}
                        returnKeyType="next"
                        ref={(timeInput) => this.timeInput = timeInput}
                        onSubmitEditing={() => this.locationInput.focus()}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Location"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={this.handleUpdateLocation}
                        value={location}
                        returnKeyType="next"
                        ref={(locationInput) => this.locationInput = locationInput}
                        onSubmitEditing={() => this.sizeInput.focus()}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Estimated Size"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={this.handleUpdateEstimatedSize}
                        value={estimatedSize}
                        returnKeyType="next"
                        ref={(sizeInput) => this.sizeInput = sizeInput}
                        onSubmitEditing={() => this.detailsInput.focus()}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Activity Details"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={this.handleUpdateActivityDetails}
                        value={activityDetails}
                        returnKeyType="next"
                        ref={(detailsInput) => this.detailsInput = detailsInput}
                    />
                    <Text style={{paddingBottom: 10}}>
                        Activity planned out?
                    </Text>
                    </View>

                    <View style={styles.tabStyle}>
                        <TouchableOpacity
                            style={[this.state.isPlanned? styles.addButtonS: styles.addButtonNS]}
                            onPress={this.handleUpdateIsPlanned}
                        >
                            <Text style={styles.addButtonText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[this.state.isPlanned? styles.addButtonNS: styles.addButtonS]}
                            onPress={this.handleUpdateNotPlanned}
                        >
                            <Text style={styles.addButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonPosition}>
                    <BlueButton
                        style={styles.button}
                        onPress={() => {
                            if (eventName.length && date.length && time.length && location.length &&
                                estimatedSize.length && activityDetails.length) {
                                this.handleCreateUser()
                            }
                        }}
                    >
                        Create
                    </BlueButton>
                    </View>
                    {
                        createSuccessful &&
                        (alert('Successful Event Creation') && this.setState({createSuccessful: false}))
                    }
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    contentStyle: {
        alignItems: 'center',
        paddingTop: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
        fontSize: 15,
        marginBottom: 8,
        width: 200,
        height: 30,
        padding: 5
    },
    button: {
        marginTop: 25,
    },
    buttonPosition: {
        alignItems: 'flex-end',
        paddingRight: 10
    },
    addButtonS: {
        width: 80,
        backgroundColor: 'rgba(163, 196, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35
    },
    addButtonNS: {
        width: 80,
        backgroundColor: 'rgba(163, 196, 255, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35
    },
    addButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700'
    },
    tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1e2ff'
    }

});

export default CreateEventContainer;
