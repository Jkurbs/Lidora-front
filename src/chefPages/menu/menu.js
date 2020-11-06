import React, { useState, useCallback } from "react";
import styles from "./menu.styles";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import MenuItemView from './menuItemView';
import MenuDetailsView from "./menuDetailsView";

const data = [
  {
    key: 1,
    name: "Rice",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    price: 3.29,
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80",
  },
  {
    key: 2,
    name: "Healthy gear",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    price: 10.29,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1335&q=80",
  },
  {
    key: 3,
    name: "Tuna burger",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    price: 12.29,
    image:
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: 4,
    name: "Hot hoagies - Chicken strips",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    price: 5.69,
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1231&q=80",
  },
  {
    key: 5,
    name: "Tuna burger",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    price: 12.29,
    image:
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: 6,
    name: "Hot hoagies - Chicken strips",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
    price: 5.69,
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1231&q=80",
  },
];

const FlatListItemSeparator = () => {
  return (
    <View
      style={styles.flatListItemSeparator}
    />
  );
}

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'Details',
      value: '',
      data: data,
      item: data[0],
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.addMenuItem = this.addMenuItem.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
  }

  // Fetch current chef Menu 
  fetchMenu = () => {
    var db = firebase.firestore();
    const [userData, setUserData] = React.useState({ user: [] })
    React.useEffect(() => {
      const ref = db.collection('chefs').doc("cAim5UCNHnXPAvvK0sUa").collection("menu")
      ref.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
        });
      });
    })
  }

  // Handle menu details mode 
  handleMode = (mode) => {
    this.setState({
      mode: mode
    })
  }

  // Show menu item details 
  handleDetails = (item) => {
    this.setState({
      item: item
    })
  };

  // Add new menu item
  addMenuItem = (item) => {
    this.setState(state => {
      const data = [item, ...state.data];
      return {
        data,
        value: item,
        item: item
      };
    });
    // Change menu mode 
    this.handleMode("Details")
    // TODO: - Add menu item to Firebase 

  };

  // Update menu Item 
  updateMenuItem = (item) => {
    this.setState(state => {
      const data = state.data.map((previousItem, j) => {
        if (j === item) {
          return item;
        } else {
          return previousItem;
        }
      });
      return {
        data,
      };
    });
    // TODO: - Update menu item in Firebase 

  };

  // Delete menu Item 
  deleteMenuItem = (item) => {
    this.setState(state => {
      const data = state.data.filter(otherItem => otherItem.key !== item.key);
      return {
        data,
        item: data[0]
      };
    });
    // TODO: - Delete menu item in Firebase

  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleParentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>{this.state.data.length} menu items</Text>
            <Text style={styles.secondaryTitle}>Add, update and remove a menu item.</Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({ mode: 'Add' })}>
            <Ionicons name="ios-add" size={30} color="#34C759" />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#D6D6D6', height: 1, width: '100%' }} />

        <View style={{
          flexDirection: 'row', flex: 2
        }}>
          <FlatList
            style={styles.flatList}
            data={this.state.data}
            showsVerticalScrollIndicator={true}
            extraData={this.state}
            renderItem={({ item }) => (
              <MenuItemView item={item} handleDetails={this.handleDetails} />
            )}
            ItemSeparatorComponent={FlatListItemSeparator}
          />
        </View>
        <MenuDetailsView
          item={this.state.item}
          mode={this.state.mode}
          handleMode={this.handleMode}
          updateMenuItem={this.updateMenuItem}
          addMenuItem={this.addMenuItem}
          deleteMenuItem={this.deleteMenuItem}
        />
      </View>

    );
  }
}

export default Menu;
