import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { render } from 'react-dom';

export default class ModalNavigation extends React.Component {
    state = {
        modalOpen: this.props.modalOpen,
        uid: this.props.uid,
    }

    render() {

      return (
        <View>
            <Modal visible={this.state.modalOpen} animationType='slide'>
                <View>
                    <Text></Text>
                    <MaterialIcons
                        name='close'
                        size={24}
                        onPress={() => this.setState({modalOpen: false})}
                    />
                    <TouchableOpacity style = {styles.buttonContainer}
                        onPress={() => {
                            this.props.navigation.navigate('Profile', {uid: this.state.uid});
                        }}>
                        <Text style={styles.buttonText}>Go Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonContainer}
                        onPress={() => {
                             this.props.navigation.navigate('Home', {uid: this.state.uid});
                        }}>
                        <Text style={styles.buttonText}>Go Home</Text>
                     </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonContainer}
                        onPress={() => {
                            this.props.navigation.navigate('FriendList', {uid: this.state.uid});
                        }}>
                        <Text style={styles.buttonText}>Go Friend list</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonContainer}
                        onPress={() => {
                            this.props.navigation.navigate('SearchFriend', { uid: this.state.uid});
                        }}>
                        <Text style={styles.buttonText}>Go Search Friend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonContainer}
                        onPress={() => {
                           this.props.navigation.navigate('EventCreate', {uid: this.state.uid});
                        }}>
                        <Text style={styles.buttonText}>Go Event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonContainer}
                        onPress={() => {
                            this.props.navigation.navigate('Feeds', {uid: this.state.uid});
                        }}>
                        <Text style={styles.buttonText}>Go Feeds</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <MaterialIcons
                name='add'
                size={24}
                onPress={() => this.setState({modalOpen: true})}
            />
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