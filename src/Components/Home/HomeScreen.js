import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, Modal} from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import {MaterialIcons} from '@expo/vector-icons';

export default class HomeScreen extends React.Component {

    state = {
        displayName: "",
        modalOpen: false
    };

    componentDidMount() {
        const {displayName} = firebaseDb.auth.currentUser;
        this.setState({displayName: displayName})
    }

    handleSignOutUser = () => {
        firebaseDb.auth.signOut();
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Hi {this.state.displayName}</Text>
                <TouchableOpacity style={styles.signOut}
                onPress = {this.handleSignOutUser}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('Profile', {displayName: this.state.displayName});
                    }}>
                    <Text style={styles.buttonText}>Go Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('FriendList', {displayName: this.state.displayName});
                    }}>
                    <Text style={styles.buttonText}>Go Friend list</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('SearchFriend', {displayName: this.state.displayName});
                    }}>
                    <Text style={styles.buttonText}>Go Search Friend</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('EventCreate', {displayName: this.state.displayName});
                    }}>
                    <Text style={styles.buttonText}>Go Event</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('Feeds', {displayName: this.state.displayName});
                    }}>
                    <Text style={styles.buttonText}>Go Feeds</Text>
                </TouchableOpacity>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },

    signOut: {
        marginTop: 32,
    }
})

