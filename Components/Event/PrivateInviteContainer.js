import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,
         Text, ListItem, Thumbnail, Input, Item } from 'native-base';
import Header1 from '../GlobalStyles/Header';
import SubHeader from '../GlobalStyles/SubHeader';

class PrivateInviteContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            allUsers: helperArray,
            usersFiltered: helperArray
        }
    }

    searchUser(searchText) {
        this.setState({
            usersFiltered: this.state.allUsers.filter(i =>
                           i.name.toLowerCase().includes(searchText.toLowerCase()))
        })
    }

    render() {
        return (
            <View style={{backgroundColor: '#9eddff'}}>
                <Header1 title="Event Creation"/>
                <SubHeader title="Choose Invitees - Private"/>

                <Header searchBar rounded style={{backgroundColor: '#c425e8'}}>
                    <Item>
                        <Icon name='search' />
                        <Input placeholder="Search Friend"
                               onChangeText={text => {this.searchUser(text)}}
                        />
                    </Item>
                </Header>

                <Content>
                    {this.state.usersFiltered.map((item, index) => (
                        <ListItem>
                            <Left>
                                <Thumbnail source={{uri: item.photo}} />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                                <Text note>{item.email}</Text>
                                <Text note>{item.userID}</Text>
                            </Body>

                            <TouchableOpacity style={styles.addButton} >
                                <Text style={styles.addButtonText}></Text>
                            </TouchableOpacity>
                        </ListItem>
                    ))}
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
         addButton: {
             width: 20,
             backgroundColor: 'rgba(0, 157, 255, 0.8)',
             alignItems: 'center',
             justifyContent: 'center',
             height: 20
         }
});

export default PrivateInviteContainer