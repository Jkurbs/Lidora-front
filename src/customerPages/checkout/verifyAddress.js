import React from "react";

import { View, Image, TouchableOpacity, Text} from "react-native";
import useGlobalStyles  from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyBNaHVtCYg7DcmHfKNtiuTV2REcWwonbH4"); // use a valid API key

function VerifyAddress(props) {

    const navigation = props.navigation
    const params = props.route.params
    const location = params.location 
    const address = params.address
    const globalStyles = useGlobalStyles()
    const {colors} = useTheme()

    const enteredAddress = [address.apt, address.street, address.zipCode, address.state].join(' ')

    const submit = (useRecommended) => {
        const data = {
            ...params, 
        }
        if (useRecommended) { 
            data["location"] = location
        } else {
            data["location"] = enteredAddress
        }
        navigation.navigate("AddAllergies", params)
     };
    
    return (
        <View style={globalStyles.backgroundPrimary, {marginBottom: 60}}>
            <TouchableOpacity style={{padding: 20}} onPress={()=> navigation.pop()}> 
                <Ionicons name={"md-close"} size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <View style={{ padding: 20, marginTop: 40, width: '100%'}}>
                <Text style={[globalStyles.textPrimary, {fontSize: 24, marginBottom: 20}]}>Use recommended
                    address instead?
                 </Text>
                 <Text style={[globalStyles.textPrimary, {alignSelf: 'flex-start'}]}>We’re unable to verify your address, but found a close match.</Text>
             </View>

             <View style={{width: '60%', padding: 20}}>
             <View style={{marginBottom: 20}}>
                <Text style={globalStyles.textPrimary}>You entered</Text>
                <Text style={globalStyles.textSecondary}>{enteredAddress}</Text>
            </View>
            <View>
                <Text style={globalStyles.textPrimary}>Recommended</Text>
                <Text style={globalStyles.textSecondary}>{location}</Text>
            </View> 
             </View>

            <TouchableOpacity onPress={()=> submit(true)} style={ [globalStyles.btnPrimary, {marginTop: 60 , position: 'relative'}]}> 
                <Text style={styles.textCentered}>{"Use Recommended"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> submit()}> 
                <Text style={[styles.textCentered, {color: colors.btnPrimaryBg}]}>{"Use Your Address"}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default VerifyAddress