import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

class NewsFeedContainer extends React.Component {
    state = {
        isLoading: true,
        events: null
    }

    componentDidMount() {
        this.startPage();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.startPage()
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    startPage() {
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
            
            Promise.all(promise).then(() => this.setUpState(events)/*this.setState({isLoading: false, events: events})*/)
        })
    }

    setUpState(events) {
        const sorted = events.sort(this.compareDate);
        this.setState({isLoading: false, events: sorted})
    }

    compareDate(eventA, eventB) {
        const dateA = eventA.date;
        const dateB = eventB.date;
      
        const yearA = Number(dateA.slice(0,4));
        const mthA = Number(dateA.slice(5,7));
        const dayA = Number(dateA.slice(8,10));

        const yearB = Number(dateB.slice(0,4));
        const mthB = Number(dateB.slice(5,7));
        const dayB = Number(dateB.slice(8,10));

        if (yearA == yearB) {
            if (mthA > mthB) {
                return -1;
            } else if (mthA < mthB) {
                return 1;
            } else {
                if(dayA > dayB) {
                    return -1;
                } else if (dayA < dayB) {
                    return 1;
                } else {
                    const timeA = eventA.time;
                    const timeB = eventB.time;
                   
                    const hrA = Number(timeA.slice(0,2));
                    const minA = Number(timeA.slice(3,5));
                    const secA = Number(timeA.slice(6,8));

                    const hrB = Number(timeB.slice(0,2));
                    const minB = Number(timeB.slice(3,5));
                    const secB = Number(timeB.slice(6,8));
                    
                    if (hrA == hrB) {
                        if (minA > minB) {
                            return -1;
                        } else if (minA < minB) {
                            return 1;
                        } else {
                            if(secA > secB) {
                                return -1;
                            } else if (secA < secB) {
                                return 1;
                            } else {
                                return 0;
                            };
                        }
                    } else if (hrA > hrB) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            }
        } else if (yearA > yearB) {
            return -1;
        } else {
            return 1;
        }
    }

    pressHandleRemove = (eventUID) => {
        const currUser = firebaseDb.auth.currentUser;
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        currNotification.update({
            eventOngoing: firebase.firestore.FieldValue.arrayRemove(eventUID)
        })
        currNotification.update({
            history: firebase.firestore.FieldValue.arrayUnion(eventUID)
        })
    }

    renderEvent = event => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <View style={styles.titleBar}>
                                <Text style={styles.eventTitle}>{event.eventName}</Text>
                                <View style={{flex: 1}}>
                                    <TouchableOpacity style={{alignSelf: "flex-end"}}
                                        onPress={() => this.pressHandleRemove(event.eventUID)}>
                                        <Ionicons name="md-close" size={18}/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'flex-start'}}>
                                <View style={{width: 80}}>
                                    <Text style={styles.eventDate}>{event.date}</Text>
                                    <Text style={styles.eventTime}>{event.time}</Text>
                                </View>
                                <Text style={styles.details}>{event.activityDetails}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("View", {eventUID: event.eventUID})}>
                                    <Ionicons name="ios-more" size={20} color="#607D8B" />
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
                <View style={styles.top}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Feeds</Text>
                    </View>
                </View>
                <View style={styles.toggleTabs}>
                    <TouchableOpacity style={styles.toggleButtonNS}>
                        <Text style={styles.textStyleNS}>My Feeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButtonS}
                        onPress= {() => {this.props.navigation.navigate('History')}}
                    >
                        <Text style={styles.textStyleS}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButtonS}
                        onPress= {() => {this.props.navigation.navigate('PublicFeedFilter')}}
                    >
                        <Text style={styles.textStyleS}>Public Feeds</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <FlatList
                        style={styles.feed}
                        data={events}
                        renderItem={({ item }) => this.renderEvent(item)}
                        keyExtractor={item => item.eventName}
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
    feed: {
        paddingHorizontal: 16
    },
    eventItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 8,
        shadowOpacity: 0.1,
        shadowOffset: {height: 3, width: 3},
        shadowRadius: 5
    },
    titleBar: {
        borderBottomWidth: 1,
        borderBottomColor: '#B0BEC5',
        paddingBottom: 8,
        flexDirection: "row"
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#607D8B',
        paddingBottom: 5,
        textTransform: 'uppercase'
    },
    eventDate: {
        fontSize: 12,
        color: '#0097A7',
        marginTop: 4
    },
    eventTime: {
        fontSize: 12,
        color: '#9fcffb',
        marginTop: 4
    },
    details: {
        fontSize: 14,
        color: '#455A64',
        paddingLeft: 5
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    toggleTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    toggleButtonS: {
        backgroundColor: '#BBDEFB',
        padding: 5,
        paddingHorizontal: 10,
        shadowOffset: {height: 1, width: 1},
        shadowColor: '#455A64',
        shadowOpacity: 0.2,
        borderRadius: 2,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)'
    },
    toggleButtonNS: {
        backgroundColor: '#64B5F6',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 2
    },
    textStyleS: {
        fontSize: 14
    },
    textStyleNS: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.8)'
    }
})

export default NewsFeedContainer;
