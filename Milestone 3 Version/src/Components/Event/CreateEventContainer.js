import React from 'react'
import { View, TextInput, Text, StyleSheet, ScrollView,
         KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';

class CreateEventContainer extends React.Component {
    state = {
        eventName: '',
        date: '',
        time: '',
        location: '',
        estimatedSize: '',
        activityDetails: '',
        createSuccessful: false,
        privacyInput: '',
        isPublic: false,
        isPrivate: false
    };

    handleUpdateEventName = (eventName) => this.setState({ eventName });
    handleUpdateDate = (date) => this.setState({ date });
    handleUpdateTime = (time) => this.setState({ time });
    handleUpdateLocation = (location) => this.setState({ location });
    handleUpdateEstimatedSize = (estimatedSize) => this.setState({ estimatedSize });
    handleUpdateActivityDetails = (activityDetails) => this.setState({ activityDetails });
    handleUpdatePublic = (privacy) => this.setState({ privacyInput: 'Public', isPublic: true, isPrivate: false });
    handleUpdatePrivate = (privacy) => this.setState({ privacyInput: 'Private', isPrivate: true, isPublic: false });
    handleDatePickerChange = (date, dateString) => this.setState({ date: dateString });
    handleTimePickerChange = (time, timeString) => this.setState({ time: timeString });

    handleSelectInvitees = () => {
        if (this.state.isPublic) {
            this.props.navigation.navigate("Private", {event: this.state})
        } else {
            this.props.navigation.navigate("Private", {event: this.state})
        }
    }

    render() {
        const { eventName, date, time, location, estimatedSize,
                activityDetails} = this.state
        return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        <View style={styles.top}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Create Event</Text>
                            </View>
                        </View>

                        <View style={styles.form}>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Event Name</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={this.handleUpdateEventName}
                                    value={eventName}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.dateInput.focus()}
                                />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Date</Text>
                                <DatePicker
                                    placeholder={"Event Start Date"}
                                    style={{ marginRight: "10px"}}
                                    format="YYYY-MM-DD"
                                    onChange={this.handleDatePickerChange}
                                 />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Time</Text>
                                <TimePicker
                                    placeholder={"Event Start Time"}
                                    style={{ marginRight: "10px"}}
                                    format="HH:mm:ss"
                                    onChange={this.handleTimePickerChange}
                                 />
                            </View>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Location</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoCorrect={false}
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
                                <Text style={styles.privacyText}>{this.state.privacyInput}</Text>
                            </View>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.tabStyle}>
                            <TouchableOpacity
                                style={[this.state.isPublic? styles.addButtonS: styles.addButtonNS]}
                                onPress={this.handleUpdatePublic}
                            >
                                <Text style={styles.toggButtonText}>Public</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[this.state.isPrivate? styles.addButtonS: styles.addButtonNS]}
                                onPress={this.handleUpdatePrivate}
                            >
                                <Text style={styles.toggButtonText}>Private</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonPosition}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    if (eventName.length && date.length && time.length && location.length &&
                                        estimatedSize.length && activityDetails.length) {
                                        this.handleSelectInvitees()
                                    }
                                }}
                            >
                                <Text style={styles.nextButtonText}>Next</Text>
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
    }
});

export default CreateEventContainer;
