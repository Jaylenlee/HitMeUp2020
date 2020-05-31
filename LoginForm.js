import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import firebaseDb from './firebaseDb';

export default class LoginForm extends React.Component {


    state = {
        username: '',
        email: '',
        password: '',
        signUpSuccess: false
    };

    handleUpdateUsername = (username) => this.setState({username});
    handleUpdateEmail = (email) => this.setState({email});
    handleUpdatePassword = (password) => this.setState({password});

    handleCreateUser = () => firebaseDb.firestore()
        .collection('users')
        .add({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
    }).then(() => this.setState({
        username: '',
        email: '',
        password: '',
        signUpSuccess: true
    })).catch(err => console.error(err))
        

    render(){

        const {username, email, password, signUpSuccess} = this.state

        return(
            <View style = {styles.container}>
                <StatusBar
                    barstyle="light-content"
                />
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

                <TouchableOpacity style = {styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        if (username.length && email.length && password.length) {
                            this.handleCreateUser()
                        }
                    }}
                    ref={(input) => this.signUp = input}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                {
                    signUpSuccess && <Text style={styles.buttonText}>Sign Up Successful</Text>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
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
    }
})