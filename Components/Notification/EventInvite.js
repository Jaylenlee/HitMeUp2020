import React from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';

export default class EventInvite extends React.Component {
    
    state = {
        isLoading: true,
        invites: [],
    }

    componentDidMount() {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        firebaseDb.db.collection('notification').doc(uid).onSnapshot(docSnapshot => {
            const invites = [];
            const promise = [];
            const info = docSnapshot.data().eventInvite;
            const eventCollection = firebaseDb.db.collection('events');

            for(let eventUID in info) {
                const docRef = eventCollection.doc(info[eventUID]);
                promise.push(
                    docRef.get().then(docSnapshot => {
                        invites.push(docSnapshot.data())
                    })
                )
            }
            Promise.all(promise).then(() => this.setState({isLoading: false, invites: invites}))
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ViewEventInvite", {eventUID: event.eventUID})}>
                                    <Ionicons name="ios-more" size={24} color="#73788B" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render(){
        const { isLoading, invites } = this.state
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
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Invites</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendRequest')}>
                    <Text>FriendRequest</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EventInvite')}>
                    <Text>Event Invites</Text>
                </TouchableOpacity>
                <FlatList
                    style={styles.feed}
                    data={invites}
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
