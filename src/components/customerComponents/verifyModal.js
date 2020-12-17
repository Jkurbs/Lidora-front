
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import AnimatedHideView from 'react-native-animated-hide-view';
import MobileButton from './mobileButton';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function VerifyModal() {
    const [bool,setBool] = useState(true)

    const continueGuest = () => {
        setBool(false)

    }

        return (
            <AnimatedHideView visible={bool} style={styles.container}>
                <View style={styles.alert}>
                    <Text style={styles.title}>[PH]Welcome to ChefVicky</Text>
                    <Text style={styles.secondaryText}>[PH]Organic Juices and Salads crafted for you, High nutrient-rich foods for sustaining health. Detox coaching also available.</Text>
                    <View style={styles.buttonWrap}>
                    <MobileButton text={'Authenticate'}/>
                    </View>
                    <Text style={styles.orText}>OR</Text>
                    <TouchableOpacity style={styles.continueTouch} onPress={()=>continueGuest()}>
                    <Text style={styles.continueText}>Continue as a guest</Text>
                    </TouchableOpacity>
                </View>
            </AnimatedHideView>
        )
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