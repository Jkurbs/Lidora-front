import React from "react";
import styles from "./inventory.styles";
import { TouchableOpacity, View, Image, Text } from "react-native";

class InventoryItemView extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.menuContent}>
                <View style={styles.secondaryView}>
                    <Text style={styles.mainText}>{this.props.item.name}</Text>
                    <Text style={styles.description}>{this.props.item.quantity} {this.props.item.unit}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default InventoryItemView;