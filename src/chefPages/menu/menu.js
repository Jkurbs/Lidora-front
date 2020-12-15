import React from "react";
import styles from './menu.styles';
import { View, ScrollView, Animated, Dimensions } from "react-native";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import TableView from '../../components/tableView';
import HeaderBar from '../../components/headerBar';
import Alert from '../../components/alert';

import MenuRightSideBar from '../../components/MenuRightSideBar';


var db = firebase.firestore();
const ref = db.collection('chefs')

const getWidth = Dimensions.get('window').width - 200;

class Menu extends React.Component {

  constructor() {
    super();
    this.child = React.createRef();
    this.state = {
      userID: firebase.auth().currentUser.uid,
      tableHead: ['Image', 'Name', 'Price', 'Actions'],
      tableData: [],
      filteredTableData: [],
      item: {},
      fullData: [],
      filteredFullData: [],
      inventories: [],
      value: '',
      hasData: null,
      isSearching: false,
      isAlertVisible: false,
      isInvModalActive: false,
      interpolateBar: this.animVal.interpolate({ inputRange: [0, 1], outputRange: [getWidth, getWidth - 397] }),
      windowWidth: "",
      mode: 'Add',
    };

    this.handleDetails = this.handleDetails.bind(this);
    this.addMenuItem = this.addMenuItem.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
    this.addInventoryItem = this.addInventoryItem.bind(this);
  }

  animVal = new Animated.Value(0);

  animatedTransitionShrink = Animated.spring(this.animVal, { toValue: 1 })
  animatedTransitionGrow = Animated.spring(this.animVal, { toValue: 0 })

  componentDidMount() {
    let currentComponent = this;

    ref.doc(this.state.userID).collection("menu").onSnapshot(function (querySnapshot) {
      currentComponent.setState({ tableData: [], fullData:[] })
      querySnapshot.forEach(function (doc) {
        const data = doc.data()
        const propertyValues = [data.imageURL, data.name, data.price, '']
        let currentTableData = [...currentComponent.state.tableData];
        let currentFullData = [...currentComponent.state.fullData];
        currentTableData.push(propertyValues);
        currentFullData.push(data)
        currentComponent.setState({
          tableData: currentTableData,
          fullData: currentFullData,
          hasData: true,
        });
      });
    });

    ref.doc(this.state.userID).collection("menu").onSnapshot(function (querySnapshot) {
      currentComponent.setState({ tableData: [], data: [] })

      if (querySnapshot.empty) {
        currentComponent.setState({
          hasData: false,
        });
      } else {
        querySnapshot.forEach(function (doc) {
          const data = doc.data()
          const detValues = [data.key, data.dateAdded, data.name]
          let currentData = [...currentComponent.state.data]
          currentData.push(detValues)
          const propertyValues = [data.imageURL, data.name, data.price, '']
          let currentTableData = [...currentComponent.state.tableData];
          currentTableData.push(propertyValues);
          currentComponent.setState({
            data: currentData,
            tableData: currentTableData,
            hasData: true,
          });
        });
      }
    });


    // Fetch List of Ingredients
    ref.doc(this.state.userID).collection("inventory").onSnapshot(function (querySnapshot) {
      let ingredientArray = []
      querySnapshot.forEach(function (doc) {
        ingredientArray.push({
          id: doc.data().key,
          name: doc.data().name,
          unit: doc.data().unit,
        })
      });
      currentComponent.setState({
        inventories: ingredientArray
      })
    });

    let getWidth = ''
    window.addEventListener('resize', function () {
      // your custom logic
      getWidth = Dimensions.get('window').width - 200;
      currentComponent.setState({
        interpolateBar: currentComponent.animVal.interpolate({ inputRange: [0, 1], outputRange: [getWidth, getWidth - 397] })
      })
    });
  }

  // Handle inventory details mode 
  handleMode = (mode) => {
    this.setState({
      mode: mode
    })
  }

  // Show Iventory item details 
  handleDetails = (item) => {
    this.setState({
      item: item,
      mode: 'Details'
    })
  };

