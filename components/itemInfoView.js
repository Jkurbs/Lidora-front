
import React, { Component } from 'react';
import styles from './style'
import { Text, View, Image, TouchableOpacity } from 'react-native';

class ItemInfoView extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.name}>{this.props.item.name}</Text>
                    <Text style={styles.description}>{this.props.item.description}</Text>
                    <Text style={styles.price}>{'$' + this.props.item.price}</Text>
                </View>
                <TouchableOpacity>
                    <Image style={styles.image} source={{ uri: this.props.item.image }} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ItemInfoView;