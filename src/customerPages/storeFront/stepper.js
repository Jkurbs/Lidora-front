import React, { useState } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from './storeFront.style'

function Stepper(props) {
    
    const itemTotal = props.total

    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(itemTotal)

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
        <View>
            {
                props.isCombo ? 
                null
                :
                <View style={styles.stepperContainer}>
                    <TouchableOpacity pointerEvents={() => { quantity < 2 ? 'none' : "auto" }} onPress={() => { calculate(false) }} style={styles.stepperButton}>
                        <Text style={styles.stepperText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.stepperText}>{quantity}</Text>
                    <TouchableOpacity onPress={() => calculate(true)} style={styles.stepperButton}>
                        <Text style={styles.stepperText}>+</Text>
                    </TouchableOpacity>
                </View>
            }
            <TouchableOpacity onPress={()=> { props.addToBag(total, quantity) }} style={[styles.mainButton, {position: 'relative'}]}> 
                <View style={styles.mainButtonContainer}>
                    <Text style={styles.mainButtonText}>Add to bag</Text>
                    <Text style={styles.mainButtonSecondaryText}>${total}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Stepper