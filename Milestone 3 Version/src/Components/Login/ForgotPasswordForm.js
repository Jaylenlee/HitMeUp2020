import React from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import {Ionicons} from "@expo/vector-icons";

export default class ForgotPasswordForm extends React.Component {

    state = {
        emailAddress: "",
    }

    handleForgotPassword() {
        firebaseDb
            .auth
            .sendPasswordResetEmail(this.state.emailAddress)
            .then(() => {
                alert('password reset email sent')
            })
            .catch(error => {alert(error)})
    }

    render() {
        const {emailAddress} = this.state;
        return(
            <View style={{padding: 10}}>
                <TouchableOpacity
                    style={styles.backArrow}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                </TouchableOpacity>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={styles.info}>
                        <Text style={styles.title}>Input your registered email to retrieve your password</Text>
                        <TextInput
                            placeholder="Enter email address"
                            value={emailAddress}
                            onChangeText={(text) => this.setState({emailAddress: text})}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity onPress={() => {
                        if(emailAddress.length) {
                            this.handleForgotPassword();
                        } else {
                            alert("Please enter your email address")
                        }
                    }}>
                        <Text style={{fontSize: 14}}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles=StyleSheet.create({
    info: {
        alignItems: 'flex-start',
        flex: 1,
        marginTop: 8
    },
    title: {
        color: '#4F566D',
        fontSize: 14,
        fontWeight: '300',
        marginBottom: 15
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginBottom: 15,
        color: "black",
        paddingHorizontal: 10,
        width: 300,
        borderRadius: 5
    },
});
