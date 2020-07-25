import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import { Feather } from '@expo/vector-icons';

export default class ChatList extends React.Component {
    state = {
        isLoading: true,
        chatList: [],
        filteredChatList: []
    }

    async componentDidMount() {
        const currUser = firebaseDb.auth.currentUser;
        const currUID = currUser.uid;

        firebaseDb.db.collection("friendlist").doc(currUID).onSnapshot(docSnapshot => {
            this.setUpChat(docSnapshot);
            
            //const promise = [];
            //const chats = []
            //this.getChat(docSnapshot, promise, chats);
            //Promise.all(promise).then(() => this.setState({chatList: chats, filteredChatList: chats, isLoading: false}))
        })
    }

    // updated
    async setUpChat(docSnapshot) {
        const chatInfo = await this.processChat(docSnapshot);
       
        const sorted = chatInfo.sort(this.compareTime).reverse();
        this.setState({chatList: sorted, filteredChatList: sorted, isLoading: false}) 
    }

    compareTime(chatInfoA, chatInfoB) {
        const chatA = chatInfoA.chat;
        const chatB = chatInfoB.chat;
       
        if(chatA.length == 0) {
            if(chatB.length == 0) {
                return 0;
            } else {
                return -1;
            }
        } else if (chatB.length == 0) {
            return 1;
        } else {
            const timeA = chatA[0].message[0].createdAt.valueOf();
            const timeB = chatB[0].message[0].createdAt.valueOf();

            return timeA -timeB;
        }
    }

    async processChat(docSnapshot) {
        const currUser = firebaseDb.auth.currentUser;
        const currUID = currUser.uid;
        const info = await docSnapshot.data();
        const chatUIDs = await info.chatUID;
        const chatRef = firebaseDb.db.collection("messages");
        const profileRef = firebaseDb.db.collection("profile");
        const chatInfo = [];

        for(let uid in chatUIDs) {
            const chatUID = chatUIDs[uid].chatUID;
          
            await chatRef.doc(chatUID).get().then(async docSnapshot => {
                const data = docSnapshot.data();
                const chat = data.chat.reverse();
                if (data.groupName == "") {
                    const friendUID = data.users.filter(uid => uid != currUID)[0];
                    await profileRef.doc(friendUID).get().then(docSnapshot => {
                        const username = docSnapshot.data().username;
                        const photo = docSnapshot.data().photo;
                        chatInfo.push({
                            chatName: username,
                            chat: chat,
                            chatPic: photo,
                            chatUID: chatUID,
                        })
                    })
                } else {
                    chatInfo.push({
                        chatName: data.groupName,
                        chat: chat,
                        chatPic: data.groupPic,
                        chatUID: chatUID,
                    })
                }
            })
        }
        Promise.all(chatInfo)
        return chatInfo;
    }

    // old
    /*async getChat(docSnapshot, promise, chats) {
        const info = docSnapshot.data();
        const chatUID = info.chatUID;
        const profileRef = firebaseDb.db.collection("profile");
        //const promise = [];
        //const chats = [];
       
        for(let uid in chatUID) {
            const chatInfo = chatUID[uid];
            const groupName = chatInfo.groupName;
            const users = chatInfo.users;

            if(groupName == "") {
                await profileRef.doc(users[0]).onSnapshot(docSnapshot => {
                    promise.push(this.pushIndivChat(chats, docSnapshot, chatInfo))
                   // Promise.all(promise).then(() => this.setState({chatList: chats, filteredChatList: chats, isLoading: false}))
                })
            } else {
                chats.push({
                    chatName: groupName,
                    chatUID: chatInfo.chatUID,
                    chatPic: chatInfo.groupPic,
                })
            }
        }        
    }

    async pushIndivChat(chats, docSnapshot, chatInfo) {
        const username = await docSnapshot.data().username;
        const photo = await docSnapshot.data().photo;
        chats.push({
            chatName: username,
            chatUID: chatInfo.chatUID,
            chatPic: photo,
        })
    }*/

    searchChat(searchText) {
        this.setState({
            filteredChatList: this.state.chatList.filter(chat =>
                           chat.chatName.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    renderChat = chat => {
        return (
            <TouchableOpacity
                style={styles.eventItem}
                onPress={() => {
                    this.props.navigation.navigate('ChatScreen', {
                        //chat: chat.chatUID,
                        chatUID: chat.chatUID,
                        chat: chat.chat,
                        chatName: chat.chatName, 
                        chatPic: chat.chatPic,
                    })
                }}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.titleBar}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: chat.chatPic}}
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
        const { isLoading, filteredChatList } = this.state
    
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
                        data={filteredChatList}
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
        backgroundColor: '#F3E5F5'
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
        backgroundColor: '#CE93D8',
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
        justifyContent: 'space-around',
        marginVertical: 5
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
        marginBottom: 8,
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
