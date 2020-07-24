import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import * as firebase from 'firebase';
import firebaseDb from '../Database/firebaseDb';

class GroupMembers extends React.Component {
    state = {
        groupPic: this.props.navigation.getParam("chatPhoto", ""),
        groupName: this.props.navigation.getParam("chatName", ""),
        chatUID: this.props.navigation.getParam("chatUID", ""),
        users: [],
    }

    renderMember = member => {
        return (
            <View style={styles.membaItem}>
                <Text style={styles.memba}>{member}</Text>
            </View>
        );
    };

    componentDidMount() {
        const members = [];
        const profileRef = firebaseDb.db.collection("profile");
        firebaseDb.db.collection("messages").doc(this.state.chatUID).get().then(docSnapshot => {
            const memberUID = docSnapshot.data().users;
            const promise = [];
            for(let uid in memberUID) {
                promise.push(profileRef.doc(memberUID[uid]).get().then(docSnapshot => {
                    const name = docSnapshot.data().username;
                    members.push(name);
                }))
            }

            Promise.all(promise).then(() => this.setState({users: members, isLoading: false}))
        });
    }

    handleLeaveChat() {
        /*Remove chat + alert that all chat messages will be removed*/
        /*const currUser = firebaseDb.auth.currentUser;
        const uid = currUser.uid;
        const name = currUser.username;

        const newMessage = {
            _id: 1,
            text: name + " has left the chat. Your chat will be unable to reach the user now.",
            createdAt: new Date().getTime(),
            user: {
              _id: 2,
              name: 'Admin Bot'
            }
        }

        const obj = {message: newMessage};

        const friendChatDoc = firebaseDb.db.collection("friendlist").doc(uid)
        
        friendChatDoc.get().then(docSnapshot => {
            const chatUID = docSnapshot.data().chatUID;
            const toDelete = chatUID.filter(chatInfo => chatInfo.chatUID == this.state.chatUID)[0];
            friendChatDoc.update({
                chatUID: firebase.firestore.FieldValue.arrayRemove(toDelete)
            }).then(() => firebaseDb.db.collection("messages").doc(this.state.chatUID).update({
            chat: firebase.firestore.FieldValue.arrayUnion(obj)
        }))
        })
        */
    }

    render() {
        return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backArrow}
                onPress={() => this.props.navigation.goBack()}
            >
                <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
            </TouchableOpacity>

            <View style={{marginTop: 24, alignSelf:"center"}}>
                <View style={styles.avatarContainer}>
                    <Image
                       source={this.state.groupPic}
                       style={styles.profileImage}
                    />
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={{alignSelf: 'center'}}>
                    <Text style={styles.groupNamae}>{this.state.groupName}</Text>
                </View>

                <View style={styles.titleList}>
                    <View style={{borderBottomWidth: 1, borderBottomColor: 'blue', paddingBottom: 20}}>
                        <Text style={styles.titleText}>Group Members</Text>
                    </View>
                    <View style={{height: 200, marginTop: 10, borderColor: "purple", paddingHorizontal: 5,
                                  borderRadius: 3, borderWidth: 2, shadowOffset: {height: 3, width: 3}, shadowOpacity: 0.1}}>
                        <ScrollView>
                            <FlatList
                                style={styles.feed}
                                data={this.state.users}
                                renderItem={({ item }) => this.renderMember(item)}
                                keyExtractor={item => item}
                                showsVerticalScrollIndicator={false}
                            />
                        </ScrollView>
                    </View>
                </View>

                <TouchableOpacity
                    style={{alignSelf: 'center', marginTop: 16}}
                    onPress={() => {this.handleLeaveChat()}}>
                    <Text style={styles.removeGroupText}>Leave Chat</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C3C5CD",
    },
    backArrow: {
        padding: 10
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 30,
        shadowOpacity: 0.4,
        borderRadius: 68,
    },
    profileImage: {
        width: 136,
        height: 136,
        borderRadius: 68,
    },
    infoContainer: {
        alignSelf: "center",
        justifyContent: "center",
        margin: 32,
        marginTop: 24,
        width: 250
    },
    groupNamae: {
        fontSize: 18,
        marginTop: 24,
        textTransform: 'uppercase',
        fontWeight: '400',
    },
    titleList: {
        marginVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        paddingBottom: 10
    },
    titleText: {
        fontSize: 16,
        fontWeight: '400'
    },
    feed: {

    },
    membaItem: {
        marginTop: 12
    },
    memba: {
        fontSize: 16,
        fontWeight: '300',
    },
    removeGroupText: {
        color: '#F44336',
        fontSize: 14
    }
});

export default GroupMembers;