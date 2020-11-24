
import * as React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, TextInput } from 'react-native';
import { block } from 'react-native-reanimated';
import { render } from 'react-native-web';

import SearchTextField from '../components/searchTextField'
import MainButton from './buttons/mainButton';
import DropDown from '../components/dropDown'
import { Entypo } from '@expo/vector-icons';


class HeaderBar extends React.Component {

    showModal = () => {
        this.props.show(true)
    }

    hideModal = () => {
        this.setState({ showCalendar: false });
    }

    buttonPressed = () => {
        this.props.showInv()
    }

    //INPUT SWITCH - SWITCHES BETWEEN REGULAR SEARCH INPUT AND CUSTOMER INPUT
    InputSwitch = () => {
        if (this.props.isSearchEnabled) {
            return (
                <View style={styles.rightSide}>
                    <View style={styles.rightInput}>
                        <SearchTextField
                            placeholder={'Search for an Item here'}
                            onChangeText={(text) => this.props.search(text)}
                        />
                        <MainButton action={() => { this.buttonPressed() }} text={'Add'}></MainButton>
                    </View>
                </View>
            )
        } else {
            return (
                <DropDown />
            )
        }
    }

    render() {
        return (
            <View style={styles.headerBar}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.subtitle}>{this.props.subtitle} Items</Text>
                </View>
                <this.InputSwitch />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    headerBar: { flexDirection: 'row', height: 75 },

    titleView: { flexDirection: 'column', flex: 1, justifyContent: 'left', paddingLeft: '16px', paddingTop: '13px' },

    title: { textAlign: 'left', fontSize: 25, fontWeight: '500' },

    subtitle: { textAlign: 'left', fontSize: 14, fontWeight: '400', color: '#8E8E93' },

    rightInput: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    rightSide: {
        marginRight: '16px',
        justifyContent: 'center',
        width: 300
    },

    formInput: {
        marginTop: 8,
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

    button: {
        paddingLeft: '17px'
    },


    orderInput: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: 20
    },

    orderText: {
        color: '#00CF46',
        fontWeight: '500',
        fontSize: '14px',
    },

    orderIcon: {
        marginTop: '3px',
        fontSize: '15px',
    },
})


export default HeaderBar;
