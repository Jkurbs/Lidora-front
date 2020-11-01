import React, { useState, useCallback, useEffect } from "react";
import styles from "./menu.styles";
import { View, TextInput, TouchableOpacity, Text, Image, Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as DocumentPicker from 'expo-document-picker';
import { MenuItem } from '../../models/MenuItem'


class MenuDetailsView extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      name: null,
      price: null,
      description: null
    }
    this.pickDocument = this.pickDocument.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.renderChildComponent = this.renderChildComponent.bind(this);
  }

  componentDidMount(prevProps) {
    this.setState({
      image: this.props.item.image,
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description
    })
  }

  // Pick image from computer folder 
  pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*" // all images files
    });
    if (!result.cancelled) {
      this.setState({
        image: result,
      });
    } else {
      // Show error to user
    }
  }

  // Configure edit button click 
  handleEditButtonClick() {
    this.setState({
      image: this.props.item.image,
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description
    })
    this.props.handleMode("Edit")
  }

  // Configure save button click 
  handleSaveButtonClick() {
    const item = this.props.item
    item.image = this.state.image
    this.props.updateMenuItem(item)
    this.props.handleMode("Details")
    this.state.image = null
  }

  handleAddButtonClick() {
    this.props.handleMode("Add")
  }

  handleCancelButtonClick() {
    this.props.handleMode("Details")
  }

  renderChildComponent() {
    switch (this.props.mode) {
      case "Details":
        return <Details
          image={this.state.image}
          item={this.props.item}
          deleteMenuItem={this.props.deleteMenuItem}
          editMenuItem={this.props.editMenuItem}
          handleEditClick={this.handleEditButtonClick}
        />
      case "Edit":
        return <Edit
          item={this.props.item} image={this.state.image}
          hadleImagePicking={this.pickDocument}
          handleSaveButtonClick={this.handleSaveButtonClick}
          handleAddNewItemButtonClick={this.handleAddNewItemButtonClick}

        />
      case "Add":
        return <Add
          item={this.props.item}
          image={this.state.image}
          handleMode={this.props.handleMode}
          hadleImagePicking={this.pickDocument}
          addMenuItem={this.props.addMenuItem}
          handleCancelButtonClick={this.handleCancelButtonClick}
        />
    }
  }

  render() {
    return (
      <View style={styles.menuOptionsContainer} >
        <View style={{ flexDirection: 'column' }}>
          <View style={{ height: 60, backgroundColor: 'white' }}>
            <TouchableOpacity onPress={this.handleAddButtonClick.bind(this)} style={styles.buttonBackground}>
              <Text style={styles.buttonTitle}>Add menu item</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: '#D6D6D6', height: 1, width: '100%' }} />
          <this.renderChildComponent />
        </View>
      </View>
    )
  }
}


class Details extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.detailsContainer}>
          <Image style={styles.detailsItemImage} source={this.props.item.image} />
          <Text style={styles.detailsItemTitle}>{this.props.item.name}</Text>
          <Text style={styles.detailsItemPrice}>${this.props.item.price}</Text>
          <Text style={styles.detailsItemDescription}>{this.props.item.description}</Text>
          <View style={styles.detailsButtonContainer}>
            <TouchableOpacity onPress={this.props.handleEditClick}
              style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => this.props.deleteMenuItem(this.props.item)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
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
      description:
        "new item description",
      price: 12.29,
      image: null
    }

    this.state = {
      item: item
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.editItemContainer}>
          <Image
            style={styles.detailsItemImage}
            source={this.props.image}
            onLoad={() => this.state.item.image = this.props.image}
          />
          <Text onPress={this.props.hadleImagePicking} style={styles.addImageButton}>Add Image</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Name</Text>
            <TextInput style={styles.formInput}
              placeholder={'Add a name'}
              onChangeText={(text) => this.state.item.name = text}
              defaultValue={""}
            />

          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Price</Text>
            <TextInput style={styles.formInput}
              placeholder={'Add a Price'}
              onChangeText={(text) => this.state.item.price = text}
              defaultValue={""}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Description</Text>
            <TextInput style={styles.formInputDescription}
              multiline={true}
              maxLength={100}
              placeholder={'Add a description'}
              onChangeText={(text) => this.state.item.description = text}
              defaultValue={""}
            />
          </View>
          <View style={styles.detailsButtonContainer}>
            <TouchableOpacity onPress={this.props.addMenuItem.bind(this, this.state.item)}
              style={styles.editButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={this.props.handleMode.bind(this, "Details")}>
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

// EDIT ITEM COMPONENT 
class Edit extends React.Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.editItemContainer}>
          <Image style={styles.detailsItemImage} source={this.props.image} />
          <Text onPress={this.props.hadleImagePicking} style={styles.addImageButton}>{"Change Image"}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Name</Text>
            <TextInput style={styles.formInput}
              placeholder={'Add a name'}
              onChangeText={(text) => this.props.item.name = text}
              defaultValue={this.props.item.name}
            />

          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Price</Text>
            <TextInput style={styles.formInput}
              placeholder={'Add a Price'}
              onChangeText={(text) => this.props.item.price = text}
              defaultValue={this.props.item.price}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Description</Text>
            <TextInput style={styles.formInputDescription}
              multiline={true}
              maxLength={100}
              placeholder={'Add a description'}
              onChangeText={(text) => this.props.item.description = text}
              defaultValue={this.props.item.description}
            />
          </View>
          <TouchableOpacity onPress={this.props.handleSaveButtonClick}
            style={styles.editButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default MenuDetailsView;
