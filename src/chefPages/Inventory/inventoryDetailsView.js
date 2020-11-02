import React, { useState, useCallback, useEffect } from "react";
import styles from "./inventory.styles";
import { View, TextInput, TouchableOpacity, Text, Image, Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';


class InventoryDetailsView extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
        }
        this.renderChildComponent = this.renderChildComponent.bind(this);
    }
    renderChildComponent() {
        return <Add
            item={this.props.item}
            addInventoryItem={this.props.addInventoryItem} />
    }

    render() {
        return (
            <View style={styles.menuOptionsContainer} >
                <View style={{ flexDirection: 'column' }}>

                    <View style={{ backgroundColor: '#D6D6D6', height: 1, width: '100%' }} />
                    <this.renderChildComponent />
                </View>
            </View>
        )
    }
}

// ADD ITEM COMPONENT 
class Add extends React.Component {

    constructor() {
        super();
        const item = {
            key: 18,
            name: "New item name",
            quantity: 12.29,
            unit: 'Piece'
        }

        this.state = {
            item: item
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.editItemContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.formTitle}>Name</Text>
                        <TextInput style={styles.formInput}
                            placeholder={'Add a name'}
                            onChangeText={(text) => this.state.item.name = text}
                            defaultValue={""}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.formTitle}>Unit</Text>
                        <Picker
                            selectedValue={this.state.language}
                            defaultValue={"Piece"}
                            style={styles.formInput}
                            onValueChange={(itemValue, itemIndex) =>
                                this.state.item.unit = itemValue}>

                            <Picker.Item label="Piece" value="Piece" />
                            <Picker.Item label="Gram" value="Gram" />
                            <Picker.Item label="Ounce" value="Ounce" />
                            <Picker.Item label="Liter" value="Liter" />
                        </Picker>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.formTitle}>Quantity</Text>
                        <TextInput style={styles.formInput}
                            placeholder={'Add quantity'}
                            onChangeText={(text) => this.state.item.quantity = text}
                            defaultValue={""}
                        />
                    </View>
                    <View style={styles.detailsButtonContainer}>
                        <TouchableOpacity
                            onPress={this.props.addInventoryItem.bind(this, this.state.item)}
                            style={styles.editButton}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        )
    }
}

export default InventoryDetailsView;
