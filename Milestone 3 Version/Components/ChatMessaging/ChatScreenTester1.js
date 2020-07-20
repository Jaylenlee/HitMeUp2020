import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from './Fire';
import firebaseDb from '../Database/firebaseDb';
import { Ionicons } from '@expo/vector-icons';

class ChatScreenTester1 extends React.Component {
    state = {
        messages: []
    };

    get user() {
        return {
            _id: "Gerald",
            name: "Gerald"
        };
    };

    componentDidMount() {
        Fire.get(message =>
            this.setState(previous => ({
                messages: GiftedChat.append(previous.messages, message)
            }))
        );
    };

    componentWillUnmount() {
        Fire.off();
    }

    render() {
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;
        if (Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>
                    <View style={styles.top}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.backArrow}
                                onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>naruto</Text>
                        </View>
                    </View>

                    {chat}
                </KeyboardAvoidingView>
            )
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.top}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backArrow}
                            onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={24} color='#73788B'></Ionicons>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>naruto</Text>
                    </View>
                </View>
                {chat}
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    backArrow: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    top: {
        backgroundColor: '#FFF',
        borderBottomWidth: 2,
        borderBottomColor: '#EBECF4',
        shadowColor: '#011f4b',
        shadowOffset: {height: 5},
        shadowOpacity: 0.4,
        zIndex: 10,
    },
    header: {
        flex: 1,
        padding: 16,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomColor: '#EBECF4',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        position: 'absolute'
    }
})

export default ChatScreenTester1;