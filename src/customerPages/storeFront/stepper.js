import React, { forwardRef, useState } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import useGlobalStyles from '../../globalStyle'
import styles from './storeFront.lightStyle'
import { pure } from 'recompose';


const Stepper = forwardRef((props, ref) => {
    
    const itemTotal = props.total
    const globalStyles = useGlobalStyles()

    return (
        <View style={{marginTop: 40, width:'100%', height:80, justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=> { props.addToBag(total, quantity) }} style={[globalStyles.btnPrimary, {bottom: 20}]}> 
                    <Text style={styles.textCentered} >Add to bag</Text>
            </TouchableOpacity>
        </View>
    )
})

export default pure(Stepper)