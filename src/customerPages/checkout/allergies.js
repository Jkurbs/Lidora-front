import React, {useState} from "react";
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from '@react-navigation/native'
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../../globalStyle'
import styles from '../storeFront/storeFront.lightStyle'

function AddAllergies(props) {

    const navigation = props.navigation
    const params = props.route.params;
    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();
    const [allergies, setAllergies] = useState("")
    const [disable, setDisable] = useState(false)

    const addAllergies = () => {
        setDisable(true)
        params.personal["allergies"] = allergies ?? " "
        navigation.navigate('Payment', params);
    };

    return (
      <View style={globalStyles.backgroundPrimary}>
        {/* Header */}
        <NavBar title={"Checkout"} rightIcon={params.total} navigation={navigation}/>
        <View style={{padding: 20, marginTop: 70, width: '100%'}}>
            <Text style={[globalStyles.textPrimary, {fontSize: 24, marginBottom: 20}]}>Any additional infos or Allergies?</Text>
            <Text style={{color: colors.textSecondary ,  alignSelf: 'flex-start'}}>Enter here(Optional):</Text>
            <TextInput
                style={[globalStyles.formInput, {height: 120,  textAlignVertical: 'top', paddingTop: 6}]}
                placeholder="Additional infos"
                multiline={true}
                onChangeText={(text) => {setAllergies(text)}}
            />
        </View>
        <TouchableOpacity onPress={()=> addAllergies()} style={ [disable ? globalStyles.btnPrimaryDisabled : globalStyles.btnPrimary, {marginTop: 100, bottom: 0, position: 'relative'}]}> 
            <Text style={styles.textCentered}>{disable ? "":"Continue to Payment"}</Text>
            <ActivityIndicator hidesWhenStopped={true} animating={disable} color={colors.textSecondary} style={{ position: 'absolute', alignSelf: 'center' }} />
        </TouchableOpacity>
    </View>
    )
}

export default AddAllergies

