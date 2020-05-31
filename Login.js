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
                        source ={require('../../pic/phoventlogo.png')}
                    />
                    <Text stye = {styles.title}>
                        Phovent is the best
                    </Text>
                </View>
               <View style = {styles.formContainer}>
                    <LoginForm/>
               </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },

    logo: {
        width: 100,
        height: 100,
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow:1,
        justifyContent:'center'
    },

    formContainer: {

    },

    title: {
        color:  "#FFF",
        marginTop: 10,
        width: 140,
        textAlign: 'center',
        opacity: 0.9
    }
})
