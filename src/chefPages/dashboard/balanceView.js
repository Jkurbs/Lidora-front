import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './dashboard.styles'

class BalanceView extends Component {
    render() {
        return (
            <View style={styles.balanceContainer}>
                <View style={styles.valueContainer}>
                    <Text style={styles.descriptionText}>Total balance</Text>
                    <Text style={styles.valueText}>${this.props.balance?.total ?? 0.0}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.descriptionText}>Future payout</Text>
                    <Text style={styles.valueText}>${this.props.balance?.futurePayout ?? 0.0}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.descriptionText}>In transit to bank</Text>
                    <Text style={styles.valueText}>${this.props.balance?.transit ?? 0.0}</Text>
                </View>
                <View style={{ backgroundColor: '#D6D6D6', height: 1, width: '100%', marginBottom: 20 }} />
            </View>
        )
    }
}

export default BalanceView;