

import React from "react";
import { View, Image, Text} from "react-native";
import styles from './storeFront.style'

function ChefHighlight(props) {
    const chef = props.chef
    return (
        <View style={{justifyContent: 'center', alignItems: "center", padding: 20}}>
            <Image  style={styles.storeImage} defaultSource={{ uri: chef.imageURL }} resizeMethod="scale"
            resizeMode="cover" />
            <View style={styles.storeInfoContainer}>
                <Text style={styles.title}>{chef.title}</Text>
                <Text style={styles.description}>{chef.storeDescription}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
                <View style={{ margin: 20, marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.info}>{chef.city}, {chef.state}</Text>
                    <Text style={styles.info}>{chef.email_address}</Text>
                </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )  
}

export default ChefHighlight