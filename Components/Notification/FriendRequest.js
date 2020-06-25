import React from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';

export default class FriendRequest extends React.Component {
    
    state = {
        isLoading: true,
        requests: [],
    }

    componentDidMount() {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        firebaseDb.db.collection('notification').doc(uid).onSnapshot(docSnapshot => {
            const info = docSnapshot.data().friendRequest
            this.getProfileArray(info)
        })
    }

    getProfileArray = async (info) => {
        const profileCollection = firebaseDb.db.collection('profile');
        const requests = []
        const promise = []
        for(let requestUID in info) {
            const docRef = profileCollection.doc(info[requestUID]);
            promise.push(
                docRef.get().then(docSnapshot => {
                    requests.push(docSnapshot.data())
                })
            )
        }

        Promise.all(promise).then(() => this.setState({isLoading: false, requests: requests}))
    }

    renderRequest = profile => {
        console.log(profile.uid)
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <Text style={styles.eventTitle}>{profile.username}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                <View>
                                    <Text style={styles.eventTime}>{profile.age}</Text>
                                    <Text style={styles.eventTime}>{profile.gender}</Text>
                                </View>
                                <Text style={styles.details}>{profile.interests}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableOpacity onPress={() => 
                                    this.props.navigation.navigate('ViewProfileRequest',{uid: profile.uid})} >
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
        const { isLoading, requests } = this.state
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
                    <Text style={styles.headerTitle}>Requests</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendRequest')}>
                    <Text>FriendRequest</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EventInvite')}>
                    <Text>Event Invites</Text>
                </TouchableOpacity>
                <FlatList
                    style={styles.feed}
                    data={requests}
                    renderItem={({ item }) => this.renderRequest(item)}
                    keyExtractor={item => item.username}
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
