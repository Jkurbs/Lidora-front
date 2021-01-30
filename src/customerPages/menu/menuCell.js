import React from "react";
import { View, Image, Text, TouchableOpacity} from "react-native";
import styles from '../storeFront/storeFront.lightStyle'

function MenuCell(props) {
    const item = props.item
    return (
        <TouchableOpacity onPress={()=>  props.onOpen(item)} >
            <View style={styles.menuContainer}>
                <View style={styles.menuInnerContainer}>
                    <Text style={styles.menuName}>{item.name}</Text>
                    <Text style={styles.menuDescription}>{item.description}</Text>
                    <Text style={styles.menuPrice}>${item.price}</Text>
                </View>
                <Image style={styles.menuImage} defaultSource={{
                    uri: item.imageURL,
                }} />
            </View>
        </TouchableOpacity>
    )
}
export default MenuCell