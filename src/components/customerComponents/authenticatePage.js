
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import AnimatedHideView from 'react-native-animated-hide-view';
import MobileButton from './mobileButton';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function AuthenticatePage() {
    const [bool,setBool] = useState(true)

    const continueGuest = () => {
        setBool(false)

    }

        return (
            <View style={styles.container}>
            <View style={styles.alert}>
            <TouchableOpacity style={styles.loginTab}>
                <Text style={styles.TabText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerTab}>
                <Text style={styles.TabText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.title}>[PH]Authenticate</Text>
            <View style={styles.buttonWrap}>
            <MobileButton text={'Login'}/>
            </View>
            </View>
            </View>
        )
    }

    const styles = StyleSheet.create({

        container: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            height: '100%',
            width: '100%',
            position: 'absolute',
            justifyContent:'center'
        },

        loginTab:{
            width:'125px',
            height:'40px',
            backgroundColor:'white',
            position:'absolute',
            borderTopLeftRadius:'20px',
            borderTopRightRadius:'20px',
            top:'-40px',
            left:'0px',
        },

        TabText:{
            alignSelf:'center',
            paddingTop:'7px',
            fontSize:'20px',
            color: '#808080',
        },

        registerTab:{
            width:'125px',
            height:'40px',
            backgroundColor:'white',
            position:'absolute',
            borderTopLeftRadius:'20px',
            borderTopRightRadius:'20px',
            top:'-40px',
            left:'130px',
        },
    
        alert: {
            backgroundColor: 'white',
            width: '80%',
            height: 320,
            shadowColor: "#000",
            shadowColor: "#000",
            shadowOpacity: 0.13,
            shadowRadius: 10.68,
            paddingTop:'30px',
            paddingLeft:'30px',
            paddingRight:'30px',
            alignSelf:'center',
        },
    
        title: {
            fontSize: 18,
            fontWeight:"700",
            paddingBottom:'20px',
            alignSelf:'center'
        },
    
        secondaryText: {
            color: '#808080',
            fontSize: 14,
            textAlign:'center'
        },
    
        buttonWrap: {
            alignSelf:'center',
            marginTop:'20px',
            width:'100%'
        },
    
        orText: {
            color: '#808080',
            fontSize: 14,
            textAlign:'center',
            paddingTop:'10px',
            paddingBottom:'10px'
        },
    
        continueTouch:{
            width:'180px',
            alignSelf:'center'
        },
    
        continueText: {
            color: '#0099ff',
            fontSize: 17,
            textAlign:'center',
            fontWeight:"500"
        }
    });

export default AuthenticatePage;