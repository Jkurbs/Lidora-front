import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

class MainButton extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.button}
                onPress={() => this.props.action()}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default MainButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00CF46',
        borderRadius: 5,
        width: 90,
        height: 27,
        justifyContent: "center",
        alignSelf: 'center'
    },
    text: {
        color: 'white',
        textAlign: "center",
        fontWeight: '500',
        fontSize: 12
    }
});