import React, {useState} from "react";
import { View, TextInput, Text } from "react-native";
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'

function AddAllergies(props) {
    const navigation = props.navigation
    const addedAllergies = props.route.params.addedAllergies

    const [allergies, setAllergies] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const globalStyles = useGlobalStyles()

    const checkIsDisabled = () => {
        const isEmpty = (allergies === null)
        setIsDisabled(isEmpty)
    }

    const save = () => {
      props.route.params.back({type: "Allergy", data: allergies})
      navigation.navigate('Checkout');
    }
    
    return (
        <View style={globalStyles.backgroundPrimary}>
        <NavBar title={"Add Allergies"} rightButtonPressed={save} rightIcon={"Save"} navigation={navigation} isDisabled={isDisabled}/>
        <View style={{ padding: 20, marginTop: 50, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={globalStyles.textPrimary}>Allergies</Text>
                <TextInput
                    style={[globalStyles.formInput, {height: 120, textAlignVertical: 'top', paddingTop: 6}]}
                    placeholder="Add allergies"
                    multiline={true}
                    defaultValue={addedAllergies ?? ""}
                    onChangeText={(text) => {setAllergies(text);checkIsDisabled()}}/>
                </View>
            </View>
        </View>
    )
}
export default AddAllergies