import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-svg";

class MobileButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.action} style={styles.button}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default MobileButton;

const styles = StyleSheet.create({
    button: {
        width:'100%',
        height: 30,
        borderRadius: 5,
        borderColor: '#00CF46',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        margin: 8,
        backgroundImage: 'linear-gradient(180deg, #00CF46 0%, #3BFE7D 100%);',
        maxWidth:'343px'
    },
    text: {
        fontSize: 17,
        fontWeight:500,
        color: 'white',
    }
});