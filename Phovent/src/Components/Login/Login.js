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
                        source ={{uri:'https://www.google.com/search?q=sky+images&rlz=1C1CHBF_enSG837SG837&tbm=isch&source=iu&ictx=1&fir=5YqFrWgGGC4RDM%253A%252CpZ56kUO_51Z65M%252C_&vet=1&usg=AI4_-kRdvDi_vkc5DH5Zcd9Ei8NOFIn3kw&sa=X&sqi=2&ved=2ahUKEwiOv_upl_npAhUmGbkGHaZIB5kQ9QEwAHoECAoQMA#imgrc=5YqFrWgGGC4RDM:'/*'../../pic/pic.JPG'*/}}
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