import React from 'react';
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
        uid: this.props.navigation.getParam('uid', ''),
    }

    componentDidMount() {

        // took all events// should make it personal
        firebaseDb.db.collection('events').get().then(querySnapshot => {
            const results = []
            querySnapshot.docs.map(documentSnapshot => results.push(documentSnapshot.data()))
            this.setState({isLoading: false, events: results})
        }).catch(err => console.error(err))

        //const currUser = firebaseDb.auth.currentUser;
        
        firebaseDb.db.collection('notification').doc(this.state.uid).onSnapshot(docSnapshot => {
            const info = docSnapshot.data();
            
            const friendRequests = info.friendRequest;
            const profileCollection = firebaseDb.db.collection('profile');
            const requests = [];

            for(let uid in friendRequests) {
                const docRef = profileCollection.doc(friendRequests[uid]);
                docRef.get().then(docSnapshot => {
                    requests.push(docSnapshot.data())
                    this.state.requests.push(docSnapshot.data())
                })
            }
           // this.setState({requests: requests}) // async problem // need check other component too
        })
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
            friendRequests: firebase.firestore.FieldValue.arrayRemove(uid)
        }).catch(err => console.error(err));
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
    }
})

export default NewsFeedContainer;