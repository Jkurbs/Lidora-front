import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        fontFamily: "System",
        backgroundColor: 'white',
        flex: 1,
        color: '#111'
        // height: windowHeight,
    },

    balanceContainer: {

    },

    valueContainer: {
        marginBottom: 20
    },

    descriptionText: {
        color: 'rgb(99, 99, 102)',
        marginBottom: 8
    },

    valueText: {
        fontWeight: '500',
        fontSize: 18
    }
});
