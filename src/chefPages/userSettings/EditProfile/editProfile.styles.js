import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        fontFamily: "System",
        backgroundColor: 'white',
        flex: 1,
        height: '100%',
    },

    itemContainer: {
        width: '40%',
        height: windowHeight,
    },

    imageContainer: {
        flexDirection: 'row',
        width: '95%',
        marginTop: 8,
        alignItems: 'center',
        marginBottom: 20
    },

    name: {
        fontSize: 14,
        marginLeft: 20,
        fontWeight: "500",
    },

    imageButton: {
        fontSize: 14,
        marginLeft: 20,
        color: '#00CF46',
        fontWeight: "500",
    },

    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20
    },

    formInput: {
        marginLeft: 20,
        marginTop: 8,
        paddingLeft: 8,
        fontSize: 14,
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        width: 445,
        backgroundColor: 'white'
    },

    formTitle: {
        fontWeight: '500',
        textAlign: 'right',
        width: 90,
    },

    bioView: {
        marginTop: 16
    },

    formInputDescription: {
        marginLeft: 20,
        marginTop: 8,
        paddingLeft: 8,
        paddingTop: 8,
        fontSize: 14,
        textAlignVertical: 'top',
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 80,
        width: 445,
        backgroundColor: 'white'
    },

    itemContainer: {
        marginTop: 20,
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center',
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