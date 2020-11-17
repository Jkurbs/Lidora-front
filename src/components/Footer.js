
import React, { Component, useCallback } from 'react';
import { Text, View, Linking } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const url = "https://www.instagram.com/lidoralive/";

function handleSocial() {
    const supported = Linking.canOpenURL(url);
    if (supported) {

        Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
}

class Footer extends Component {
    render() {
        return (
            <View style={{ alignItems: "center", marginTop: 30, marginBottom: 20, padding: 20 }}>
                <Ionicons
                    onPress={handleSocial}
                    name="logo-instagram"
                    size={26}
                    color="gray"
                />
                <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 8, color: "black", fontWeight: '500' }}>
                        Lidora {"\u00A9"} 2020
        </Text>
                    <Text onPress={() => navigation.navigate("Legal")} style={{ fontWeight: '500' }}>Privacy & Legal</Text>
                </View>
            </View>
        );
    }
}

export default Footer;