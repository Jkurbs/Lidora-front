
import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import styles from './menu.styles'
import { View, Image, Text } from "react-native";

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
);

export default MenuItemView;
