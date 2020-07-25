import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default class IndivChat extends React.Component {
    state = {
        allFriends: [],
        friendsFiltered: [],
        isLoading: true,
    }

    componentDidMount() {
        this.updateFriends();
    }

    updateFriends = () => {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
    
        firebaseDb.db.collection('friendlist').doc(uid).onSnapshot(docSnapshot => {
            const allFriends = [];
            const promise = [];
            const friendlist = docSnapshot.data().friendlist
           
            const profileCollection = firebaseDb.db.collection('profile');

            for(let uid in friendlist) {
                const docRef = profileCollection.doc(friendlist[uid]);
                promise.push(docRef.get().then(docSnapshot => {
                    allFriends.push(docSnapshot.data())
                }))
            }
            
            Promise.all(promise).then(() => this.setState({
                allFriends: allFriends, 
                friendsFiltered: allFriends, 
                isLoading: false
            }))
        })
    }

    searchFriend(searchText) {
        this.setState({
            friendsFiltered: this.state.allFriends.filter(profile =>
                           profile.username.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    handleChat(friendUID) {
        console.log("handle");
        this.setState({isLoading: true});
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        const friendRef = firebaseDb.db.collection("friendlist");
        friendRef.doc(uid).get().then(docSnapshot => {
            const chatUID = docSnapshot.data().chatUID;
            const chatInfo = chatUID.filter(chatInfo => chatInfo.groupName == "")
                                    .filter(chatInfo => chatInfo.users[0] == friendUID);                   
            chatInfo[0] ? this.openChat(friendUID, chatInfo[0]) : this.createChat(friendUID, uid, friendRef);                        
        })
    }

    createChat(friendUID, uid, friendRef) {
        console.log("create");
        firebaseDb
            .db
            .collection('messages')
            .add({
                chat: [],
                groupName: "",
                users: [uid, friendUID],
                groupPic: "",
            }).then((docRef) => {
                const promise = []
                const obj = {chatUID: docRef.id, groupName: "", users: [friendUID], groupPic: ""};
                const obj2 = {chatUID: docRef.id, groupName: "", users: [uid], groupPic: ""};
                promise.push(friendRef.doc(uid).update({
                    chatUID: firebase.firestore.FieldValue.arrayUnion(obj)
                }))
                console.log(uid)
                promise.push(friendRef.doc(friendUID).update({
                    chatUID: firebase.firestore.FieldValue.arrayUnion(obj2)
                }))      
                
                Promise.all(promise).then(() => {this.props.navigation.navigate("ChatList")})
            }).catch(err => console.error(err))    
    }

    openChat(friendUID, chatInfo) {
        console.log("open");
        const chatUID = chatInfo.chatUID;
        const chatDoc = firebaseDb.db.collection("messages").doc(chatUID).get();
        firebaseDb.db.collection("profile").doc(friendUID).onSnapshot(docSnapshot => {
            const info = docSnapshot.data();
            const chatName = info.username;
            const chatPic = info.photo;
            chatDoc.then(docSnapshot => {
                const chat = docSnapshot.data().chat;
                this.props.navigation.navigate('ChatScreen', {
                    chatUID: chatUID,
                    chat: chat,
                    chatName: chatName, 
                    chatPic: chatPic,
                })
                this.setState({isLoading: false})
            })
        })
    }

    renderFriend = friend => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1}}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: friend.photo}}
                                    />
                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.eventTitle}>{friend.username}</Text>
                                    <Text style={styles.eventTime}>{friend.email}</Text>
                                </View>
                                <View style={styles.buttonPos}>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={() => this.handleChat(friend.uid)}
                                    >
                                        <Text style={styles.addButtonText}>Chat</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { isLoading, friendsFiltered } = this.state;
        
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
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Private Message</Text>
                    </View>
                </View>
                <View style={styles.searchBar}>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.searching}
                            placeholder="Search Friend"
                            onChangeText={text => {this.searchFriend(text)}}
                        />
                    </View>
                </View>

                <ScrollView>
                    <FlatList
                        style={styles.feed}
                        data={friendsFiltered}
                        renderItem={({ item }) => this.renderFriend(item)}
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
        backgroundColor: '#ecd3f0'
    },
    backArrow: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    refreshStyle: {
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
    searchBar: {
        marginTop: 5,
        backgroundColor: '#e48ff2',
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
    feed: {
        paddingHorizontal: 10
    },
    eventItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 8,
        shadowOpacity: 0.1,
        shadowOffset: {height: 2, width: 2}
    },
    avatarContainer: {
        shadowColor: '#00695C',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20,
        marginLeft: 15
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#004D40',
        paddingBottom: 5
    },
    eventTime: {
        fontSize: 12,
        color: '#26A69A',
        fontWeight: '400',
        marginTop: 4
    },
    details: {
        paddingLeft: 40
    },
    buttonPos: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 110
    },
    addButton: {
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.4,
        margin: 25,
        padding: 8,
        borderRadius: 2,
        width: 60,
        backgroundColor: '#DC5699',
        alignItems: 'center'
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: '400'
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonPosition: {
        alignItems: 'flex-end'
    },
    button: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#DC5699',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.3
    },
    nextButtonText: {
        fontSize: 14,
        fontWeight: '400',
        marginRight: 10
    }
})