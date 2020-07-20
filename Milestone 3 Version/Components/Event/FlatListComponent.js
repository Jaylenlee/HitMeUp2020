import React from 'react';
import { View, Text, StyleSheet,
    TouchableOpacity, Image } from 'react-native';

export default class FlatListComponent extends React.Component {
    state = {
        status: false,
        friend: this.props.friend,
        invitees: this.props.invitees,
    }

    render() {
        const {status, friend} = this.state;
        return (
            <View style={styles.eventItem}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{flex: 1}}>

                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flex: 1}}>
                                <View style={styles.avatarContainer}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={{uri: friend.photo}}
                                    />
                                </View>
                                <View style={styles.details}>
                                    <Text style={styles.eventTitle}>{friend.username}</Text>
                                    <Text style={styles.eventTime}>{friend.email}</Text>
                                </View>
                                <View style={styles.buttonPos}>
                                    <TouchableOpacity
                                        style={status ? styles.addButton2 : styles.addButton}
                                        onPress = {() => {
                                            const newStatus = !status
                                            this.setState({status: newStatus})
                                            newStatus ? this.props.invite() : this.props.remove()
                                        }}
                                    > 
                                        <Text style={styles.addButtonText}>{status ? "Don't Invite" : "Send Invite"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    eventItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        marginVertical: 8,
        shadowOpacity: 0.1,
        shadowOffset: {height: 2, width: 2}
    },
    avatarContainer: {
        shadowColor: '#00695C',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 35
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#004D40',
        paddingBottom: 5
    },
    eventTime: {
        fontSize: 12,
        color: '#26A69A',
        fontWeight: '400',
        marginTop: 4
    },
    details: {
        paddingLeft: 40
    },
    buttonPos: {
        flex: 1,
        alignItems: 'flex-end'
    },
    addButton: {
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.4,
        margin: 25,
        padding: 8,
        marginLeft: 100,
        borderRadius: 2,
        backgroundColor: '#DC5699',
        alignSelf: 'flex-end'
    },
    addButton2: {
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.4,
        margin: 25,
        padding: 8,
        marginLeft: 100,
        borderRadius: 2,
        backgroundColor: '#56DC9F',
        alignSelf: 'flex-end'
    },
    addButtonText: {
        fontSize: 12,
        fontWeight: '400'
    },
})