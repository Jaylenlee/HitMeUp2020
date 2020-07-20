import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from "react-native";
import { DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";

function SideBar(props) {
    return (
        <ScrollView>
            <ImageBackground
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRubigdhrAS1e4b6ntHV53d6BT9k3ch8E2Ej0q4FnQwudoR7jrq&usqp=CAU'}}
                style={{width: undefined, padding: 16, paddingTop: 48}}
            >
                <Image
                source={{uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb'}}
                style={styles.profile}
                />
                <Text style={styles.name}>Sasha Ho</Text>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.followers}>4571 Followers</Text>
                    <Ionicons name="md-people" size={16} color='rgba(255, 255, 255, 0.8)' />
                </View>
            </ImageBackground>

            <View style={styles.container}>
                <DrawerItemList {...props} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#FFF'
    },
    name: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 8
    },
    followers: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        marginRight: 6
    }
});

export default SideBar;