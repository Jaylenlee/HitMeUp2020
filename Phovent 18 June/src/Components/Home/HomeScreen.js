import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar, Modal} from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import {MaterialIcons} from '@expo/vector-icons';
import ModalNavigation from '../GlobalStyles/ModalNavigation';

export default class HomeScreen extends React.Component {

    state = {
        displayName: "",
        uid: "",
        modalOpen: false
    };

    componentDidMount() {
        const user = firebaseDb.auth.currentUser;
        const displayName = user.displayName;
        const uid = user.uid;
        this.setState({displayName: displayName, uid: uid})
    }

    handleSignOutUser = () => {
        firebaseDb.auth.signOut();
    }

    /*<ModalNavigation navigation={this.props.navigation} 
                    displayName = {this.state.displayName}
                    uid = {this.state.uid}
                    modalOpen = {this.state.modalOpen}
                >   
                </ModalNavigation>*/ // initiation of Modal??? WIP

    render() {

        const {displayName, uid} = this.state;
        return(
            <View style={styles.container}>
                <Modal visible= {this.state.modalOpen} animationType='slide'>
                    <View>
                        <Text></Text>
                        <MaterialIcons 
                            name='close'
                            size={24}
                            onPress={() => this.setState({modalOpen: false})}
                        />
                        <TouchableOpacity style = {styles.buttonContainer} 
                                    onPress={() => {
                                        this.props.navigation.navigate('Profile', {displayName: displayName, uid: uid});
                                    }}>
                                    <Text style={styles.buttonText}>Go Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer} 
                                    onPress={() => {
                                        this.props.navigation.navigate('Home', {displayName: displayName, uid: uid});
                                    }}>
                                    <Text style={styles.buttonText}>Go Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.props.navigation.navigate('FriendList', {displayName: displayName, uid: uid});
                            }}>
                            <Text style={styles.buttonText}>Go Friend list</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.props.navigation.navigate('SearchFriend', {displayName: displayName, uid: uid});
                            }}>
                            <Text style={styles.buttonText}>Go Search Friend</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.props.navigation.navigate('EventCreate', {displayName: displayName, uid: uid});
                            }}>
                            <Text style={styles.buttonText}>Go Event</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.props.navigation.navigate('Feeds', {displayName: displayName, uid: uid});
                            }}>
                            <Text style={styles.buttonText}>Go Feeds</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.props.navigation.navigate('PP');
                            }}>
                            <Text style={styles.buttonText}>Go PP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.props.navigation.navigate('Private');
                            }}>
                            <Text style={styles.buttonText}>Go Private</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer} 
                            onPress={() => {
                                this.props.navigation.navigate('Public')}}>
                            <Text style={styles.buttonText}>Go Public</Text>
                        </TouchableOpacity>        
                    </View>
                </Modal>

                <MaterialIcons 
                    name='add'
                    size={24}
                    onPress={() => this.setState({modalOpen: true})}
                />
            
                <Text>Hi {this.state.displayName}</Text>
                <TouchableOpacity style={styles.signOut}
                onPress = {this.handleSignOutUser}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('Profile', {displayName: displayName, uid: uid});
                    }}>
                    <Text style={styles.buttonText}>Go Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('FriendList', {displayName: displayName, uid: uid});
                    }}>
                    <Text style={styles.buttonText}>Go Friend list</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('SearchFriend', {displayName: displayName, uid: uid});
                    }}>
                    <Text style={styles.buttonText}>Go Search Friend</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('EventCreate', {displayName: displayName, uid: uid});
                    }}>
                    <Text style={styles.buttonText}>Go Event</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('Feeds', {displayName: displayName, uid: uid});
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

