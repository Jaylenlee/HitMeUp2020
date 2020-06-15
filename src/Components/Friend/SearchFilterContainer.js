import React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,
         Text, ListItem, Thumbnail, Input, Item } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation';

let helperArray = require('./SampleUserList.json');

class SearchFilterContainer extends React.Component {
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
                            <TouchableOpacity style={styles.addButton}
                                onPress = {() => {this.props.navigation.navigate("Profile")}}
                            >
                                <Text style={styles.addButtonText}>View</Text>
                            </TouchableOpacity>
                        </ListItem>
                    ))}
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