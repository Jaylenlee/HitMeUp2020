import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SubHeader = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#9ec8ff',
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 16,
        fontWeight: '400',
        textTransform: 'uppercase'
    }
});

export default SubHeader;