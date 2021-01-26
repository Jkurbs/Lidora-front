import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        height: 45, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#ecf0f1'
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
    }
})