import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FlatListComponent from './FlatListComponent';

class PrivateInviteContainer extends React.Component {
    state = {
        allFriends: [],
        friendsFiltered: [],
        invitees: [],
        event: this.props.navigation.getParam("event", null),
        isLoading: true,
        hasCreated: false,
    }

    addToInviteList(uid) {
        this.state.invitees.push(uid);
    }

    removeFromInviteList(uid) {
        const idx = this.state.invitees.indexOf(uid);
        this.state.invitees.splice(idx, 1);
    }

    createEvent() {
        this.setState({isLoading: true});
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        const username = user.displayName;
        firebaseDb
            .db
            .collection('events')
            .add({
                eventName: this.state.event.eventName,
                eventDuration: this.state.event.eventDuration,
                date: this.state.event.date,
                time: this.state.event.time,
                location: this.state.event.location,
                estimatedSize: this.state.event.estimatedSize,
                activityDetails: this.state.event.activityDetails,
                isPrivate: this.state.event.isPrivate,
                creator: username,
                creatorUID: uid,
                invitees: this.state.invitees,
                attendees: [uid],
                nonAttendees: [],
            }).then((docRef) => {
                const notificationRef = firebaseDb.db.collection('notification');
                const promise = []
                promise.push(firebaseDb.db.collection('events').doc(docRef.id).update({eventUID: docRef.id}))
                promise.push(notificationRef.doc(uid).update({
                    eventOngoing: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                }))
                for(let uid in this.state.invitees) {
                    promise.push(notificationRef.doc(this.state.invitees[uid]).update({
                        eventInvite: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                    }))
                }
                Promise.all(promise).then(() => {this.setState({isLoading: false, hasCreated: true}); this.props.navigation.navigate("EventCreate")})
            }).catch(err => console.error(err))    
    }

    componentWillMount() {
        this.updateFriends();
    }
    
    componentWillUnmount() {
        if(this.state.hasCreated) {
            alert("Event has been created and sent to invitees.");
        }
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

    renderFriend = friend => {
        return(
            <FlatListComponent friend={friend} 
            invite={() => this.addToInviteList(friend.uid)} 
            remove={() => this.removeFromInviteList(friend.uid)}/>
        )
    };
   
    render() {
        const { isLoading, friendsFiltered } = this.state
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
                        <Text style={styles.headerTitle}>Private Invite</Text>
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
                        keyExtractor={item => item.username}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>

                <View style={styles.buttonPosition}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.createEvent();
                        }}
                     >
                        <Text style={styles.nextButtonText}>Done</Text>
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
        backgroundColor: '#FFEBEE'
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
    toggleTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    toggleButtonS: {
        backgroundColor: '#edfcfc',
        padding: 5,
        paddingHorizontal: 10,
        shadowOffset: {height: 1, width: 1},
        shadowColor: '#455A64',
        shadowOpacity: 0.6,
        borderRadius: 3,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)'
    },
    toggleButtonNS: {
        backgroundColor: '#c7f2f0',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    textStyle: {
        fontSize: 14
    },
    searchBar: {
        marginTop: 5,
        backgroundColor: '#80CBC4',
        padding: 5
    },
    iconSearch: {
        backgroundColor: '#FFF',
        borderRightWidth: 1,
        borderRightColor: '#00695C',
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
        borderRightWidth: 1,
        borderRightColor: '#00695C',
        paddingLeft: 5,
        height: 30,
        flex: 1
    },
    feed: {
        paddingHorizontal: 16
    },
    eventItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        marginVertical: 8,
        shadowOpacity: 0.1,
        shadowOffset: {height: 2, width: 2}
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
        alignItems: 'flex-end'
    },
    addButton: {
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.4,
        margin: 25,
        padding: 8,
        marginLeft: 100,
        borderRadius: 2,
        backgroundColor: '#DC5699',
        alignSelf: 'flex-end'
    },
    addButton2: {
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.4,
        margin: 25,
        padding: 8,
        marginLeft: 100,
        borderRadius: 2,
        backgroundColor: '#56DC9F',
        alignSelf: 'flex-end'
    },
    addButtonText: {
        fontSize: 12,
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
        padding: 10,
        backgroundColor: '#DF476C',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.3,
        margin: 10
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 10
    },
    searchBar: {
        marginTop: 5,
        backgroundColor: '#DF476C',
        padding: 5
    },
    iconSearch: {
        backgroundColor: '#FFF',
        borderRightWidth: 1,
        borderRightColor: '#00695C',
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
        borderRightWidth: 1,
        borderRightColor: '#00695C',
        paddingLeft: 5,
        height: 30,
        flex: 1
    },
})

export default PrivateInviteContainer;
