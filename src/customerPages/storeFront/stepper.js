import React, { forwardRef, useState } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import useGlobalStyles from '../storeFront/globalStyle'
import styles from './storeFront.lightStyle'
import { pure } from 'recompose';


const Stepper = forwardRef((props, ref) => {
    
    const itemTotal = props.total

    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(itemTotal)
    const globalStyles = useGlobalStyles()
    // Calculate total amount 
    const calculate = (add) => {
        if (add) {
            setQuantity(quantity + 1)
            setTotal(total + itemTotal)
        } else {
            if (quantity < 2) {
                return 
            } else {
                setQuantity(quantity - 1)
                setTotal(total - itemTotal)
            }
        }
    }

    return (
        <View style={{marginTop: 40, width:'100%', height:80, justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=> { props.addToBag(total, quantity) }} style={[globalStyles.btnPrimary, {bottom: 0}]}> 
                    <Text style={styles.textCentered} >Add to bag</Text>
            </TouchableOpacity>
        </View>
    )
})

export default pure(Stepper)