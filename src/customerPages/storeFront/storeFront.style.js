
import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window")

export default StyleSheet.create({

    container: {
        fontFamily: "System",
        backgroundColor: 'white',
        flex: 1,
        overflow: 'hidden'
    },

    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },

    sectionTitle: {
        fontSize: 23,
        fontWeight: '500',
        paddingLeft: 20,
        marginTop: 20
    },

    storeImage: {
        width: '100%',
        height: 200
    },

    title: {
        fontSize: 25,
        fontWeight: '500'
    },

    description: {
        color: 'gray',
        fontSize: 14
    },

    storeInfoContainer: {
        padding: 20
    },

    menuImage: {
        width: 70,
        height: 70,
        borderRadius: 5
    },

    menuName: {
        fontSize: 18,
    },

    menuDescription: {
        marginTop: 8,
        fontSize: 15,
        color: 'gray',
    },

    menuPrice: {
        marginTop: 8,
        fontSize: 14,
    },

    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        alignSelf: 'center'
    }
})


