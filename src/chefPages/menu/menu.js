import React from "react";
import styles from "./menu.styles";
import {
  View,
  ScrollView,
  Dimensions,
  Animated
} from "react-native";

import firebase from "../../firebase/Firebase";
import "firebase/auth";
import "firebase/firestore";

import TableView from '../../components/tableView';
import HeaderBar from '../../components/headerBar';
import Alert from '../../components/alert'
import RightSidebar from '../inventory/InventoryRightSidebar';


var db = firebase.firestore();
const ref = db.collection('chefs')

const getWidth = Dimensions.get('window').width;

class Menu extends React.Component {
  constructor() {
    super();
    this.child = React.createRef();
    this.state = {
      userId: firebase.auth().currentUser.uid,
      ingredients: [],
      tableHead: ['Image', 'Name', 'Price', 'Actions'],
      tableData: [],
      item: null,
      hasData: null,
      filteredTableData: [],
      isSearching: false,
      isAlertVisible: false,
      isRightSidebarActive: true,
      interpolateBar: this.animVal.interpolate({ inputRange: [0, 1], outputRange: [getWidth, getWidth - 597] }),
      windowWidth: ""
    };

    this.addMenuItem = this.addMenuItem.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
  }

  animVal = new Animated.Value(0);

  animatedTransitionShrink = Animated.spring(this.animVal, { toValue: 1 })
  animatedTransitionGrow = Animated.spring(this.animVal, { toValue: 0 })


  //FETCH CURRENT CHEF MENU
  componentDidMount() {

    let currentComponent = this;
    ref.doc(this.state.userId).collection("menu").onSnapshot(function (querySnapshot) {
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

    let getWidth = ''
    window.addEventListener('resize', function () {
      // your custom logic
      getWidth = Dimensions.get('window').width;
      currentComponent.setState({
        interpolateBar: currentComponent.animVal.interpolate({ inputRange: [0, 1], outputRange: [getWidth, getWidth - 397] })
      })
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
  deleteMenuItem = () => {

    const item = this.state.item

    this.setState(state => {
      const data = state.tableData.filter(otherItem => otherItem !== item);
      const filteredData = state.filteredTableData.filter(otherItem => otherItem !== item);
      return {
        tableData: data,
        filteredTableData: filteredData
      };
    });

    this.setState({ item: null, isAlertVisible: !this.state.isAlertVisible })

    // Delete menu item in Firebase
    // let currentComponent = this
    // ref.doc(this.state.userId).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
    //   snapshot.forEach(function (doc) {
    //     console.log(doc.id)
    //     ref.doc(currentComponent.state.userId).collection("menu").doc(doc.id).delete()
    //   })
    // })

    // Delete image from storage
    // if (item.image != null) {
    //   var storage = firebase.storage().ref(item.image.name)
    //   storage.delete(item.image.name)
    // }
  };

  didSelectCell = (selectedIndex) => {

  }

  leftActionSelected = (selectedIndex) => {

  }

  middleActionSelected = (item, selectedIndex) => {
    this.setState({ item: item, isAlertVisible: !this.state.isAlertVisible })
  }

  cancelAlert = () => {
    this.setState({ isAlertVisible: !this.state.isAlertVisible })
  }

  rightActionSelected = (selectedIndex) => {

  }

  showModal = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
    console.log(this.state.showCalendar)
  }

  showRightSideBar = () => {
    this.setState({ isRightSidebarActive: !this.state.isRightSidebarActive })
    this.child.current.handleSlide(this.state.isRightSidebarActive);
    if (this.state.isRightSidebarActive === true) {
      this.animatedTransitionShrink.start();

    } else {
      this.animatedTransitionGrow.start();
    }
  }

  handleWidth = () => {
    let { isActive, translateX } = this.state;
    Animated.spring(translateX, {
      toValue: isActive ? -420 : 0,
      duration: 20
    }).start(finished => {

      this.setState((prevState, props) => ({
        isActive: !prevState.isActive,
      }));
      console.log(this.state.isActive)

    });
  };

  search = (searchTerm) => {
    let filteredData = this.state.tableData.filter(dataRow => dataRow[1].toLowerCase().includes(searchTerm));
    this.setState({
      isSearching: true,
      filteredTableData: filteredData,
    });
  }

  render() {
    return (

      <View style={styles.container}>
        <HeaderBar
          title={"Menu"}
          subtitle={this.state.tableData.length}
          search={this.search.bind(this)}
          isSearchEnabled={true}
          show={this.showModal.bind(this)}
          showRightSideBar={this.showRightSideBar.bind(this)}
        />

        <Animated.View style={{ width: this.state.interpolateBar }}>
          <TableView
            tableHead={this.state.tableHead}
            tableData={this.state.isSearching ? this.state.filteredTableData : this.state.tableData}
            hasData={this.state.hasData}
            hasImage={true}
            didSelectCell={this.didSelectCell.bind(this)}
            leftImage={require('../../assets/icon/edit.png')}
            middleImage={require('../../assets/icon/remove-100.png')}
            rightImage={require('../../assets/icon/info-100.png')}
            leftAction={this.leftActionSelected.bind(this)}
            middleAction={this.middleActionSelected.bind(this)}
            rightAction={this.rightActionSelected.bind(this)}
          />
        </Animated.View>

        <Alert
          cancelAction={this.cancelAlert.bind(this)}
          deleteAction={this.deleteMenuItem.bind(this)}
          isVisible={this.state.isAlertVisible}
          buttonTitle1={"Delete from menu"} />

        <RightSidebar
          isActive={this.state.isRightSidebarActive}
          ref={this.child}
        />
      </View>

    )
  }
}

export default Menu;
