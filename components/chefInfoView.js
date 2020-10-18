
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './style'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


class ChefInfoView extends Component {
    render() {
        return (
            <View style={styles.container} >
                {/* User details View */}
                <Image style={styles.userImage} source={{ uri: this.props.item.imageURL }} />
                <Text style={styles.userName}> {this.props.item.firstName + ' ' + this.props.item.lastName}</Text>
                <View style={styles.iconContainer}>
                    <Ionicons style={styles.icons} name="ios-timer" size={24} color="#9A9A9A" />
                    <Text>1 day pre-order</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons style={styles.icons} name="ios-information-circle-outline" size={24} color="#9A9A9A" />
                    <Text>$0.30 Delivery Fee</Text>
                </View>

                {/* Description View */}
                <View style={{ marginTop: 55 }}>
                    <View style={styles.lineStyle} />
                    <Text style={{ margin: 13 }}>{this.props.item.description}</Text>
                    <View style={styles.lineStyle} />
                </View>

                {/* Schedule View */}
                <View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 16.0, marginBottom: 30 }}>
                        <Text style={{ alignSelf: 'flex-start', marginLeft: 13.0, fontSize: 16, fontWeight: '500' }}>{'View Schedule'}</Text>
                        <Entypo name="chevron-right" size={24} color="#9A9A9A" />
                    </View>
                    <View style={styles.lineStyle} />
                </View>
            </View>
        )
    }
}

export default ChefInfoView;