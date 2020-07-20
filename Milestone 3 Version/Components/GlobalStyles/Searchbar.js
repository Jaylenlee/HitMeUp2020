import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Searchbar = (props) => {
    const state = {
        searchBarFocused: true
    }

    return (
        <View style={styles.inputContainer}>
            <View style={{paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', flex: 1}}>
                <View style={styles.input}>
                    <Icon
                        name="ios-search"
                        style={{fontSize: 18}}
                    />
                    <TextInput
                        style={{fontSize: 20, marginLeft: 12, flex: 1}}
                        placeHolder= "Search"
                        onChangeText={(addFriend) => props.textChange(addFriend)}
                        value={props.addFriend}
                    />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={props.addNewFriend}>
                    <Text style={styles.addButtonText}>Find</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
         inputContainer: {
             flexDirection: 'row',
             justifyContent: 'space-between',
             shadowOffset: { width: 0, height: 3 },
             shadowColor: '#171717',
             shadowOpacity: 0.1,
             height: 50,
             backgroundColor: '#c425e8',
             alignItems: 'center'
         },
         input: {
             backgroundColor: 'white',
             height: 35,
             flex: 1,
             padding: 5,
             flexDirection: 'row',
             alignItems: 'center'
         },
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

export default Searchbar;