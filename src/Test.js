import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import firebaseDb from '../firebaseDb';

class UserListContainer extends React.Component {
    state = {
        isLoading: true,
        users: null
    }

    componentDidMount() {
        firebaseDb.firestore().collection('users').get().then(querySnapshot => {
            const results = []
            querySnapshot.docs.map(documentSnapshot => results.push(documentSnapshot.data()))
            this.setState({isLoading: false, users: results})
        }).catch(err => console.error(err))
    }

    render() {
        const {isLoading, users } = this.state
        if (isLoading)
            return <ActivityIndicator />
        return(
            <FlatList
                data={users}
                renderItem={({ item }) => {
                    return (
                        <View styles={styles.itemContainer}>
                            <Text>{item.name}</Text>
                            <Text>{item.email}</Text>
                        </View>
                    );
                }}
                keyExtractor={item => item.email}
            />
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 20
    }
})

export default UserListContainer;