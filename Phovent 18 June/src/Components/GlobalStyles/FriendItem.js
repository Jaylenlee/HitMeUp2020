import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native'

export default class FriendItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const friendItem = this.props.friendItem;
        return (
            <TouchableOpacity
                style={styles.itemStyle}
            >
                <Text style={(friendItem.follow) ?
                    { color: '#0061c2' } :
                    { color: '#757575' }}>
                    {friendItem.title}
                </Text>
                    <Button
                        title="Follow"
                        color={(friendItem.follow) ? 'rgba(0, 255, 128, 0.7)' : 'rgba(0, 255, 128, 1)'}
                        onPress={() => this.props.toggleFollow()}
                    />
                    <Button
                        title="Remove"
                        color={(friendItem.follow) ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 0, 0, 1)'}
                        onPress={() => this.props.removeFriend()}
                    />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        width: '100%',
        height: 40,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    }
});