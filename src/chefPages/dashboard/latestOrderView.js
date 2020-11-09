import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './dashboard.styles'

class BalanceView extends Component {
    render() {
        return (
            <View style={{ marginTop: 8 }}>
                <View style={{ alignItems: 'center', height: 60, padding: 10, backgroundColor: 'white', borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0 }}>
                    <Text style={{ fontSize: 17 }}>#1</Text>
                    <Text style={{ fontSize: 17 }}>$100</Text>
                </View>
            </View>

        )
    }
}

export default BalanceView;