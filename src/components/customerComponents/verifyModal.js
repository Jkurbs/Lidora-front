
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal } from 'react-native';
import AnimatedHideView from 'react-native-animated-hide-view';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

class VerifyModal extends Component {
    render() {
        return (
            <AnimatedHideView visible={true} style={styles.container}>
                <View style={styles.alert}>
                    <Text>AYY LMAYO</Text>
                </View>
            </AnimatedHideView>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        height: '100%',
        width: windowWidth,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 99999,
    },

    alert: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: 550,
        height: 180,
        alignSelf: 'center',
        padding: 30,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68
    },

    title: {
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 8
    },

    secondaryText: {
        color: '#9F9F9F'
    },

    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'flex-end',
        bottom: 10
    }
});

export default VerifyModal;