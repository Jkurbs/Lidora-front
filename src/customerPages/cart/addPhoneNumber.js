import React, {useState} from "react";
import { View, TextInput, Text } from "react-native";
import NavBar from '../navigation/navBar'
import styles from '../storeFront/storeFront.style'

function AddPhoneNumber(props) {
    const navigation = props.navigation
    const addedPhone = props.route.params.addedPhone

    const [phone, setPhone] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

    const checkIsDisabled = () => {
        const isEmpty = (phone === null)
        setIsDisabled(isEmpty)
    }

    const save = () => {
      props.route.params.back({type: "Phone", data: phone})
      navigation.navigate('Checkout');
    }
    
    return (
        <View style={styles.container}>
        <NavBar title={"Add Phone Number"} rightButtonPressed={save} rightIcon={"Save"} navigation={navigation} isDisabled={isDisabled}/>
        <View style={{ padding: 20, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={styles.inputTitle}>Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Required"
                    defaultValue={addedPhone ?? ""}
                    textContentType={"telephoneNumber"}
                    onChangeText={(text) => {setPhone(text);checkIsDisabled()}}/>
                </View>
            </View>
        </View>
    )
}
export default AddPhoneNumber