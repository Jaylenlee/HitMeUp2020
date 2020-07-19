import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebaseDb from '../Database/firebaseDb';
import { Ionicons} from "@expo/vector-icons";
import UserPermission from './UserPermission';
import * as ImagePicker from 'expo-image-picker';

class RegisterForm extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        signUpSuccess: false,
        errorMessage: null,
        gender: '',
        age: '',
        location: '',
        occupation: '',
        interests: '',
        photo: ''
    };

    handleUpdateUsername = (username) => this.setState({username});
    handleUpdateEmail = (email) => this.setState({email});
    handleUpdatePassword = (password) => this.setState({password});
    handleUpdateGender = (gender) => this.setState({gender});
    handleUpdateAge = (age) => this.setState({age});
    handleUpdateLocation = (location) => this.setState({location});
    handleUpdateOccupation = (occupation) => this.setState({occupation});
    handleUpdateInterests = (interests) => this.setState({interests});
    handleUpdatePhoto = async () => {
        UserPermission.getCameraPermission()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if(!result.cancelled) {
            this.setState({photo: result.uri})
        }
    };

    handleCreateUser = () => {
        const {username, email, password, signUpSuccess, errorMessage, gender, age, location, occupation, interests, photo} = this.state;

        firebaseDb
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                firebaseDb.db
                .collection('profile')
                .doc(user.uid)
                .set({
                    username: username,
                    email: email,
                    gender: gender,
                    age: Number(age),
                    location: location,
                    occupation: occupation,
                    interests: interests,
                    photo: photo,
                    uid: user.uid,
                }).catch(error => this.setState({errorMessage: error.message}));

                firebaseDb.db
                .collection('friendlist')
                .doc(user.uid)
                .set({
                    friendlist: [],
                    chatUID: [],
                }).catch(error => this.setState({errorMessage: error.message}));

                firebaseDb.db
                .collection('notification')
                .doc(user.uid)
                .set({
                    friendRequest: [],
                    eventInvite: [],
                    eventOngoing: [],
                    history: [],
                }).catch(error => this.setState({errorMessage: error.message}));

                return user.updateProfile({
                    displayName: username
                })
             }).catch(error => this.setState({errorMessage: error.message}));
    }

    render(){
        const {username, email, password, signUpSuccess, errorMessage, gender, age, location, occupation, interests} = this.state
        return(
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <StatusBar
                        barstyle="light-content"
                    />
                    <TouchableOpacity
                        style={styles.backArrow}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', marginTop: 24, alignItems: 'flex-start'}}>
                        <View style={{marginLeft: 30}}>
                            <View style={styles.avatarContainer}>
                                <Image
                                   source={this.state.photo? {uri: this.state.photo} :
                                          {uri: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png'}}
                                   style={styles.profileImage}
                                />
                            </View>

                            <View style={{alignItems: 'flex-end', marginTop: -30}}>
                                <TouchableOpacity style={styles.photoPlaceholder}
                                    onPress={() => this.handleUpdatePhoto()}
                                >
                                       <Ionicons name="ios-add" size={28} color="#00ff55" style={styles.addIcon}></Ionicons>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.greeting}>{'To connect better with people, please fill in your account details.'}</Text>
                    </View>

                    <View style={styles.errorMessage}>
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Username</Text>
                            <TextInput
                                onChangeText={this.handleUpdateUsername}
                                value={username}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                onSubmitEditing={() => this.emailInput.focus()}
                            />
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput
                                onChangeText={this.handleUpdateEmail}
                                value={email}
                                keyboardType="email-address"
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                ref={(input) => {this.emailInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                onChangeText={this.handleUpdatePassword}
                                value={password}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                style = {styles.input}
                                onSubmitEditing={() => this.genderInput.focus()}
                                ref={(input) => {this.passwordInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Gender</Text>
                            <TextInput
                                onChangeText={this.handleUpdateGender}
                                value={gender}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                onSubmitEditing={() => this.ageInput.focus()}
                                ref={(input) => {this.genderInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Age</Text>
                            <TextInput
                                onChangeText={this.handleUpdateAge}
                                value={age}
                                keyboardType= "numeric"
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                onSubmitEditing={() => this.locationInput.focus()}
                                ref={(input) => {this.ageInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Location</Text>
                            <TextInput
                                onChangeText={this.handleUpdateLocation}
                                value={location}
                                multiline
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                onSubmitEditing={() => this.occupationInput.focus()}
                                ref={(input) => {this.locationInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Occupation</Text>
                            <TextInput
                                onChangeText={this.handleUpdateOccupation}
                                value={occupation}
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                onSubmitEditing={() => this.interestInput.focus()}
                                ref={(input) => {this.occupationInput = input}}
                            />
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Interests / Hobbies</Text>
                            <TextInput
                                onChangeText={this.handleUpdateInterests}
                                value={interests}
                                multiline
                                returnKeyType="go"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                ref={(input) => {this.interestInput = input}}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => this.handleCreateUser()}
                            ref={(input) => this.signUp = input}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        {
                            signUpSuccess &&
                            <Text style={styles.buttonText}>Sign Up Successful</Text>
                        }
                        <TouchableOpacity
                            style={{ alignSelf: 'center', marginTop: 32 }}
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text style={styles.buttonText}>
                                Back to <Text style={styles.signUpText}>Sign in</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backArrow: {
        padding: 10
    },
    greeting: {
        marginTop: 32,
        marginLeft: 30,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'left'
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 30,
        shadowOpacity: 0.4,
        borderRadius: 68,
    },
    profileImage: {
        width: 136,
        height: 136,
        borderRadius: 68,
    },
    photoPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8A8F9E'
    },
    errorMessage: {
        height: 72,
        paddingTop: 40,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        fontSize: 10,
        color: '#8A8F9E',
        textTransform:'uppercase',
        marginBottom: 5
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    buttonContainer: {
        marginHorizontal: 30,
        marginTop: 48,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.4,
        shadowOffset: {width: 2, height: 2}
    },
    buttonText: {
        color: '#414959',
        fontSize: 13
    },
    signUpText: {
        fontWeight: '500',
        color: '#E9446A'
    }
})

export default withNavigation(RegisterForm);