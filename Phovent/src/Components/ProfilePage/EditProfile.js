import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

export default function EditProfile({navigation}) {
    const changeInfo = navigation.getParam('changeInfo', () => {});
    
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [location, setLocation] = useState();
    const [occupation, setOccupation] = useState();
    const [interest, setInterest] = useState();

    const update = {
        username: username,
        email: email,
        gender:gender,
        age:age,
        location:location,
        occupation: occupation,
        interest: interest
    }

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

    //handleUpdateUsername = (value) => setUsername(value);
    //handleUpdateEmail = (value) => email = value;
    //handleUpdateGender = (value) => gender = value;
    //handleUpdateAge = (value) => age = value;
    //handleUpdateLocation = (value) => location = value;
    //handleUpdateOccupation = (value) => occupation = value;
    //handleUpdateInterests = (value) => interests = value;
     
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showVerticalScrollIndicator={false}>
                <View style={styles.title}>
                    <Ionicons name="ios-arrow-back" size={24} color="black"></Ionicons>
                    <Ionicons name="md-more" size={24} color="black"></Ionicons>
                </View>
                <View style={{alignSelf:"center"}}>
                    <View style={styles.profileImage}>
                        <Image source={{uri:'https://www.google.com/search?q=sky+images&rlz=1C1CHBF_enSG837SG837&tbm=isch&source=iu&ictx=1&fir=5YqFrWgGGC4RDM%253A%252CpZ56kUO_51Z65M%252C_&vet=1&usg=AI4_-kRdvDi_vkc5DH5Zcd9Ei8NOFIn3kw&sa=X&sqi=2&ved=2ahUKEwiOv_upl_npAhUmGbkGHaZIB5kQ9QEwAHoECAoQMA#imgrc=5YqFrWgGGC4RDM:'}/*require("../../pic/pic.jpg")*/} style={styles.image} resizeMode="center"></Image>
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
                        placeholderTextColor = "rgba(255,255,255,0.7)"
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
                        placeholderTextColor = "rgba(255,255,255,0.7)"
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
                        placeholderTextColor = "rgba(255,255,255,0.7)"
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
                        placeholderTextColor = "rgba(255,255,255,0.7)"
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
                        placeholderTextColor = "rgba(255,255,255,0.7)"
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
                        placeholderTextColor = "rgba(255,255,255,0.7)"
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
                        placeholderTextColor = "rgba(255,255,255,0.7)"
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
                            changeInfo({update});
                            navigation.navigate('Profile');
                        }}
                        /*ref={(input) => this.signUp = input}*/>
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
        fontFamily: "HelveticaNeue  "
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
        marginTop: 16,
        backgroundColor: "black"
    },

    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})
