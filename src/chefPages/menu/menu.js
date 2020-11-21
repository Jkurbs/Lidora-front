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
import "firebase/auth";
import "firebase/firestore";

import TableView from '../../components/tableView';
import HeaderBar from '../../components/headerBar';
import MenuItemView from './menuItemView';
import MenuDetailsView from "./menuDetailsView";

var db = firebase.firestore();
const ref = db.collection('chefs')

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.uid,
      mode: 'Details',
      value: '',
      data: [],
      item: {},
      ingredients: [{
        id: '369',
        name: "dambichfine"
      },
      {
        id: '243',
        name: "ypolo"
      }],

      tableHead: ['Image', 'Name', 'Price', 'Actions'],
      tableData: [],
      hasData: null,
    };

    this.addMenuItem = this.addMenuItem.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
  }


  //FETCH CURRENT CHEF MENU
  componentDidMount() {

    let currentComponent = this;

    // Fetch Current chef 
    ref.doc(this.state.userId).collection("menu").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const data = doc.data()
        const propertyValues = [data.imageURL, data.name, data.price, '']
        let currentTableData = [...currentComponent.state.tableData];
        currentTableData.push(propertyValues);
        currentComponent.setState({
          tableData: currentTableData,
          hasData: true,
        });
      });
    });
    // Fetch List of Ingredients
    ref.doc(this.state.userId).collection("inventory").onSnapshot(function (querySnapshot) {
      let ingredientArray = []
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        ingredientArray.push({
          id: doc.data().key,
          name: doc.data().name
        })
      });
      currentComponent.setState({
        ingredients: ingredientArray
      })
      console.log("gradients", currentComponent.state.ingredients)
    });

  }




  // Add new menu item
  addMenuItem = (item, selectedItems) => {
    this.setState(state => {
      const data = [{
        key: item.key,
        name: item.name,
        description: item.description,
        price: item.price,
        imageURL: item.image
      }, ...state.data];
      return {
        data,
        value: {
          key: item.key,
          name: item.name,
          description: item.description,
          price: item.price,
          imageURL: item.image
        },
        item: {
          key: item.key,
          name: item.name,
          description: item.description,
          price: item.price,
          imageURL: item.image
        }
      };
    });
    // Change menu mode 
    this.handleMode("Details")
    // Add menu item to Firebase 
    ref.doc(this.state.userId).collection("menu").add(
      {
        key: item.key,
        name: item.name,
        description: item.description,
        price: item.price,
        ingredients: selectedItems || null
      }
    )

    //check and Add Image to Firebase Storage
    if (item.image != null) {
      var storage = firebase.storage().ref(item.image.name)
      let currentComponent = this
      storage.put(item.image.file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          ref.doc(currentComponent.state.userId).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
              console.log(doc.id)
              ref.doc(currentComponent.state.userId).collection("menu").doc(doc.id).update(
                {
                  imageURL: downloadURL
                }
              )
            })
          })
        });
      })
    }
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
    // Update menu item in Firebase 
    let currentComponent = this
    ref.doc(this.state.userId).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        console.log(doc.id)

        ref.doc(currentComponent.state.userId).collection("menu").doc(doc.id).update(
          {
            key: item.key,
            name: item.name,
            description: item.description,
            price: item.price,
          }
        )
      })
    })
    //check and Add Image to Firebase Storage
    //check if image changed
    if (typeof item.image != 'string') {
      var storage = firebase.storage().ref(item.image.name)
      let currentComponent = this
      storage.put(item.image.file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          ref.doc(currentComponent.state.userId).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
              console.log(doc.id)
              ref.doc(currentComponent.state.userId).collection("menu").doc(doc.id).update(
                {
                  imageURL: downloadURL
                }
              )
            })
          })
        });
      })
    }

  };

  // Delete menu Item 
  deleteMenuItem = (item) => {
    if (item.key === 1) { return }
    this.setState(state => {
      const data = state.data.filter(otherItem => otherItem.key !== item.key);
      return {
        data,
        item: data[0]
      };
    });
    // Delete menu item in Firebase
    let currentComponent = this
    ref.doc(this.state.userId).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        console.log(doc.id)
        ref.doc(currentComponent.state.userId).collection("menu").doc(doc.id).delete()
      })
    })

    // Delete image from storage
    if (item.image != null) {
      var storage = firebase.storage().ref(item.image.name)
      storage.delete(item.image.name)
    }
  };

  didSelectCell = (selectedIndex) => {

  }

  leftActionSelected = (selectedIndex) => {

  }

  middleActionSelected = (selectedIndex) => {

  }

  rightActionSelected = (selectedIndex) => {

  }

  showModal = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
    console.log(this.state.showCalendar)
  }


  render() {
    return (

      <View style={styles.container}>
        <HeaderBar
          title={"Menu"}
          subtitle={this.state.tableData.length}
          search={""}
          isCustomerOrders={false}
          show={this.showModal.bind(this)}
        />

        <ScrollView>
          <TableView
            tableHead={this.state.tableHead}
            tableData={this.state.tableData}
            hasData={this.state.hasData}
            hasImage={true}
            didSelectCell={this.didSelectCell.bind(this)}
            leftImage={require('../../assets/icon/edit.png')}
            middleImage={require('../../assets/icon/remove-100.png')}
            rightImage={require('../../assets/icon/info-100.png')}
            leftAction={this.leftActionSelected.bind(this)}
            middleAction={this.leftActionSelected.bind(this)}
            rightAction={this.rightActionSelected.bind(this)}
          />
        </ScrollView>
      </View>

    )
  }
}

export default Menu;
