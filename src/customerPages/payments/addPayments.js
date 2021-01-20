import React, { useState, useRef, useEffect } from "react";
import { View, Image, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Elements } from '@stripe/react-stripe-js';
import { Entypo } from '@expo/vector-icons';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { showMessage, hideMessage } from "react-native-flash-message";

const stripePromise = loadStripe('pk_test_51HL8h8LjpR7kl7iGeWLOW7OGQw2qAix0ToeOkzAgOUceEiOUDsGDmuDI1tQyNWSkOiQvdwOxFBpQEw4rBoDuI3Dc00i6Fa8VWD');

import firebase from "../../firebase/Firebase"
import "firebase/auth";
var db = firebase.firestore();
const ref = db.collection('customers')

function AddPayments(props) {

    var user = firebase.auth().currentUser;
    const stripe = useStripe();
    const elements = useElements();
    const navigation = props.props.navigation

    const addCart = async () => {
        // Block native form submission.
        // event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.

        const cardElement = elements.getElement(CardElement);
        // Use your card Element with other Stripe.js APIs
        stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {name: user.displayName, email: user.email, phone: user.phoneNumber},
        })
        .then(({paymentMethod}) => {
            const cardId = paymentMethod.id
            ref.doc(user.uid).collection('payment_methods').doc(cardId).set(paymentMethod);
            alert("Card successfully added.")
            navigation.goBack()
        });
    };

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}}>
            <Text style={{fontWeight: '500', fontSize: 18}}>Add Payments</Text>
               <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=> {navigation.goBack()} } style={{  }}>
                      <Entypo name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
               </View>
               <View style={{ position: 'absolute', right: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={()=> {addCart()} }>
                    <Text>Save</Text>
                  </TouchableOpacity> 
                </View>
           </View>
            <View style={{ height: 60, width: '100%', justifyContent: 'center', padding: 8}}>
                <CardElement/>
            </View>
    </View>
    )
}

function App(props) {
    return (
        <Elements stripe={stripePromise}>
            <AddPayments props={props}/>
        </Elements>
    )
}

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});

export default App