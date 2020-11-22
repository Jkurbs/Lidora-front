import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';

class SearchTextField extends Component {
    render() {
        return (

            <View>
                <Image style={styles.searchIcon}
                    source={require('../assets/icon/search.png')}
                />
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
        fontSize: 12,
        textAlignVertical: 'top',
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 33,
        width: 192,
        backgroundColor: 'white',
        textIndent: '25px',
    },

    searchIcon: {
        position: 'absolute',
        top: 9,
        left: 8,
        fontSize: 15,
        width: 15,
        height: 15,
        tintColor: 'gray',
        transform: 'scaleX(-1)'
    },
});

export default SearchTextField;