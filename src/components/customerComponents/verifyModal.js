
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import AnimatedHideView from 'react-native-animated-hide-view';
import MobileButton from './mobileButton';
import AuthenticatePage from './authenticatePage';

function VerifyModal(props) {
    const [bool,setBool] = useState(true)
    const [showAuth,setShowAuth] = useState(false)

    const continueGuest = () => {
        setBool(false)

    }

    const authActive = () => {
        setShowAuth(true)
        setBool(false)
    }

        if(props.userLoggedIn === true){
            return null
        }
        else if(showAuth === true){
            return (
                <>
                <View style={styles.container2}>
                <AuthenticatePage loginUser={props.loginUser} regUser={props.regUser} confirmCode={props.confirmCode}/> 
                </View>
                </>
            )
        }
        else {
            return (
                <AnimatedHideView visible={bool} style={styles.container}>
                    <View style={styles.alert}>
                        <Text style={styles.title}>Welcome to {props.storeTitle}</Text>
                        <Text style={styles.secondaryText}>{props.storeDescription}</Text>
                        <View style={styles.buttonWrap}>
                        <MobileButton text={'Authenticate'} action={authActive}/>
                        </View>
                        <Text style={styles.orText}>OR</Text>
                        <TouchableOpacity style={styles.continueTouch} onPress={()=>continueGuest()}>
                        <Text style={styles.continueText}>Continue as a guest</Text>
                        </TouchableOpacity>
                    </View>
                </AnimatedHideView>
            )
        }
    }

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 99999,
        justifyContent:'flex-end'
    },

    container2: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 99999,
        justifyContent:'flex-end'
    },

    alert: {
        backgroundColor: 'white',
        width: '100%',
        height: 320,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68,
        paddingTop:'30px',
        paddingLeft:'30px',
        paddingRight:'30px',
    },

    authBackground:{
        backgroundColor: 'white',
        width: '100%',
        height: 100,
        paddingTop:'30px',
        paddingLeft:'30px',
        paddingRight:'30px',
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

export default VerifyModal;