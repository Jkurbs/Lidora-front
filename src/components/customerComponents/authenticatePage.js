
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import AnimatedHideView from 'react-native-animated-hide-view';
import MobileButton from './mobileButton';
import MobileButton2 from './mobileButton2';
import MobileInput from './mobileInput';
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

function AuthenticatePage(props) {
    const [tab,setTab] = useState("login")
    const [loginInfo,setLoginInfo] = useState({})
    const [regInfo,setRegInfo] = useState({})

    const PrivacyPolicyText = () => {
        return (
            <View style={{display:'flex',flexDirection:'row'}}>
                <Text >By signing up, you agree to our</Text><TouchableOpacity onPressIn={()=>console.log("TERMS")}><Text style={{fontWeight:'600'}}> Terms & Privacy </Text></TouchableOpacity>
            </View>
        )
    }

    const loginMethod = () => {
        props.loginUser(loginInfo)
    }

    const TabDisplay = () => {
        if(tab === "login"){
            return (
                <View style={styles.loginDisp}>
                <Text style={styles.title}>[PH]Login</Text>
                <MobileInput placeholder={"Email Address"} onChangeText={(text) => loginInfo.email = text}/>
                <MobileInput placeholder={"Password"} onChangeText={(text) => loginInfo.password = text}/>
                <PrivacyPolicyText />
                <View style={styles.buttonWrap}>
                <MobileButton2 text={'Login'} action={()=>loginMethod()}/>
                </View>
                </View>
            )
        }
        else if(tab === "register") {
            return (
                <View style={styles.regDisp}>
                <Text style={styles.title}>[PH]Register</Text>
                <MobileInput placeholder={"Email Address"} onChangeText={(text) => regInfo.email = text}/>
                <MobileInput placeholder={"Phone Number"} onChangeText={(text) => regInfo.phone = text}/>
                <MobileInput placeholder={"Password"}onChangeText={(text) => regInfo.password = text}/>
                <PrivacyPolicyText/>
                <View style={styles.buttonWrap}>
                <MobileButton2 text={'Register'}/>
                </View>
                </View>
            )
        }

    }


        return (
            <View style={styles.container}>
            <View style={styles.alert}>
            <TouchableOpacity style={[styles.loginTab,(tab !== "login") ? {backgroundColor:'#cccccc'} : {backgroundImage:'linear-gradient(180deg, #00CF46 0%, #3BFE7D 100%);'}]} onPressIn={()=>setTab("login")}>
                <Text style={[styles.TabText,(tab !== "login") ? null : {color:'white'}]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.registerTab,(tab !== "register") ? {backgroundColor:'#cccccc'} : {backgroundImage:'linear-gradient(180deg, #00CF46 0%, #3BFE7D 100%);'}]} onPressIn={()=>setTab("register")}>
                <Text style={[styles.TabText,(tab !== "register") ? null : {color:'white'}]}>Register</Text>
            </TouchableOpacity>
            <TabDisplay/>
            </View>
            </View>
        )
    }

    const styles = StyleSheet.create({

        container: {
            backgroundColor: 'white',
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
            fontWeight:'100'
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
            height: 380,
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