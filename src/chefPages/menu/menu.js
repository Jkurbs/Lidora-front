import React, { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./menu.styles";
import { registerRootComponent } from "expo";

import {
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import MenuItemView from "./menuItemView";
import MenuDetailsView from "./menuDetailsView";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
};

// const MENUITEMS = [
//     {
//       key: 1,
//       name: "Rice",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
//       price: 3.29,
//       image:
//         "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80",
//     },
//     {
//       key: 2,
//       name: "Healthy gear",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
//       price: 10.29,
//       image:
//         "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1335&q=80",
//     },
//     {
//       key: 3,
//       name: "Tuna burger",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
//       price: 12.29,
//       image:
//         "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
//     },
//     {
//       key: 4,
//       name: "Hot hoagies - Chicken strips",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
//       price: 5.69,
//       image:
//         "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1231&q=80",
//     },
//   ];

function Menu() {
  const [data, setData] = useState([
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
  ]);
  const [editMode, setEditMode] = useState(false);
  const [details, setDetails] = useState({});

  const handleDetails = (item) => {
    console.log("xxx", item);
    setEditMode(true);
    setDetails({
      ...details,
      key: item.key,
      name: item.name,
      price: item.price,
      description: item.description,
    });
  };

  const addNewMenuItem = (name, price, desc) => {
    console.log(name, price, desc);
    setDetails({})
  };

  const editMenuItem = (key) => {
    console.log("EditMenuItem", key, details);
  };

  const deleteMenuItem = (key) => {
    console.log("deleteMenuIte", key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.buttonBackground}>
          <Text
            style={styles.buttonTitle}
            onPress={() => {
              setEditMode(false), setDetails({});
            }}
          >
            Add new menu item
          </Text>
        </TouchableOpacity>
        <FlatList
          style={styles.flatList}
          data={data}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <MenuItemView item={item} handleDetails={handleDetails} />
          )}
          ItemSeparatorComponent={FlatListItemSeparator}
        />
      </View>
      <View style={styles.rightContainer}>
        <MenuDetailsView
          details={details}
          setDetails={setDetails}
          editMode={editMode}
          editMenuItem={editMenuItem}
          addNewMenuItem={addNewMenuItem}
          deleteMenuItem={deleteMenuItem}
        />
      </View>
    </View>
  );
}

export default registerRootComponent(Menu);
