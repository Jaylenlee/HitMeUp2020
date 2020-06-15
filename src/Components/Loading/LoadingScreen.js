import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebaseDb from '../Database/firebaseDb';

export default class LoadingScreen extends React.Component {

    componentDidMount() {
        firebaseDb.auth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth");
        });
    }

    render() {

        return (
            <View styles = {styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})