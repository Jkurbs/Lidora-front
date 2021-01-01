
import * as React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, TextInput, Animated } from 'react-native';
import ModalSearchField from '../../components/modalSearchField';
import ModalTextField from '../../components/modalTextField';
import RegularButton from '../../components/buttons/regularButton';
import { Picker } from '@react-native-picker/picker';
import { Row } from 'react-native-table-component';


class InventoryRightSidebar extends React.Component {

    constructor(props) {
        super(props);

        const item = {
            key: 123,
            name: "ADD NEW ITEM",
            quantity: 12.29,
            unit: 'Piece'
        }
        this.state = {
            isActive: this.props.isActive,
            translateX: new Animated.Value(0),
            modalMode: this.props.modalMode,
            item: item
        }


    }

    handleSlide = (checkActive) => {
        let { isActive, translateX } = this.state;
        Animated.spring(translateX, {
            toValue: checkActive ? -420 : 0,
            duration: 20
        }).start(finished => {
            this.setState((prevState, props) => ({
                isActive: !prevState.isActive,
            }));
        });
    };


    render() {
        let { isActive, translateX, valueX } = this.state;
        return (
            <>
                <Animated.View style={[styles.animated, { transform: [{ translateX }] }]}  >
                    <View style={styles.orderModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.titleText}>Add Inventory Item</Text>
                            <View style={styles.saveButton}>
                                <RegularButton text={"Save"} />
                            </View>
                        </View>
                        <ModalSearchField
                            placeholder={'Search for an Item here'}
                            onChangeText={(text) => this.props.search(text)}

                        />
                        <ModalTextField placeholder={"Add Quantity"} />
                        <View>
                            <Picker
                                selectedValue={this.value}
                                style={styles.pickerStyle}
                                onValueChange={value => {
                                    if (value != "0")
                                        this.state.item.unit = value
                                }}>
                                <Picker.Item label="Choose Unit" value="0" />
                                <Picker.Item label="Piece" value="Piece" />
                                <Picker.Item label="Gram" value="Gram" />
                                <Picker.Item label="Ounce" value="Ounce" />
                                <Picker.Item label="Liter" value="Liter" />
                            </Picker>
                        </View>
                    </View>
                </Animated.View>
            </>
        )
    }
}

export default InventoryRightSidebar;


const styles = StyleSheet.create({

    orderModal: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        width: '397px',
        height: '809px',
        top: '30',
        right: '13px',
        borderRadius: '5px',
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68,

    },

    animated: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        top: '105px',
        right: '-423px',
        display: 'block',
        // overflowX:'hidden'
    },

    titleText: {
        fontWeight: 500,
        fontSize: '18px',
        alignSelf: 'center',
    },

    pickerStyle: {
        padding: 8,
        fontSize: 15,
        color: '#8E8E93',
        textAlignVertical: 'top',
        borderColor: '#F5F5F5',
        borderTopColor: '#d9d9d9',
        height: '42px',
        width: '100%',
        backgroundColor: '#F5F5F5',
        textIndent: '19px',
    },

    modalHeader: {
        flexDirection: 'row',
        marginTop: '40px',
        marginBottom: '23px',
        justifyContent: 'center'

    },

    saveButton: {
        position: "absolute",
        right: '10px',
        top: '-10px',
    }
})

