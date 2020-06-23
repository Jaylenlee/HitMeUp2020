import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,
         Text, ListItem, Thumbnail, Input, Item } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation';
import firebaseDb from '../Database/firebaseDb';

class SearchFilterContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            allUsers: [],
            usersFiltered: [],
        }
    }

    searchUser(searchText) {
        this.setState({
            usersFiltered: this.state.allUsers.filter(profile =>
                           profile.username.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    updateUsers = () => {
        const allUsers = [];
    
        firebaseDb.db.collection('profile').get().then(querySnapshot => {
            querySnapshot.docs.map(documentSnapshot => allUsers.push(documentSnapshot.data()))
            console.log(allUsers)
        }).catch(err => console.error(err))
        
        this.setState({allUsers: allUsers})
    }

    componentWillMount() {
        const allUsers = [];
    
        firebaseDb.db.collection('profile').get().then(querySnapshot => {
            querySnapshot.docs.map(documentSnapshot => allUsers.push(documentSnapshot.data()))
        }).catch(err => console.error(err))

        this.setState({allUsers: allUsers})
    }

    render() {
        return(
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name='search' />
                        <Input placeholder="Search User"
                               onChangeText={text => {this.searchUser(text)}}
                        />
                    </Item>
                </Header>
                <Content>
                    {this.state.usersFiltered.map((profile, index) => (
                        <ListItem>
                            <Left>
                                <Thumbnail source={{uri: profile.photo}} />
                            </Left>
                            <Body>
                                <Text>{profile.username}</Text>
                                <Text note>{profile.email}</Text>
                            </Body>
                            <TouchableOpacity style={styles.addButton}
                                onPress = {() => {this.props.navigation.navigate("ViewProfile", {displayName: profile.username, uid: profile.uid})}}
                            >
                                <Text style={styles.addButtonText}>View</Text>
                            </TouchableOpacity>
                        </ListItem>
                    ))}

                    <TouchableOpacity
                        onPress= {() => {this.updateUsers()}}
                    >
                        <Text>Refresh</Text>
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

export default withNavigation(SearchFilterContainer);