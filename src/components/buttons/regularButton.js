import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

class RegularButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.action} style={styles.button}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default RegularButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        width: 80,
        height: 30,
        borderRadius: 5,
        borderColor: '#00CF46',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    text: {
        fontSize: 14,
        color: '#00CF46',
    }
});