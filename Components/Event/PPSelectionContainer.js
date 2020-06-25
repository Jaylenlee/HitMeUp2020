import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';

export default class PPSelectionContainer extends React.Component{
    state = {
        eventUID: this.props.navigation.getParam('eventUID',""),
        event: this.props.navigation.getParam('event', null)
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={{justifyContent: 'center'}}>
                        <Text>Space</Text>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("Private", {event: this.state.event})}}>
                        <Text>Private</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("Public", {event: this.state.event})}}>
                        <Text>Public</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                        <Text>Back</Text>
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
        alignItems: "center",
        justifyContent: "center"
    }
})