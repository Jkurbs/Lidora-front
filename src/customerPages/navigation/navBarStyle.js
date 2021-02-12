import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        zIndex: 1,
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute',
        top: 0, 
        left: 0,
        right: 0
    }, 

    leftIcon: { 
        position: 'absolute', 
        left: 16, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center'
    }, 

    rightIcon: { 
        position: 'absolute', 
        right: 16, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center'
    },

    rightIconText: { 
        fontSize: 14, 
    },

    separator: {
        position: 'absolute',
        bottom: 0
    }


})