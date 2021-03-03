import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from '../storeFront/storeFront.lightStyle'
import useGlobalStyles from '../../globalStyle'


function OrderDone(props) {
    const navigation = props.navigation
    const email = props.route.params.email 
    const items = props.route.params.items 
    const globalStyle = useGlobalStyles()

    const goBack = () => {
        items.length = 0
        navigation.navigate("Store", {items: []})
    }

    return (
        <View style={globalStyle.backgroundPrimary}>
            <View style={[ globalStyle.backgroundPrimary, {alignItems: 'center', justifyContent: 'center', alignSelf: 'center', margin: 20}]}>
                <Text style={[globalStyle.textPrimary, {fontSize: 20}]}>Thank you for shopping with us</Text>
                <Text style={[globalStyle.textSecondary, {textAlign: 'center'}]}>We've send you a confirmation email to {email}</Text>
                <TouchableOpacity style={{marginTop: 40}} onPress={()=> goBack()}>
                    <Text style={globalStyle.textPrimary}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderDone