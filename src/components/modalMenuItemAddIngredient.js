import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-svg';

class ModalMenuIngredient extends Component {
    render() {
        return (
            <View style={{ borderTop: '1px solid #d9d9d9' }}>
                <View style={styles.textBox}>
                    <View style={styles.textBoxText}>
                        <Text style={styles.title}
                        >{this.props.title}
                        </Text>
                        <TextInput style={styles.subtitle}
                            onChangeText={(text) => this.props.onChangeText(text.toLowerCase())}
                        />
                        <Text style={styles.subtitle}>{this.props.unit}</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    textBox: {
        padding: 8,
        fontSize: 14,
        color: '#000000',
        height: '42px',
        width: '100%',
        backgroundColor: '#F5F5F5',
        textAlignVertical: 'center'
    },

    textBoxText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        top: '20%'
    },

    title: {
        textAlignVertical: 'center',
        fontWeight: 500,
        maxWidth:'60%',
        overflow:'hidden',
    },

    subtitle: {
        fontWeight: 400,
        backgroundColor:'white'
    }

});

export default ModalMenuIngredient;