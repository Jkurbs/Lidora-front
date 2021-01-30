import React, {useState} from "react";
import { View, TextInput, Text } from "react-native";
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'

function AddEmail(props) {
    const navigation = props.navigation
    const addedEmail = props.route.params.addedEmail

    const [email, setEmail] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const globalStyles = useGlobalStyles()

    const checkIsDisabled = () => {
        const isEmpty = (email === null)
        setIsDisabled(isEmpty)
    }

    const save = () => {
      props.route.params.back({type: "Email", data: email})
      navigation.navigate('Checkout');
    }
    
    return (
        <View style={globalStyles.backgroundPrimary}>
        <NavBar title={"Add Email Address"} rightButtonPressed={save} rightIcon={"Save"} navigation={navigation} isDisabled={isDisabled}/>
        <View style={{ marginTop: 50, padding: 20, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={globalStyles.textPrimary}>Email</Text>
                <TextInput
                    style={globalStyles.formInput}
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