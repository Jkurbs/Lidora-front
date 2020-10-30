import { StyleSheet } from "react-native";

const userImageViewSize = 120;

export default StyleSheet.create({
    container: {
        fontFamily: "System",
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        height: 'auto'
    },


    titleContainer: {
        flexDirection: 'column',
        marginBottom: 5
    },

    mainTitle: {
        fontSize: 30,
        fontWeight: '500'
    },

    secondaryTitle: {
        color: 'rgb(99, 99, 102)'
    },

    secondContainer: {
        width: '60%',
        height: '100%',
        borderRadius: 10,
    },

    flatList: {
        width: '100%',
        // backgroundColor: '#F6F6F6',
        borderRadius: 5
    },

    menuContent: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 20,
        height: 70,
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
        paddingRight: 40,
        marginBottom: 20
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#F5F5F7",
    },

    description: {
        marginTop: -50,
        marginLeft: 20,
        width: '100%'
    },


    mainText: {
        fontWeight: '500',
        marginBottom: 15
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
    }
});
