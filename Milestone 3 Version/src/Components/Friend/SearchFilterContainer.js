import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

class SearchFilterContainer extends React.Component {
    state = {
        allUsers: [],
        usersFiltered: [],
        isLoading: true,
    }

    componentWillMount() {
        this.updateUsers();
    }

    updateUsers = () => {
        const allUsers = [];

        firebaseDb.db.collection('profile').get().then(querySnapshot => {
            querySnapshot.docs.map(documentSnapshot => allUsers.push(documentSnapshot.data()))
        }).catch(err => console.error(err))
        this.setState({allUsers: allUsers, isLoading: false})
    }

    searchUser(searchText) {
        this.setState({
            usersFiltered: this.state.allUsers.filter(profile =>
                           profile.username.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    renderUser = user => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1}}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: user.photo}}
                                    />
                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.eventTitle}>{user.username}</Text>
                                    <Text style={styles.eventTime}>{user.email}</Text>
                                </View>
                                <View style={styles.buttonPos}>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress = {() => {this.props.navigation.navigate("ViewProfileAdd",
                                                          {displayName: user.username, uid: user.uid})}}
                                    >
                                        <Text style={styles.addButtonText}>View Profile</Text>
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
        const { isLoading, usersFiltered } = this.state
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
                        <Text style={styles.headerTitle}>Search User</Text>
                    </View>
                </View>

                <View style={styles.toggleTabs}>
                    <TouchableOpacity
                        style={styles.toggleButtonS}
                        onPress= {() => {this.props.navigation.navigate('FriendList')}}
                    >
                        <Text style={styles.textStyleS}>My Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButtonNS}>
                        <Text style={styles.textStyleNS}>Search User</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBar}>
                    <View style={styles.iconSearch}>
                        <Feather name="search" size={18} style={styles.searchIcon}/>
                        <TextInput
                            style={styles.searching}
                            placeholder="Search User"
                            onChangeText={text => {this.searchUser(text)}}
                        />
                    </View>
                </View>

                <ScrollView>
                    <FlatList
                        style={styles.feed}
                        data={usersFiltered}
                        renderItem={({ item }) => this.renderUser(item)}
                        keyExtractor={item => item.username}
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
        backgroundColor: '#e6fffd'
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
    toggleTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    toggleButtonS: {
        backgroundColor: '#edfcfc',
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
        backgroundColor: '#c7fffa',
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
    },
    searchBar: {
        marginTop: 5,
        backgroundColor: '#b0fff9',
        padding: 5,
        borderBottomColor: '#4dfff1',
        borderBottomWidth: 1,
        shadowOffset: {height: 1},
        shadowOpacity: 0.1,
        shadowColor: '#455A64'
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
        paddingLeft: 5,
        height: 30,
        flex: 1
    },
    feed: {
        paddingHorizontal: 16
    },
    eventItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        marginVertical: 8,
        shadowOpacity: 0.1,
        shadowOffset: {height: 2, width: 2}
    },
    avatarContainer: {
        shadowColor: '#00695C',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 35
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 35,
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
        alignItems: 'flex-end'
    },
    addButton: {
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.4,
        margin: 25,
        padding: 8,
        marginLeft: 100,
        borderRadius: 2,
        backgroundColor: '#4DB6AC',
        alignSelf: 'flex-end'
    },
    addButtonText: {
        fontSize: 12,
        fontWeight: '400'
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SearchFilterContainer;