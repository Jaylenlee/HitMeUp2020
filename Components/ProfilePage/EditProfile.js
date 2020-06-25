import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, KeyboardAvoidingView,
        ScrollView, TouchableOpacity, StatusBar, FlatList, ImageBackground} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import UserPermission from '../Login/UserPermission';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile({navigation}) {

    //const {info} = navigation.getParam("info", ""),
    const [username, setUsername] = useState(navigation.getParam("info", "").username);
    const [email, setEmail] = useState(navigation.getParam("info", "").email);
    const [gender, setGender] = useState(navigation.getParam("info", "").gender);
    const [age, setAge] = useState(navigation.getParam("info", "").age);
    const [location, setLocation] = useState(navigation.getParam("info", "").location);
    const [occupation, setOccupation] = useState(navigation.getParam("info", "").occupation);
    const [interests, setInterests] = useState(navigation.getParam("info", "").interests);
    const [photo, setPhoto] = useState(navigation.getParam("info", null).photo);

    const updatePhoto = async () => {
        UserPermission.getCameraPermission()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if(!result.cancelled) {
            setPhoto(result.uri)
        }
    }
    return(
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
            <TouchableOpacity
                style={styles.backArrow}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
            </TouchableOpacity>
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
                                onPress={() => updatePhoto()}
                            >
                                   <Ionicons name="ios-add" size={28} color="#00ff55" style={styles.addIcon}></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.title}>Username</Text>
                            <TextInput
                                onChangeText={(value) => setUsername(value)}
                                value={username}
                                returnKeyType="next"
                                //onSubmitEditing={() => this.emailInput.focus()}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Email</Text>
                            <TextInput
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                                returnKeyType="next"
                                //onSubmitEditing={() => this.genderInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                //ref={(input) => this.emailInput = input}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Gender</Text>
                            <TextInput
                                onChangeText={(value) => setGender(value)}
                                value={gender}
                                returnKeyType="next"
                                //onSubmitEditing={() => this.ageInput.focus()}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                //ref={(input) => this.genderInput = input}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Age</Text>
                            <TextInput
                                onChangeText={(value) => setAge(value)}
                                value={Number(age).toString()}
                                returnKeyType="next"
                                //onSubmitEditing={() => this.locationInput.focus()}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                //ref={(input) => this.ageInput = input}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Location</Text>
                            <TextInput
                                onChangeText={(value) => setLocation(value)}
                                value={location}
                                returnKeyType="next"
                                //onSubmitEditing={() => this.occupationInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                //ref={(input) => this.locationInput = input}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Occupation</Text>
                            <TextInput
                                onChangeText={(value) => setOccupation(value)}
                                value={occupation}
                                returnKeyType="next"
                                //onSubmitEditing={() => this.interestInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.input}
                                //ref={(input) => this.occupationInput = input}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.title}>Interests/Hobbies</Text>
                            <TextInput
                                multiline
                                onChangeText={(value) => setInterests(value)}
                                value={interests}
                                returnKeyType="next"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style = {styles.inputLast}
                                //ref={(input) => this.interestInput = input}
                            />
                        </View>

                        <TouchableOpacity style = {styles.buttonContainer}
                             onPress={() => {
                                    firebaseDb.db
                                    .collection('profile')
                                    .doc(navigation.getParam("info").uid)
                                    .update({
                                        username: username,
                                        email: email,
                                        gender: gender,
                                        age: Number(age),
                                        location: location,
                                        occupation: occupation,
                                        interests: interests,
                                        photo: photo
                                    }).catch(err => console.error(err))
                                    firebaseDb
                                    .auth.currentUser.updateProfile({displayName: username})
                                    navigation.navigate("Profile");
                            }}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>        
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C3C5CD",
    },
    backArrow: {
        padding: 10
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
    inputLast: {
        height: 75,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginBottom: 15,
        color: "black",
        paddingHorizontal: 10,
        padding: 8,
        width: 300,
        borderRadius: 5
    },
    buttonContainer: {
        backgroundColor: '#73788B',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        width: 200,
    }
});