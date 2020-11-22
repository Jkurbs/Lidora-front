
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class DropDown extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.showModal}>
                <Text style={styles.orderText}>Order For Today</Text>
                <Entypo style={styles.icon} name="chevron-down" size={20} color="#00CF46" />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginRight: 16
    },

    orderText: {
        color: '#00CF46',
        fontWeight: '500',
        fontSize: '14px',
    },

    orderIcon: {
        marginTop: '3px',
        fontSize: '15px',
    },
});

export default DropDown;