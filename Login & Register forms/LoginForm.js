import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';
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
            <KeyboardAvoidingView style = {styles.container}>
                <StatusBar
                    barstyle="light-content"
                />
                <ImageBackground
                    source={{uri: 'https://c7.uihere.com/files/724/409/150/abstract-light-blue-wave-background.jpg'}}
                    style={{width: undefined, padding: 16, paddingTop: 48}}
                >
                    <Text style={styles.greeting}>{'Hello again.\nWelcome back!'}</Text>

                    <View style={styles.errorMessage}>
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View style={{ marginTop: 32 }}>
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
                        style={{ alignSelf: 'center', marginTop: 32 }}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonText}>
                            New to Phovent? <Text style={styles.signUpText}>Sign Up here!</Text>
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSIze: 18,
        fontWeight: '400',
        textAlign: 'center'
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
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        fontSize: 10,
        color: '#8A8F9E',
        textTransform:'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    buttonContainer: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#414959',
        fontSize: 13
    },
    signUpText: {
        fontWeight: '500',
        color: '#E9446A'
    }
})


export default withNavigation(LoginForm);