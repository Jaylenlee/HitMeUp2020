import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
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
        /*gender: '',
        age: '',
        location: '',
        occupation: '',
        interest: '',*/
    };

    handleUpdateUsername = (username) => this.setState({username});
    handleUpdateEmail = (email) => this.setState({email});
    handleUpdatePassword = (password) => this.setState({password});

    handleCreateUser = () => {
        const {username, email, password, signUpSuccess} = this.state;
        firebaseDb
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: username
                })
            })
            .catch(error => this.setState({errorMessage: error.message}));
    }
        
    render(){

        const {username, email, password, signUpSuccess, errorMessage} = this.state

        return(
            <View style = {styles.container}>
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
                        onSubmitEditing={() => this.emailInput.focus()}
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
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                        ref={(input) => this.emailInput = input}
                    />

                    <TextInput
                        placeholder="Password"
                        onChangeText={this.handleUpdatePassword}
                        value={password}
                        placeholderTextColor = "rgba(255,255,255,0.7)"
                        returnKeyType="go"
                        onSubmitEditing={() => this.signUp.focus()}
                        secureTextEntry
                        style = {styles.input}
                        ref={(input) => this.passwordInput = input}
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
            </View>
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


