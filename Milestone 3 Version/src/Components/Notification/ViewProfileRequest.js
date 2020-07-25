import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image,
         ScrollView, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import * as firebase from 'firebase';

export default class ViewProfileRequest extends React.Component {
    state = {
        username: this.props.navigation.getParam("displayName",""),
        email:"",
        gender: "",
        age: "",
        location: "",
        occupation: "",
        interests: "",
        photo: "",
        viewingUID: this.props.navigation.getParam("uid",""),
    }

    componentDidMount() {
        firebaseDb.db.collection('profile').doc(this.state.viewingUID).onSnapshot(docSnapshot => {
            const info = docSnapshot.data()
            this.setState({
                username: info.username,
                email: info.email,
                gender: info.gender,
                age: info.age,
                location: info.location,
                occupation: info.occupation,
                interests: info.interests,
                photo: info.photo,
            })
        })
    }

    pressHandleAccept = () => {
        const currUser = firebaseDb.auth.currentUser;
        var friendlist = firebaseDb.db.collection('friendlist')
        
        var promise1 = friendlist.doc(currUser.uid).update({
            friendlist: firebase.firestore.FieldValue.arrayUnion(this.state.viewingUID)
        }).catch(err => console.error(err));

        var promise2 = friendlist.doc(this.state.viewingUID).update({
            friendlist: firebase.firestore.FieldValue.arrayUnion(currUser.uid)
        }).catch(err => console.error(err));

        var promise3 = firebaseDb.db.collection('notification').doc(currUser.uid).update({
            friendRequest: firebase.firestore.FieldValue.arrayRemove(this.state.viewingUID)
        })
        
        Promise.all([promise1, promise2, promise3]).then(() => this.props.navigation.goBack()).catch(err => console.error(err));
        console.log("accept")
        alert("You have accepted the friend request")
    }



    pressHandleReject = () => {
        console.log("reject")
        const currUser = firebaseDb.auth.currentUser;
        var currNotification = firebaseDb.db.collection('notification').doc(currUser.uid);
        currNotification.update({
            friendRequest: firebase.firestore.FieldValue.arrayRemove(this.state.viewingUID)
        }).then(() => this.props.navigation.goBack()).catch(err => console.error(err));
        alert("You have rejected the friend request")
    }

    render(){

        const {username, email, gender, age, location, occupation, interests, photo} = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <TouchableOpacity
                        style={styles.backArrow}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                    </TouchableOpacity>

                    <View style={{marginTop: 24, alignItems: 'center'}}>
                        <View style={styles.avatarContainer}>
                            <Image
                               source={photo? {uri: photo} :
                                      {uri: 'https://f0.pngfuel.com/png/981/645/default-profile-picture-png-clip-art.png'}}
                               style={styles.profileImage}
                            />
                        </View>

                        <Text style={styles.userStyle}>{username}</Text>

                        <View style={styles.infoContainer}>
                            <View style={styles.info}>
                                <Text style={styles.title}>Gender</Text>
                                <Text style={styles.text}>{gender}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Location</Text>
                                <Text style={styles.text}>{location}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Occupation</Text>
                                <Text style={styles.text}>{occupation}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Age</Text>
                                <Text style={styles.text}>{age}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Interests/Hobbies</Text>
                            <Text style={styles.text}>{interests}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => this.pressHandleAccept()}
                            >
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                        

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style = {styles.buttonContainer}
                                onPress={() => this.pressHandleReject()}
                            >
                                <Text style={styles.buttonText}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backArrow: {
        padding: 10
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 30,
        shadowOpacity: 0.4,
        borderRadius: 68
    },
    profileImage: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    userStyle: {
        marginTop : 24,
        fontSize: 16,
        fontWeight: '600',
    },
    infoContainer: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between',
        margin: 32
    },
    info: {
        alignItems: 'center',
        flex: 1,
    },
    title: {
        color: '#C3C5CD',
        fontSize: 14,
        fontWeight: '500'
    },
    text: {
        marginTop: 4,
        color: '#4F566D',
        fontSize: 18,
        fontWeight: '300'
    },
    logoutS: {
        marginTop: 50,
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#129cff'
    },
    buttonContainer: {
        backgroundColor: '#73788B',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10
    },
    buttonsContainer: {
        paddingTop: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        width: 200,
    }
})