import { StyleSheet } from "react-native";

const userImageViewSize = 120;

export default StyleSheet.create({
    container: {
        fontFamily: "System",
        flex: 1,
        width: '100%',
        backgroundColor: '#E5E5E5'
    },

    secondContainer: {
        width: '60%',
        height: '90%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        margin: 50,
        borderRadius: 10,
    },

    flatList: {
        marginTop: 90,
        width: '100%',
        backgroundColor: 'white',
    },

    menuContent: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        paddingLeft: 20,
        height: 90,
    },

    menuWrapper: {
        flexDirection: 'row',
        alignSelf: 'center'
    },

    mainView: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '90%'
    },

    secondaryView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },

    image: {
        borderRadius: 5,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#F5F5F7",
    },

    description: {
        marginTop: -50,
        marginLeft: 20,
        width: '100%'
    },


    title: {
        fontWeight: '500'
    },

    buttonBackground: {
        backgroundColor: 'green',
        borderRadius: 10,
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        margin: 20
    },
    buttonTitle: {
        textAlign: 'center'
    }
});
