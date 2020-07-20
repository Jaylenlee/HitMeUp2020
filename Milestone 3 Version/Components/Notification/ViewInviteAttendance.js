import React from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Dimensions,TouchableOpacity, FlatList } from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Ionicons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';

export default class ViewInviteAttendance extends React.Component{

    state = {
        isLoading: true,
        data: null,
        chartConfig: null,
        eventUID: this.props.navigation.getParam("eventUID", ""),
        attendees: null,
        nonAttendees: null,
        invitees: null,
    }

    componentDidMount() {
        firebaseDb.db.collection("events").doc(this.state.eventUID).onSnapshot(docSnapshot => {
             // to do nothing after event document deleted
             if(!docSnapshot.exists) {
                return;
            }
            
            const chartConfig = {
                backgroundColor: "black",
                backgroundGradientFrom: "grey",
                backgroundGradientTo: "white",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity) => "white",
                labelColor: (opacity) => "white",
                style: {
                  //borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "white"
                }
            }

            const info = docSnapshot.data();
            const promise = [];
            const attendeesUID = info.attendees;
            const nonAttendeesUID = info.nonAttendees;
            const inviteesUID = info.invitees;

            const data = [
                {
                name: "Accepted",
                population: info.attendees.length,
                color: "green",
                legendFontColor: "green",
                legendFontSize: 15
                },
                {
                name: "Rejected",
                population: info.nonAttendees.length,
                color: "red",
                legendFontColor: "red",
                legendFontSize: 15
                },
                {
                name: "Pending",
                population: info.invitees.length,
                color: "blue",
                legendFontColor: "blue",
                legendFontSize: 15
                },
            ];

            const profileRef = firebaseDb.db.collection("profile");
            const attendees = [];
            const nonAttendees = [];
            const invitees = [];
            
            for(let uid in attendeesUID) {
                const docRef = profileRef.doc(attendeesUID[uid]);
                promise.push(docRef.get().then(docSnapshot => {
                    attendees.push(docSnapshot.data().username)
                }))
            }

            for(let uid in nonAttendeesUID) {
                const docRef = profileRef.doc(nonAttendeesUID[uid]);
                promise.push(docRef.get().then(docSnapshot => {
                    nonAttendees.push(docSnapshot.data().username)
                }))
            }

            for(let uid in inviteesUID) {
                const docRef = profileRef.doc(inviteesUID[uid]);
                promise.push(docRef.get().then(docSnapshot => {
                    invitees.push(docSnapshot.data().username)
                }))
            }
        
            Promise.all(promise).then(() => {this.setState({isLoading: false, data: data, chartConfig: chartConfig, attendees: attendees, nonAttendees: nonAttendees, invitees: invitees})})
            
        })
    }

    renderEvent = (item) => {
        return(
            <Text>{item}</Text>
        )
    } 

    getUsernames = (profileRef, uid) => {
        var value = [];
        const promise = [];     
        profileRef.doc(arr[uid]).onSnapshot(docSnapshot => {
            promise.push(value.push(docSnapshot.data().username)) 
        })         
                
        console.log(value)
        return namelist;
    }

    getNameArray = async (profileRef, arr) => {
        return Promise.all(arr.map(uid => this.getUsernames(profileRef, uid)))
    }

    render() {
        const { isLoading, attendees, nonAttendees, invitees, data, chartConfig} = this.state
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
        return(
            <ScrollView>
                <TouchableOpacity
                        style={styles.backArrow}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                </TouchableOpacity>
                <View>
                    <View style={styles.pieChart}>
                        <PieChart
                        data={data}
                        width={Dimensions.get("window").width}
                        height={220}
                        chartConfig= {chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                   </View> 
                </View>
                <View style={styles.list}>
                    <View>
                        <Text> Attending </Text>
                        <FlatList
                        style={styles.feed}
                        data={attendees}
                        renderItem={({ item }) => this.renderEvent(item)}
                        keyExtractor={item => item.eventName}
                        showsVerticalScrollIndicator={false}
                        /> 
                    </View>
                    <View>
                        <Text> Not Attending </Text>
                        <FlatList
                        style={styles.feed}
                        data={nonAttendees}
                        renderItem={({ item }) => this.renderEvent(item)}
                        keyExtractor={item => item.eventName}
                        showsVerticalScrollIndicator={false}
                        /> 
                    </View>
                    <View>
                        <Text> Pending </Text>
                        <FlatList
                        style={styles.feed}
                        data={invitees}
                        renderItem={({ item }) => this.renderEvent(item)}
                        keyExtractor={item => item.eventName}
                        showsVerticalScrollIndicator={false}
                        /> 
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    pieChart: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArrow: {
        padding: 10
    },
    feed: {
        paddingHorizontal: 16,
        flexDirection: "column",
    },
    list: {
        flexDirection: "row",
    },
})