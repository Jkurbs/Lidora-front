
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal } from 'react-native';
import DestructiveButton from './buttons/destructiveButton'
import RegularButton from './buttons/regularButton'
import AnimatedHideView from 'react-native-animated-hide-view';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

class Alert extends Component {
    render() {
        return (
            <AnimatedHideView visible={this.props.isVisible} style={styles.container}>
                <View style={styles.alert}>
                    <Text style={styles.title}>Are you sure you want to delete this item?</Text>
                    <Text style={styles.secondaryText}>Once deleted it can’t be recovered.</Text>
                    <View style={styles.buttonContainer}>
                        <RegularButton action={this.props.isVisible} text={"Cancel"} />
                        <DestructiveButton action={this.props.deleteAction} text={this.props.buttonTitle1} />
                    </View>
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

export default Alert;