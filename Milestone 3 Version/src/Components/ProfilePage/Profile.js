import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image,
         ScrollView, TouchableOpacity, FlatList } from 'react-native';
import firebaseDb from '../Database/firebaseDb';
import { Ionicons, Feather } from '@expo/vector-icons';

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
        media: ["https://i.ytimg.com/vi/ruxB29F5hZY/maxresdefault.jpg",
                "https://cache.desktopnexus.com/thumbseg/498/498008-bigthumbnail.jpg",
                "https://wallpaperaccess.com/full/24243.jpg"]
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

    renderMedia = media => {
        return (
            <View style={styles.mediaImageContainer}>
                <Image
                    source={media}
                    style={styles.image}
                    resizeMode="cover">
                </Image>
            </View>
        );
    };

    render(){
        const pressHandle = () => {
            this.props.navigation.navigate('EditProfile', {info: this.state});
        }
        const {username, email, gender, age, location, occupation, interests, photo} = this.state;//.profile;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={{marginTop: 24, marginBottom: 16, alignItems: 'center'}}>
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
                            <View style={{alignItems: 'center', flex: 1, borderColor: '#DFD8C8',
                                          borderLeftWidth: 1, borderRightWidth: 1, paddingHorizontal: 20}}>
                                <Text style={styles.title}>Occupation</Text>
                                <Text style={styles.text}>{occupation}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Age</Text>
                                <Text style={styles.text}>{age}</Text>
                            </View>
                        </View>

                        <View style={styles.infoB}>
                            <Text style={styles.title}>Location</Text>
                            <Text style={styles.text}>{location}</Text>
                        </View>

                        <View style={styles.infoB}>
                            <Text style={styles.title}>Interests/Hobbies</Text>
                            <Text style={styles.text}>{interests}</Text>
                        </View>

                        <View style={{ marginTop: 52, width: 350 }}>
                            <FlatList
                                style={styles.feed}
                                data={this.state.media}
                                renderItem={({ item }) => this.renderMedia(item)}
                                keyExtractor={item => item.eventName}
                                horizontal={true}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                            />

                            <TouchableOpacity
                                style={styles.mediaCount}
                                onPress={()=>{/*Upload photo*/}}
                            >
                                <Text style={styles.addMedia}>Upload</Text>
                                <Feather name="upload" size={16} color={"#FFF"}/>
                            </TouchableOpacity>
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
                                <Text style={styles.buttonText}>Edit Profile</Text>
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
        fontSize: 36,
        fontWeight: '200',
    },
    infoContainer: {
        flexDirection: 'row',
        width: 300,
        marginHorizontal: 32,
        marginBottom: 10,
        marginTop: 16
    },
    info: {
        alignItems: 'center',
        flex: 1
    },
    infoB: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        marginHorizontal: 24,
        marginVertical: 10
    },
    title: {
        color: '#C3C5CD',
        fontSize: 14,
        fontWeight: '400',
        textTransform: 'uppercase'
    },
    text: {
        marginTop: 4,
        color: '#4F566D',
        fontSize: 18,
        fontWeight: '300'
    },
    logoutS: {
        marginTop: 36,
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
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: 'absolute',
        top: '10%',
        marginTop: -50,
        marginLeft: 20,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.38)',
        shadowOffset: { height: 5, width: 5 },
        shadowRadius: 7,
        shadowOpacity: 1
    },
    addMedia: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '200'
    }
})
