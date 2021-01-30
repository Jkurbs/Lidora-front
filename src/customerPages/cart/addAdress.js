import React, {useState} from "react";
import { View, SafeAreaView, TextInput, Text} from "react-native";
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'

function AddAdress(props) {

    const navigation = props.navigation
    const addedAddress = props.route.params.addedAddress
    const [address] = useState({street: null, city: null, state: null, postalCode: null})
    const [isDisabled, setIsDisabled] = useState(true)
    const globalStyles = useGlobalStyles()


    const checkIsDisabled = () => {
        const isEmpty = !Object.values(address).some(x => (x !== null && x !== ''));
        setIsDisabled(isEmpty)
    }

    const save = () => {
        props.route.params.back({type: "Address", data: address})
        navigation.navigate('Checkout');
    }

    return (
        <View style={globalStyles.backgroundPrimary}>
            <NavBar title={"Add Address"} rightButtonPressed={save} rightIcon={"Save"} navigation={navigation} isDisabled={isDisabled}/>
            <View style={styles.inputContainerWrapper}>
                <View style={styles.inputContainer}>
                <Text style={globalStyles.textPrimary}>Street</Text>
                <TextInput
                    style={globalStyles.formInput}
                    placeholder="Required"
                    autoCorrect={false}
                    textContentType={"fullStreetAddress"}
                    defaultValue={addedAddress?.street ?? ""}
                    onChangeText={(text) => {address.street = text;checkIsDisabled()}}/>
                </View>
                <View style={styles.inputContainer}>
                <Text style={globalStyles.textPrimary}>City</Text>
                <TextInput
                    style={globalStyles.formInput}
                    placeholder="Required"
                    autoCorrect={false}
                    textContentType={"addressCity"}
                    defaultValue={addedAddress?.city ?? ""}
                    onChangeText={(text) => {address.city = text;checkIsDisabled()}}/>
                </View>
                <View style={styles.inputContainer}>
                <Text style={globalStyles.textPrimary}>State</Text>
                <TextInput
                    style={globalStyles.formInput}
                    placeholder="Required"
                    autoCorrect={false}
                    textContentType={"addressState"}
                    defaultValue={addedAddress?.state ?? ""}
                    onChangeText={(text) => {address.state = text;checkIsDisabled()}}/>
                </View>
                <View style={styles.inputContainer}>
                <Text style={globalStyles.textPrimary}>Zip</Text>
                <TextInput
                    style={globalStyles.formInput}
                    placeholder="Required"
                    autoCorrect={false}
                    textContentType={"postalCode"}
                    defaultValue={addedAddress?.postalCode ?? ""}
                    onChangeText={(text) => {address.postalCode = text;checkIsDisabled()}}/>
                </View>
            </View>
        </View>
    )
}
export default AddAdress