
import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import AnimatedHideView from 'react-native-animated-hide-view';
import MobileButton from './mobileButton';
import MobileButton2 from './mobileButton2';
import MobileInput from './mobileInput';
//firebase imports
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import firebase from '../../firebase/Firebase';
import { auth } from "firebase";
import "firebase/firestore";
import * as firebase2 from 'firebase'

var db = firebase.firestore();

function AuthenticatePage(props) {
    const [tab,setTab] = useState("login")
    const [loginInfo,setLoginInfo] = useState({})
    const [regInfo,setRegInfo] = useState({
        email:'xxx',
        phone:'xxx',
        password:123
    })
    const [isRegHasData,setIsRegHasData] = useState(false)

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

    const nextMethod = () => {
        //phone num format
        var phoneno = /^\d{10}$/;
        //email format
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regInfo.phone.match(phoneno) && regInfo.password.length >= 6 && re.test(regInfo.email) ){
            //Data is correct format
            setIsRegHasData(true)
            props.regUser(regInfo)
        } 
        else
        {
        alert("Invalid phone format");
        return false;
        }

    }
    const regMethod = () => {
        props.confirmCode(regInfo.code)
    }


    const TabDisplay = () => {
        if(tab === "login"){
            return (
                //Login Screen
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
            if(isRegHasData !== true){
                //Register Screen
                return (
                    <View style={styles.regDisp}>
                    <Text style={styles.title}>[PH]Register</Text>
                    <MobileInput placeholder={"Email Address"} onChangeText={(text) => regInfo.email = text}/>
                    <MobileInput placeholder={"Phone Number"} onChangeText={(text) => regInfo.phone = text}/>
                    <MobileInput placeholder={"Password"}onChangeText={(text) => regInfo.password = text}/>
                    <PrivacyPolicyText/>
                    <View style={styles.buttonWrap}>
                    <MobileButton2 text={'Next'} action={()=>nextMethod()} />
                    </View>
                    </View>
                )
            } else {
                //Show Verification Screen
                return (
                    <View style={styles.regDisp}>
                    <Text style={styles.title}>[PH]Enter Verification code sent to {regInfo.phone}</Text>
                    <MobileInput placeholder={"Verification Code"} onChangeText={(text) => regInfo.code = text}/>
                    <View style={styles.buttonWrap}>
                    <p id="verify">
                    <MobileButton2 text={'Verify'} action={()=>regMethod()} />
                    </p>
                    </View>
                    <TouchableOpacity onPressIn={()=>setIsRegHasData(false)}><Text style={{fontWeight:'600'}}> Change Number </Text></TouchableOpacity>
                    </View>
                )
            }

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