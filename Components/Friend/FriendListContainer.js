import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

class FriendListContainer extends React.Component {
    state = {
        allFriends: [],
        allFriendsUID: [],
        friendsFiltered: [],
        isLoading: true,
    }

    componentWillMount() {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        firebaseDb.db.collection('friendlist').doc(uid).onSnapshot(docSnapshot => {
            const allFriends = [];
            const info = docSnapshot.data()
            this.setState({
                allFriendsUID: info.friendlist,
            })

            const profileCollection = firebaseDb.db.collection('profile');

            for(let uid in info.friendlist) {
                const docRef = profileCollection.doc(info.friendlist[uid] );
                docRef.get().then(docSnapshot => {
                    allFriends.push(docSnapshot.data())
                })
            }

            this.setState({allFriends: allFriends, isLoading: false})
        })
    }

    updateFriends = () => {
        const allFriends = [];
        firebaseDb.db.collection('profile').get().then(querySnapshot => {
            querySnapshot.docs.map(documentSnapshot => allFriends.push(documentSnapshot.data()))
            console.log(allFriends)
        }).catch(err => console.error(err))
        this.setState({allFriends: allFriends})
    }

    searchFriend(searchText) {
        this.setState({
            friendsFiltered: this.state.allFriends.filter(profile =>
                           profile.username.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    renderFriend = friend => {
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>
                            <Image
                                style={{height: 50, width: 50}}
                                source={{uri: friend.photo}}
                            />
                            <Text style={styles.eventTitle}>{friend.username}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                <View>
                                    <Text style={styles.eventTime}>{friend.email}</Text>
                                </View>

                                <TouchableOpacity style={styles.addButton}
                                    onPress = {() => {this.props.navigation.navigate("ViewProfileDelete",
                                                      {displayName: profile.username, uid: profile.uid})}}
                                >
                                    <Text style={styles.addButtonText}>View</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { isLoading, friendsFiltered, allFriends } = this.state
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
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.navigate("HomeScreen")}>
                            <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Friend</Text>
                        <TouchableOpacity
                            style={styles.refreshStyle}
                            onPress= {() => {this.updateFriends()}}
                        >
                            <Feather name="refresh-cw" size={22} color='#73788B'/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.toggleTabs}>
                        <TouchableOpacity style={styles.toggleButtonS}>
                            <Text style={styles.textStyle}>My Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.toggleButtonNS}
                            onPress= {() => {this.props.navigation.navigate("SearchFriend")}}
                        >
                            <Text style={styles.textStyle}>Search User</Text>
                        </TouchableOpacity>
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
                </View>

                <ScrollView>
                    <FlatList
                        style={styles.feed}
                        data={friendsFiltered}
                        renderItem={({ item }) => this.renderFriend(item)}
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
        backgroundColor: '#B2DFDB'
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
    toggleTabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    toggleButtonS: {
        backgroundColor: '#c7f2f0',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 3
    },
    toggleButtonNS: {
        backgroundColor: '#edfcfc',
        padding: 5,
        paddingHorizontal: 10,
        borderBottomColor: '#00695C',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRadius: 3
    },
    textStyle: {
        fontSize: 14
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
    eventTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#03396c',
        paddingBottom: 5
    },
    eventTime: {
        fontSize: 11,
        color: '#9fcffb',
        marginTop: 4
    },
    details: {
        fontSize: 14,
        color: '#6497b1',
        paddingLeft: 15
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default FriendListContainer;

/*import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,
         Text, ListItem, Thumbnail, Input, Item } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation';
import firebaseDb from '../Database/firebaseDb';

class FriendListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            allFriends: [],
            allFriendsUID: [],
            friendsFiltered: [],
        }
    }

    searchFriend(searchText) {
        this.setState({
            friendsFiltered: this.state.allFriends.filter(profile =>
                           profile.username.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    updateFriends = () => {
        const allFriends = [];
    
        firebaseDb.db.collection('profile').get().then(querySnapshot => {
            querySnapshot.docs.map(documentSnapshot => allFriends.push(documentSnapshot.data()))
            console.log(allFriends)
        }).catch(err => console.error(err))
        
        this.setState({allFriends: allFriends})
    }

    componentWillMount() {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        firebaseDb.db.collection('friendlist').doc(uid).onSnapshot(docSnapshot => {
            const allFriends = [];
            const info = docSnapshot.data()
            this.setState({
                allFriendsUID: info.friendlist,
            })
           
            const profileCollection = firebaseDb.db.collection('profile');

            for(let uid in info.friendlist) {
                const docRef = profileCollection.doc(info.friendlist[uid]);
                docRef.get().then(docSnapshot => {
                    allFriends.push(docSnapshot.data())
                })
            }
            
            this.setState({allFriends: allFriends})
        })    
    }

    render() {
        return(
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name='search' />
                        <Input placeholder="Search Friend"
                               onChangeText={text => {this.searchFriend(text)}}
                        />
                    </Item>
                </Header>
                <Content>
                    {this.state.friendsFiltered.map((profile, index) => (
                        <ListItem>
                            <Left>
                                <Thumbnail source={{uri: profile.photo}} />
                            </Left>
                            <Body>
                                <Text>{profile.username}</Text>
                                <Text note>{profile.email}</Text>
                            </Body>
                            <TouchableOpacity style={styles.addButton}
                                onPress = {() => {this.props.navigation.navigate("ViewProfileDelete", {displayName: profile.username, uid: profile.uid})}}
                            >
                                <Text style={styles.addButtonText}>View</Text>
                            </TouchableOpacity>
                        </ListItem>
                    ))}

                    <TouchableOpacity
                        onPress= {() => {this.updateFriends()}}
                    >
                        <Text>Refresh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress= {() => {this.props.navigation.navigate("SearchFriend")}}
                    >
                        <Text>Search User</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
         addButton: {
             width: 100,
             backgroundColor: '#cccefc',
             alignItems: 'center',
             justifyContent: 'center',
             height: 35
         },
         addButtonText: {
             color: 'black',
             fontSize: 18,
             fontWeight: '700'
         }
});

export default withNavigation(FriendListContainer);
*/