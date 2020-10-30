import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import styles from './menu.styles'
import { registerRootComponent } from "expo";


import { View, FlatList, Text, Dimensions, TouchableOpacity } from "react-native";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import MenuItemView from './menuItemView'

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

export const MENUITEMS = [
    { key: 1, name: 'Rice', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 3.29, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80" },
    { key: 2, name: 'Healthy gear', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 10.29, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1335&q=80" },
    { key: 3, name: 'Tuna burger', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 12.29, image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" },
    { key: 4, name: 'Hot hoagies - Chicken strips', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 5.69, image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1231&q=80" },
]

const FlatListItemSeparator = () => {
    return (
        <View
            style={{
                alignSelf: 'center',
                height: 0.5,
                width: "95%",
                backgroundColor: '#D6D6D6',
            }}
        />
    );
}


function Menu() {
    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', padding: 20,
                }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}>Menu</Text>
                        <Text style={styles.secondaryTitle}>Add, update and remove a menu</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonBackground}>
                        <Text style={styles.buttonTitle}>Add menu item</Text>
                    </TouchableOpacity>

                </View>

                <FlatList style={styles.flatList}
                    data={MENUITEMS}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={MenuItemView}
                    ItemSeparatorComponent={FlatListItemSeparator}
                />
            </View>
        </View>
    );
}

export default Menu;
