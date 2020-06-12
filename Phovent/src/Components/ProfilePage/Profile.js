import React from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Image, ScrollView, TouchableOpacity, AsyncStorage, StatusBar} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {withNavigation} from 'react-navigation';
//import EditProfile from './EditProfile';
//import Navigation from '../Route/Navigation';
//import Login from '../Login/Login';

class Profile extends React.Component {
    
    state = {
        username: "Phovent",
        email:"phovent@gmail.com",
        gender: "Male",
        age: "22",
        location: "Singapore West",
        occupation: "Student",
        interest: "Not Coding",
    }

    render(){

        changeInfo = (info) => this.setState({info}); ///??????

        /*this.props.navagation.getParam("update", state) 
        ?  this.setState({
            username: this.props.navagation.getParam("username", "Phovent"),
            email: this.props.navagation.getParam("email","phovent@gmail.com"),
            age: this.props.navagation.getParam("age","22"),
            gender: this.props.navagation.getParam("gender","Male"),
            location: this.props.navagation.getParam("location","Singapore West"),
            occupation: this.props.navagation.getParam("occupation","Student"),
            interest: this.props.navagation.getParam("interest","Not Coding"),
        }) //: null;*/

        const pressHandle = () => {
            this.props.navigation.navigate('EditProfile', {changeInfo: this.changeInfo});
        }

        const {username, email, gender, age, location, occupation, interests} = this.state;
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
    
                        <View style={styles.dm}>
                            <TouchableOpacity>
                                <MaterialIcons name="chat" size={18} color="grey"></MaterialIcons>
                            </TouchableOpacity>
                        </View>
    
                        <View style={styles.active}></View>
    
                        <View style={styles.add}>
                            <TouchableOpacity>
                                <Ionicons name="ios-add" size={48} color="#00ff55" style={{marginTop: 6, marginLeft:2}}></Ionicons>
                            </TouchableOpacity>
                        </View>
                            
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, {fontWeight: "200", fontSize: 36}]}> {username} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> {gender} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> {location} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> {occupation} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> {interests} </Text>
                        <Text style={[styles.text, {color: "black", fontSize: 14}]}> {age} </Text>
                        <TouchableOpacity style = {styles.buttonContainer}
                            onPress={pressHandle}
                        >
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})

export default withNavigation(Profile);
