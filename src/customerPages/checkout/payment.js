import React, {useState} from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Elements } from '@stripe/react-stripe-js';
import { Entypo } from '@expo/vector-icons';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTheme } from '@react-navigation/native'
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../../globalStyle'
import styles from '../storeFront/storeFront.lightStyle'

const stripePromise = loadStripe('pk_live_51HL8h8LjpR7kl7iGMg89FdezKE0JY7zv5WCTEadr412FNtAfKm696c6AGzSZ6ZJ78VHagOO8h9JTG5ZbqMP55ssi00IGoIL2jT');

function AddPayments(props) {

    const params = props.props.route.params;
    const stripe = useStripe();
    const elements = useElements();
    const navigation = props.props.navigation
    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();

    const [disable, setDisable] = useState(false)

    const addCart = () => {
        setDisable(true)
        if (!stripe || !elements) { setDisable(false); return }
        const cardElement = elements.getElement(CardElement);
        stripe.createToken(cardElement).then(function(result) {
            if (result.error != null) { setDisable(false); alert(result.error.message); return }
            setDisable(false)
            const data = {
                ...params, 
                card: result
            }
            navigation.navigate('Checkout', data);
        });
    };

    return (
      <View style={globalStyles.backgroundPrimary}>
        {/* Header */}
           <NavBar title={"Checkout"} rightIcon={params.total} navigation={navigation}/>
           <View style={{padding: 20, marginTop: 70, width: '100%'}}>
                <Text style={[globalStyles.textPrimary, {fontSize: 24, marginBottom: 20}]}>How do you want to pay?</Text>
                <Text style={{color: colors.textSecondary ,  alignSelf: 'flex-start'}}>Enter your card information:</Text>
             </View>
            <View style={[globalStyles.formInput, {marginTop: 0, marginLeft: 20, marginRight: 20, justifyContent: 'center', padding: 8 }]}>
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
        <TouchableOpacity onPress={()=> addCart()} style={ [disable ? globalStyles.btnPrimaryDisabled : globalStyles.btnPrimary, {marginTop: 100, bottom: 0, position: 'relative'}]}> 
            <Text style={styles.textCentered}>{disable ? "":"Continue to Review"}</Text>
            <ActivityIndicator hidesWhenStopped={true} animating={disable} color={colors.textSecondary} style={{ position: 'absolute', alignSelf: 'center' }} />
        </TouchableOpacity>
        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Entypo name="lock" size={12} color="#6A737D"/>
            <Text style={globalStyles.textTertiary}>Payments are processed securely.</Text>
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