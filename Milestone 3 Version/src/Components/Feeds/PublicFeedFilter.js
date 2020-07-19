import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, FlatList} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import firebaseDb from '../Database/firebaseDb';
import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';

export default class PublicFeedFilter extends React.Component {
    state={
        isLoading: true,
        events: [],
        keywords: ["","","","","",""],
        filtered: [],
    }

    componentDidMount() {
        
        firebaseDb.db.collection('events').get().then(querySnapshot => {
            const events = [];
    
            Promise.all(querySnapshot.docs.map(documentSnapshot => events.push(documentSnapshot.data())))
                    .then(() => this.filterPublic(events))
                    .catch(err => console.error(err));
        })
    }

    filterPublic(events) {
        const pub = events.filter(event => !event.isPrivate);
        this.setState({events: pub, filtered: pub, isLoading: false})
    }

    filterDate(text, events) {
        this.state.keywords[0] = text.toISOString().slice(0,10);
        const words = this.state.keywords;
        this.setState({
            filtered: events.filter(event => event.date.toLowerCase().includes(words[0]))
                            .filter(event => event.time.toLowerCase().includes(words[1]))
                            .filter(event => event.location.toLowerCase().includes(words[2].toLowerCase()))
                            .filter(event => event.activityDetails.toLowerCase().includes(words[3].toLowerCase()))
                            .filter(event => event.eventName.toLowerCase().includes(words[4].toLowerCase()))
                            .filter(event => event.creator.toLowerCase().includes(words[5].toLowerCase()))
        })        
    }

    filterTime(text, events) {
        const dateTime = text.toString();
        var n = dateTime.indexOf(":");
        const time = dateTime.slice(n-2,n+6);
        this.state.keywords[1] = time;
        console.log(text);
        console.log(text.toString());
        console.log(time);
        const words = this.state.keywords;
        this.setState({
            filtered: events.filter(event => event.date.toLowerCase().includes(words[0]))
                            .filter(event => event.time.toLowerCase().includes(words[1]))
                            .filter(event => event.location.toLowerCase().includes(words[2].toLowerCase()))
                            .filter(event => event.activityDetails.toLowerCase().includes(words[3].toLowerCase()))
                            .filter(event => event.eventName.toLowerCase().includes(words[4].toLowerCase()))
                            .filter(event => event.creator.toLowerCase().includes(words[5].toLowerCase()))
        })    
    }

    filterLocation(text, events) {
        this.state.keywords[2] = text;
        const words = this.state.keywords;
        this.setState({
            filtered: events.filter(event => event.date.toLowerCase().includes(words[0]))
                            .filter(event => event.time.toLowerCase().includes(words[1]))
                            .filter(event => event.location.toLowerCase().includes(words[2].toLowerCase()))
                            .filter(event => event.activityDetails.toLowerCase().includes(words[3].toLowerCase()))
                            .filter(event => event.eventName.toLowerCase().includes(words[4].toLowerCase()))
                            .filter(event => event.creator.toLowerCase().includes(words[5].toLowerCase()))
        })    
    }

    filterActivity(text, events) {
        this.state.keywords[3] = text;
        const words = this.state.keywords;
        this.setState({
            filtered: events.filter(event => event.date.toLowerCase().includes(words[0]))
                            .filter(event => event.time.toLowerCase().includes(words[1]))
                            .filter(event => event.location.toLowerCase().includes(words[2].toLowerCase()))
                            .filter(event => event.activityDetails.toLowerCase().includes(words[3].toLowerCase()))
                            .filter(event => event.eventName.toLowerCase().includes(words[4].toLowerCase()))
                            .filter(event => event.creator.toLowerCase().includes(words[5].toLowerCase()))
        })    
    }

    filterEventName(text, events) {
        this.state.keywords[4] = text;
        const words = this.state.keywords;
        this.setState({
            filtered: events.filter(event => event.date.toLowerCase().includes(words[0]))
                            .filter(event => event.time.toLowerCase().includes(words[1]))
                            .filter(event => event.location.toLowerCase().includes(words[2].toLowerCase()))
                            .filter(event => event.activityDetails.toLowerCase().includes(words[3].toLowerCase()))
                            .filter(event => event.eventName.toLowerCase().includes(words[4].toLowerCase()))
                            .filter(event => event.creator.toLowerCase().includes(words[5].toLowerCase()))
        })    
    }

