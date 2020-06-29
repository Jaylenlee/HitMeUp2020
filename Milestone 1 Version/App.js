import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './src/Components/Login/Login';
import Profile from './src/Components/ProfilePage/Profile';
import EditProfile from './src/Components/ProfilePage/EditProfile';
import Navigation from './src/Components/Route/Navigation'; // Navigator dummy name due to export default
//import Userlist from './src/Components/Login/Userlist';

export default function App() {
  return (
    <Navigation/>
  )
  /*return (
    <View style={styles.container}>
      <Login></Login>
    </View>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});