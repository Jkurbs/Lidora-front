import React, {useState} from "react";
import { View, TextInput, Text} from "react-native";
import NavBar from '../navigation/navBar'
import styles from '../storeFront/storeFront.style'

function AddAdress(props) {

    const navigation = props.navigation
    const addedAddress = props.route.params.addedAddress
    const [address] = useState({street: null, city: null, state: null, postalCode: null})
    const [isDisabled, setIsDisabled] = useState(true)

    const checkIsDisabled = () => {
        const isEmpty = !Object.values(address).some(x => (x !== null && x !== ''));
        setIsDisabled(isEmpty)
    }

    const save = () => {
        props.route.params.back({type: "Address", data: address})
        navigation.navigate('Checkout');
    }

    return (
        <View style={styles.container}>
            <NavBar title={"Add Address"} rightButtonPressed={save} rightIcon={"Save"} navigation={navigation} isDisabled={isDisabled}/>
            <View style={styles.inputContainerWrapper}>
                <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Street</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Required"
                    autoCorrect={false}
                    textContentType={"fullStreetAddress"}
                    defaultValue={addedAddress?.street ?? ""}
                    onChangeText={(text) => {address.street = text;checkIsDisabled()}}/>
                </View>
                <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Required"
                    autoCorrect={false}
                    textContentType={"addressCity"}
                    defaultValue={addedAddress?.city ?? ""}
                    onChangeText={(text) => {address.city = text;checkIsDisabled()}}/>
                </View>
                <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>State</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Required"
                    autoCorrect={false}
                    textContentType={"addressState"}
                    defaultValue={addedAddress?.state ?? ""}
                    onChangeText={(text) => {address.state = text;checkIsDisabled()}}/>
                </View>
                <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Zip</Text>
                <TextInput
                    style={styles.input}
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