  // Add new menu item
  addMenuItem = (item) => {
    console.log(item)

    this.setState(state => {
      const data = [item, ...state.fullData];
      return {
        value: item,
        item: item
      };
    });


    // Add menu item to Firebase 
    ref.doc(this.state.userID).collection("menu").add(
      {
        key: item.key,
        name: item.name,
        description: item.description,
        price: item.price,
        ingredients: item.ingredients,
        isVisible: item.isVisible
      }
    )
    //check and Add Image to Firebase Storage
    if (item.image != null) {
      var storage = firebase.storage().ref(item.image.name)
      let currentComponent = this;
      storage.put(item.image.file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);

          ref.doc(currentComponent.state.userID).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
              console.log(doc.id)
              ref.doc(currentComponent.state.userID).collection("menu").doc(doc.id).update(
                {
                  imageURL: downloadURL
                }
              )
            })
          })
        });
      })
    }
    // Change menu mode 
    this.handleMode("Details")
  };


  // Update menu Item 
  updateMenuItem = (item) => {
    let currentComponent = this
    console.log("UPDATEITEM",item)
    this.setState(state => {
      const data = state.fullData.map((previousItem, j) => {
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
    ref.doc(this.state.userID).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        console.log(doc.id)
        ref.doc(currentComponent.state.userID).collection("menu").doc(doc.id).update(
          {
            key: item.key,
            name: item.name,
            description: item.description,
            price: item.price,
            ingredients: item.ingredients,
            isVisible: item.isVisible
          }
        )
      })
    })
    //check and Add Image to Firebase Storage
    //check if image changed
    if ( item.image !== null) {
      let currentComponent = this;
      console.log("UPDATEDIMAGE", item.image)
      var storage = firebase.storage().ref(item.image.name)
      storage.put(item.image.file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          ref.doc(currentComponent.state.userID).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
              console.log(doc.id)
              ref.doc(currentComponent.state.userID).collection("menu").doc(doc.id).update(
                {
                  imageURL: downloadURL
                }
              )
            })
          })
        });
      })
    }
        // Change menu mode 
        this.handleMode("Details")
  };

  // Delete menu Item 
  deleteMenuItem = () => {
    const item = this.state.item
    console.log("ITEMTODELETE",item)
    let currentComponent = this
    
    // Delete menu item in Firebase
    ref.doc(currentComponent.state.userID).collection("menu").where('key', '==', item.key).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        console.log(doc.id)
        ref.doc(currentComponent.state.userID).collection("menu").doc(doc.id).delete()
      })
    })

    // Delete image from storage
    if (item.image != null) {
      var storage = firebase.storage().ref(item.image.name)
      storage.delete(item.image.name)
    }

    //Delete item from filtereddata --- For when Search is active
    console.log(item.image)
    const itemF = [item.image, item.name, item.price, '']

    this.setState(state => {
      console.log("FILTERTABLEDATA",state.filteredTableData)
      console.log("ITEMF",itemF)
        const filteredData = state.filteredTableData.filter(otherItem => otherItem[1] !== itemF[1]);
        return {
            filteredTableData: filteredData
        };
    });

    this.setState({ isAlertVisible: false })
    if(this.state.isInvModalActive == true){
    this.showInventoryModal()
    }
  };

  didSelectCell = (item,selectedIndex) => {
    this.handleMode("Details")
    let realD = this.state.fullData
    console.log(this.state.inventories)
    // IF SEARCH IS ON GET DATA FROM FILTERED
    if(this.state.isSearching === true){
        realD = this.state.filteredFullData
    }
    item = {...realD[selectedIndex],
      image:realD[selectedIndex].imageURL
    }
    console.log(item)
    this.handleDetails(item)
    if (this.state.isInvModalActive === false) {
        this.showInventoryModal()
    }


}

  leftActionSelected = (selectedIndex) => {
    if(this.state.mode == "Edit"){
      
    }
    
    let realD = this.state.fullData
    console.log(this.state.inventories)
    // IF SEARCH IS ON GET DATA FROM FILTERED
    if(this.state.isSearching === true){
        realD = this.state.filteredFullData
    }
    let item = {...realD[selectedIndex],
      image:realD[selectedIndex].imageURL,
    }
    console.log("EDITACTIONSELECT",item)
    this.setState({
      item: item
    })
    if (this.state.isInvModalActive === false) {
      this.showInventoryModal()
    }
    this.handleMode("Edit")
  }

  middleActionSelected = (item, selectedIndex) => {
    let realD = this.state.fullData
    console.log(this.state.inventories)
    // IF SEARCH IS ON GET DATA FROM FILTERED
    if(this.state.isSearching === true){
        realD = this.state.filteredFullData
    }
    let newItem = {...realD[selectedIndex],
      key:realD[selectedIndex].key,
      image:realD[selectedIndex].imageURL
    }
    console.log(newItem)
    this.handleDetails(newItem)
    this.setState({ item: newItem, isAlertVisible: true })
  }

  cancelAlert = () => {
    this.setState({ isAlertVisible: false })
  }

  rightActionSelected = (selectedIndex) => {
    this.handleMode("Details")
    if (this.state.isInvModalActive === false) {
      this.showInventoryModal()
    }
  }

  showCalendarModal = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
  }

  showInventoryModal = () => {
    if (this.state.isInvModalActive === true) {
      this.setState({ isInvModalActive: false })
      this.child.current.handleSlide(true);
      this.animatedTransitionGrow.start();

    } else {
      this.setState({ isInvModalActive: true })
      this.child.current.handleSlide(false);
      this.animatedTransitionShrink.start();
    }
  }

  search = (searchTerm) => {
    let filteredData = this.state.tableData.filter(dataRow => dataRow[1].toLowerCase().includes(searchTerm));
    let filteredReal = this.state.fullData.filter(dataRow => dataRow.name.toLowerCase().includes(searchTerm));
    console.log(filteredReal)
    this.setState({
      isSearching: true,
      filteredTableData: filteredData,
      filteredFullData: filteredReal
    });

    if (searchTerm.length === 0) {
      this.setState({
        isSearching: false,
        filteredTableData: [
          ["No result ", "try something else",]
        ],
      });
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

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar
          title={"Menu"}
          subtitle={this.state.tableData.length}
          search={this.search.bind(this)}
          isSearchEnabled={true}
          showCalendar={this.showCalendarModal.bind(this)}
          showInv={this.showInventoryModal.bind(this)}
          handleMode={this.handleMode.bind(this)}
          isModalActive={this.state.isInvModalActive}
        />
        <ScrollView>
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
        </ScrollView>
        <MenuRightSideBar
          inventories={this.state.inventories}
          isActive={this.state.isInvModalActive}
          showInv={this.showInventoryModal.bind(this)}
          mode={this.state.mode}
          ref={this.child}
          handleMode={this.handleMode.bind(this)}
          item={this.state.item}
          addMenuItem={this.addMenuItem}
          updateMenuItem={this.updateMenuItem}
        />

        <Alert
          cancelAction={this.cancelAlert.bind(this)}
          deleteAction={this.deleteInventoryItem.bind(this)}
          isVisible={this.state.isAlertVisible}
          buttonTitle1={"Delete from inventory"} />
      </View>
    );
  }
}

export default Menu;
