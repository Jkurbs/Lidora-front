import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./menu.styles";
import { TouchableOpacity, View, Image, Text } from "react-native";

<<<<<<< HEAD
const MenuItemView = ({ item }) => (
    <View style={styles.menuContent} >
        <View style={styles.menuWrapper}>
            <Image style={styles.image} source={item.image}
            />
        </View>
        <View style={styles.mainView}>
            <View style={styles.secondaryView}>
                <Text style={styles.mainText}>{item.name}</Text>
                <Text style={styles.mainText}>${item.price}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    </View >
=======
const MenuItemView = ({ item, handleDetails }) => (
  <TouchableOpacity
    style={styles.menuContent}
    onPress={() => handleDetails(item)}
  >
    <View style={styles.menuWrapper}>
      <Image style={styles.image} source={item.image} />
    </View>
    <View style={styles.mainView}>
      <View style={styles.secondaryView}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </TouchableOpacity>
>>>>>>> 5efd282503930e31c7f4df36b337de070a161cf1
);

export default MenuItemView;
