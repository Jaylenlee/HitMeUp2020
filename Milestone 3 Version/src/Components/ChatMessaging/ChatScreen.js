import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
//import Fire from './Fire';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

export default class ChatScreen extends React.Component {
    state = {
        chatUID: this.props.navigation.getParam("chatUID", ""),
        user: null,
        messages: [],
        isLoading: false,
        chatHeader: this.props.navigation.getParam("chatName", ""),
    };

    componentDidMount() {
        firebaseDb.db.collection("messages").doc(this.state.chatUID).onSnapshot(docSnapshot => {
            const info = docSnapshot.data();

           /* // to get chat header
            const groupName = info.groupName;
            const users = info.users;
            const chatHeader = groupName ? groupName : users.filter(name => name != this.state.user.name)[0];
            console.log(this.state.user.name)
            console.log(chatHeader)*/
            
            // to get chat messages
            const chat = info.chat;
            const messages = [];
            chat.reverse().forEach(item => {
                const input = item.message[0];
                input.createdAt = input.createdAt.toDate();
                messages.push(input)
            })
            this.setState({messages: messages, isLoading: false});
            console.log(this.state.messages);
        })
    };

    componentWillMount() {
        const currUser = firebaseDb.auth.currentUser;
        this.setState({user: {_id: currUser.uid, name: currUser.displayName}})
    }

    sendChat(newMessage) {
        console.log(newMessage);
        const obj = {message: newMessage};
        console.log(obj);
        firebaseDb.db.collection("messages").doc(this.state.chatUID).update({
            chat: firebase.firestore.FieldValue.arrayUnion(obj)
        })
        this.setState({messages: GiftedChat.append(this.state.messages, newMessage)});
    }

    /*send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: Date.now(),
                user: item.user
            };

            this.db.push(message);
        });
    };*/

    render() {
        const {isLoading, chatHeader} = this.state;
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        } else {
            const chat = <GiftedChat messages={this.state.messages} onSend={newMessage => this.sendChat(newMessage)} user={this.state.user} />;
            if (Platform.OS === 'android') {
                return (
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>
                        <View style={styles.top}>
                            <View style={styles.header}>
                                <TouchableOpacity
                                    style={styles.backArrow}
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>{chatHeader}</Text>
                            </View>
                        </View>

                        {chat}
                    </KeyboardAvoidingView>
                )
            }

            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.top}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backArrow}
                                onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>{chatHeader}</Text>
                        </View>
                    </View>
                    {chat}
                </SafeAreaView>
            );
        }
    };
};

const styles = StyleSheet.create({
    backArrow: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    top: {
        backgroundColor: '#FFF',
        borderBottomWidth: 2,
        borderBottomColor: '#EBECF4',
        shadowColor: '#011f4b',
        shadowOffset: {height: 5},
        shadowOpacity: 0.4,
        zIndex: 10,
    },
    header: {
        flex: 1,
        padding: 16,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: '#EBECF4',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        position: 'absolute'
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})