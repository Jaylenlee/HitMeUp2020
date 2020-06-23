import React from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import Header from '../GlobalStyles/Header';
import SubHeader from '../GlobalStyles/SubHeader';
import BlueButton from '../GlobalStyles/BlueButton';

class PublicInviteContainer extends React.Component {
    state = {
        age: false,
        location: false,
        gender: false,
        occupation: false,
        hobbies: false,
        isToggled: false
    };

    handleUpdateAgeNS = (age) => this.setState({ age: true })
    handleUpdateAgeS = (age) => this.setState({ age: false })
    handleUpdateLocationNS = (location) => this.setState({ location: true })
    handleUpdateLocationS = (location) => this.setState({ location: false })
    handleUpdateGenderNS = (gender) => this.setState({ gender: true })
    handleUpdateGenderS = (gender) => this.setState({ gender: false })
    handleUpdateOccupationNS = (occupation) => this.setState({ occupation: true })
    handleUpdateOccupationS = (occupation) => this.setState({ occupation: false })
    handleUpdateHobbiesNS = (hobbies) => this.setState({ hobbies: true })
    handleUpdateHobbiesS = (hobbies) => this.setState({ hobbies: false })
    handleUpdateToggle = (isToggled) => this.setState({ isToggled: true })
    render() {
        return (
            <View style={{flex: 1}}>
                <Header title="Event Creation"/>
                <SubHeader title="Choose Invitees - Public"/>
                <View style={{padding: 10, backgroundColor: '#ffec70', alignItems: 'center'}}>
                    <Text>
                        These groups of people will be considered upon selection
                    </Text>
                    <Text>
                        Example: When gender option is chosen, only people of the same gender as you will be invited
                    </Text>
                </View>

                <View style={styles.buttonStyle}>
                    <Button
                        title="Age"
                        color={(this.state.age) ? 'rgba(0, 255, 170, 0.5)' : 'rgba(0, 157, 255, 0.8)'}
                        onPress={(this.state.age)? this.handleUpdateAgeS : this.handleUpdateAgeNS}
                    />
                    <Button
                        title="Location"
                        color={(this.state.location) ? 'rgba(0, 255, 170, 0.5)' : 'rgba(0, 157, 255, 0.8)'}
                        onPress={(this.state.location)? this.handleUpdateLocationS : this.handleUpdateLocationNS}
                    />
                    <Button
                        title="Gender"
                        color={(this.state.gender) ? 'rgba(0, 255, 170, 0.5)' : 'rgba(0, 157, 255, 0.8)'}
                        onPress={(this.state.gender)? this.handleUpdateGenderS : this.handleUpdateGenderNS}
                    />
                    <Button
                        title="Occupation"
                        color={(this.state.occupation) ? 'rgba(0, 255, 170, 0.5)' : 'rgba(0, 157, 255, 0.8)'}
                        onPress={(this.state.occupation)? this.handleUpdateOccupationS : this.handleUpdateOccupationNS}
                    />
                    <Button
                        title="Hobbies"
                        color={(this.state.hobbies) ? 'rgba(0, 255, 170, 0.5)' : 'rgba(0, 157, 255, 0.8)'}
                        onPress={(this.state.hobbies)? this.handleUpdateHobbiesS : this.handleUpdateHobbiesNS}
                    />

                    <View style={styles.buttonPosition}>
                        <BlueButton
                            style={styles.button}
                            onPress={this.handleUpdateToggle}
                        >
                            Send Invite
                        </BlueButton>
                    </View>
                        {
                            this.state.isToggled &&
                            (alert('Are you sure u want to invite these people?'))
                        }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#9eddff',
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-around'
    },
    buttonPosition: {
        alignItems: 'flex-end',
        paddingRight: 10
    }
});

export default PublicInviteContainer