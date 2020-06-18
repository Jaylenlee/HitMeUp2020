
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Header from '../GlobalStyles/Header';
import Searchbar from '../GlobalStyles/Searchbar';
import FriendItem from '../GlobalStyles/FriendItem';
import {withNavigation} from 'react-navigation';

class FriendList extends React.Component {
    constructor() {
        super();
        this.state = {
            addFriend: '',
            friends: []
        }
    }

    addNewFriend() {
        let friends = this.state.friends;
        friends.unshift({
            id: friends.length,
            title: this.state.addFriend,
            follow: false
        });
        this.setState({
            friends,
            addFriend: ''
        });
    }

    toggleFollow(item) {
        let friends = this.state.friends;
        friends = friends.map((friend) => {
            if (friend.id == item.id) {
                friend.follow = !friend.follow;
            }
            return friend;
        })
        this.setState({friends});
    }

    removeFriend(item) {
        let friends = this.state.friends;
        friends = friends.filter((friend) => friend.id !== item.id);
        this.setState({friends});
    }

    render() {
        return (
            <View>
                <Header title="Friend List" />
                <Searchbar
                    addNewFriend={() => this.addNewFriend()}
                    textChange={addFriend => this.setState({ addFriend })}
                    addFriend={this.state.addFriend}
                />
                <FlatList
                    data={this.state.friends}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <FriendItem
                                friendItem={item}
                                toggleFollow={() => this.toggleFollow(item)}
                                removeFriend={() => this.removeFriend(item)}
                            />
                        )
                    }}
                />
            </View>
        );
    }
}

export default withNavigation(FriendList);