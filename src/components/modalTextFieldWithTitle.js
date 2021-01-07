import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-svg';

class ModalTextFieldWithTitle extends Component {
    render() {
        return (
            <View style={{ borderTop: '1px solid #d9d9d9' }}>
                <View style={styles.textBox}>
                    <View style={styles.textBoxText}>
                        <Text style={styles.title}
                        >{this.props.title}
                        </Text>
                        <TextInput style={styles.subtitle}
                            placeholder={this.props.placeholder}
                            onChangeText={(text) => this.props.onChangeText(text)}></TextInput>
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
        height: 42,
        width: '100%',
        backgroundColor: '#F5F5F5',
        justifyContent: 'center', 
    }, 

    textBoxText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 

    title: {
        fontWeight: 500,
        maxWidth: '60%',
        overflow: 'hidden',
        textAlign: 'center', 
        alignSelf:'center'

    }, 
    subtitle: {
        fontWeight: 400,
        backgroundColor: '#F5F5F5', 
        textAlignVertical: 'right', 
        height: 42, 
        // textAlign: 'right', 
        padding: 8
    },
});

export default ModalTextFieldWithTitle;