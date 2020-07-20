import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default class ChatList extends React.Component {
    state = {
        isLoading: true,
        chatList: [],
        filteredChatList: []
    }

    componentWillMount() {
        const currUser = firebaseDb.auth.currentUser;
        const currUID = currUser.uid;
        const chats = [];
        firebaseDb.db.collection("friendlist").doc(currUser.uid).onSnapshot(docSnapshot => {
            const info = docSnapshot.data();
            const chatUID = info.chatUID;
            const profileRef = firebaseDb.db.collection("profile");
            const promise = [];
            //console.log("1: " + chatUID);
            for(let uid in chatUID) {
                const chatInfo = chatUID[uid];
                //console.log("2: " + chatInfo);
                const groupName = chatInfo.groupName;
                //console.log("3: " + groupName);
                const users = chatInfo.users;
                //console.log("4: " + users);
                
                if(groupName == "") {
                    const arr = users.filter(name => name != currUID);
                    console.log(arr);
                    console.log(arr[0]);

                    promise.push(profileRef.doc(arr[0]).onSnapshot(docSnapshot => {
                        console.log("??");
                        const username = docSnapshot.data().username;
                        chats.push({
                            chatName: username,
                            chatUID: chatInfo.chatUID
                        })
                    }))
                    Promise.all(promise).then(() => {})
                } else {
                    chats.push({
                        chatName: groupName,
                        chatUID: chatInfo.chatUID,
                    })
                }
            }
            console.log(chats);
            this.setState({chatList: chats, isLoading: false});
        })
    }


    searchChat(searchText) {
        this.setState({
            filteredChatList: this.state.chatList.filter(chat =>
                           chat.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    renderChat = chat => {
        console.log(chat);
        console.log(this.state.chatList);
        return (
            <TouchableOpacity
                style={styles.eventItem}
                onPress={() => {this.props.navigation.navigate('ChatScreen', {chatUID: chat.chatUID, chatName: chat.chatName})}}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.titleBar}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png'}}
                                    />
                                </View>
                                <Text style={styles.eventTitle}>{chat.chatName}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { isLoading, chatList } = this.state
    
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
    
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Chats</Text>
                    </View>

                    <View style={styles.searchBar}>
                        <View style={styles.iconSearch}>
                            <Feather name="search" size={18} style={styles.searchIcon}/>
                            <TextInput
                                style={styles.searching}
                                placeholder="Search Chat"
                                onChangeText={text => {this.searchChat(text)}}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.indivGrp}>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('GroupChat')}}
                        style={styles.grpIcon}
                    >
                        <Text style={styles.iconText}>Add Group Chat</Text>
                        <Feather name="message-square" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('IndivChat')}}
                        style={styles.grpIcon}
                    >
                        <Text style={styles.iconText}>Add Individual Chat</Text>
                        <Feather name="message-circle" size={18} />
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <FlatList
                        style={styles.feed}
                        data={chatList}
                        renderItem={({ item }) => this.renderChat(item)}
                        keyExtractor={item => item}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f9ff'
    },
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        position: 'absolute'
    },
    searchBar: {
        marginTop: 5,
        backgroundColor: '#d6fdff',
        padding: 5
    },
    iconSearch: {
        backgroundColor: '#FFF',
        height: 30,
        borderRadius: 15,
        flexDirection: 'row'
    },
    searchIcon: {
        padding: 5,
        marginLeft: 5
    },
    searching: {
        fontSize: 14,
        borderRadius: 15,
        paddingLeft: 5,
        height: 30,
        flex: 1
    },
    indivGrp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    grpIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        fontSize: 14,
        fontWeight: '300'
    },
    feed: {
        marginTop: 8,
        paddingHorizontal: 8
    },
    eventItem: {
        backgroundColor: '#FFF',
        padding: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        shadowOpacity: 0.1,
        shadowOffset: {height: 3, width: 3},
        shadowRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4',
    },
    titleBar: {
        flexDirection: "row"
    },
    avatarContainer: {
        shadowColor: '#00695C',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    eventTitle: {
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: '500',
        color: '#607D8B',
        alignItem: 'center',
        justifyContent: 'center',
        marginLeft: 25,
        paddingTop: 10
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});