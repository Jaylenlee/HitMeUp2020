import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import {Thumbnail} from 'native-base';

export default function EditProfile({navigation}) {
    
    //const {info} = navigation.getParam("info", ""),
    const [username, setUsername] = useState(navigation.getParam("info", "").username);
    const [email, setEmail] = useState(navigation.getParam("info", "").email);
    const [gender, setGender] = useState(navigation.getParam("info", "").gender);
    const [age, setAge] = useState(navigation.getParam("info", "").age);
    const [location, setLocation] = useState(navigation.getParam("info", "").location);
    const [occupation, setOccupation] = useState(navigation.getParam("info", "").occupation);
    const [interests, setInterests] = useState(navigation.getParam("info", "").interests);
    const [photo, setPhoto] = useState(navigation.getParam("info", "").photo);

    /*handleUpdateProfile = () => {
        firebaseDb.db
        .collection('profile')
        .add({
            username: username,
            email: email,
            gender: gender,
            age: age,
            location: location,
            occupation: occupation,
            interest: interest
        }).catch(err => console.error(err))
    }*/    
    
    /*const[info, setInfo] = useState[(
        {placeholder: 'Username', keyboardType: 'default', multiline: false},
        {placeholder: 'Email', keyboardType: 'email-adress', multiline: false},
        {placeholder: 'Gender', keyboardType: 'default', multiline: false},
        {placeholder: 'Age', keyboardType: 'numeric', multiline: false},
        {placeholder: 'Location', keyboardType: 'default', multiline: true},
        {placeholder: 'Occupation', keyboardType: 'default', multiline: false},
        {placeholder: 'Interests/Hobbies', keyboardType: 'default', multiline: true}
    )]

    <FlatList
        data = {info}
        renderItem={({item}) => (
            <TextInput
                placeholder="Username"  
                //onChangeText={this.handleUpdateUsername}
                //value={username}
                placeholderTextColor = "rgba(255,255,255,0.7)"
                returnKeyType="next"
                //onSubmitEditing={() => this.emailInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style = {styles.input}
            />
        )}
    />*/
     
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showVerticalScrollIndicator={false}>
                <View style={styles.title}>
                    <Ionicons name="ios-arrow-back" size={24} color="black"></Ionicons>
                    <Ionicons name="md-more" size={24} color="black"></Ionicons>
                </View>
                <View style={{alignSelf:"center"}}>
                    <View style={styles.profileImage}>
                        <Thumbnail source={{uri: photo}} style={styles.image} resizeMode="center"></Thumbnail>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <TouchableOpacity>
                               <Ionicons name="ios-add" size={48} color="#00ff55" style={{marginTop: 6, marginLeft:2}}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <TextInput
                        placeholder="Username"  
                        onChangeText={(value) => setUsername(value)}
                        value={username}
                        placeholderTextColor = "rgba(0,0,0,0.9)"
                        returnKeyType="next"
                        //onSubmitEditing={() => this.emailInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                    />
                    <TextInput
                        placeholder="Email"
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        placeholderTextColor = "rgba(0, 0, 0,0.9)"
                        returnKeyType="next"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                        //ref={(input) => this.emailInput = input}
                    />
                    <TextInput
                        placeholder="Gender"
                        onChangeText={(value) => setGender(value)}
                        value={gender}
                        placeholderTextColor = "rgba(0,0,0,0.9)"
                        returnKeyType="next"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        //keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                        //ref={(input) => this.emailInput = input}
                    />
                    <TextInput
                        placeholder="Age"
                        onChangeText={(value) => setAge(value)}
                        value={Number(age).toString()}
                        placeholderTextColor = "rgba(0,0,0,0.9)"
                        returnKeyType="next"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                        //ref={(input) => this.emailInput = input}
                    />
                    <TextInput
                        placeholder="Location"
                        multiline
                        onChangeText={(value) => setLocation(value)}
                        value={location}
                        placeholderTextColor = "rgba(0,0,0,0.9)"
                        returnKeyType="next"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                        //ref={(input) => this.emailInput = input}
                    />
                    <TextInput
                        placeholder="Occupation"
                        onChangeText={(value) => setOccupation(value)}
                        value={occupation}
                        placeholderTextColor = "rgba(0,0,0,0.9)"
                        returnKeyType="next"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                        //ref={(input) => this.emailInput = input}
                    />
                    <TextInput
                        placeholder="Interests/Hobbies"
                        multiline
                        onChangeText={(value) => setInterests(value)}
                        value={interests}
                        placeholderTextColor = "rgba(0,0,0,0.9)"
                        returnKeyType="next"
                        //onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style = {styles.input}
                        //ref={(input) => this.emailInput = input}
                    />
                    
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

                                navigation.navigate("Profile");
                        }}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>      
        </SafeAreaView>
    )
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
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginBottom: 10,
        color: "black",
        paddingHorizontal: 10,
        width: 300,
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
        fontFamily: "HelveticaNeue  ",
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
        //flexDirection: "row",
        //flex: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
        //backgroundColor: "black"
    },

    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        width: 300,
    }
})
