import React, { forwardRef, useState } from "react";
import { View, Image, Text, TouchableOpacity} from "react-native";
import useGlobalStyles from '../storeFront/globalStyle'
import styles from './storeFront.lightStyle'
import { pure } from 'recompose';

const ComboItemCell = forwardRef((props, ref) => {

    const item = props.item
    const itemPrice = item.item.price
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(itemPrice)
    const globalStyles = useGlobalStyles()

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
        <View style={[globalStyles.backgroundSecondary, styles.groupContainer]}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={styles.comboImage} defaultSource={{
                    uri: item.item.imageURL,
                }} />
            <Text style={[globalStyles.textPrimary, {alignSelf: 'center'}]}>{item?.item.name ?? ""}</Text>
            </View>
            
           <View style={{ marginRight: 16, flexDirection: 'row', justifyContent: 'center', width: 60, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity pointerEvents={() => { quantity < 2 ? 'none' : "auto" }} onPress={() => { calculate(false) }} style={[{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}]}>
                    <Text style={[globalStyles.textPrimary, {textAlign: 'center', alignSelf: 'center', margin: 0}]}>-</Text>
                </TouchableOpacity>
                <Text style={[globalStyles.textSecondary,{ alignSelf: 'center', margin: 8 }]}>{quantity}</Text>
                <TouchableOpacity onPress={() => calculate(true)} style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}}>
                    <Text style={{ color: '#2EA44F', alignSelf: 'center', fontWeight: '500' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
})
export default pure(ComboItemCell)