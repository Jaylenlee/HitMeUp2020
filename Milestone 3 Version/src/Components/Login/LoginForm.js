import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import firebaseDb from '../Database/firebaseDb';

export default class LoginForm extends React.Component {
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
            <KeyboardAvoidingView style = {styles.container}>
                <StatusBar
                    barstyle="light-content"
                />

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <Image
                        source={{uri: 'https://1.bp.blogspot.com/-i5-CeH9AqCI/XvQlWPm6RHI/AAAAAAAAAC0/_zcPawFqEIwN2XRWuRU3y_McIh1RwTKcwCK4BGAsYHg/s540/Capture234.PNG'}}
                        style={styles.logoImg}
                    />

                    <Text style={styles.greeting}>{'Welcome to Phovent!'}</Text>
                    <Text style={styles.subGreeting}>{'A place where easy meetup plans are made possible'}</Text>

                    <View style={styles.errorMessage}>
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput
                                onChangeText={this.handleUpdateEmail}
                                value={email}
                                returnKeyType="next"
                                keyboardType="email-address"
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
                                returnKeyType="go"
                                secureTextEntry
                                style = {styles.input}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.handleLoginUser()}
                    >
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 32, marginBottom: 24 }}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonText}>
                            New to Phovent? <Text style={styles.signUpText}>Sign Up here!</Text>
                        </Text>
                    </TouchableOpacity>
                            
                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 32, marginBottom: 24 }}
                        onPress={() => {this.props.navigation.navigate('Reset')}}
                    >
                        <Text style={styles.buttonText}>
                            Forgot Password? <Text style={styles.signUpText}>Click here!</Text>
                        </Text>
                    </TouchableOpacity>        
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    greeting: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    logoImg: {
        marginTop: 32,
        height: 120,
        width: 120,
        alignSelf: 'center'
    },
    subGreeting: {
        marginTop: 5,
        fontSize: 11,
        fontWeight: '300',
        textAlign: 'center'
    },
    errorMessage: {
        height: 54,
        paddingTop: 20,
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
        textTransform:'uppercase',
        marginBottom: 5
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D',
        paddingLeft: 5
    },
    buttonContainer: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center',
        shadowOpacity: 0.4,
        shadowOffset: {width: 2, height: 2}
    },
    buttonText: {
        color: '#414959',
        fontSize: 13
    },
    signUpText: {
        fontWeight: '500',
        color: '#E9446A'
    }
});
