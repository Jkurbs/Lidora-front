import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './dashboard.styles'
import { Entypo } from '@expo/vector-icons';

class QuickLinksView extends Component {
    render() {
        return (
            <View style={{
                shadowColor: 'black',
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 5,
                borderRadius: 8,
                backgroundColor: 'white',
                height: 120,
                width: '95%',
                padding: 16,
                alignSelf: 'center',
                flexDirection: 'column',
                justifyContent: 'space-around'
            }}>
                <View style={{ flexDirection: 'row', }}>
                    <Entypo name="link" size={16} color='rgb(48, 209, 88)' />
                    <Text onPress={() => this.props.navigation.navigate('Menu')} style={{ marginLeft: 8, color: 'rgb(48, 209, 88)' }}>Menu</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Entypo name="link" size={16} color='rgb(48, 209, 88)' />
                    <Text onPress={() => this.props.navigation.navigate('Inventory')} style={{ marginLeft: 8, color: 'rgb(48, 209, 88)' }}>Inventory</Text>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <Entypo name="link" size={16} color='rgb(48, 209, 88)' />
                    <Text onPress={() => this.props.navigation.navigate('Support')} style={{ marginLeft: 8, color: 'rgb(48, 209, 88)' }}>Support</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Entypo name="link" size={16} color='rgb(48, 209, 88)' />
                    <Text onPress={() => this.props.navigation.navigate('Orders')} style={{ marginLeft: 8, color: 'rgb(48, 209, 88)' }}>Customer orders</Text>
                </View>
            </View>

        )
    }
}

export default QuickLinksView;