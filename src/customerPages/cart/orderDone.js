import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from '../storeFront/storeFront.style'

function OrderDone(props) {
    const navigation = props.navigation
    const email = props.email 

    const goBack = () => {
        navigation.navigate('Store', {items: []});
    }

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center', margin: 20}}>
                <Text style={{fontWeight: '600', fontSize: 20}}>Thank you for shopping with us</Text>
                <Text style={{textAlign: 'center'}}>We've send you a confirmation email to {email}</Text>
                <TouchableOpacity style={{marginTop: 40}} onPress={()=> goBack()}>
                    <Text style={{fontSize: 17, fontWeight: '500'}}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderDone