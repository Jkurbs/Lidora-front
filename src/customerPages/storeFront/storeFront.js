
import React, { useState, useEffect, createRef } from "react";
import { pure } from 'recompose';
import { View, Text, Image, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from './storeFront.style'
import firebase from "../../firebase/Firebase"

import NavBar from '../navBar'
import Menu from './menu'
import Sheet from './bottomSheet'
import CardScreen from '../cart';
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
            bag.forEach(async function(element) {
                if (element.combo != null) {
                    alert("You can only order for one day at a time")
                    return
                }
                if (element.key === item.key) {
                    
                    const currentQuantity =  element.quantity
                    const currentTotal =  element.total
                    const itemQuantity = item.quantity
                    const itemTotal =  item.total

                    if (currentQuantity !== itemQuantity) {
                        console.log("Bag: ", element.quantity)
                        return  
                    }
                } 
            })
        } 
        setBag(oldArray => [...oldArray, item])
    }

    return (   
        <View style={styles.container}>
        <NavBar quantity={bag.length} items={bag} chefId={chef.id} navigation={navigation}/>
        <Menu ref={ref} storeName={storeName} chef={chef} chefId={chef.id} selectedItem={(item, data) => setSelectedItem({item: item, data: data})}/>
        {/* <Sheet selectedItem={selectedItem} ref={ref} item={ (item) => {addToBag(item)}}/> */}
        { 
        bag.length === 0 ?
            null
        :
            <TouchableOpacity onPress={()=> navigation.navigate("Card", {items: bag})} style={{marginBottom: 10, justifyContent: 'center', borderRadius: 10, alignSelf: 'center', width: '80%', height: 60, backgroundColor: '#2EA44F', position: 'absolute',  bottom: 40}}>     
                <Text style={{alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 17}}>View Cart</Text>
                <View style={{position: 'absolute', right: 20, justifyContent: 'center', alignSelf: 'center', width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(000,000,000, 0.3)'}}>
                    <Text style={{alignSelf: 'center', color: 'white', fontWeight: '600'}}>{bag.length}</Text>
                </View>
            </TouchableOpacity>
        }
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
                        if (!isCancelled) { setChef(chef) }
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
                <Stack.Screen name="Card" component={CardScreen}/>
                <Stack.Screen name="Settings" component={CustomerSettingsScreen}/>
                <Stack.Screen name="Authenticate" component={AuthenticateScreen}/>
                <Stack.Screen name="Payments" component={PaymentScreen}/>
                <Stack.Screen name="AddPayments" component={AddPaymentScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default pure(App)