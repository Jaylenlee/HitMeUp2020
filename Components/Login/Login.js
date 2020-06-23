import React from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends React.Component {

    render(){
        return(
            <KeyboardAvoidingView behavior="padding" style = {styles.container}>
                <View style = {styles.logoContainer}>
                    <Image
                        style = {styles.logo} 
                        source = {{uri: "https://1.bp.blogspot.com/-YQHiWCQPiEw/XucX_iepFRI/AAAAAAAAACU/CB0Lnl8ujywbQqyCE4TMNWCP7_AtV4zWgCK4BGAsYHg/w1684-h1069-p-k-no-nu/phoventlogoV2.png"}}
                    />
                    <Text style = {styles.title}>
                        Phovent is the best
                    </Text>
                </View>
               <View style={styles.loginForm}>
                    <LoginForm/>
               </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#34ebd5"
    },

    logo: {
        width: 200,
        height: 200,
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow:1,
        justifyContent:'center'
    },

    title: {
        color:  'white',
        marginTop: 10,
        width: 140,
        textAlign: 'center',
        opacity: 0.9
    },

    loginForm: {
        paddingBottom: 40,
    }
})