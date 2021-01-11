
import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import MobileInput from './mobileInput';

//firebase imports
import firebase from '../../firebase/Firebase';
import * as firebase2 from 'firebase';

import "firebase/firestore";
import "firebase/auth";

const { width: windowWidth} = Dimensions.get("screen");
const phoneMaxWidth = 575.98

function AuthenticatePage(props) {

    const navigation = props.navigation
    const data = props.route.params

    const [tab,setTab] = useState("login")
    const [loginInfo, setLoginInfo] = useState({})
    
    const [registerInfo, setRegInfo] = useState({
        email:'xxx',
        phone:'xxx',
        code: '',
        password:123
    })
    const [loginText, setLoginText] = useState("Login");
    const [registerText, setRegisterText] = useState("Sign up");

    const [isRegHasData,setIsRegHasData] = useState(false)
    const [indicatorAnimating, setIndicatorAnimating] = useState(false);
    const [verificationId, setVerificationId] = useState("");
    const [isLogin, setIsLogin] = useState(false)


    const PrivacyPolicyText = () => {
        return (
            <View style={{display:'flex',flexDirection:'row'}}>
                <Text >By signing up, you agree to our</Text><TouchableOpacity onPressIn={()=>console.log("TERMS")}><Text style={{fontWeight:'600'}}> Terms & Privacy </Text></TouchableOpacity>
            </View>
        )
    }

    // Handle the verify phone button press
    async function verifyPhoneNumber(phoneNumber) {
        var captcha = new firebase2.auth.RecaptchaVerifier('captcha', {
            'size': 'invisible',
            'callback': (response) => {
              setTab("confirmation")
            }
          });
        var provider = new firebase2.auth.PhoneAuthProvider();
        provider.verifyPhoneNumber(`+1${phoneNumber}`, captcha)
            .then(function(verificationId) {
                setVerificationId(verificationId)
        })
    }

    // Handle confirm code button press
    async function confirmCode() {
        try {
            const credential = firebase2.auth.PhoneAuthProvider.credential(
                verificationId,
                registerInfo.code,
            );
            await firebase.auth().currentUser.linkWithCredential(credential)
            navigation.navigate("Store") 
            } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                console.log('Account linking error: ', error);
            }
        }
    }

    // Handle user registration
    const register = () => {
        setRegisterText("")
        setIndicatorAnimating(true)
        firebase.auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password).then(data => {
            setIndicatorAnimating(false)
            setRegisterText("Sign up")
            verifyPhoneNumber(registerInfo.phone)
          }).catch(function (error) {
            // Handle Errors here.
            setIndicatorAnimating(false)
            setRegisterText("Sign up")
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error register: ",errorMessage)
            // ...
        });
    }


    // Handle sign with email
    const signInWithEmail = () => {
        if (isNaN(loginInfo.email)) {
            setLoginText("")
            setIndicatorAnimating(true)
            firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password).then(data => {
                setIndicatorAnimating(false)
                setLoginText("Login")
                navigation.navigate("Store") 
              })
              .catch(function (error) {
                // Handle Errors here.
                setIndicatorAnimating(false)
                setLoginText("Login")
                var errorMessage = error.message;
                console.log(errorMessage)
                // ...
              });
        } else {
            setIsLogin(true)
            verifyPhoneNumber(loginInfo.email)
        }
    }

    // Handle signIn with phone number
    async function signInWithPhone() {

        setIndicatorAnimating(true)

        try {
            const credential = firebase2.auth.PhoneAuthProvider.credential(
                verificationId,
                registerInfo.code,
            );

            firebase.auth().signInWithCredential(credential).then((credential) => {
                setIndicatorAnimating(true)
                navigation.navigate("Store")
            });
            
           // navigation.navigate("Store") 
            } catch (error) {
                setIndicatorAnimating(false)
            if (error.code == 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                setIndicatorAnimating(false)
                console.log('Account linking error: ', error);
            }
        }
    }

    const TabDisplay = () => {
        if(tab === "login") {
            return (
                    <View style={styles.container}>
                    <div id="captcha"></div>
                        <View style={styles.formContainer}>
                            <View style={{ width: '80%' }}>
                                <Text style={styles.headerText}>Sign in to your account</Text>
                                <MobileInput placeholder={"Email or Phone number"} type={"Email"} onChangeText={(text) => loginInfo.email = text}/>
                                <MobileInput placeholder={"Password"} type={"Password"} secureTextEntry={true} onChangeText={(text) => loginInfo.password = text}/>
                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={()=> signInWithEmail()}>
                                    <ActivityIndicator hidesWhenStopped={true} animating={indicatorAnimating} color="#0000ff" style={{ position: 'absolute', alignSelf: 'center' }} />
                                    <Text style={styles.loginText}>{loginText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setTab("register")} style={{flexDirection: 'row', marginTop: 20}}>
                                <Text>Don't have an account?</Text> 
                                <Text style={{color: 'rgb(48, 209, 88)'}}> Sign up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    )
        } else if(tab === "register") {
            if(isRegHasData !== true){
                //Register Screen
                return (
                    <View style={styles.container}>
                        <div id="captcha"></div>
                        <Text style={styles.headerText}>Create your account</Text>
                        <MobileInput placeholder={"Email Address"} onChangeText={(text) => registerInfo.email = text}/>
                        <MobileInput placeholder={"Phone Number"} onChangeText={(text) => registerInfo.phone = text}/>
                        <MobileInput placeholder={"Password"} secureTextEntry={true} onChangeText={(text) => registerInfo.password = text}/>
                        {/* <PrivacyPolicyText/> */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={()=> register()}
                            disabled={!registerInfo.email && registerInfo.password}
                            
                            >
                            <ActivityIndicator hidesWhenStopped={true} animating={indicatorAnimating} color="#0000ff" style={{ position: 'absolute', alignSelf: 'center' }} />
                            <Text style={styles.loginText}>{registerText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> setTab("login")} style={{flexDirection: 'row', marginTop: 20}}>
                        <Text>Already have an account?</Text> 
                        <Text style={{color: 'rgb(48, 209, 88)'}}> Login In</Text>
                        </TouchableOpacity>
                    </View>
                )
            } 
        } else if(tab === "confirmation") {
            //Show Verification Screen
            return (
                <View style={styles.regDisp}>
                    <Text style={styles.title}>Enter Verification code sent to {registerInfo.phone ?? loginInfo.email}</Text>
                    <MobileInput placeholder={"Verification Code"} onChangeText={(text) => registerInfo.code = text}/>
                    <View style={styles.buttonWrap}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={()=> { isLogin ? signInWithPhone() : confirmCode()} }>
                        <ActivityIndicator hidesWhenStopped={true} animating={indicatorAnimating} color="#0000ff" style={{ position: 'absolute', alignSelf: 'center' }} />
                        <Text style={styles.loginText}>Verify</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPressIn={()=>setIsRegHasData(false)}>
                        <Text style={{fontWeight:'600'}}>Change Number</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
        return (
            <View style={styles.container}>
                <View style={styles.alert}>
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

        loginContainer: {

            // alignItems: 'center', 
            // justifyContent:'center'
        },
    
        alert: {
            backgroundColor: 'white',
            width: '90%',
            shadowColor: "#000",
            shadowOpacity: 0.13,
            shadowRadius: 10.68,
            padding: 20,
            borderRadius: 5 
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
        }, 


        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'white'
          },
        
          headerText: {
            fontSize: 30,
            marginTop: 0,
            fontWeight: '490', 
          },
        
          inputTitle: {
            fontWeight: '490'
          },
        
          textStyle: {
            marginBottom: 10,
            color: "black",
            fontSize: 17,
          },
        
          formContainer: {
            // marginTop: 50,
            height: 500,
            padding: 0,
            borderRadius: 8.0,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'rgba(219,219,219, 1)',
            borderWidth: windowWidth < phoneMaxWidth ? 0 : 1,
          },
        
          input: {
            marginTop: 8,
            padding: 8,
            padding: 8,
            fontSize: 14,
            borderColor: '#d6d6d6',
            borderWidth: 1,
            borderRadius: 5,
            height: 50,
            backgroundColor: 'white'
          },
        
          loginButton: {
            borderWidth: 1,
            borderRadius: 6,
            marginTop: 40,
            height: 50,
            justifyContent: "center",
            borderColor: 'rgba(27, 31, 35, 0.15)',
            backgroundColor: 'rgb(48, 209, 88)'
          },
        
          loginText: {
            color: 'white',
            textAlign: "center",
            fontWeight: '500',
            fontSize: 15
          },
    });

export default AuthenticatePage;