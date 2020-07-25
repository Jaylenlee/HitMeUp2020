import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput} from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FlatListComponent from '../Event/FlatListComponent';

export default class GroupChat extends React.Component {
    state = {
        allFriends: [],
        friendsFiltered: [],
        invitees: [],
        isLoading: true
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

    createChat() {
        this.setState({isLoading: true});
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        const people = this.state.invitees;
        people.push(uid);
        firebaseDb
            .db
            .collection('messages')
            .add({
                chat: [],
                groupName: "static test", //change this
                users: people,
                groupPic: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png', // change this
            }).then((docRef) => {
                const friendRef = firebaseDb.db.collection('friendlist');
                const promise = [];
                const obj = {
                    chatUID: docRef.id, 
                    groupName: "static test",
                    users: people, 
                    groupPic: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png' //change this
                }
             
                promise.push(friendRef.doc(uid).update({
                    chatUID: firebase.firestore.FieldValue.arrayUnion(obj)
                }))
                for(let uid in this.state.invitees) {
                    promise.push(friendRef.doc(this.state.invitees[uid]).update({
                        chatUID: firebase.firestore.FieldValue.arrayUnion(obj)
                    }))
                }
                Promise.all(promise).then(() => {this.props.navigation.navigate("ChatList")})
            }).catch(err => console.error(err))    
    }

    addToInviteList(uid) {
        this.state.invitees.push(uid);
        console.log(this.state.invitees);
    }

    removeFromInviteList(uid) {
        const idx = this.state.invitees.indexOf(uid);
        this.state.invitees.splice(idx, 1);
    }

    renderFriend = friend => {
        return(
            <FlatListComponent friend={friend} 
            invite={() => this.addToInviteList(friend.uid)} 
            remove={() => this.removeFromInviteList(friend.uid)}/>
        )
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
                        <Text style={styles.headerTitle}>Group Message</Text>
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

                <View style={styles.buttonPosition}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate("GroupDetail", {groupInfo: this.state.invitees})
                        }}
                     >
                        <Text style={styles.nextButtonText}>Next</Text>
                        <Ionicons name="md-arrow-forward" size={16} color='#73788B'></Ionicons>
                    </TouchableOpacity>
                </View>
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
        fontWeight: '400',
        marginRight: 10
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
        backgroundColor: '#c84ede',
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