import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, View, Text,
         StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

export default class ChatScreen extends React.Component {
    state = {
        chat: this.props.navigation.getParam("chat", ""),
        chatUID: this.props.navigation.getParam("chatUID", ""),
        user: null,
        messages: [],
        isLoading: true,
        chatHeader: this.props.navigation.getParam("chatName", ""),
        chatPic: this.props.navigation.getParam("chatPic", ""),
    };

    componentDidMount() {
        const messages = [];
    
        this.state.chat.forEach(async item => {
            const input = await item.message[0];
            const date = input.createdAt;

            if(Object.prototype.toString.call(date) === '[object Date]') {
                messages.push(input)
                console.log("is date")
            } else {
                input.createdAt = input.createdAt.valueOf().toDate();
                messages.push(input)
            }
        })
        this.setState({isLoading: false, messages: messages});
        /*firebaseDb.db.collection("messages").doc(this.state.chat).onSnapshot(docSnapshot => {
            const info = docSnapshot.data();
            // to get chat messages
            const chat = info.chat;
            const messages = [];
            chat.reverse().forEach(item => {
                const input = item.message[0];
                input.createdAt = input.createdAt.toDate();
                messages.push(input)
            })
            this.setState({messages: messages, isLoading: false});
        })*/
    };

    componentWillMount() {
        const currUser = firebaseDb.auth.currentUser;
        this.setState({user: {_id: currUser.uid, name: currUser.displayName}})
    }

    sendChat(newMessage) {
        const obj = {message: newMessage};
        firebaseDb.db.collection("messages").doc(this.state.chatUID).update({
            chat: firebase.firestore.FieldValue.arrayUnion(obj)
        })
        this.setState({messages: GiftedChat.append(this.state.messages, newMessage)});
    }

    render() {
        const {isLoading, chatHeader, chatPic} = this.state;
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("GroupMembers", {
                                                                                        chatName: this.state.chatHeader,
                                                                                        chatPhoto: this.state.chatPic,
                                                                                        chatUID: this.state.chatUID})}
                        >
                            <Text style={styles.headerTitle}>{chatHeader}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("GroupMembers", {
                                                                                        chatName: this.state.chatHeader,
                                                                                        chatPhoto: this.state.chatPic,
                                                                                        chatUID: this.state.chatUID})}
                        >
                            <View style={styles.avatarContainer}>
                                <Image
                                    style={styles.thumbnail}
                                    source={{uri: chatPic}}
                                />
                            </View>
                        </TouchableOpacity>
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
                        
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("GroupMembers", {
                                                                                        chatName: this.state.chatHeader,
                                                                                        chatPhoto: this.state.chatPic,
                                                                                        chatUID: this.state.chatUID})}
                        >
                            <Text style={styles.headerTitle}>{chatHeader}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("GroupMembers", {
                                                                                        chatName: this.state.chatHeader,
                                                                                        chatPhoto: this.state.chatPic,
                                                                                        chatUID: this.state.chatUID})}
                        >
                            <View style={styles.avatarContainer}>
                                <Image
                                    style={styles.thumbnail}
                                    source={{uri: chatPic}}
                                />
                            </View>
                        </TouchableOpacity>
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
    avatarContainer: {
        shadowColor: '#00695C',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 35
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 35,
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
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
})