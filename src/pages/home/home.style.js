import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


export default StyleSheet.create({
    container: {
        fontFamily: "System",
        flex: 1,
        backgroundColor: "#fff",
    },

    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },

    secondaryView: {
        width: '100%',
        height: windowHeight / 2,
        flexDirection: "column",
        alignItems: "center"
    },
});
