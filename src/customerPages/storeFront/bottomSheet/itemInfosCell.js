
import React from "react";
import { pure } from 'recompose';
import { View, Image, Text } from "react-native";
import useGlobalStyles from '../globalStyle'
import styles from '../storeFront.lightStyle'


function ItemInfosCell (item) {
    const globalStyles = useGlobalStyles()
    return (
        <View style={styles.itemDescriptionContainer}>
            <View style={ styles.itemDescriptionContentContainer}>
                <Text style={globalStyles.textPrimary}>{item?.item?.name ?? ""}</Text>
                <Text style={globalStyles.textSecondary}>{item?.item?.description ?? ""}</Text>
                <Text style={globalStyles.textPrimary}>${item?.item?.price ?? ""}</Text>
            </View>
            <Image style={styles.menuImage} defaultSource={{
                uri: item?.item?.imageURL ?? "",
            }} />
    </View>
    )
}

export default pure(ItemInfosCell)