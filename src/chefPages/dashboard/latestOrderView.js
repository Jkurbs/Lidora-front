import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './dashboard.styles'

class BalanceView extends Component {
    render() {
        return (
            <View style={{ marginTop: 8 }}>
                <View style={{
                    alignSelf: 'center',
                    width: '95%',
                    alignItems: 'center', height: 60, padding: 10, backgroundColor: 'white', borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0, borderRadius: 6,
                    shadowColor: 'black',
                    shadowColor: "#000",
                    // shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 5,
                }}>
                    <Text style={{ fontSize: 17 }}>#1</Text>
                    <Text style={{ fontSize: 17 }}>$100</Text>
                </View>
            </View>
        )
    }
}

export default BalanceView;