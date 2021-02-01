import React, { useRef, useEffect, forwardRef, useState, memo } from "react";
import { View, Image, Text, TouchableOpacity} from "react-native";
import useGlobalStyles from '../storeFront/globalStyle'
import styles from './storeFront.lightStyle'
import { pure } from 'recompose';

const ComboItemCell = React.memo((props) => {

    const item = props.item
    const itemPrice = item.item.price
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(itemPrice)
    const globalStyles = useGlobalStyles()
    
    // Calculate total amount 
    const calculate = (add) => {
            // if (add) {
            //     changeSingleMenuItem({itemId: item.item.key, quantity: 
            //         item.item["quantity"]  = (item.item["quantity"] + 1) || 1, 
            //         total: 0})
            // } else {
            //     if (item.item.quantity < 2) {
            //         return 
            //     } else {
            //         const quantity = item.item["quantity"] = (item.item["quantity"] - 1) || 1
            //         changeSingleMenuItem({itemId: item.item.key, quantity: quantity, total: 0})
            //     }
            // }
        }
        return (
            <View style={[globalStyles.backgroundSecondary, styles.groupContainer]}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={styles.comboImage} defaultSource={{
                    uri: item.item.imageURL,
                }} />
            <Text style={[globalStyles.textPrimary, {alignSelf: 'center'}]}>{item?.item?.name ?? ""}</Text>
            </View>
            
           <View style={{flexDirection: 'row', justifyContent: 'center', width: 60, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity pointerEvents={() => { quantity < 2 ? 'none' : "auto" }} onPress={() => { calculate(false) }} style={[{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}]}>
                    <Text style={[globalStyles.textPrimary, {textAlign: 'center', alignSelf: 'center', margin: 0}]}>-</Text>
                </TouchableOpacity>
                <Text style={[globalStyles.textSecondary,{ alignSelf: 'center', margin: 8 }]}>{item?.item?.quantity ?? 1}</Text>
                <TouchableOpacity onPress={() => calculate(true)} style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}}>
                    <Text style={{ color: '#2EA44F', alignSelf: 'center', fontWeight: '500' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>

        )
    })

export default ComboItemCell;
