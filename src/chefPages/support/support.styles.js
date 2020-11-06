import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        fontFamily: "System",
        backgroundColor: 'white',
        flex: 1,
        height: windowHeight,
    },

    inputContainer: {
        flexDirection: 'column',
        width: '95%',
        marginTop: 8,
    },

    formTitle: {
        fontSize: 14,
        fontWeight: "500",
    },

    menuForm: {
        flexDirection: "column",
        height: '100%',
        backgroundColor: '#F5F5F7',
        flex: 1, 
        width: '40%',
    },
    formInputDescription: {
        marginTop: 8,
        padding: 8,
        padding: 8,
        fontSize: 14,
        borderColor: 'rgb(99, 99, 102)',
        borderWidth: 1,
        borderRadius: 5,
        height: 100
    },

    editItemContainer: {
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center'
    },

    editButton: {
        backgroundColor: "rgb(174,174,178)",
        borderRadius: 10,
        height: 50,
        width: 120,
        justifyContent: "center",
        margin: 20,
    },
    
    buttonText: {
        textAlign: "center",
        color: 'white',
        fontWeight: '500'
    }
})