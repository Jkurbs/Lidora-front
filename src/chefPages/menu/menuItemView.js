import React from "react";
import styles from "./menu.styles";
import { TouchableOpacity, View, Image, Text } from "react-native";

class MenuItemView extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.menuContent}
                onPress={() => this.props.handleDetails(this.props.item)}>
                <View style={styles.menuWrapper}>
                    <Image style={styles.image} source={this.props.item.imageURL}
                    />
                </View>
                <View style={styles.secondaryView}>
                    <Text style={styles.mainText}>{this.props.item.name}</Text>
                    <Text style={styles.description}>{this.props.item.description}</Text>
                    <Text style={styles.price}>${this.props.item.price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default MenuItemView;


