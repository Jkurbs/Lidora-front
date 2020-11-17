import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("screen");

export default StyleSheet.create({
    showButton: {
        borderWidth: 1,
        borderRadius: 6,
        height: 30,
        width: 70,
        justifyContent: "center",
        margin: 10,
        backgroundColor: '#fafbfc',
        borderColor: 'rgba(27, 31, 35, 0.15)'
    },

})
