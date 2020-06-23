import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import {withNavigation} from 'react-navigation';
import firebaseDb from '../Database/firebaseDb';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

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
                    photo: "https://cdn4.iconfinder.com/data/icons/political-elections/50/46-512.png",// static photo atm
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

            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <StatusBar
                        barstyle="light-content"
                    />
                    <View style={styles.uploadIcon}>
                        <Ionicons name="ios-add" size={48} color="#00ff55" style={{paddingBottom: 180}} ></Ionicons>
                    </View>

                    <View style={styles.inputInfo}>
                        <View style={styles.errorMessage}>
                            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                        </View>
                        <TextInput
                            placeholder="Username"  
                            onChangeText={this.handleUpdateUsername}
                            value={username}
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            //onSubmitEditing={() => this.emailInput.focus()}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style = {styles.input}
                        />

                        <TextInput
                            placeholder="Email"
                            onChangeText={this.handleUpdateEmail}
                            value={email}
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            //onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style = {styles.input}
                            //ref={(input) => this.emailInput = input}
                        />

                        <TextInput
                            placeholder="Password"
                            onChangeText={this.handleUpdatePassword}
                            value={password}
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            //onSubmitEditing={() => this.signUp.focus()}
                            secureTextEntry
                            style = {styles.input}
                            //ref={(input) => this.passwordInput = input}
                        />

                        <TextInput
                            placeholder="Gender"
                            onChangeText={this.handleUpdateGender}
                            value={gender}
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            //onSubmitEditing={() => this.signUp.focus()}
                            //secureTextEntry
                            style = {styles.input}
                            //ref={(input) => this.passwordInput = input}
                        />

                        <TextInput
                            placeholder="Age"
                            onChangeText={this.handleUpdateAge}
                            value={age}
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            keyboardType= "numeric"
                            //onSubmitEditing={() => this.signUp.focus()}
                            //secureTextEntry
                            style = {styles.input}
                            //ref={(input) => this.passwordInput = input}
                        />

                        <TextInput
                            placeholder="Location"
                            onChangeText={this.handleUpdateLocation}
                            value={location}
                            multiline
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            //onSubmitEditing={() => this.signUp.focus()}
                        // secureTextEntry
                            style = {styles.input}
                        // ref={(input) => this.passwordInput = input}
                        />

                        <TextInput
                            placeholder="Occupation"
                            onChangeText={this.handleUpdateOccupation}
                            value={occupation}
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            //onSubmitEditing={() => this.signUp.focus()}
                            //secureTextEntry
                            style = {styles.input}
                            //ref={(input) => this.passwordInput = input}
                        /> 

                        <TextInput
                            placeholder="Interests/Hobbies"
                            onChangeText={this.handleUpdateInterests}
                            value={interests}
                            multiline
                            placeholderTextColor = "rgba(255,255,255,0.7)"
                            returnKeyType="go"
                            //onSubmitEditing={() => this.signUp.focus()}
                            //secureTextEntry
                            style = {styles.input}
                            //ref={(input) => this.passwordInput = input}
                        />        

                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.handleCreateUser()
                            }}
                            ref={(input) => this.signUp = input}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        {
                            signUpSuccess && <Text style={styles.buttonText}>Sign Up Successful</Text>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "black",
        justifyContent:'center',
    },

    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: "#FFF",
        paddingHorizontal: 10
    },

    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
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

    uploadIcon: {
        alignItems: 'center',
    },

    inputInfo: {
        
    }
})


export default withNavigation(RegisterForm);


