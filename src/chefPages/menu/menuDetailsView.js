import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./menu.styles";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

const MenuDetailsView = ({
  details,
  setDetails,
  editMode,
  addNewMenuItem,
  editMenuItem,
  deleteMenuItem
}) => {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleEdit = (key) => {
    setDetails({
      key: key ? key : "",
      name: newName ? newName : "",
      price: newPrice ? newPrice: "",
      description: newDescription ? newDescription : "",
    });
    console.log({ details });
    editMenuItem(details);
  };

  return (
    <View style={styles.menuForm}>
      <Text style={styles.formTitle}>
        {editMode ? "Update Menu Item" : "New Menu Item"}
      </Text>

      <TextInput
        style={styles.formInput}
        type="text"
        placeholder="Name of menu item."
        onChangeText={(text) => setNewName(text)}
        defaultValue={{ details } ? details.name : ""}
      />
      <TextInput
        style={styles.formInput}
        type="number"
        placeholder="Price of menu item."
        onChangeText={(number) => setNewPrice(number)}
        defaultValue={{ details } ? details.price : ""}
      />
      <TextInput
        style={styles.formInput}
        type="text"
        placeholder="Description"
        onChangeText={(text) => setNewDescription(text)}
        defaultValue={{ details } ? details.description : ""}
      />
      {editMode ? (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(details.key)}
          >
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteMenuItem(details.key)}
          >
            <Text style={styles.buttonText}>DELETE?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addNewMenuItem(newName, newPrice, newDescription)}
          >
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MenuDetailsView;
