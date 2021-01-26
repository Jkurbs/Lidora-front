import React, { useState, useEffect, createRef } from "react";
import { pure } from "recompose";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from "./storeFront.style";
import firebase from "../../firebase/Firebase";

import NavBar from "./mainNavBar";
import Menu from "../menu/menu";
import Sheet from "./bottomSheet";
import CardScreen from "../cart/cart";
import CheckoutScreen from "../cart/checkout";
import AuthenticateScreen from "../../components/customerComponents/authenticatePage";
import CustomerSettingsScreen from "../settings/CustomerSettings";
import PaymentScreen from "../cart/payments/payments";
import AddPaymentScreen from "../cart/payments/addPayments";
import AddressScreen from "../cart/addAdress";
import PhoneScreen from "../cart/addPhoneNumber";
import EmailScreen from "../cart/addEmail";

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

  const addToBag = (item) => {
    if (bag.length != 0) {
      bag.forEach(async function (element) {
        if (element.combo != null) {
          alert("You can only order for one day at a time");
          return;
        }
        if (element.key === item.key) {
          const currentQuantity = element.quantity;
          const currentTotal = element.total;
          const itemQuantity = item.quantity;
          const itemTotal = item.total;

          if (currentQuantity !== itemQuantity) {
            return;
          }
        }
      });
    }
    setBag((oldArray) => [...oldArray, item]);
  };

  return (
    <View style={styles.container}>
      <NavBar chefId={chef.id} navigation={navigation} />
      <Menu ref={ref} storeName={storeName} chef={chef} chefId={chef.id} selectedItem={(item, data) =>
          setSelectedItem({ item: item, data: data })
        }
      />
      <Sheet
        selectedItem={selectedItem}
        ref={ref}
        item={(item) => {
          addToBag(item);
        }}
      />
      {bag.length === 0 ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Card", { chef:chef, items: bag })}
          style={[
            styles.mainButton,
            { position: "absolute", marginBottom: 10, bottom: 40 },
          ]}
        >
          <Text style={styles.mainButtonText}>View Cart</Text>
          <View style={styles.mainButtonAccessory}>
            <Text style={styles.mainButtonAccessoryText}>{bag.length}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

function App(props) {
  const storeName = props.storeName.toLowerCase();
  const [chef, setChef] = useState({});

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
              if (!isCancelled) {
                setChef(chef);
              }
            } else {
              console.log("Chefs doesn't exist");
            }
          });
        });
    }
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Store"
        screenOptions={{ headerShown: false }}
      >
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
        <Stack.Screen name="Add Payment" component={AddPaymentScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Phone Number" component={PhoneScreen} />
        <Stack.Screen name="Email Address" component={EmailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default pure(App);
