import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

class GroupChat extends React.Component {
    state = {
        allFriends: [],
        friendsFiltered: ["naruto"],
        invitees: [],
        isLoading: true
    }

    searchFriend(searchText) {
        this.setState({
            friendsFiltered: this.state.allFriends.filter(profile =>
                           profile.username.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    createChat = () => {
        return;
    }

    renderFriend = friend => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1}}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png'}}
                                    />
                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.eventTitle}>naruto</Text>
                                    <Text style={styles.eventTime}>naruto@gmail.com</Text>
                                </View>
                                <View style={styles.buttonPos}>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                    >
                                        <Text style={styles.addButtonText}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { isLoading, friendsFiltered } = this.state;
        /*
        if (isLoading) {
            return(
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
        */
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Group Message</Text>
                    </View>
                </View>
                <View style={styles.searchBar}>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.searching}
                            placeholder="Search Friend"
                            onChangeText={text => {this.searchFriend(text)}}
                        />
                    </View>
                </View>

                <ScrollView>
                    <FlatList
                        style={styles.feed}
                        data={friendsFiltered}
                        renderItem={({ item }) => this.renderFriend(item)}
                        keyExtractor={item => item}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>

                <View style={styles.buttonPosition}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.createChat();
                        }}
                     >
                        <Text style={styles.nextButtonText}>Done</Text>
                        <Ionicons name="md-arrow-forward" size={16} color='#73788B'></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEBEE'
    },
    backArrow: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    refreshStyle: {
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
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: '#EBECF4',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        position: 'absolute'
    },
    searchBar: {
        marginTop: 5,
        backgroundColor: '#80CBC4',
        padding: 5
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
    feed: {
        paddingHorizontal: 10
    },
    eventItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 8,
        shadowOpacity: 0.1,
        shadowOffset: {height: 2, width: 2}
    },
    avatarContainer: {
        shadowColor: '#00695C',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 20,
        marginLeft: 15
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#004D40',
        paddingBottom: 5
    },
    eventTime: {
        fontSize: 12,
        color: '#26A69A',
        fontWeight: '400',
        marginTop: 4
    },
    details: {
        paddingLeft: 40
    },
    buttonPos: {
        flex: 1,
        alignItems: 'flex-end',
        marginLeft: 110
    },
    addButton: {
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.4,
        margin: 25,
        padding: 8,
        borderRadius: 2,
        width: 60,
        backgroundColor: '#DC5699',
        alignItems: 'center'
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: '400'
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonPosition: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    button: {
        flexDirection: 'row',
        margin: 25,
        padding: 10,
        backgroundColor: '#DC5699',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.3
    },
    nextButtonText: {
        fontSize: 14,
        fontWeight: '400',
        marginRight: 10
    },
    searchBar: {
        marginTop: 5,
        backgroundColor: '#DF476C',
        padding: 5
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
})

export default GroupChat;