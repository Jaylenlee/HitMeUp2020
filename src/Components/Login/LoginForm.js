import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {withNavigation} from 'react-navigation';
import firebaseDb from '../Database/firebaseDb';
import { BorderlessButton } from 'react-native-gesture-handler';

class LoginForm extends React.Component {

    state = {
        email: '',
        password: '',
        errorMessage: null
    };

    handleUpdateEmail = (email) => this.setState({email});
    handleUpdatePassword = (password) => this.setState({password});
    handleLoginUser = () => {
        const {email, password} = this.state;
        firebaseDb.auth
                .signInWithEmailAndPassword(email, password)
                .catch(error => this.setState({errorMessage: error.message}))
    }
        
    render(){

        const {email, password, errorMessage} = this.state

        return(
            <View style = {styles.container}>
                <StatusBar
                    barstyle="light-content"
                />
                <View style={styles.errorMessage}>
                    {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                </View>
                <TextInput
                    placeholder="Email"
                    onChangeText={this.handleUpdateEmail}
                    value={email}
                    placeholderTextColor = "rgba(255,255,255,0.9)"
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
                    placeholderTextColor = "rgba(255,255,255,0.9)"
                    returnKeyType="go"
                    //onSubmitEditing={() => this.login.focus()}
                    secureTextEntry
                    style = {styles.input}
                    //ref={(input) => this.passwordInput = input}
                />
            
                <TouchableOpacity style = {styles.buttonContainer}
                    onPress={() => {
                        this.handleLoginUser()
                    }}
                    /*ref={(input) => this.login = input}*/>
                    <Text style={styles.buttonText}>LOGIN</Text> 
                </TouchableOpacity>
                
                <View style={{paddingTop: 20, flexDirection: "row", justifyContent: "center"}}>
                <Text style={styles.buttonText}>New to Phovent? </Text>
                <TouchableOpacity  
                    onPress={() => {
                        this.props.navigation.navigate('Register');
                    }}>
                    <Text style={styles.signUpText}> Sign Up here!</Text>
                </TouchableOpacity>
                </View>
                
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
        paddingHorizontal: 10,
    },

    buttonContainer: {
        marginTop: 10,
        backgroundColor: '#34d9eb',
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
    signUpText: {
        textAlign: 'center',
        color: 'red',
        fontWeight: '700'
    }
})


export default withNavigation(LoginForm);