

import React, { useState, useEffect, memo } from "react";
import {  View, Text, TouchableOpacity} from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons'
import styles from './storeFront.style'
import firebase from "../../firebase/Firebase"
var unsubscribe;

// Nav bar for store
function MainNavBar(props) {

    const [userLoggedIn, setUserLoggedIn] = useState(null)
    const [user, setUser] = useState({})

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
            <View style={styles.navBarContainer}>
                { 
                userLoggedIn ?
                <View style={styles.navBarRightButtonContainer}>
                    <View style={styles.navBarRightButtonInnerContainer}>
                        <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} }>
                            <SimpleLineIcons name="options" size={18} color="black" />
                        </TouchableOpacity> 
                    </View>
                </View>   
                : 
                <TouchableOpacity onPress={()=> {props.navigation.navigate("Authenticate")} } style={styles.navBarRightButton}>
                    <Text onPress={() => {
                            props.navigation.navigate('Authenticate');
                        }}
                    style={styles.navBarRightButton}>Login
                    </Text>
                </TouchableOpacity>
                }
            </View>
        )
    } else if (user.uid === props.chefId) {
        return (
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} } style={styles.navBarRightButton}>
                <Text onPress={() => {
                            navigation.navigate('Authenticate');
                        }}
                    style={styles.navBarRightButton}>Dashboard
                </Text>
            </TouchableOpacity>
        )
    } else {
        return (<View/>)
    }
}

export default memo(MainNavBar)