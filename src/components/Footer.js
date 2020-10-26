
import React, { Component } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

class EmptyBag extends Component {
    render() {
        return (
            <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ marginTop: 20 }}>{"Your bag is empty"}</Text>
            </View>
        );
    }
}

export default EmptyBag;