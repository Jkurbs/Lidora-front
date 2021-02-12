

import React, {memo} from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import useGlobalStyles from '../storeFront/globalStyle'
import styles from './navBarStyle'
import { useTheme } from '@react-navigation/native'


function NavBar(props) {

    const navigation = props.navigation
    const title = props.title
    const leftIcon = props.leftIcon
    const rightIcon = props.rightIcon
    const isDisabled = props.isDisabled
    const rightButtonPressed = props.rightButtonPressed
    const items = props.items
    
    const { colors } = useTheme();
    const globalStyles = useGlobalStyles()

    const goBack = () => {
        navigation.pop() 
    }

    return (
        <Animated.View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.leftIcon}>
                <TouchableOpacity onPress={()=> {goBack() }}>
                    {
                        leftIcon ?
                        <Ionicons name={leftIcon} size={24} color={colors.textPrimary} />
                        :
                        <Entypo name={"chevron-left"} size={24}  color={colors.textPrimary} />
                    }
                </TouchableOpacity>
            </View>
            <Text style={globalStyles.textPrimary}>{title}</Text>
            {
                rightIcon ? 
                    <View style={styles.rightIcon}>
                         <Text style={[styles.rightIconText,{color: colors.btnPrimaryBg}]}>${rightIcon}</Text>
                    </View>
                :
                null
            }
         <View style={[globalStyles.border, styles.separator, {width: '90%'}]} />
        </Animated.View> 
    )     
}

export default memo(NavBar)