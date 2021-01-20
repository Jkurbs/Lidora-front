import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity} from "react-native";
import styles from './storeFront.style'

function ComboItemCell(props) {
    
    const item = props.item
    const itemPrice = item.item.price
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(itemPrice)

    // Calculate total amount 
    const calculate = (add) => {
        if (add) {
            setQuantity(quantity + 1)
            setTotal(total + itemPrice)
            props.changeSingleMenuItem({itemId: item.item.key, quantity: quantity + 1, total: total + itemPrice})
        } else {
            if (quantity < 2) {
                return 
            } else {
                setQuantity(quantity - 1)
                setTotal(total - itemPrice)
                props.changeSingleMenuItem({itemId: item.item.key, quantity: quantity + 1, total: total + itemPrice})
            }
        }
    }

    return (
        <View style={styles.groupContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={styles.comboImage} defaultSource={{
                    uri: item.item.imageURL,
                }} />
            <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 14}}>{item?.item.name ?? ""}</Text>
            </View>
            
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
export default ComboItemCell