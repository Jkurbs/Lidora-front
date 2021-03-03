import React, { useState, useEffect, createRef } from "react";
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import { pure } from "recompose";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import useGlobalStyles from '../../globalStyle'
import styles from "./storeFront.lightStyle";
import firebase from "../../firebase/Firebase";

import NavBar from '../navigation/mainNavBar';
import Menu from "../menu/menu";
import Sheet from './bottomSheet/bottomSheet'
import CardScreen from "../checkout/cart";
import CheckoutScreen from "../checkout/checkout";
import AuthenticateScreen from "../../components/customerComponents/authenticatePage";
import CustomerSettingsScreen from "../settings/CustomerSettings";
import PaymentScreen from "../checkout/payment";
import AddAllergiesScreen from "../checkout/allergies";
import AddPaymentScreen from "../checkout/payments/addPayments";
import ScheduleScreen from '../checkout/schedule'
import OrderDoneScreen from '../checkout/orderDone'

import CheckoutDetailsScreen from '../checkout/checkoutDetails'
import VerifyAddress from '../checkout/verifyAddress'

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}



function getDistance(latitude1, longitude1, latitude2, longitude2) {  
  const earth_radius = 6371;

  const dLat = degrees_to_radians(latitude2 - latitude1);  
  const dLon = degrees_to_radians(longitude2 - longitude1);  

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(degrees_to_radians(latitude1)) * Math.cos(degrees_to_radians(latitude2)) * Math.sin(dLon/2) * Math.sin(dLon/2);  
  const c = 2 * Math.asin(Math.sqrt(a));  
  const d = earth_radius * c;  
  return d;  
}

const CustomDefaultTheme = {
  colors: {
    ...DefaultTheme.colors,
    background: "#f6f8fa",
    bgSecondary: 'white',
    bgTertiary: '#FAFBFC',
    bgCanvas: 'white',

    // Inputs 
    inputBg: 'white',
    inputBorder: '#e1e4e8',
    inputTextColor: 'black',

    // Texts 
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textTertiary: '#6a737d',
    textPlaceholder: '#6a737d',
    textDisabled: '#6a737d',
    textInverse: 'white',
    textLink: '#0366d6',
    textDanger: '#cb2431',
    textSuccess: '#22863a',
    textWarning: '#b08800',
    textWhite: '#fff',

    // Borders 
    borderPrimary: '#e1e4e8',
    borderSecondary: '#eaecef',
    borderTertiary: '#d1d5da',
    borderOverlay: '#e1e4e8',
    borderInverse: '#fff',
    borderInfo: '#0366d6',
    borderDanger: '#d73a49',
    borderSuccess: '#34d058',
    borderWarning: '#f9c513',

    // Btn 
    btnText: '#24292e',
    btnBg: '#fafbfc',
    btnBorder: 'rgba(27,31,35,0.15)',
    btnShadow: '0 1px 0 rgba(27,31,35,0.04)',
    btnInsetShadow: '0 1px 0 hsla(0,0%,100%,0.25)',
    btnHoverBg: '#f3f4f6',
    btnHoverBorder: 'rgba(27,31,35,0.15)',
    btnSelectedBg: '#edeff2',
    btnFocusBg: '#fafbfc',
    btnFocusBorder: 'rgba(27,31,35,0.15)',
    btnFocusShadow: '0 0 0 3px rgba(3,102,214,0.3)',
    btnPrimaryText: 'white',
    btnPrimaryBg: '#2ea44f',
    btnPrimaryBorder: 'rgba(27,31,35,0.15)',
    btnPrimaryShadow: '0 1px 0 rgba(27,31,35,0.1)',
    btnPrimarySnsetShadow: ' 0 1px 0 hsla(0,0%,100%,0.03)',
    
    deletionText: '#cb2431',
    deletionBg: '#ffeef0',
    deletionBorder: '#d73a49'
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,

    background: "#0d1117",
    bgSecondary: '#0d1117',
    bgTertiary: '#21262d',
    bgCanvas: '#0d1117',
    card: "rgb(255, 255, 255)",
    notification: "rgb(255, 69, 58)",


    // Texts 
    textPrimary: '#C9D1D9',
    textSecondary: '#8b949e',
    textTertiary: '#8b949e',

    textLink: '#58a6ff',
    textDanger: '#f85149',
    textSuccess: '#56d364',
    colorTextWarning: '#e3b341',
    textWhite: '#f0f6fc',

    // Inputs 
    inputBg: '#0d1117',
    inputBorder: '#21262d',
    inputTextColor: 'white',

    // Primary btn
    btnPrimaryBg: '#238636',
    btnPrimaryBorder: '#2ea043',
    btnBg: '#21262d',

    // Border 
    borderPrimary: '#30363d',
  },
};

