
import * as React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

function CustomHeader({ title, isHome, navigation }) {
    if (isHome) {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }}>{title}</Text>
                </View>
                <View onPress={() => navigation.openDrawer()} style={{ flex: 1, justifyContent: 'center' }}>
                    <Image style={{ position: 'absolute', width: 20, height: 20, right: 16 }}
                        source={require('../../assets/icon/menu.png')}
                        resizeMode='contain'
                    />
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1, justifyContent: 'center' }}>
                    <Image style={{ width: 20, height: 20, alignSelf: 'center' }}
                        source={require('../../assets/icon/back.png')}
                        resizeMode='contain'
                    />
                    <Text>Back</Text>
                </TouchableOpacity>
                <View style={{ flex: 1.5, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }}>{title}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}></View>
            </View>
        )
    }
}

export default CustomHeader;
