import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import firebaseDb from '../Database/firebaseDb';
import {Thumbnail} from 'native-base';

export default function CreateProfile({navigation}) {
    
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [location, setLocation] = useState();
    const [occupation, setOccupation] = useState();
    const [interest, setInterest] = useState();
    const [edited, setEdited] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showVerticalScrollIndicator={false}>
                <View style={{alignSelf:"center"}}>
                    <View style={styles.profileImage}>
                        <Thumbnail source={{uri:"https://cdn4.iconfinder.com/data/icons/political-elections/50/46-512.png"}} style={styles.image} resizeMode="center"></Thumbnail>
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
                        //value={username}
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
                        //value={email}
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
                        //value={email}
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
                        //value={email}
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
                        //value={email}
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
                        //value={email}
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
                        onChangeText={(value) => setInterest(value)}
                        //value={email}
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
                                .doc(navigation.uid)
                                .set({
                                    username: username,
                                    email: email,
                                    gender: gender,
                                    age: Number(age),
                                    location: location,
                                    occupation: occupation,
                                    interest: interest,
                                    notLoginYet: true 
                                }).catch(err => console.error(err));
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
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
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