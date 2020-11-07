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

    flatListItemSeparator: {
        alignSelf: 'center',
        height: 0.5,
        width: "95%",
        backgroundColor: '#D6D6D6'
    },

    titleParentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 90,
        width: '60%',
        paddingLeft: 20,
        paddingRight: 20
    },

    titleContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        paddingBottom: 8,
        justifyContent: 'center'
    },

    mainTitle: {
        fontSize: 25,
        fontWeight: '500'
    },

    secondaryTitle: {
        // color: 'rgb(99, 99, 102)',
        marginBottom: 10
    },

    flatList: {
        borderRadius: 5,
        width: '30%',
    },

    menuContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        height: 90
    },

    secondaryView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 8
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: "#F5F5F7",
    },

    mainText: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 4
    },

    description: {
        marginBottom: 4
    },

    price: {
        fontWeight: '500',
        fontSize: 14
    },

    buttonBackground: {
        backgroundColor: '#34C759',
        borderRadius: 5,
        height: 25,
        width: 120,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        margin: 20
    },

    buttonTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        alignSelf: 'center'
    },

    // Right side menu form

    menuOptionsContainer: {
        backgroundColor: '#F5F5F7',
        width: '40%',
        height: '100%',
        position: 'absolute',
        right: 0,
    },

    detailsContainer: {
        flexDirection: "column",
        padding: 20,
        backgroundColor: '#F5F5F7',
        flexGrow: 1,
    },

    detailsItemImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 8,
        backgroundColor: 'rgb(174,174,178)'
    },

    detailsItemTitle: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 8,

    },

    detailsItemPrice: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 17,
        marginBottom: 8,
    },

    detailsItemDescription: {
        textAlign: 'center'
    },

    detailsButtonContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignSelf: 'flex-end',
    },


    // Edit side menu form 

    menuForm: {
        flexDirection: "column",
        height: '100%',
        backgroundColor: '#F5F5F7',
        flex: 1,
        width: '40%',
    },

    editItemContainer: {
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center',
        // flex: 1, 
        flexGrow: 1
    },

    addImageButton: {
        alignSelf: 'center',
        color: 'rgb(0, 122, 255)',
        fontWeight: '500',
        marginBottom: 10
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

    formInput: {
        marginTop: 8,
        paddingLeft: 8,
        fontSize: 14,
        textAlignVertical: 'top',
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        backgroundColor: 'white'
    },

    formInputDescription: {
        marginTop: 8,
        padding: 8,
        padding: 8,
        fontSize: 14,
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 100,
        backgroundColor: 'white'
    }
    ,
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        // width: "40%",
    },
    addButton: {
        backgroundColor: "green",
        borderRadius: 10,
        height: 50,
        width: 120,
        justifyContent: "center",
        margin: 20,
    },

    editButton: {
        borderWidth: 1,
        borderColor: 'rgba(27, 31, 35, 0.15)',
        backgroundColor: "#fafbfc",
        borderRadius: 10,
        height: 30,
        width: 70,
        justifyContent: "center",
        margin: 10,
    },

    deleteButton: {
        borderWidth: 1,
        borderRadius: 6,
        height: 30,
        width: 70,
        justifyContent: "center",
        margin: 10,
        backgroundColor: '#fafbfc',
        borderColor: 'rgba(27, 31, 35, 0.15)'
    },

    deleteText: {
        color: '#d73a49',
        textAlign: "center",
        fontWeight: '500',
        fontSize: 12
    },

    buttonText: {
        textAlign: "center",
        color: '#24292e',
        fontWeight: '500',
        fontSize: 12
    }
});
