import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-svg";

class MobileButton2 extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.action} style={styles.button}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default MobileButton2;

const styles = StyleSheet.create({
    button: {
        width:'100%',
        height: 30,
        borderRadius: 5,
        borderColor: 'rgba(27, 31, 35, 0.15)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        margin: 8,
        backgroundColor: '#00CF46',
        maxWidth:'343px'
    },
    text: {
        fontSize: 17,
        fontWeight:300,
        color: 'white',
    }
});