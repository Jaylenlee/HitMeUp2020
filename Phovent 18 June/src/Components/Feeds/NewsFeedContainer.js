import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import Header1 from '../GlobalStyles/Header';
import { Header, Item, Icon, Input } from 'native-base';

class NewsFeedContainer extends React.Component {
    state = {
        isLoading: true,
        users: null
    }

    componentDidMount() {
        firebaseDb.db.collection('events').get().then(querySnapshot => {
            const results = []
            querySnapshot.docs.map(documentSnapshot => results.push(documentSnapshot.data()))
            this.setState({isLoading: false, events: results})
        }).catch(err => console.error(err))
    }

    render() {
        const {isLoading, events } = this.state
        if (isLoading) {
            return( 
                <View style = {styles.loading}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text>Loading</Text>
                </View>
            );
        }
        return(
            <View>
                <Header1 title="News Feed" />
                <Header searchBar rounded style={{backgroundColor: '#c425e8'}}>
                    <Item>
                        <Icon name='search' />
                        <Input placeholder="Search Event"
                        />
                    </Item>
                </Header>
                <FlatList
                    data={events}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.itemContainer}>
                                <Text style={styles.textStyle}>{"Event Name: " + item.eventName}</Text>
                                <Text style={styles.textStyle}>{"Date: " + item.date}</Text>
                                <Text style={styles.textStyle}>{"Time: " + item.time}</Text>
                                <Text style={styles.textStyle}>{"Location: " + item.location}</Text>
                                <Text style={styles.textStyle}>{"Estimated Size: " + item.estimatedSize}</Text>
                                <Text style={styles.textStyle}>{"Activity Details: " + item.activityDetails}</Text>
                                <Text style={styles.textStyle}>{"Activity Planned?: " + item.isPlanned}</Text>
                            </View>
                        );
                    }}
                    keyExtractor={item => item.eventName}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingTop: 10
    },
    textStyle: {
        padding: 10
    },

    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default NewsFeedContainer;