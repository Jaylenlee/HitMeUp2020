import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

class LoadingScreenContainer extends React.Component {
    render() {
        return (
            <View style={styles.pageStyle}>
                <Image
                    style={styles.imageStyle}
                    source={{uri: 'https://image.freepik.com/free-vector/cartoon-space-rocket-leaving-earth-orbit_3446-177.jpg'}}
                />
                <Text style={styles.textStyle1}>
                    NUS-Orbital Project
                </Text>
                <Text style={styles.textStyle2}>
                    by Team HitMeUp2020
                </Text>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
                    <Text style={styles.subStyle}>
                        Powered by
                    </Text>
                    <Image
                        style={styles.reactnativeImg}
                        source={{uri: 'https://res.cloudinary.com/practicaldev/image/fetch/s--LS4X9NFz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pagepro.co/blog/wp-content/uploads/2020/03/react-native-logo-884x1024.png'}}
                    />
                </View>

                <Image
                    style={styles.firebaseImg}
                    source={{uri: 'https://firebase.google.com/images/brand-guidelines/logo-standard.png'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9eddff',
    },
    imageStyle: {
        width: 300,
        height: 300
    },
    textStyle1: {
        paddingTop: 20,
        fontSize: 24
    },
    textStyle2: {
        paddingTop: 5,
        fontSize: 24
    },
    subStyle: {
        fontSize: 17,
        paddingBottom: 30,
        paddingRight: 10
    },
    firebaseImg: {
        height: 75,
        width: 200
    },
    reactnativeImg: {
        height: 90,
        width: 80
    }
});

export default LoadingScreenContainer;