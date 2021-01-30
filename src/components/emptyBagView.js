
import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Text, View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
const { height } = Dimensions.get("window")
import useGlobalStyles from '../customerPages/storeFront/globalStyle'


function EmptyBag() {

    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();

    return (
        <View style={ [globalStyles.backgroundPrimary, {height: height, justifyContent: 'center', alignItems: 'center' }]} >
            <SimpleLineIcons name="bag" size={100} color={colors.textTertiary} />
            <Text style={globalStyles.textPrimary}>{"Your bag is empty"}</Text>
        </View>
    );
    
}

export default EmptyBag;
