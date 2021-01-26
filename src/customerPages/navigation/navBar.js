

import React, {memo} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import styles from './navBarStyle'

function NavBar(props) {

    const navigation = props.navigation
    const leftIcon = props.leftIcon
    const rightIcon = props.rightIcon
    const isDisabled = props.isDisabled
    const rightButtonPressed = props.rightButtonPressed

    return (
        <View style={styles.container}>
             <View style={styles.leftIcon}>
                <TouchableOpacity onPress={()=> { navigation.pop()} } style={{  }}>
                    {
                        leftIcon ?
                        <Ionicons name={leftIcon} size={24} color="black" />
                        :
                        <Entypo name={"chevron-left"} size={24} color="black" />
                    }
                </TouchableOpacity>
            </View>
            <Text style={{fontWeight: '500', fontSize: 18}}>{props.title}</Text>
            {
                rightIcon ? 
                    <View style={styles.rightIcon}>
                        <TouchableOpacity
                         disabled={isDisabled}
                         onPress={()=> { rightButtonPressed() }}>
                            <Text style={{fontWeight: '600'}}>{rightIcon}</Text>
                        </TouchableOpacity>
                    </View>
                :
                null
            }
        </View> 
    )     
}

export default memo(NavBar)