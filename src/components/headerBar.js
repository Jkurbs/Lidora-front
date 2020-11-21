
import * as React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, TextInput } from 'react-native';
import { block } from 'react-native-reanimated';
import { render } from 'react-native-web';
import MainButton from './buttons/mainButton';

const styles = StyleSheet.create({

    headerBar: { flexDirection: 'row', height: 75 },

    titleView: { flexDirection: 'column', flex: 1, justifyContent: 'left', paddingLeft: '16px', paddingTop: '13px' },

    title: { textAlign: 'left', fontSize: 25, fontWeight: '500' },

    subtitle: { textAlign: 'left', fontSize: 14, fontWeight: '400', color: '#8E8E93' },

    rightInput: {
        paddingTop: '23px'
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

    searchIcon: {
        position: 'absolute',
        top: '38px',
        left: '7px',
        fontSize: '15px',
        width: 18,
        height: 18,
        tintColor: 'gray',
        transform: 'scaleX(-1)'
    },

    button: {
        paddingTop: '34px',
        paddingLeft: '17px'
    },

    rightSide: {
        paddingRight: '13px',
        flexDirection: 'row'
    },

    orderInput: {
    },

    orderText: {
        color: '#00CF46',
        fontWeight: '500',
        fontSize: '15px',
        paddingRight: '30px'
    },

    orderIcon: {
        position: 'absolute',
        top: '1px',
        right: '6px',
        fontSize: '15px',
        width: 20,
        height: 20,
        tintColor: '#00CF46',
    },


})





class HeaderBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            subtitle: this.props.subtitle,
            search: this.props.search,
            isCustomerOrders: this.props.isCustomerOrders,
        }
    }

    showModal = () => {
        this.props.show(true)
    }

    hideModal = () => {
        this.setState({ showCalendar: false });
    }

    buttonPressed = () => {
        alert("HeaderBarbutton pressed")
    }

    //INPUTSWITCH - SWITCHES BETWEEN REGULAR SEARCHINPUT AND CUSTOMERINPUT
    InputSwitch = () => {
        if (this.state.isCustomerOrders) {
            return (
                <View style={styles.rightSide}>
                    <TouchableOpacity style={{ height: '24px', marginTop: '34px' }} onPress={this.showModal}>
                        <View style={styles.orderInput} >
                            <Image style={styles.orderIcon} source={require('../assets/icon/chevron-down.png')} />
                            <Text style={styles.orderText} >Order For Today</Text>
                        </View>
                    </TouchableOpacity>
                </View>)
        } else {
            return (
                <View style={styles.rightSide}>
                    <View style={styles.rightInput}>
                        <Image style={styles.searchIcon}
                            source={require('../assets/icon/search.png')}
                        />
                        <TextInput style={styles.formInput}
                            placeholder={'Search for an Item here'}
                            onChangeText={(text) => this.state.search = text}
                            defaultValue={""}
                        />

                    </View>
                    <View style={styles.button}>
                        <MainButton action={() => { this.buttonPressed() }} text={'Add'}></MainButton>
                    </View>
                </View>
            )
        }
    }
    ///INPUTSWITCH END


    render() {
        return (
            <View style={styles.headerBar}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <Text style={styles.subtitle}>{this.state.subtitle} Items</Text>
                </View>
                <this.InputSwitch />
            </View>
        )
    }
}

export default HeaderBar;
