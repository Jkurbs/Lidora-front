
import React, { Component } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Text, View, Dimensions } from 'react-native';
const { height } = Dimensions.get("window")


class EmptyBag extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: height }} >
                <SimpleLineIcons name="bag" size={100} color="#9A9A9A" />
                <Text style={{ marginTop: 20 }}>{"Your bag is empty"}</Text>
            </View>
        );
    }
}

export default EmptyBag;
