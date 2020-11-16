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
                height: 100,
                width: '95%',
                padding: 16,
                alignSelf: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Text style={{ color: 'rgb(48, 209, 88)' }}><Entypo name="link" size={16} color='rgb(48, 209, 88)' />
                        Menu</Text>
                <Text style={{ color: 'rgb(48, 209, 88)' }}><Entypo name="link" size={16} color='rgb(48, 209, 88)' />
                        Inventory</Text>
                <Text style={{ color: 'rgb(48, 209, 88)' }}><Entypo name="link" size={16} color='rgb(48, 209, 88)' />
                        Support</Text>

            </View>

        )
    }
}

export default QuickLinksView;