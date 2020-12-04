import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Modal } from 'react-native';
import MainButton from './buttons/mainButton'
import RegularButton from './buttons/regularButton'
import AnimatedHideView from 'react-native-animated-hide-view';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import firebase from '../firebase/Firebase';
import "firebase/firestore";

var db = firebase.firestore();
const ref = db.collection('chefs')

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const options = () => ({
    style: {
        base: {
            fontSize: '13px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
})


const Alert = ({ isVisible, stripePromise }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
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

        CardElement.currency = 'usd'
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        stripe.createToken(cardElement).then(function (result) {
            // Handle result.error or result.token
            const cardId = result.token.card.id
            console.log("TOKEN: ", result.token)
            const token = result.token.id
            // Send token and id to firebase 
            ref.doc('spE8oRHDBChYPTVgF8BayBTJKmP2').collection('external_accounts').doc(cardId).set({
                token: token,
            });
        });
    };

    return (
        <AnimatedHideView visible={isVisible} style={styles.container}>
            <View style={styles.alert}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Add external account</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Image style={styles.image} source={require('../assets/icon/visa.png')} />
                        <Image style={styles.image} source={require('../assets/icon/mastercard.png')} />
                        <Image style={styles.image} source={require('../assets/icon/discover.png')} />
                        <Image style={styles.image} source={require('../assets/icon/americanExpress.png')} />
                    </View>
                </View>
                <View style={[styles.input, styles.cardInput]}>
                    <CardElement
                        options={{ options }}
                    />
                </View>
                {/* 
                <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <View style={styles.input}>
                        <CardExpiryElement
                            options={{ options }}
                        />
                    </View>

                    <View style={styles.input}>
                        <CardCvcElement
                            options={{ options }}
                        />
                    </View>
                </View> */}
                <Text style={styles.secondaryText}>Your payment methods are saved and stored securely.</Text>
                <View style={styles.buttonContainer}>
                    <RegularButton text={"Cancel"} />
                    <MainButton action={handleSubmit} indicatorAnimating={false} text={"Add"} />
                </View>
            </View>
        </AnimatedHideView >
    )
};




const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        height: '100%',
        width: windowWidth,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 99999,
    },

    alert: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: 550,
        height: 250,
        alignSelf: 'center',
        padding: 30,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68
    },

    cardInput: {
        width: '100%',
    },

    input: {
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 5,
        height: 42,
        width: '49%',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 8
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16
    },

    image: {
        width: 40,
        height: 25,
    },

    secondaryText: {
        marginTop: 8,
        fontSize: 12,
        color: '#9F9F9F'
    },

    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'flex-end',
        bottom: 10
    }
});

export default Alert;