    filterOrgainser(text, events) {
        this.state.keywords[5] = text;
        const words = this.state.keywords;
        this.setState({
            filtered: events.filter(event => event.date.toLowerCase().includes(words[0]))
                            .filter(event => event.time.toLowerCase().includes(words[1]))
                            .filter(event => event.location.toLowerCase().includes(words[2].toLowerCase()))
                            .filter(event => event.activityDetails.toLowerCase().includes(words[3].toLowerCase()))
                            .filter(event => event.eventName.toLowerCase().includes(words[4].toLowerCase()))
                            .filter(event => event.creator.toLowerCase().includes(words[5].toLowerCase()))
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
                                <TouchableOpacity style={{alignSelf: "flex-end"}}
                                    onPress={() => this.pressHandleRemove(event.eventUID)}>
                                    <Ionicons name="md-close" size={30}/>
                                </TouchableOpacity>
                            </View>

                            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'flex-start'}}>
                                <View style={{width: 80}}>
                                    <Text style={styles.eventDate}>{event.date}</Text>
                                    <Text style={styles.eventTime}>{event.time}</Text>
                                </View>
                                <Text style={styles.details}>{event.activityDetails}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ViewPublicEvent", {eventUID: event.eventUID})}>
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
        const { isLoading, events, filtered} = this.state
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
                    <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Public Feeds</Text>
                    </View>
                </View>
                <View style={styles.toggleTabs}>
                    <TouchableOpacity
                        style={styles.toggleButtonS}
                        onPress= {() => {this.props.navigation.navigate('Feeds')}}
                    >
                        <Text style={styles.textStyle}>My Feeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButtonS}
                        onPress= {() => {this.props.navigation.navigate('History')}}
                    >
                        <Text style={styles.textStyle}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButtonNS}>
                        <Text style={styles.textStyle}>Public Feeds</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{marginTop: 5, alignItems: "center"}}>Filter Public Event By</Text>
                <View style={styles.searchBar}>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <DatePicker
                            placeholder={"Event Start Date"}
                            style={{ marginRight: "10px"}}
                            format="YYYY-MM-DD"
                            onChange={text => {this.filterDate(text, events)}}
                        />
                        <DatePicker
                            placeholder={"Event Start Date"}
                            style={{ marginRight: "10px"}}
                            format="YYYY-MM-DD"
                            onChange={text => {this.filterDate(text, events)}}
                        />
                    </View>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TimePicker
                            placeholder={"Event Start Time"}
                            style={{ marginRight: "10px"}}
                            format="HH:mm:ss"
                            onChange={text => {this.filterTime(text, events)}}
                        />
                        <TimePicker
                            placeholder={"Event Start Time"}
                            style={{ marginRight: "10px"}}
                            format="HH:mm:ss"
                            onChange={text => {this.filterTime(text, events)}}
                        />
                    </View>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.searching}
                            placeholder="Location"
                            onChangeText={text => {this.filterLocation(text, events)}}
                        />
                    </View>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.searching}
                            placeholder="Activity"
                            onChangeText={text => {this.filterActivity(text, events)}}
                        />
                    </View>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.searching}
                            placeholder="Event Name"
                            onChangeText={text => {this.filterEventName(text, events)}}
                        />
                    </View>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.searching}
                            placeholder="Organiser"
                            onChangeText={text => {this.filterOrgainser(text, events)}}
                        />
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        style={styles.feed}
                        data={filtered}
                        renderItem={({ item }) => this.renderEvent(item)}
                        keyExtractor={item => item.eventName}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
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
    searchBar: {
        marginTop: 10,
        backgroundColor: '#f2f9ff',
        padding: 5,
        borderColor: "#BBDEFB",
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
        flexDirection: "row",
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
    feed: {
        paddingHorizontal: 16
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
        shadowOpacity: 0.6,
        borderRadius: 3,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.4)'
    },
    toggleButtonNS: {
        backgroundColor: '#64B5F6',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    textStyle: {
        fontSize: 14
    },
})