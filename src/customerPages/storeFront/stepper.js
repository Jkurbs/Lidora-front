import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity} from "react-native";
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, borderRadius: 10, borderColor: 'rgba(27, 31, 35, 0.15)', borderWidth: 1, width: 150, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity pointerEvents={() => { quantity < 2 ? 'none' : "auto" }} onPress={() => { calculate(false) }} style={[{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}]}>
                        <Text style={{ alignSelf: 'center', color: 'gray' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', margin: 8 }}>{quantity}</Text>
                    <TouchableOpacity onPress={() => calculate(true)} style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}}>
                        <Text style={{ color: '#2EA44F', alignSelf: 'center', fontWeight: '500' }}>+</Text>
                    </TouchableOpacity>
                </View>
            }
            <TouchableOpacity onPress={()=> { props.addToBag(total, quantity) }} style={{ backgroundColor: '#2EA44F', justifyContent: 'center', marginTop: 28, borderRadius: 5, height: 60, width: '90%', alignSelf: 'center'}}> 
                <View style={{alignSelf: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                    <Text style={{color: '#F6F8FA', alignSelf: 'center', fontWeight: '500', fontSize: 15}}>Add to bag</Text>
                    <Text style={{alignSelf: 'flex-end', color: '#F6F8FA', marginLeft: 8, fontWeight: '500'}}>${total}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default Stepper