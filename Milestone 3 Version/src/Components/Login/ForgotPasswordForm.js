import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import firebaseDb from '../Database/firebaseDb';

export default class ForgotPasswordForm extends React.Component {

    state = {
        emailAddress: "",
    }

    handleForgotPassword() {
        firebaseDb.auth.sendPasswordResetEmail(this.state.emailAddress).then(() => {alert('password reset email sent')}).catch(error => {alert(error)})
    }

    render() {
        const {emailAddress} = this.state;
        return(
            <View>
                <TextInput
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChangeText={(text) => this.setState({emailAddress: text})}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TouchableOpacity onPress={() => {
                    if(emailAddress.length) {
                        this.handleForgotPassword();
                    } else {
                        alert("Please enter your email address")
                    }
                }}>
                    <Text>Enter</Text>
                </TouchableOpacity>
            </View>
        )
    }
} 