import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import { Header, Item, Icon, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

class NewsFeedContainer extends React.Component {
    state = {
        isLoading: true,
        events: null
    }

    componentDidMount() {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        firebaseDb.db.collection('notification').doc(uid).onSnapshot(docSnapshot => {
            const events = [];
            const promise = [];
            const info = docSnapshot.data().eventOngoing;

            const eventCollection = firebaseDb.db.collection('events');

            for(let eventUID in info) {
                const docRef = eventCollection.doc(info[eventUID]);
                promise.push(docRef.get().then(docSnapshot => {
                    events.push(docSnapshot.data())
                }))
            }

            Promise.all(promise).then(() => this.setState({isLoading: false, events: events}))
        })
    }

    renderEvent = event => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <Text style={styles.eventTitle}>{event.eventName}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                <View>
                                    <Text style={styles.eventTime}>{event.date}</Text>
                                    <Text style={styles.eventTime}>{event.time}</Text>
                                </View>
                                <Text style={styles.details}>{event.activityDetails}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("View", {eventUID: event.eventUID})}>
                                    <Ionicons name="ios-more" size={24} color="#73788B" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { isLoading, events } = this.state
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}>
                    <Ionicons name="md-arrow-back" size={24} color='#D8D9DB'></Ionicons>
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feeds</Text>
                </View>

                <FlatList
                    style={styles.feed}
                    data={events}
                    renderItem={({ item }) => this.renderEvent(item)}
                    keyExtractor={item => item.eventName}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBECF4',
        shadowColor: '#454D65',
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
    textStyle: {
        padding: 10
    },
    feed: {
        marginHorizontal: 16
    },
    eventItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },
    eventTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#454D65',
        paddingBottom: 5
    },
    eventTime: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },
    details: {
        fontSize: 14,
        color: '#838899',
        paddingLeft: 10
    },
    
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default NewsFeedContainer;


/*import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import Header1 from '../GlobalStyles/Header';
import { Header, Item, Icon, Input } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

class NewsFeedContainer extends React.Component {
    state = {
        isLoading: true,
        events: null,
        requests: [],
        uid: "",//this.props.navigation.getParam('uid', ''),
    }

    componentDidMount() {

        // took all events// should make it personal
        firebaseDb.db.collection('events').get().then(querySnapshot => {
            const results = []
            querySnapshot.docs.map(documentSnapshot => results.push(documentSnapshot.data()))
            this.setState({isLoading: false, events: results})
        }).catch(err => console.error(err))

        const currUser = firebaseDb.auth.currentUser;
        this.setState({uid: currUser.uid})

        firebaseDb.db.collection('notification').doc(currUser.uid).onSnapshot(docSnapshot => {
            const info = docSnapshot.data();
            
            const friendRequests = info.friendRequest;
            const profileCollection = firebaseDb.db.collection('profile');
            const requests = [];
            console.log(friendRequests)
            for(let uid in friendRequests) {
                console.log(friendRequests[uid])
                const docRef = profileCollection.doc(friendRequests[uid]);
                docRef.get().then(docSnapshot => {
                    console.log(docSnapshot.data())
                    requests.push(docSnapshot.data())
                    this.state.requests.push(docSnapshot.data())
                    console.log(this.state.requests)
                })
                
            }
           // this.setState({requests: requests}) // async problem // need check other component too
        })
    }
    handleSignOutUser = () => {
        firebaseDb.auth.signOut();
    }

    handleAccept = (uid) => {
        const currUser = firebaseDb.auth.currentUser;
        var currFriendlist = firebaseDb.db.collection('friendlist').doc(currUser.uid);
        currFriendlist.update({
            friendlist: firebase.firestore.FieldValue.arrayUnion(uid)
        }).catch(err => console.error(err));

        var currFriendlist2 = firebaseDb.db.collection('friendlist').doc(uid);
        currFriendlist2.update({
            friendlist: firebase.firestore.FieldValue.arrayUnion(currUser.uid)
        }).catch(err => console.error(err));

        this.handleReject(uid);
    }

    handleReject = (uid) => {
        const currUser = firebaseDb.auth.currentUser;
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        currNotification.update({
            friendRequest: firebase.firestore.FieldValue.arrayRemove(uid)
        }).catch(err => console.error(err));

        for(let index in this.state.requests) {
            if(this.state.requests[index] == uid) {
                this.state.requests.splice(index, 1);
            }
        }
    }

    render() {
        const {isLoading, events, requests, uid} = this.state
        if (isLoading) {
            return( 
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
        return(
            <View>
                <Header1 title="News Feed" />
                <Header searchBar rounded style={{backgroundColor: '#c425e8'}}>
                    <Item>
                        <Icon name='search' />
                        <Input placeholder="Search Event"
                        />
                    </Item>
                    <TouchableOpacity onPress={() => this.handleSignOutUser()} style={styles.signOut}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </Header>
                <FlatList
                    data={requests}
                    renderItem={({ item }) => {
                   
                        return (
                            <View style={styles.itemContainer}>
                                <Text style={styles.textStyle}>{"Userame: " + item.username}</Text>
                                <TouchableOpacity onPress={() => {this.handleAccept(item.uid)}}>
                                    <Text>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.handleReject(item.uid)}}>
                                    <Text>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate("ViewProfile", {displayName: item.username, uid: item.uid})}}>
                                    <Text>View</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    keyExtractor={item => item.username}
                />
                
                <FlatList
                    data={events}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.itemContainer}>
                                <Text style={styles.textStyle}>{"Event Name: " + item.eventName}</Text>
                                <Text style={styles.textStyle}>{"Date: " + item.date}</Text>
                                <Text style={styles.textStyle}>{"Time: " + item.time}</Text>
                                <Text style={styles.textStyle}>{"Location: " + item.location}</Text>
                                <Text style={styles.textStyle}>{"Estimated Size: " + item.estimatedSize}</Text>
                                <Text style={styles.textStyle}>{"Activity Details: " + item.activityDetails}</Text>
                                <Text style={styles.textStyle}>{"Activity Planned?: " + item.isPlanned}</Text>
                            </View>
                        );
                    }}
                    keyExtractor={item => item.eventName}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingTop: 10
    },
    textStyle: {
        padding: 10
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    signOut: {
        borderBottomWidth: 18,
    }
})

export default NewsFeedContainer;*/