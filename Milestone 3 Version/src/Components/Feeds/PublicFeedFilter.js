import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, FlatList} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import firebaseDb from '../Database/firebaseDb';
import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';

export default class PublicFeedFilter extends React.Component {
    state = {
        isLoading: true,
        events: [],
        keywords: ["","","",""],
        startDate:[0,0,0],
        endDate:[9999,13,32],
        startTime:[-1,-1,-1],
        endTime:[24,61,61],
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

    setFilter() {
        const {events, keywords, startDate, endDate, startTime, endTime} = this.state;

        this.setState({
            filtered: events.filter(event => event.location.toLowerCase().includes(keywords[0].toLowerCase()))
                            .filter(event => event.activityDetails.toLowerCase().includes(keywords[1].toLowerCase()))
                            .filter(event => event.eventName.toLowerCase().includes(keywords[2].toLowerCase()))
                            .filter(event => event.creator.toLowerCase().includes(keywords[3].toLowerCase()))
                            .filter(event => this.compareStartDate(event.date, startDate))
                            .filter(event => this.compareEndDate(event.date, endDate))
                            .filter(event => this.compareStartTime(event.time, startTime))
                            .filter(event => this.compareEndTime(event.time, endTime))
                            
        })  
    }

    filterDate(startDate, isStart) {
        console.log(startDate);

        if(startDate != null) {
            const date = startDate.toISOString().slice(0,10);
            const dateArr = [Number(date.slice(0,4)), Number(date.slice(5,7)), Number(date.slice(8,10))];
    
            if(isStart) {
                this.state.startDate[0] = dateArr[0];
                this.state.startDate[1] = dateArr[1];
                this.state.startDate[2] = dateArr[2];
            } else {
                this.state.endDate[0] = dateArr[0];
                this.state.endDate[1] = dateArr[1];
                this.state.endDate[2] = dateArr[2];
            }
        } else {
            if(isStart) {
                this.state.startDate[0] = 0;
                this.state.startDate[1] = 0;
                this.state.startDate[2] = 0;
            } else {
                this.state.endDate[0] = 9999;
                this.state.endDate[1] = 13;
                this.state.endDate[2] = 32;
            }
        } 
        this.setFilter();
    }

    //return true if date is greater than dateArr. ie event happens after dateArr.
    compareStartDate(date, dateArr) {
        const year = Number(date.slice(0,4));
        const mth = Number(date.slice(5,7));
        const day = Number(date.slice(8,10));

        if (year == dateArr[0]) {
            if (mth > dateArr[1]) {
                return true;
            } else if (mth < dateArr[1]) {
                return false;
            } else {
                return day >= dateArr[2];
            }
        } else if (year > dateArr[0]) {
            return true;
        } else {
            return false;
        }
    }

    //return true if date is lesser than dateArr. ie event happens before dateArr.
    compareEndDate(date, dateArr) {
        const year = Number(date.slice(0,4));
        const mth = Number(date.slice(5,7));
        const day = Number(date.slice(8,10));
        
        if (year == dateArr[0]) {
            if (mth < dateArr[1]) {
                return true;
            } else if (mth > dateArr[1]) {
                return false;
            } else {
                return day <= dateArr[2];
            }
        } else if (year < dateArr[0]) {
            return true;
        } else {
            return false;
        }
    }

    filterTime(timeText, isStart) {
        if(timeText != null) {
            const dateTime = timeText.toString();
            var n = dateTime.indexOf(":");
            const time = dateTime.slice(n-2,n+6);
            const timeArr = [Number(time.slice(0,2)), Number(time.slice(3,5)), Number(time.slice(6,8))];
          
            if (isStart) {
                this.state.startTime[0] = timeArr[0];
                this.state.startTime[1] = timeArr[1];
                this.state.startTime[2] = timeArr[2];
            } else {
                this.state.endTime[0] = timeArr[0];
                this.state.endTime[1] = timeArr[1];
                this.state.endTime[2] = timeArr[2];
            }
        } else {
            if (isStart) {
                this.state.startTime[0] = -1;
                this.state.startTime[1] = -1;
                this.state.startTime[2] = -1;
            } else {
                this.state.endTime[0] = 24;
                this.state.endTime[1] = 61;
                this.state.endTime[2] = 61;
            }
        }  
        this.setFilter();
    }

    //return true if time is greater than timeArr. ie event happens after timeArr.
    compareStartTime(time, timeArr) {
        const hr = Number(time.slice(0,2));
        const min = Number(time.slice(3,5));
        const sec = Number(time.slice(6,8));
        
        if (hr == timeArr[0]) {
            if (min > timeArr[1]) {
                return true;
            } else if (min < timeArr[1]) {
                return false;
            } else {
                return sec >= timeArr[2];
            }
        } else if (hr > timeArr[0]) {
            return true;
        } else {
            return false;
        }
    }

    //return true if time is lesser than timeArr. ie event happens before timeArr.
    compareEndTime(time, timeArr) {
        const hr = Number(time.slice(0,2));
        const min = Number(time.slice(3,5));
        const sec = Number(time.slice(6,8));
        
        if (hr == timeArr[0]) {
            if (min < timeArr[1]) {
                return true;
            } else if (min > timeArr[1]) {
                return false;
            } else {
                return sec <= timeArr[2];
            }
        } else if (hr < timeArr[0]) {
            return true;
        } else {
            return false;
        }
    }

    filterLocation(text) {
        this.state.keywords[0] = text;
        this.setFilter();    
    }

    filterActivity(text) {
        this.state.keywords[1] = text;
        this.setFilter();   
    }

    filterEventName(text) {
        this.state.keywords[2] = text;
        this.setFilter(); 
    }

    filterOrgainser(text) {
        this.state.keywords[3] = text;
        this.setFilter();   
    }

    renderEvent = event => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <View style={styles.titleBar}>
                                <Text style={styles.eventTitle}>{event.eventName}</Text>
                                <View style={{ flex: 1 }}>
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ViewPublicEvent", {eventUID: event.eventUID})}>
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
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Public Feeds</Text>
                    </View>
                </View>
                <View style={styles.toggleTabs}>
                    <TouchableOpacity
                        style={styles.toggleButtonS}
                        onPress= {() => {this.props.navigation.navigate('Feeds')}}
                    >
                        <Text style={styles.textStyleS}>My Feeds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButtonS}
                        onPress= {() => {this.props.navigation.navigate('History')}}
                    >
                        <Text style={styles.textStyleS}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButtonNS}>
                        <Text style={styles.textStyleNS}>Public Feeds</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider}>
                    <Text style={{ fontSize: 14, paddingLeft: 5 }}>Filter public events by:</Text>
                </View>

                <View style={{height: 100, marginTop: 10, marginBottom: 2, marginHorizontal: 5, borderColor: "#BBDEFB", paddingTop: 2,
                              borderRadius: 3, borderWidth: 2, shadowOffset: {height: 2, width: 2}, shadowOpacity: 0.1}}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.searches}>
                            <View style={styles.iconSearch}>
                                <Feather name="search" size={16} style={styles.searchIcon}/>
                                <DatePicker
                                    placeholder={"Event Start Date"}
                                    style={{ marginRight: "10px"}}
                                    format="YYYY-MM-DD"
                                    onChange={text => {this.filterDate(text, true)}}
                                />
                                <DatePicker
                                    placeholder={"Event End Date"}
                                    style={{ marginRight: "10px"}}
                                    format="YYYY-MM-DD"
                                    onChange={text => {this.filterDate(text, false)}}
                                />
                            </View>
                            <View style={styles.iconSearch}>
                                <Feather name="search" size={16} style={styles.searchIcon}/>
                                <TimePicker
                                    placeholder={"Event Start Time"}
                                    style={{ marginRight: "10px"}}
                                    format="HH:mm:ss"
                                    onChange={text => {this.filterTime(text, true)}}
                                />
                                <TimePicker
                                    placeholder={"Event End Time"}
                                    style={{ marginRight: "10px"}}
                                    format="HH:mm:ss"
                                    onChange={text => {this.filterTime(text, false)}}
                                />
                            </View>
                            <View style={styles.iconSearch}>
                                <Feather name="search" size={16} style={styles.searchIcon}/>
                                <TextInput
                                    style={styles.searching}
                                    placeholder="Location"
                                    onChangeText={text => {this.filterLocation(text)}}
                                />
                            </View>
                            <View style={styles.iconSearch}>
                                <Feather name="search" size={16} style={styles.searchIcon}/>
                                <TextInput
                                    style={styles.searching}
                                    placeholder="Activity"
                                    onChangeText={text => {this.filterActivity(text)}}
                                />
                            </View>
                            <View style={styles.iconSearch}>
                                <Feather name="search" size={16} style={styles.searchIcon}/>
                                <TextInput
                                    style={styles.searching}
                                    placeholder="Event Name"
                                    onChangeText={text => {this.filterEventName(text)}}
                                />
                            </View>
                            <View style={styles.iconSearch}>
                                <Feather name="search" size={16} style={styles.searchIcon}/>
                                <TextInput
                                    style={styles.searching}
                                    placeholder="Organiser"
                                    onChangeText={text => {this.filterOrgainser(text)}}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={{flex: 1, marginVertical: 10, marginHorizontal: 8,
                              borderTopColor: '#42A5F5', paddingTop: 5, borderTopWidth: 1}}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <FlatList
                            style={styles.feed}
                            data={filtered}
                            renderItem={({ item }) => this.renderEvent(item)}
                            keyExtractor={item => item.eventName}
                            showsVerticalScrollIndicator={false}
                        />
                    </ScrollView>
                </View>
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
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#42A5F5',
        paddingVertical: 10,
        marginHorizontal: 8
    },
    searches: {
        backgroundColor: '#f2f9ff'
    },
    iconSearch: {
        backgroundColor: '#FFF',
        height: 30,
        flexDirection: 'row'
    },
    searchIcon: {
        padding: 5,
        marginLeft: 5
    },
    searching: {
        fontSize: 14,
        borderRadius: 15,
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
        paddingLeft: 5
    },
    feed: {
        paddingHorizontal: 8
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