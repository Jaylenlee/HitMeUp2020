import React, { Component } from 'react';
import { StyleSheet, 
		 View,
		 Image,
		 Text, 
		 KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
	render() {
		return (
			<KeyboardAvoidingView behavior = "padding" style = {styles.container}>
				<View style = {styles.container}>
					<View style = {styles.logoContainer}>
						<Image 
							style = {styles.logo}
							source = {require('../../Images/phoventlogo.png')} 
						/>
						<Text style = {styles.title}>By HitMeUp2020 using React Native</Text>
					</View>
					<View style = {styles.formContainer}>
						<LoginForm />
					</View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		width: 200,
		height: 250
	},
	title: {
		color: '#FFF',
		marginTop: 10,
		width: 160,
		textAlign: 'center',
		opacity: 0.9
	}
})