

import React, { useState, useEffect } from "react";
import {  View, Image, Text, TouchableOpacity} from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons'
import firebase from "../firebase/Firebase"
var unsubscribe;

// Nav bar for store
function NavBar(props) {

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

    const itemsCount = props.quantity
    if (user.uid != props.chefId) {
        return (
            <View style={[{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}]}>
                <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate("Checkout", {items: props.items})}}>
                        <Image source={require('../assets/icon/bag.png')} style={{height: 27, width: 27}}/>
                        {
                            props.quantity === null ? 
                                null
                            :
                                <View style={{backgroundColor: 'rgb( 255, 59, 48)', padding: 6, height: 14, width: 14, borderRadius: 7, position: "absolute", right: 0, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: '#ecf0f1', fontSize: 11, fontWeight: '700'}}>{itemsCount}</Text>
                                </View>
                        }
                    </TouchableOpacity>
                </View>
                { 
                userLoggedIn ?
                <View style={{ width: '100%', height: '100%', alignItems: 'center' , flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ position: 'absolute', right: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} }>
                            <SimpleLineIcons name="options" size={18} color="black" />
                        </TouchableOpacity> 
                    </View>
                </View>   
                : 
                <TouchableOpacity onPress={()=> {props.navigation.navigate("Authenticate")} } style={{ alignSelf: 'flex-end', margin: 8  }}>
                    <Text onPress={() => {
                            props.navigation.navigate('Authenticate');
                        }}
                    style={{fontWeight: '500'}}>Login
                    </Text>
                </TouchableOpacity>
                }
            </View>
        )
    } else if (user.uid === props.chefId) {
        return (
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} } style={{ alignSelf: 'flex-end', margin: 8  }}>
                <Text onPress={() => {
                            navigation.navigate('Authenticate');
                        }}
                    style={{fontWeight: '500'}}>Dashboard
                </Text>
            </TouchableOpacity>
        )
    } else {
        return (<View/>)
    }
}

export default NavBar