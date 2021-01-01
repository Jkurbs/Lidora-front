import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';

class ModalTextField extends Component {
    render() {
        return (

            <View style={{borderTop:'1px solid #d9d9d9'}}>
                <TextInput style={styles.formInput}
                    placeholder={this.props.placeholder}
                    onChangeText={(text) => this.props.onChangeText(text.toLowerCase())}
                >
                </TextInput>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    formInput: {
        padding: 8,
        fontSize: 15,
        color:'#8E8E93',
        textAlignVertical: 'top',
        borderColor: '#d6d6d6',
        height: '42px',
        width: '100%',
        backgroundColor: '#F5F5F5',
        // textIndent: '25px',
    },

});

export default ModalTextField;