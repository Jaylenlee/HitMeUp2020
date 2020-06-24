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
        firebaseDb.db.collection('events').get().then(querySnapshot => {
            const results = []
            querySnapshot.docs.map(documentSnapshot => results.push(documentSnapshot.data()))
            this.setState({isLoading: false, events: results})
        }).catch(err => console.error(err))
    }

    renderEvent = event => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.eventTitle}>{event.eventName}</Text>
                            <Text style={styles.eventTime}>{event.date}</Text>
                            <Text style={styles.eventTime}>{event.time}</Text>
                        </View>
                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                </View>
                <Text style={styles.details}>{event.activityDetails}</Text>
            </View>
        );
    };

    render() {
        const { isLoading, events } = this.state
        if (isLoading)
            return <ActivityIndicator />;

        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <Ionicons name="md-arrow-back" size={24} color='#D8D9DB'></Ionicons>
                        </View>
                    </TouchableOpacity>
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
        flex: 1
    },
    header: {
        flexDirection: 'row',
        paddingTop: 64,
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
        fontWeight: '500'
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
        color: '#454D65'
    },
    eventTime: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },
    details: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    }
})

export default NewsFeedContainer;