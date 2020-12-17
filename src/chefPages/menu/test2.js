import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated,Dimensions } from "react-native";
import { registerRootComponent } from "expo";
import firebase from '../../firebase/Firebase';
import "firebase/firestore";
import VerifyModal from '../../components/customerComponents/verifyModal.js';
import AuthenticatePage from '../../components/customerComponents/authenticatePage.js';


var db = firebase.firestore();
const ref = db.collection('chefs')

const getWidth = Dimensions.get('window').width;

function Test2() {


    if('bread' === 'bead'){
        return (
            <>
            <p>YOLOSWAGEMeme</p>
            <VerifyModal />
            </>
        )
    }
    else {
        return (
            <>
            <AuthenticatePage />
            </>
        )
    }

    
}


export default registerRootComponent(Test2);

