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
        switch (this.props.mode) {
            case "Details":
                return <Details
                    image={this.state.image}
                    item={this.props.item}
                    deleteInventoryItem={this.props.deleteInventoryItem}
                    editIventoryItem={this.props.editIventoryItem}
                    handleEditClick={this.handleEditButtonClick}
                />
            case "Edit":
                return <Edit
                    item={this.props.item} image={this.state.image}
                    handleSaveButtonClick={this.handleSaveButtonClick}
                    handleAddNewItemButtonClick={this.handleAddNewItemButtonClick}
                />
            case "Add":
                return <Add
                    item={this.props.item}
                    handleMode={this.props.handleMode}
                    addInventoryItem={this.props.addInventoryItem}
                    handleCancelButtonClick={this.handleCancelButtonClick}
                />
        }
    }

    render() {
        return (
            <View style={styles.menuOptionsContainer} >
                <View style={{ flexDirection: 'column', height: '100%' }}>
                    <this.renderChildComponent />
                </View>
            </View>
        )
    }
}

class Details extends React.Component {
    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
                <View style={styles.detailsButtonContainer}>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => this.props.deleteInventoryItem(this.props.item)}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.handleEditClick}
                        style={styles.editButton}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsItemTitle}>{this.props.item.name}</Text>
                    <Text style={styles.detailsItemPrice}>{this.props.item.quantity} {this.props.item.unit}</Text>
                </View>
            </ScrollView>
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
            <ScrollView style={{ height: '100%' }}>
                <View style={styles.editItemContainer}>

                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Add an item</Text>
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
