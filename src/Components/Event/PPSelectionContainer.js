import React from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import BlueButton from '../component/BlueButton';
import SubHeader from '../component/SubHeader';

class PPSelectionContainer extends React.Component {
    state = {
        isToggled: false,
        public: false,
        private: false
    };

    updatePrivacyPublic = (privacy) => this.setState({ public: true, private: false, isToggled: false })
    updatePrivacyPrivate = (privacy) => this.setState({ private: true, public: false, isToggled: false })
    handleUpdateToggle = (toggle) => this.setState({ isToggled: true })

    render() {
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.pageStyle}>
                <Header title="Event Creation"/>
                <SubHeader title='Choosing Event Privacy'/>
                <View style={{backgroundColor: '#ffec70', padding: 10, alignItems: 'center'}}>
                    <Text style={styles.descriptionStyle}>
                        Please select an option
                    </Text>
                </View>

                <View style={styles.overallView}>
                    <View style={styles.buttonsStyle}>
                        <View style={styles.buttonDescription}>
                            <TouchableOpacity
                                style={[(this.state.public && !this.state.private)?
                                         styles.buttonStyleS : styles.buttonStyleNS]}
                                onPress={this.updatePrivacyPublic}
                            >
                                    <Text style={[(this.state.public && !this.state.private)?
                                                  styles.buttonTextS : styles.buttonTextNS]}>Public</Text>
                            </TouchableOpacity>
                            <Text style={{padding: 20}}>
                                Allows event to be seen by the public so that public users can join!
                            </Text>
                        </View>

                        <View style={styles.buttonDescription}>
                            <TouchableOpacity
                                style={[(this.state.private && !this.state.public)?
                                          styles.buttonStyleS : styles.buttonStyleNS]}
                                onPress={this.updatePrivacyPrivate}
                            >
                                    <Text style={[(this.state.private && !this.state.public)?
                                                   styles.buttonTextS : styles.buttonTextNS]}>Private</Text>
                            </TouchableOpacity>
                            <Text style={{padding: 20}}>
                                Allows event to be personal so that you can have private meet ups with your homies!
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonPosition}>
                    <BlueButton
                        style={styles.button}
                        onPress={this.handleUpdateToggle}
                    >
                        Next
                    </BlueButton>
                </View>
                    {
                        this.state.isToggled &&
                        (alert('Proceed to invite people'))
                    }
            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        backgroundColor: '#9eddff'
    },
    overallView: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    descriptionStyle: {
        fontSize: 15
    },
    buttonsStyle: {
        paddingTop: 10,
    },
    buttonStyleNS: {
        backgroundColor: 'rgba(0, 157, 255, 0.8)',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyleS: {
        backgroundColor: 'rgba(0, 255, 170, 0.5)',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextNS: {
        fontSize: 20,
        color: 'white'
    },
    buttonTextS: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.3)'
    },
    buttonDescription: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: '#c9ccff',
        width: 450,
        paddingLeft: 10
    },
    button: {
        marginTop: 25,
    },
    buttonPosition: {
        alignItems: 'flex-end',
        paddingRight: 10
    }
});

export default PPSelectionContainer;