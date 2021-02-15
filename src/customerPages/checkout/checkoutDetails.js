import React, {useState} from "react";
import { View, TouchableOpacity, TextInput, ActivityIndicator, Text, Animated, Dimensions} from "react-native";
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import { useTheme } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'
const { height } = Dimensions.get("window")

import Geocoder from 'react-native-geocoding';
import { ScrollView } from "react-native-gesture-handler";
Geocoder.init("AIzaSyBNaHVtCYg7DcmHfKNtiuTV2REcWwonbH4"); // use a valid API key

function CheckoutDetails(props) {

    const navigation = props.navigation
    const params = props.route.params

    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")

    const [street, setStreet] = useState("")
    const [apt, setApt] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [state, setState] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState({phoneNumber: "", phoneNumberFormat: ""})

    const [disable, setDisable] = useState(true)
    const [indicatorAnimating, setIndicatorAnimating] = useState(false)

    const globalStyles = useGlobalStyles()

    const {colors} = useTheme()

    var [scrollY, setScrollY] = useState(new Animated.Value(0))

    var separatorWidth = scrollY.interpolate({
        inputRange: [0, 40],
        outputRange: ['90%', '100%']
    });

    const checkIsDisabled = () => {
        if(!firstName || !lastName || !street ||
        !zipCode || !state || !emailAddress || !phoneNumber.phoneNumber) {
            setDisable(true)
            } else {
            setDisable(false)
        }
    }

    const validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          setEmailAddress(text)
          return false;
        }
        else {
          setEmailAddress(text)
          console.log("Email is Correct");
        }
      }

    const submit = () => {
        // Verify Address
        setIndicatorAnimating(true)
        const enteredAddress = [apt, street, zipCode, state].join(' ')
        const name = [firstName, lastName].join(' ')

        try { 
            Geocoder.from(enteredAddress)
                .then(json => {
                setIndicatorAnimating(false)
                let location = json.results[0].formatted_address
                const data = {
                    ...params, 
                    name: name,
                    personal: {
                        emailAddress: emailAddress, 
                        phoneNumber: phoneNumber,
                    },
                    address: {
                        apt: apt, 
                        street: street,
                        state: state, 
                        zipCode: zipCode,
                    },
                    location: location
                }
                if (enteredAddress != location) {
                    navigation.navigate("VerifyAddress", data)
                } else {
                    navigation.navigate("AddAllergies", data)
                }
            })
        } catch (error) {
            alert(error);
        }
    }
        

    return (
        <View style={globalStyles.backgroundPrimary}>
                <NavBar separatorWidth={separatorWidth} title={"Checkout"} rightIcon={params.total} navigation={navigation}/> 
                <Animated.View style={[globalStyles.border, styles.separator, {width: separatorWidth}]} />

                <ScrollView style={{position: 'relative', height: height}}
                
                scrollEventThrottle={30}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset:  { y: scrollY }}}],
                )}>

                <View style={{ padding: 20, marginTop: 80, width: '100%'}}>
                    <Text style={[globalStyles.textPrimary, {fontSize: 26}]}>Where should we send your order?</Text>
                </View>
                
                <View style={styles.inputContainerWrapper}>
                <Text style={[globalStyles.textPrimary, {fontSize: 19, alignSelf: 'flex-start'}]}>Enter your name and address: </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={globalStyles.formInput}
                        placeholder="First Name"
                        autoCorrect={false}
                        textContentType={"fullStreetAddress"}
                        onChangeText={(text) => {setFirstname(text)}}/>
                    </View>
                    <View style={styles.inputContainer}>
                    <TextInput
                        style={globalStyles.formInput}
                        placeholder="Last Name"
                        autoCorrect={false}
                        textContentType={"fullStreetAddress"}
                        onChangeText={(text) => {setLastname(text);checkIsDisabled()}}/>
                    </View>

                    <View style={styles.inputContainer}>
                    <TextInput
                        style={globalStyles.formInput}
                        placeholder="Street Address"
                        autoCorrect={false}
                        textContentType={"fullStreetAddress"}
                        onChangeText={(text) => {setStreet(text);checkIsDisabled()}}/>
                    </View>

                    <View style={styles.inputContainer}>
                    <TextInput
                        style={globalStyles.formInput}
                        placeholder="Apt, Suite, Bldg. (Optional)"
                        autoCorrect={false}
                        textContentType={"addressCity"}
                        onChangeText={(text) => {setApt(text);checkIsDisabled()}}/>
                    </View>
                    <View style={styles.inputContainer}>
                    <TextInput
                        style={globalStyles.formInput}
                        placeholder="Zip Code"
                        autoCorrect={false}
                        textContentType={"postalCode"}
                        onChangeText={(text) => {setZipCode(text);checkIsDisabled()}}/>
                    </View>
                    <View style={styles.inputContainer}>
                    <TextInput
                        style={globalStyles.formInput}
                        placeholder="City, State"
                        autoCorrect={false}
                        textContentType={"addressState"}
                        onChangeText={(text) => {setState(text);checkIsDisabled()}}/>
                    </View>
                </View>

                <View style={styles.inputContainerWrapper}>
                <Text style={[globalStyles.textPrimary, {fontSize: 19, alignSelf: 'flex-start'}]}>What's your contact information: </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={globalStyles.formInput}
                        placeholder="Email Address"
                        autoCorrect={false}
                        textContentType={"fullStreetAddress"}
                        onChangeText={(text) => {validateEmail(text); checkIsDisabled()}}
                        value={emailAddress}
                        />
                        <Text style={globalStyles.textSecondary}>
                            We’ll email you a receipt and send order updates.
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>

                    <TextInputMask
                        placeholder={"Phone Number"}
                        value={phoneNumber.phoneNumberFormat}
                        onChangeText={(phoneNumberFormat) => {
                            let phoneNumber = phoneNumberFormat.toString().replace(/\D+/g, '');
                            setPhoneNumber({phoneNumber: phoneNumber, phoneNumberFormat: phoneNumberFormat});
                            checkIsDisabled()
                        }}
                        type={'cel-phone'}
                        maxLength={phoneNumber.phoneNumberFormat.toString().startsWith("1") ? 18 : 16}
                        options={
                            phoneNumber.phoneNumber.startsWith("1") ?
                                {
                                    dddMask: '9 (999) 999-'
                                } : {
                                    dddMask: '(999) 999-'
                                }
                        }
                        style={globalStyles.formInput}/>

                        <Text style={globalStyles.textSecondary}>
                        The phone number you enter can’t be changed after you place your order, so please make sure it’s correct.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity disabled={disable} onPress={()=> submit()} style={ [disable ? globalStyles.btnPrimaryDisabled : globalStyles.btnPrimary, {marginTop: 60, marginBottom: 60, position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={styles.textCentered}>{indicatorAnimating? "" : "Continue to Payment"}</Text>
                    <ActivityIndicator hidesWhenStopped={true} animating={indicatorAnimating} color={colors.textSecondary} style={{marginBottom: 16, alignSelf: 'center'}} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default CheckoutDetails