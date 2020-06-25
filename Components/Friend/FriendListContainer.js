import React from 'react';
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
                const docRef = profileCollection.doc(info.friendlist[uid] /*this.state.allFriendsUID[uid]*/);
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
