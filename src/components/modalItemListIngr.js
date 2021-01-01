import React, { Component } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-svg';

class ModalItemList extends Component {
    render() {
        let currentArr = ['swag', 'swag']
        if (typeof this.props.array != "undefined") {
            currentArr = this.props.array
        }
        return (
            <>
                <Text style={styles.header}>{this.props.title}</Text>
                <View style={{ borderTop: '1px solid #d9d9d9' }}>
                    <View style={(currentArr.length == 0) ? { display: 'none' } : { display: 'inline' }}>
                        <div>
                            {currentArr.map(item =>
                                <View>
                                    <View style={styles.item}>
                                        <Text style={styles.title}>{item.name}</Text>
                                        <Text style={styles.title}>{`${item.quantity} ${item.unit}`}</Text>
                                    </View>
                                    <View style={{borderBottom: '1px solid #d9d9d9'}}/>
                                </View>
                            )}
                        </div>
                    </View>
                </View>
            </>
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
        fontSize: 13,
        alignSelf: 'center'
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        height: 42,
        padding: 8
    },

    subtitle: {
        fontWeight: 400,
        backgroundColor: 'white'
    },

    header: {
        fontSize: 16,
        fontWeight: '500',
        backgroundColor: "#fff",
        marginBottom: 10,
        padding: 8
    },
});

export default ModalItemList;