
import React from "react";
import { pure } from 'recompose';
import { View, Image, Text } from "react-native";
import useGlobalStyles from '../globalStyle'
import styles from '../storeFront.lightStyle'


function ItemInfosCell (item) {
    const globalStyles = useGlobalStyles()
    return (
        <View style={styles.itemDescriptionContainer}>
            <Text style={[globalStyles.textPrimary, {alignSelf: 'flex-start',fontSize: 20}]}>{item?.item?.name ?? ""}</Text>
            <Text style={[globalStyles.textSecondary, {marginTop: 8, fontSize: 17}]}>{item?.item?.description ?? ""}</Text>
    </View>
    )
}

export default pure(ItemInfosCell)