import React, { useState, useCallback, useEffect } from "react";
import styles from "./menu.styles";
import { View, TextInput, TouchableOpacity, Text, Image, Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MultiSelect from 'react-native-multiple-select'

import * as DocumentPicker from 'expo-document-picker';

const items = [{
  id: '92iijs7yta',
  name: 'Banana'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Orange'
}, {
  id: '16hbajsabsd',
  name: 'Rice'
}, {
  id: 'nahs75a5sg',
  name: 'Avocado'
}, {
  id: '667atsas',
  name: 'Dates'
}, {
  id: 'hsyasajs',
  name: 'Barley'
}, {
  id: 'djsjudksjd',
  name: 'Babaganoosh'
}];

const generateKey = (pre) => {
  return `${ pre }_${ new Date().getTime() }`;
}

class MenuDetailsView extends React.Component {
  constructor() {
    super();
    this.state = {
      key: generateKey(""),
      image: null,
      name: null,
      price: null,
      description: null,
      ingredients: []
    }
    this.pickDocument = this.pickDocument.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.renderChildComponent = this.renderChildComponent.bind(this);
  }

  componentWillMount(prevProps) {
    this.setState({
      key: this.props.item.key,
      image: this.props.item.imageURL,
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description,
      // ingredients: this.props.ingredients
    })
    console.log('gredientsss2',this.props.ingredients)
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
      key: this.props.item.key,
      image: this.props.item.imageURL,
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description
    })
    this.props.handleMode("Edit")
  }

  // Configure save button click 
  handleSaveButtonClick(editItem) {
    const item = this.props.item
    editItem.image = this.state.image
    this.props.item.name = editItem.name
    this.props.item.price = editItem.price
    this.props.item.description = editItem.description
    this.props.item.imageURL = this.state.image
    this.props.updateMenuItem(editItem)
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
          ingredients={this.props.ingredients}
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
            onPress={() => this.props.deleteMenuItem(this.props.item)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.handleEditClick}
            style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>

          <Image style={styles.detailsItemImage} source={this.props.item?.imageURL} />
          <Text style={styles.detailsItemTitle}>{this.props.item.name}</Text>
          <Text style={styles.detailsItemPrice}>${this.props.item.price}</Text>
          <Text style={styles.detailsItemDescription}>{this.props.item.description}</Text>
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
      key: generateKey(""),
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
  state = {
    selectedItems: []
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.editItemContainer}>
          <Text style={{ fontSize: 20, fontWeight: '500', alignSelf: 'center' }}>Add a new item</Text>
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

            <View style={{ marginTop: 8 }}>
              <Text style={styles.formTitle}>Ingredients</Text>
              <MultiSelect
                items={this.props.ingredients}
                uniqueKey="name"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                selectText="Pick Ingredients"
                searchInputPlaceholderText="Search Ingredients..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                styleMainWrapper={{ marginTop: 7 }}
                styleTextDropdown={{ fontFamily: 'System', padding: 8 }}
                styleDropdownMenuSubsection={{ height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#d6d6d6' }}
                styleRowList={{ height: 40 }}
                itemFontSize={13}
                styleListContainer={{ marginTop: 20 }}
                searchInputStyle={{ height: 40 }}
              />
            </View>
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
            <TouchableOpacity onPress={this.props.addMenuItem.bind(this, this.state.item,this.state.selectedItems)}
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

  constructor(props) {
    super(props);
    const item = {
      key: this.props.item.key,
      name: this.props.item.name,
      description:
      this.props.item.description,
      price: this.props.item.price,
      image: this.props.item.image
    }

    this.state = {
      item: item
    }
  }

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
              onChangeText={(text) => this.state.item.name = text}
              defaultValue={this.props.item.name}
            />

          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Price</Text>
            <TextInput style={styles.formInput}
              placeholder={'Add a Price'}
              onChangeText={(text) => this.state.item.price = text}
              defaultValue={this.props.item.price}
            />
          </View>

          {/* TODO: - Add search field here */}


          <View style={styles.inputContainer}>
            <Text style={styles.formTitle}>Description</Text>
            <TextInput style={styles.formInputDescription}
              multiline={true}
              maxLength={100}
              placeholder={'Add a description'}
              onChangeText={(text) => this.state.item.description = text}
              defaultValue={this.props.item.description}
            />
          </View>
          <TouchableOpacity onPress={()=>{this.props.handleSaveButtonClick(this.state.item)}}
            style={styles.editButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default MenuDetailsView;
