

import React, {memo} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import styles from './navBarStyle'

function NavBar(props) {

    const navigation = props.navigation
    const title = props.title
    const leftIcon = props.leftIcon
    const rightIcon = props.rightIcon
    const isDisabled = props.isDisabled
    const rightButtonPressed = props.rightButtonPressed
    const items = props.items 

    const goBack = () => {
        if (title === "Cart"){
            navigation.navigate("Store", {items: items})
        } else { navigation.pop() }
    }

    return (
        <View style={styles.container}>
             <View style={styles.leftIcon}>
                <TouchableOpacity onPress={()=> { goBack()} } style={{  }}>
                    {
                        leftIcon ?
                        <Ionicons name={leftIcon} size={24} color="black" />
                        :
                        <Entypo name={"chevron-left"} size={24} color="black" />
                    }
                </TouchableOpacity>
            </View>
            <Text style={{fontWeight: '500', fontSize: 18}}>{title}</Text>
            {
                rightIcon ? 
                    <View style={styles.rightIcon}>
                        <TouchableOpacity
                         disabled={isDisabled}
                         onPress={()=> { rightButtonPressed() }}>
                            <Text style={{ fontSize: 16, fontWeight: '600'}}>{rightIcon}</Text>
                        </TouchableOpacity>
                    </View>
                :
                null
            }
        </View> 
    )     
}

export default memo(NavBar)