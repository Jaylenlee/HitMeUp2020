import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet,
         TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import UserPermission from '../Login/UserPermission';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from "@expo/vector-icons";
import * as firebase from 'firebase';

class GroupDetail extends React.Component {
    state = {
        members: this.props.navigation.getParam("groupInfo", null),
        groupName: '',
        photo: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png',
        isLoading: true
    }

    updatePhoto = async () => {
        UserPermission.getCameraPermission()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if(!result.cancelled) {
            this.setState({ photo: result.uri })
        }
    }

    setGroupName = (name) => this.setState({ groupName: name });

    createChat() {
        this.setState({isLoading: true});
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        const people = this.state.members;
        people.push(uid);
        firebaseDb
            .db
            .collection('messages')
            .add({
                chat: [],
                groupName: this.state.groupName, //change this
                users: people,
                groupPic: this.state.photo, // change this
            }).then((docRef) => {
                const friendRef = firebaseDb.db.collection('friendlist');
                const promise = [];
                const obj = {
                    chatUID: docRef.id,
                    groupName: this.state.groupName,
                    users: people,
                    groupPic: this.state.photo //change this
                }

                promise.push(friendRef.doc(uid).update({
                    chatUID: firebase.firestore.FieldValue.arrayUnion(obj)
                }))
                for(let uid in this.state.members) {
                    promise.push(friendRef.doc(this.state.members[uid]).update({
                        chatUID: firebase.firestore.FieldValue.arrayUnion(obj)
                    }))
                }
                Promise.all(promise).then(() => {this.props.navigation.navigate("ChatList"), this.setState({ isLoading: false })})
            }).catch(err => console.error(err))
            console.log(this.state.members)
    }

    render() {
        const { groupName, photo } = this.state
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Group Detail</Text>
                    </View>
                </View>

                <View style={{marginTop: 24, alignSelf:"center"}}>
                    <View style={styles.avatarContainer}>
                        <Image
                           source={photo? {uri: photo} :
                                  {uri: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png'}}
                           style={styles.profileImage}
                        />
                    </View>
                    <View style={{alignItems: 'flex-end', marginTop: -30}}>
                        <TouchableOpacity style={styles.photoPlaceholder}
                            onPress={() => this.updatePhoto()}
                        >
                               <Ionicons name="ios-add" size={28} color="#00ff55" style={styles.addIcon}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.info}>
                        <Text style={styles.title}>Group Name</Text>
                        <TextInput
                            onChangeText={(value) => this.setGroupName(value)}
                            value={groupName}
                            returnKeyType="go"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style = {styles.input}
                        />
                    </View>
                </View>

                <View style={styles.buttonPosition}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            if (this.state.members.length && this.state.groupName.length) {
                                this.createChat();
                            } else {
                                alert("Please add friends into the group & give your group a name.")
                            }
                        }}
                     >
                        <Text style={styles.nextButtonText}>Create</Text>
                        <Ionicons name="md-arrow-forward" size={16} color='#73788B'></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEBEE'
    },
    backArrow: {
        flex: 1,
        alignSelf: 'flex-start'
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
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 30,
        shadowOpacity: 0.4,
        borderRadius: 68,
    },
    profileImage: {
        width: 136,
        height: 136,
        borderRadius: 68,
    },
    photoPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#73788B'
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        margin: 32,
        width: 300
    },
    info: {
        alignItems: 'flex-start',
        flex: 1,
    },
    title: {
        color: '#4F566D',
        fontSize: 14,
        fontWeight: '300',
        marginBottom: 5
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginBottom: 15,
        color: "black",
        paddingHorizontal: 10,
        width: 300,
        borderRadius: 5
    },
    buttonPosition: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    button: {
        flexDirection: 'row',
        margin: 25,
        padding: 10,
        backgroundColor: '#DC5699',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.3
    },
    nextButtonText: {
        fontSize: 14,
        fontWeight: '400',
        marginRight: 10
    }
})

export default GroupDetail;