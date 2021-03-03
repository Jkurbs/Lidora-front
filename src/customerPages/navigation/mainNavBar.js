

import React, { useState, useEffect, memo } from "react";
import {  View, Text, TouchableOpacity} from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons'
import useGlobalStyles from '../../globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import firebase from "../../firebase/Firebase"
var unsubscribe;

// Nav bar for store
function MainNavBar(props) {

    const [userLoggedIn, setUserLoggedIn] = useState(null)
    const [user, setUser] = useState({})

    const globalStyles = useGlobalStyles();

    useEffect(() => {
        unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user)
                setUserLoggedIn(true)
            } else {
                setUserLoggedIn(false)
            }
        })
    }, [])

    if (user.uid != props.chefId) {
        return (
            <View style={[styles.navBarBackground, globalStyles.backgroundPrimary]}>
                { 
                userLoggedIn ?
                <View style={styles.navBarRightButtonContainer}>
                    <View style={styles.navBarRightButtonInnerContainer}>
                        <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} }>
                            <SimpleLineIcons name="options" size={18} color={globalStyles.textPrimary} />
                        </TouchableOpacity> 
                    </View>
                </View>   
                : 
                <TouchableOpacity onPress={()=> {props.navigation.navigate("Authenticate")} } style={styles.navBarRightButton}>
                    <Text onPress={() => {
                            props.navigation.navigate('Authenticate');
                        }}
                    style={[styles.navBarRightButton, globalStyles.textPrimary]}>Login
                    </Text>
                </TouchableOpacity>
                }
                <View style={globalStyles.border} />
            </View>
        )
    } else if (user.uid === props.chefId) {
        return (
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} } style={styles.navBarRightButton}>
                <Text onPress={() => {
                            navigation.navigate('Authenticate');
                        }}
                        style={[styles.navBarRightButton, globalStyles.text]}>Dashboard
                </Text>
            </TouchableOpacity>
        )
    } else {
        return (<View/>)
    }
}

export default memo(MainNavBar)