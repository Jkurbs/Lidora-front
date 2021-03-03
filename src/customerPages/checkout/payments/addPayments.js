import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Elements } from '@stripe/react-stripe-js';
import { Entypo } from '@expo/vector-icons';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useGlobalStyles from '../../../globalStyle'
import styles from '../../storeFront/storeFront.lightStyle'
import { useTheme } from '@react-navigation/native'
import NavBar from '../../navigation/navBar'


const stripePromise = loadStripe('pk_live_51HL8h8LjpR7kl7iGMg89FdezKE0JY7zv5WCTEadr412FNtAfKm696c6AGzSZ6ZJ78VHagOO8h9JTG5ZbqMP55ssi00IGoIL2jT');

import firebase from "../../../firebase/Firebase"
import "firebase/auth";
var db = firebase.firestore();
const ref = db.collection('customers')

function AddPayments(props) {

    var user = firebase.auth().currentUser;
    const stripe = useStripe();
    const elements = useElements();
    const navigation = props.props.navigation

    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();

    const addCart = () => {

        if (!stripe || !elements) { return }
  
        const cardElement = elements.getElement(CardElement);
        
        if (user != null) { 
          stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {name: user?.displayName ?? "", email: user?.email ?? "", phone: user?.phoneNumber ?? ""},
          })
          .then(({paymentMethod}) => {
              const cardId = paymentMethod.id
              ref.doc(user.uid).collection('payment_methods').doc(cardId).set(paymentMethod);
              alert("Card successfully added.")
              props.route.params.back({type: "Payment", data: paymentMethod})
              navigation.navigate('Checkout');
          });
        } else {
            stripe.createToken(cardElement).then(function(result) {
              props.props.route.params.back({type: "Payment", data: result})
              navigation.navigate('Checkout');
            });
        }
    };

    return (
      <View style={globalStyles.backgroundPrimary}>
        {/* Header */}
           <NavBar title={"Add Payments"} rightButtonPressed={addCart} rightIcon={"Save"} navigation={navigation}/>
           <View style={[globalStyles.formInput, {marginTop: 100, marginLeft: 20, marginRight: 20, justifyContent: 'center', padding: 8 }]}>
                <CardElement
                  options={{
                    style: {
                      base: {
                      
                        fontSize: '14px',
                        color: colors.inputTextColor,
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
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

export default App