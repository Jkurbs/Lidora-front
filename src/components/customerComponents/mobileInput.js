import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class MobileInput extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.inputTitle}>{this.props.placeholder}</Text>
                </View>
                <TextInput style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry ?? false}
                    onChangeText={(text) => this.props.onChangeText(text)}>
                </TextInput>                        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        marginTop: 8,
        padding: 8,
        padding: 8,
        fontSize: 14,
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        backgroundColor: 'white'
      },

    inputTitle: {
        fontWeight: '490', 
        marginTop: 16
    },

});

export default MobileInput;