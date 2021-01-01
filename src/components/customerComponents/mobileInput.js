import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';

class MobileInput extends Component {
    render() {
        return (

            <View>
                <TextInput style={styles.formInput}
                    placeholder={this.props.placeholder}
                    onChangeText={(text) => this.props.onChangeText(text)}
                >

                </TextInput>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    formInput: {
        padding: 8,
        fontSize: 12,
        color:'#8E8E93',
        textAlignVertical: 'top',
        borderColor: '#d6d6d6',
        height: '42px',
        width: '100%',
        backgroundColor: '#E9E9E9',
        textIndent: '25px',
        marginBottom:'11px',
        borderRadius:'5px'
    },

});

export default MobileInput;