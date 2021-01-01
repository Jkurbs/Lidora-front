import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';


class ModalMenuIngredient extends Component {
    render() {
        return (
            <View style={{ borderTop: '1px solid #d9d9d9', borderBottom: '1px solid #d9d9d9' }}>
                <View style={styles.textBox}>
                    <View style={styles.textBoxText}>
                        <Text  style={styles.title}
                        >{this.props.title}
                        </Text>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                        <TextInput
                            style={styles.subtitle}
                            onChangeText={(text) => this.props.onChangeText(text)}
                            placeholder={this.props.placeholder}
                        />        
                        <Picker
                            selectedValue={this.value}
                            style={styles.pickerStyle}
                            onValueChange={value => {
                                if (value != "0")
                                    this.props.onUnitChange(value) 
                            }}>
                            <Picker.Item label="Choose Unit" value="0" />
                            <Picker.Item label="Piece" value="Piece" />
                            <Picker.Item label="Gram" value="Gram" />
                            <Picker.Item label="Ounce" value="Ounce" />
                            <Picker.Item label="Liter" value="Liter" />
                        </Picker>
                        </View>
                        
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
        textAlign: 'right', 
        padding: 8
    },
    
    pickerStyle: {
        fontSize: 15,
        color: '#8E8E93',
        backgroundColor: '#F5F5F5',
        borderWidth: 0, 
        right: 8
    },
});
    
export default ModalMenuIngredient;