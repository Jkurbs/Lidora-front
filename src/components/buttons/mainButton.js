import React from "react";
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { useTheme } from '@react-navigation/native';

function MainButton(props) {

    const { colors } = useTheme();
    
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: colors.btnPrimaryBg, borderColor: colors.btnPrimaryBorder}]}
            onPress={() => props.action()}>
            <ActivityIndicator hidesWhenStopped={true} animating={props.indicatorAnimating} color="gray" style={{ position: 'absolute', alignSelf: 'center' }} />
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        width: 90,
        height: 34,
        justifyContent: "center",
        // alignSelf: 'center'
    },
    text: {
        color: 'white',
        textAlign: "center",
        fontWeight: '500',
        fontSize: 12
    }
});