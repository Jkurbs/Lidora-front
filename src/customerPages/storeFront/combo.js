import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity} from "react-native";
import ComboItemCell from './comboItemCell'
import styles from './storeFront.style'

function Combo(props) {
    
    const item = props.item
    const [quantity, setQuantity] = useState(1)


    // Calculate total amount 
    const calculate = (add) => {
        if (add) {
            setQuantity(quantity + 1)
            //setTotal(total + itemTotal)
        } else {
            if (quantity < 2) {
                return 
            } else {
                setQuantity(quantity - 1)
                //setTotal(total - itemTotal)
            }
        }
    }

    return (
        <View style={styles.groupContainer}>
            <ComboItemCell item={item}/>
           <View style={{ marginRight: 16, flexDirection: 'row', justifyContent: 'center', marginTop: 20, borderRadius: 10, width: 60, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity pointerEvents={() => { quantity < 2 ? 'none' : "auto" }} onPress={() => { calculate(false) }} style={[{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}]}>
                    <Text style={{ textAlign: 'center', alignSelf: 'center', color: 'gray' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', margin: 8 }}>{quantity}</Text>
                <TouchableOpacity onPress={() => calculate(true)} style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}}>
                    <Text style={{ color: '#2EA44F', alignSelf: 'center', fontWeight: '500' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Combo