const Stack = createStackNavigator();

var db = firebase.firestore();
const ref = createRef();


function StoreFront(props) {

  const storeName = props.storeName;
  const navigation = props.navigation;
  const chef = props.chef;

  // States Bag
  const [selectedItem, setSelectedItem] = useState({ item: {}, data: [] });
  const [bag, setBag] = useState([]);
  const globalStyles = useGlobalStyles();

  const addToBag = (item) => {
    var index = bag.findIndex(x => x.name == item.name); 
    index === -1 ? setBag((oldArray) => [...oldArray, item]) : updateItems(item)
  };

  const updateItems = (item) => {
    const updatedItem = bag.find((element) => { return element.key === item.key })
    updatedItem.quantity += item.quantity
    updatedItem.total += item.total
  }

  

  return (
    <View style={globalStyles.backgroundPrimary}>
      {/* <NavBar chefId={chef.id} navigation={navigation} /> */}

      <Menu ref={ref} storeName={storeName} chef={chef} chefId={chef.id} selectedItem={(item, data) =>
          setSelectedItem({ item: item, data: data })
        }
      />
      <Sheet
        selectedItem={selectedItem}
        ref={ref}
        item={(item) => {
          addToBag(item);
        }}/>
      {bag.length === 0 ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Card", { chef:chef, items: bag })}
          style={[styles.buttonPrimary, globalStyles.btnPrimary]}>
          <Text style={styles.textCentered}>View Cart</Text>
          <View style={styles.primaryButtonAccessory}>

            <Text style={styles.primaryButtonSecondaryText}>{bag.length}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

function App(props) {

  const storeName = props.storeName.toLowerCase();
  const location = props.location 
  const [chef, setChef] = useState({});
  const scheme = useColorScheme();

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      await db
        .collection("chefs")
        .where("storeName", "==", storeName)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              const chef = doc.data();
              // Check location
              navigator.geolocation.getCurrentPosition(function(position) {
                const distance = getDistance(position.coords.latitude, position.coords.longitude, chef.latitude, chef.longitude);
                if (distance < 100) {
                  console.log("Within 20 kilometer radius");
                } else {
                  alert(`Oops...it seems that you're located too far from ${chef.title}`)
                }
              })
              if (!isCancelled) {
                setChef(chef);
              }
            } else {
              // Chef doesn't exist
            }
          });
        });
    }
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
  
}, []);


  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
        <Stack.Navigator
          initialRouteName="Store"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Store">
            {(props) => (
              <StoreFront
                {...props}
                chef={chef}
                storeName={storeName}
                screenOptions={{
                  headerShown: false,
                  headerMode: "none",
                  headerTransparent: true,
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Card" component={CardScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Settings" component={CustomerSettingsScreen} />
          <Stack.Screen name="Authenticate" component={AuthenticateScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="AddAllergies" component={AddAllergiesScreen} />
          <Stack.Screen name="Add Payment" component={AddPaymentScreen} />
          <Stack.Screen name="Schedule deliveries" component={ScheduleScreen} />
          <Stack.Screen name="Order Done" component={OrderDoneScreen} />
          <Stack.Screen name="CheckoutDetails" component={CheckoutDetailsScreen} />
          <Stack.Screen name="VerifyAddress" component={VerifyAddress} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default pure(App);