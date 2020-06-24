import React from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, Image,
         ScrollView, TouchableOpacity, AsyncStorage, StatusBar, ImageBackground } from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import {Thumbnail} from 'native-base';


export default class Profile extends React.Component {
    state = {
        uid: this.props.navigation.getParam("uid",""),
        username: this.props.navigation.getParam("displayName",""),
        email:"",
        gender: "",
        age: "",
        location: "",
        occupation: "",
        interests: "",
        photo: "",
    }

    componentDidMount() {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        this.setState({uid: uid})
        firebaseDb.db.collection('profile').doc(uid).onSnapshot(docSnapshot => {
            const info = docSnapshot.data()
            this.setState({
                username: info.username,
                email: info.email,
                gender: info.gender,
                age: info.age,
                location: info.location,
                occupation: info.occupation,
                interests: info.interests,
                photo: info.photo
            })
        })
    }

    handleSignOutUser = () => {
        firebaseDb.auth.signOut();
    }

    render(){
        const pressHandle = () => {
            this.props.navigation.navigate('EditProfile', {info: this.state});
        }

        const {username, email, gender, age, location, occupation, interests, photo} = this.state;//.profile;
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

                        <View style={styles.logoutS}>
                            <TouchableOpacity
                                onPress={this.handleSignOutUser}
                            >
                                <Text style={styles.logoutText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                        

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style = {styles.buttonContainer}
                                onPress={pressHandle}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
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
/*import React from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, AsyncStorage, StatusBar} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
//import {withNavigation} from 'react-navigation';
import firebaseDb from '../Database/firebaseDb';
import {Thumbnail} from 'native-base';


export default class Profile extends React.Component {
    
    state = {
        uid: this.props.navigation.getParam("uid",""),
        username: this.props.navigation.getParam("displayName",""),
        email:"",
        gender: "",
        age: "",
        location: "",
        occupation: "",
        interests: "",
        photo: "",
    }

    componentDidMount() {
        const user = firebaseDb.auth.currentUser;
        const uid = user.uid;
        this.setState({uid: uid})
        firebaseDb.db.collection('profile').doc(uid).onSnapshot(docSnapshot => {
            const info = docSnapshot.data()
            this.setState({
                username: info.username,
                email: info.email,
                gender: info.gender,
                age: info.age,
                location: info.location,
                occupation: info.occupation,
                interests: info.interests,
                photo: info.photo
            })
        })
    }

    render(){

        const pressHandle = () => {
            this.props.navigation.navigate('EditProfile', {info: this.state});
        }

        const {username, email, gender, age, location, occupation, interests, photo} = this.state;//.profile;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView showVerticalScrollIndicator={false}>
                    <View style={styles.title}>
                    <Ionicons name="ios-arrow-back" size={24} color="black"></Ionicons>
                    <Ionicons name="md-more" size={24} color="black"></Ionicons>
                    </View>
                    <View style={{alignSelf:"center"}}>
    
                        <View style={styles.profileImage}>
                            <Thumbnail source={{uri: photo}}
                             style={styles.image} resizeMode="center">
                             </Thumbnail>
                        </View>
    
                        <View style={styles.dm}>
                            <TouchableOpacity>
                                <MaterialIcons name="chat" size={18} color="grey"></MaterialIcons>
                            </TouchableOpacity>
                        </View>
    
                        <View style={styles.active}></View>           
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, {color: "black", fontWeight: "600", fontSize: 24}]}> Username: {username} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Gender: {gender} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Location: {location} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Occupation: {occupation} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Interests/Hobbies: {interests} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> Age: {age} </Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style = {styles.buttonContainer}
                                onPress={pressHandle}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.buttonContainer}
                                onPress={() => this.props.navigation.navigate("HomeScreen")}
                            >
                                <Text style={styles.buttonText}>Change</Text>
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
        backgroundColor: "#b3ffda",
        alignItems: "center",
        justifyContent: "center"
    },

    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: "#FFF",
        paddingHorizontal: 10
    },

    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },

    title: {
        marginTop: 24,
        marginHorizontal: 16,
        justifyContent: "space-between",
        flexDirection: "row"
    },

    text: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '700',
        //fontFamily: "HelveticaNeue"
    },

    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow:"hidden"
    },

    dm: {
        backgroundColor: "white",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },

    active: {
        backgroundColor: "#00ff55",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },

    add: {
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent:"center"
    },

    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },

    buttonContainer: {
        //paddingTop: 20,
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginTop: 10,
    },

    buttonsContainer: {
        paddingTop: 100,
      
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        width: 200,
    }
})
*/