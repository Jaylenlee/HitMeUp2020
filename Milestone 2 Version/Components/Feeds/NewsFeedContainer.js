import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
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
                            <View style={styles.titleBar}>
                                <Text style={styles.eventTitle}>{event.eventName}</Text>
                            </View>

                            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'flex-start'}}>
                                <View style={{width: 80}}>
                                    <Text style={styles.eventDate}>{event.date}</Text>
                                    <Text style={styles.eventTime}>{event.time}</Text>
                                </View>
                                <Text style={styles.details}>{event.activityDetails}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("View", {eventUID: event.eventUID})}>
                                    <Ionicons name="ios-more" size={24} color="#607D8B" />
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
        padding: 11
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
        paddingBottom: 8
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
        paddingLeft: 20
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default NewsFeedContainer;
