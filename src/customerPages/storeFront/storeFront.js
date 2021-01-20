
import React, { useState, useEffect, createRef } from "react";
import { pure } from 'recompose';
import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from './storeFront.style'
import firebase from "../../firebase/Firebase"

import NavBar from '../navBar'
import Menu from './menu'
import Sheet from './bottomSheet'
import CheckoutScreen from '../card';
import AuthenticateScreen from '../../components/customerComponents/authenticatePage';
import CustomerSettingsScreen from '../CustomerSettings'
import PaymentScreen from '../payments/payments'
import AddPaymentScreen from '../payments/addPayments'
import { List } from 'react-native-paper';

const Stack = createStackNavigator();

var db = firebase.firestore();
const ref = createRef();

function StoreFront(props) {

    const storeName = props.storeName
    const navigation = props.navigation
    const chef = props.chef

    // States Bag
    const [selectedItem, setSelectedItem] = useState({item: {}, data: []})
    const [bag, setBag] = useState([]) 

    const addToBag = (item) => {
        if (bag.length != 0) {
            for (var i in bag) {
                if (bag[i].key == item.key) {
                    const currentQuantity =  bag[i].quantity + item.quantity
                    const currentTotal =  bag[i].total
                    console.log("Quantity: ", currentQuantity)
                    bag[i].quantity = currentQuantity + item.quantity
                    bag[i].total = currentTotal + item.total
                    break; 
                }
            }
            return
        } else {
            setBag(oldArray => [...oldArray, item])
        }
    }

    return (   
        <View style={[styles.container]}>
        <NavBar quantity={bag.length} items={bag} chefId={chef.id} navigation={navigation}/>
        <Menu ref={ref} storeName={storeName} chef={chef} chefId={chef.id} selectedItem={(item, data) => setSelectedItem({item: item, data: data})}/>
        <Sheet selectedItem={selectedItem} ref={ref} item={ (item) => {addToBag(item)}}/>
        </View>        
    );
}

function App(props) {
    const storeName = props.storeName.toLowerCase()
    const [chef, setChef] = useState({})

    useEffect(() => {
        let isCancelled = false;
        async function fetchData() {
             await db.collection('chefs').where("storeName", "==", storeName).get().then(function (querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if (doc.exists) {
                        const chef = doc.data()
                        setChef(chef)
                    } else {
                        console.log("Chefs doesn't exist")
                    }
                });
            })
        }
        fetchData();
        return () => {
            isCancelled = true;
          };
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Store" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Store">
                {props => <StoreFront {...props} chef={chef} storeName={storeName} screenOptions={{ headerShown: false, headerMode: "none", headerTransparent: true}} />}
            </Stack.Screen>
                <Stack.Screen name="Checkout" component={CheckoutScreen}/>
                <Stack.Screen name="Settings" component={CustomerSettingsScreen}/>
                <Stack.Screen name="Authenticate" component={AuthenticateScreen}/>
                <Stack.Screen name="Payments" component={PaymentScreen}/>
                <Stack.Screen name="AddPayments" component={AddPaymentScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default pure(App)