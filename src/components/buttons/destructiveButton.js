import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

class DestructiveButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.action} style={styles.button}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default DestructiveButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#D3071C',
        width: 157,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    text: {
        fontSize: 14,
        color: 'white',
    }
});