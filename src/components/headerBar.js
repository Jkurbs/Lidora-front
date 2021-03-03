
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import SearchTextField from '../components/searchTextField'
import MainButton from './buttons/mainButton';
import DropDown from '../components/dropDown'
import { useTheme } from '@react-navigation/native';


function HeaderBar(props) {
    const { colors } = useTheme();

    const showModal = () => {
        props.showCalendar(true)
    }

    const hideModal = () => {
        setState({ showCalendar: false });
    }

    const buttonPressed = () => {
        props.handleMode('Add')
        if (props.isModalActive === false) {
            props.showInv()
        }
    }

    //INPUT SWITCH - SWITCHES BETWEEN REGULAR SEARCH INPUT AND CUSTOMER INPUT
   const  InputSwitch = () => {
        if (props.isSearchEnabled) {
            return (
                <View style={styles.rightSide}>
                    <View style={styles.rightInput}>
                        <SearchTextField
                            placeholder={'Search for an Item here'}
                            onChangeText={(text) => props.search(text)}/>
                        <MainButton action={() => { buttonPressed() }} text={'Add'} indicatorAnimating={false}></MainButton>
                    </View>
                </View>
            )
        } else {
            return (
                <DropDown />
            )
        }
    }
    return (
        <View style={[styles.headerBar, {backgroundColor: colors.inputBg}]}>
            <View style={styles.titleView}>
                <Text style={[styles.title, {color: colors.textPrimary}]}>{props.title}</Text>
                <Text style={[styles.subtitle, {color: colors.textSecondary}]}>{props.subtitle} Items</Text>
            </View>
            <InputSwitch />
        </View>
    )
}

const styles = StyleSheet.create({

    headerBar: { flexDirection: 'row', height: 75 },

    titleView: { flexDirection: 'column', flex: 1, justifyContent: 'left', paddingLeft: '16px', paddingTop: '13px' },

    title: { textAlign: 'left', fontSize: 25, fontWeight: '500' },

    subtitle: { textAlign: 'left', fontSize: 14, fontWeight: '400'},

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
