import React, {useState} from "react";
import { View, TextInput, Text } from "react-native";
import NavBar from '../navigation/navBar'
import styles from '../storeFront/storeFront.style'

function AddEmail(props) {
    const navigation = props.navigation
    const addedEmail = props.route.params.addedEmail

    const [email, setEmail] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

    const checkIsDisabled = () => {
        const isEmpty = (email === null)
        setIsDisabled(isEmpty)
    }

    const save = () => {
      props.route.params.back({type: "Email", data: email})
      navigation.navigate('Checkout');
    }
    
    return (
        <View style={styles.container}>
        <NavBar title={"Add Email Address"} rightButtonPressed={save} rightIcon={"Save"} navigation={navigation} isDisabled={isDisabled}/>
        <View style={{ padding: 20, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Required"
                    textContentType={"emailAddress"}
                    defaultValue={addedEmail ?? ""}
                    onChangeText={(text) => {setEmail(text);checkIsDisabled()}}/>
                </View>
            </View>
        </View>
    )
}
export default AddEmail