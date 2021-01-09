import React , { Component, useState } from "react";

import { View, Image, Text, SectionList, TouchableOpacity, Dimensions } from "react-native";

import firebase from "../../firebase/Firebase";
import styles from './storeFront.style'
import "firebase/firestore";
// import authNative from '@react-native-firebase/auth'

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import EmptyBag from '../../components/emptyBagView'
import VerifyModal from '../../components/customerComponents/verifyModal'
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import BottomSheet from 'reanimated-bottom-sheet';
import { auth } from "firebase";
import firebaseApp from "../../firebase/Firebase";
import * as firebase2 from 'firebase'
const { height } = Dimensions.get("window")


var db = firebase.firestore();

var provider = new auth.PhoneAuthProvider();
firebase.auth().useDeviceLanguage();

// var applicationVerifier = new auth.RecaptchaVerifier("recaptcha-container");

var unsubscribe

const FlatListItemSeparator = () => {
    return (
        //Item Separator
        <View style={styles.listItemSeparatorStyle} />
    );
};

function ChefCell(item) {
    return (
        <View>
            <ReactPlaceholder color='red' showLoadingAnimation={false} type='rect' ready={item != null} style={{ height: 250, width: '100%' }}>
                <Image style={styles.storeImage} source={{ uri: item.item.user.imageURL }} />
            </ReactPlaceholder>
            <View style={styles.storeInfoContainer}>
                <Text style={styles.title}>{item.item.user.title}</Text>
                <Text style={styles.description}>{item.item.user.description}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

function StoreInfoCell(item) {
    return (
        <View>
            <View style={{ margin: 20, marginTop: 10, marginBottom: 10 }}>
                <Text style={styles.description}>{item.item.user.city}, {item.item.user.state}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

function StoreFront(props) {
    const recaptchaVerifier = React.useRef(null);
    const [data, setData] = React.useState({ user: [] })
    const [menu, setMenu] = React.useState([])
    const [titles, setTitle] = React.useState({ headerTitle: "View Bag", LeftButtonTitle: "" })
    const [selectedItem, setSelectedItem] = React.useState({})
    const [bag, setBag] = React.useState([])
    const [verifyDisp, setVerifyDisp] = useState(true)
    const [userLoggedIn,setUserLoggedIn] = useState(false)
      // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const firebaseConfig = firebase2.apps.length ? firebase2.app().options : undefined
    const sheetRef = React.useRef(null);

    React.useEffect(() => {
        // Fetch Current chef 
        db.collection('chefs').doc(props.chefId).get().then(function (doc) {
            if (doc.exists) {
                setData({ user: doc.data() })
            } else {
                console.log("No such document!");
            }
        })
    }, [])

    React.useEffect(() => {
        // Fetch Current chef menu
        db.collection('chefs').doc(props.chefId).collection("menu").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    setMenu(oldArray => [...oldArray, doc.data()]);
                } else {
                    console.log("No such document!");
                }
            })
        })

    }, [])

    //Verify if customer is logged in
    React.useEffect(() => {
        unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            console.log(user,"USER")
            setUserLoggedIn(true)
            return
          } else {
            // No user is signed in.
            setUserLoggedIn(false)
          }
        })

    }, [])

    const checkLoggedIn = () => {

        
    }

    const loginUser = (info) => {
        console.log(info)
        console.log("LOGINBUTENPRESS")
        firebase
        .auth()
        .signInWithEmailAndPassword(info.email, info.password)
        .then(data => {
            console.log("SUCCESS")
        //   navigation.navigate('Dashboard', { navigation: navigation, userID: data.user.uid })
        //   setIndicatorAnimating(false)
        //   setLoginText("Login")
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // ...
        });
    }

    const regUser = (info) => {
        console.log(info)
        console.log("REGBUTENPRESS")
            firebase
            .auth()
            .createUserWithEmailAndPassword(info.email, info.password)
            .then(data => {
                console.log("regSUCCESS",data)
                console.log(data.user.uid)
                db.collection('customers').doc(data.user.uid).update({
                    phone: info.phone
                })
            })
            .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
            });
            verifyPhoneNumber(info.phone)

    }

    // Handle the verify phone button press
    async function verifyPhoneNumber(phoneNumber) {
        console.log("VERIFYINGPHONE",phoneNumber)
        const phoneProvider = new firebase2.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber('+17207052327',recaptchaVerifier.current)
        setConfirm(verificationId);
    }

  // Handle confirm code button press
    async function confirmCode() {
        try {
        const credential = auth.PhoneAuthProvider.credential(
            confirm.verificationId,
            code,
        );
        let userData = await auth().currentUser.linkWithCredential(credential);
        setUser(userData.user);
        } catch (error) {
        if (error.code == 'auth/invalid-verification-code') {
            console.log('Invalid code.');
        } else {
            console.log('Account linking error');
        }
        }
    }

    const selectItem = (item) => {
        console.log(item.item.ingredients)
        setSelectedItem(item.item)
        sheetRef.current.snapTo(1)
    }

    const dismissItem = () => {
        setSelectedItem(null)
        sheetRef.current.snapTo(0)
    }

    const RenderIngredientsItem = (item) => (
        <Text style={{ margin: 8, padding: 8, fontWeight: '500', fontSize: 15 }}>{item.item?.name ?? ""}</Text>
    );

    const MenuCell = (item) => {
        return (
            <TouchableOpacity onPress={() => { selectItem(item) }} >
                <View style={{ alignItems: 'center', margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '70%' }}>
                        <Text style={styles.menuName}>{item.item.name}</Text>
                        <Text style={styles.menuDescription}>{item.item.description}</Text>
                        <Text style={styles.menuPrice}>${item.item.price}</Text>
                    </View>
                    <Image style={styles.menuImage} source={{
                        uri: item.item.imageURL,
                    }} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderContent = () => {
        if (bag.length === 0 && selectedItem === null) {
            return <EmptyBag />
        } else {
            <View style={{ backgroundColor: 'white', height: height }}>
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', maxWidth: '50%' }}>
                        <Text style={styles.menuName}>{selectedItem?.name ?? ""}</Text>
                        <Text style={styles.menuDescription}>{selectedItem?.description ?? ""}</Text>
                    </View>
                    <Image style={styles.menuImage} source={{
                        uri: selectedItem?.imageURL ?? "",
                    }} />
                </View>
                <View style={styles.listItemSeparatorStyle} />
                <SectionList
                    style={{ height: height, paddingBottom: 120 }}
                    keyExtractor={(item, index) => item + index}
                    sections={[
                        {
                            title: "Ingredients",
                            data: selectedItem?.ingredients ?? []
                        },
                    ]}
                    renderSectionHeader={({ section }) => {
                        if (section.title === "user") { return null } else {
                            return (
                                <View style={styles.headerView}>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                </View>
                            );
                        }
                    }}
                    renderItem={({ item, section }) => {
                        switch (section.title) {
                            case "Ingredients":
                                return <RenderIngredientsItem item={item} />
                            default:
                                break;
                        }
                    }}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    stickySectionHeadersEnabled={false}
                />
            </View>
        }
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { dismissItem() }} style={{ justifyContent: 'center', position: 'absolute', left: 8 }}>
                <Text style={{ color: '#34C759', fontSize: 15, fontWeight: '500' }}>{titles.LeftButtonTitle}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} onPress={() => { sheetRef.current.snapTo(1) }}>{titles.headerTitle}</Text>
            <View style={[styles.listItemSeparatorStyle, { position: 'absolute', bottom: 0 }]} />
        </View>
    )

    // Fetch chef
    return (
        <View style={styles.container}>
            <View>
                <SectionList
                    style={{ height: height, paddingBottom: 120 }}
                    keyExtractor={(item, index) => item + index}
                    sections={[
                        // homogenous rendering between sections
                        {
                            title: "user",
                            data: [data]
                        },
                        {
                            title: "Additional Info",
                            data: [data],
                        },
                        {
                            title: "Menu",
                            data: menu
                        },
                    ]}
                    renderSectionHeader={({ section }) => {
                        if (section.title === "user") { return null } else {
                            return (
                                <View style={styles.headerView}>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                </View>
                            );
                        }
                    }}
                    renderItem={({ item, section }) => {
                        switch (section.title) {
                            case "user":
                                return <ChefCell item={item} />
                            case "Additional Info":
                                return <StoreInfoCell item={item} />
                            case "Menu":
                                return <MenuCell item={item} />
                            default:
                                break;
                        }
                    }}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    stickySectionHeadersEnabled={false}
                />
            </View>
            <BottomSheet 
                borderRadius={10}
                ref={sheetRef}
                initialSnap={0}
                snapPoints={["10%", "90%"]}
                borderRadius={10}
                // enabledBottomClamp={true}
                // enabledBottomInitialAnimation
                enabledInnerScrolling={false}
                enabledGestureInteraction={false}
                enabledHeaderGestureInteraction={true}
                enabledContentGestureInteraction={true}
                renderContent={renderContent}
                renderHeader={renderHeader}

                onOpenStart={() => setTitle({ headerTitle: "", LeftButtonTitle: "Dismiss" })}
                onCloseStart={() => setTitle({ headerTitle: "View Bag", LeftButtonTitle: "" })}>

            </BottomSheet>
            <VerifyModal loginUser={loginUser} regUser={regUser} confirmCode={confirmCode} userLoggedIn={userLoggedIn} />
        </View>
    );
}

export default StoreFront