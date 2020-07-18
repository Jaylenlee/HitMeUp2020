import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

class ChatList extends React.Component {
    state = {
        isLoading: true,
        chatList: ["naruto", "leaf village"],
        userID: "Gerald",
        filteredChatList: []
    }

/*
    componentDidMount() {
        const chats = [];
        firebaseDb.db.collection("friendlist").doc(this.state.userID).onSnapshot(docSnapshot => {
            console.log(docSnapshot.data().chatUID);
            docSnapshot.data().chatUID.forEach(chat => chats.push(chat))
        })
        console.log(chats);
        const chatRef = firebaseDb.db.collection("chats");
        const chatName = [];
        const messages = [];
        const userList = [];

        for (let uid in chats) {
            chatRef.doc(chats[uid]).onSnapshot(docSnapshot => {
                if (docSnapshot.data().groupName === "") {
                    for (let uzer in docSnapshot.data().users) {
                        if (uzer !== this.state.userID) {
                            chatName.push(uzer);
                        }
                    }
                } else {
                    chatName.push(docSnapshot.data().groupName)
                }

                userList.push(docSnapshot.data().users)
            })
        }

        this.setState({ chatList: chatName, isLoading: false })
    }
*/

    searchChat(searchText) {
        this.setState({
            filteredChatList: this.state.chatList.filter(chat =>
                           chat.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    renderChat = chat => {
        return (
        console.log("REACHED"),
            <TouchableOpacity
                style={styles.eventItem}
                onPress={() => {this.props.navigation.navigate('Chat1')}}
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

                                <Text style={styles.eventTitle}>naruto</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { isLoading, chatList } = this.state
    /*
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
    */
        return(
        console.log(chatList),
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
                        onPress={() => {this.props.navigation.navigate('GroupC')}}
                        style={styles.grpIcon}
                    >
                        <Text style={styles.iconText}>Add Group Chat</Text>
                        <Feather name="message-square" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate('IndivC')}}
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
export default ChatList;