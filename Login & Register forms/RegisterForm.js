import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebaseDb from '../Database/firebaseDb';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
    };

    handleUpdateUsername = (username) => this.setState({username});
    handleUpdateEmail = (email) => this.setState({email});
    handleUpdatePassword = (password) => this.setState({password});
    handleUpdateGender = (gender) => this.setState({gender});
    handleUpdateAge = (age) => this.setState({age});
    handleUpdateLocation = (location) => this.setState({location});
    handleUpdateOccupation = (occupation) => this.setState({occupation});
    handleUpdateInterests = (interests) => this.setState({interests});

    handleCreateUser = () => {
        const {username, email, password, signUpSuccess, errorMessage, gender,age,location,occupation, interests} = this.state;
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
                    photo: "https://cdn4.iconfinder.com/data/icons/political-elections/50/46-512.png",
                    uid: user.uid,
                }).catch(error => this.setState({errorMessage: error.message}));
                firebaseDb.db
                .collection('friendlist')
                .doc(user.uid)
                .set({
                    friendlist: []
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
                    <ImageBackground
                        source={{uri: 'https://c7.uihere.com/files/724/409/150/abstract-light-blue-wave-background.jpg'}}
                        style={{width: undefined, padding: 16, paddingTop: 48}}
                    >
                        <Text style={styles.greeting}>{'Please fill in your profile particulars.'}</Text>

                        <View style={styles.uploadIcon}>
                            <Ionicons name="ios-add" size={48} color="#00ff55" style={{paddingBottom: 80}} ></Ionicons>
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
                    </ImageBackground>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSIze: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    uploadIcon: {
        alignItems: 'center',
    },
    errorMessage: {
        height: 72,
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
        textTransform:'uppercase'
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
        justifyContent: 'center'
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