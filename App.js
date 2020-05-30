import React, { Component } from 'react';
import { AppRegistry, 
         StyleSheet,
         Text, 
         View, 
         Button } from 'react-native';
import Login from './src/components/Login/Login';

export default class firstapp extends Component {
    render() {
        return (
            <Login />
        );
    }
}
