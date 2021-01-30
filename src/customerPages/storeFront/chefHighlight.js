

import React from "react";
import { View, Image, Text} from "react-native";
import useGlobalStyles from './globalStyle'
import styles from './storeFront.lightStyle'

function ChefHighlight(props) {

    const globalStyles = useGlobalStyles();
    const chef = props.chef

    return (
        <View style={[styles.chefHighlightContainer, globalStyles.backgroundPrimary]}>
            <Image  style={[globalStyles.border, styles.storeImage]} defaultSource={{ uri: chef.imageURL }} resizeMethod="scale"
            resizeMode="cover" />
            <View style={styles.storeInfoContainer}>
                <Text style={[globalStyles.textPrimary, styles.title]}>{chef.title}</Text>
                <Text style={[globalStyles.textSecondary, styles.description]}>{chef.storeDescription}</Text>
            </View>
            <View style={globalStyles.border} />
                <View style={{ margin: 20, marginTop: 10, marginBottom: 10 }}>
                    <Text style={[globalStyles.textSecondary, styles.info]}>{chef.city}, {chef.state}</Text>
                    <Text style={[globalStyles.textSecondary, styles.info]}>{chef.phone}</Text>
                </View>
                <View style={globalStyles.border} />
        </View>
    )  
}

export default ChefHighlight