import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,
         Text, ListItem, Thumbnail, Input, Item } from 'native-base';
import Header1 from '../GlobalStyles/Header';
import SubHeader from '../GlobalStyles/SubHeader';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';

class PrivateInviteContainer extends React.Component {

    
    state = {
        allFriends: [],
        usersFiltered: [],
        invitees: [],
        event: this.props.navigation.getParam("event", null)
    }     

    searchUser(searchText) {
        this.setState({
            usersFiltered: this.state.allFriends.filter(i =>
                           i.username.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    addToInviteList(uid) {
        this.state.invitees.push(uid);
    }

    createEvent() {
        firebaseDb
            .db
            .collection('events')
            .add({
                eventName: this.state.event.eventName,
                date: this.state.event.date,
                time: this.state.event.time,
                location: this.state.event.location,
                estimatedSize: this.state.event.estimatedSize,
                activityDetails: this.state.event.activityDetails,
                isPlanned: this.state.event.isPlanned
            }).then((docRef) => {
                const notificationRef = firebaseDb.db.collection('notification');
                const promise = []
                promise.push(firebaseDb.db.collection('events').doc(docRef.id).update({eventUID: docRef.id}))
                
                for(let uid in this.state.invitees) {
                    promise.push(notificationRef.doc(this.state.invitees[uid]).update({
                        eventInvite: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                    }))
                }

                Promise.all(promise).then(() => {this.props.navigation.navigate("EventCreate")})
            }).catch(err => console.error(err))
    }

    componentWillMount() {
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
            
            Promise.all(promise).then(() => this.setState({allFriends: allFriends}))
        })    
    }

    render() {
        return (
            <View style={{backgroundColor: '#9eddff'}}>
                <Header1 title="Event Creation"/>
                <SubHeader title="Choose Invitees - Private"/>

                <Header searchBar rounded style={{backgroundColor: '#c425e8'}}>
                    <Item>
                        <Icon name='search' />
                        <Input placeholder="Search Friend"
                               onChangeText={text => {this.searchUser(text)}}
                        />
                    </Item>
                </Header>

                <Content>
                    {this.state.usersFiltered.map((item, index) => (
                        <ListItem>
                            <Left>
                                <Thumbnail source={{uri: item.photo}} />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                <Text note>{item.email}</Text>
                                <Text note>{item.userID}</Text>
                            </Body>

                            <TouchableOpacity style={styles.addButton} 
                                onPress={() => this.addToInviteList(item.uid)}
                            >
                                <Text style={styles.addButtonText}></Text>
                            </TouchableOpacity>
                        </ListItem>
                    ))}
                </Content>
                <TouchableOpacity style={styles.addButton} 
                    onPress={() => this.createEvent()}
                >
                    <Text style={styles.addButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
         addButton: {
             width: 20,
             backgroundColor: 'rgba(0, 157, 255, 0.8)',
             alignItems: 'center',
             justifyContent: 'center',
             height: 20
         }
});

export default PrivateInviteContainer