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
    this.addInventoryItem = this.addInventoryItem.bind(this);
  }

  animVal = new Animated.Value(0);

  animatedTransitionShrink = Animated.spring(this.animVal, { toValue: 1 })
  animatedTransitionGrow = Animated.spring(this.animVal, { toValue: 0 })

  componentDidMount() {
    let currentComponent = this;

    ref.doc(this.state.userID).collection("menu").onSnapshot(function (querySnapshot) {
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
    // Fetch List of Ingredients
    ref.doc(this.state.userID).collection("inventory").onSnapshot(function (querySnapshot) {
      let ingredientArray = []
      querySnapshot.forEach(function (doc) {
        ingredientArray.push({
          id: doc.data().key,
          name: doc.data().name
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

  // Add new inventory item
  addInventoryItem = (item) => {
    this.setState(state => {
      const data = [item, ...state.data];
      return {
        data,
        value: item,
        item: item
      };
    });
    // TODO: - Add inventory item to Firebase 
    ref.doc(this.state.userID).collection("inventory").add(
      item
    )
    this.handleMode("Details")
  };

  // Update inventory Item 
  updateInventoryItem = (item) => {
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
    ref.doc(this.state.userID).collection("inventory").where('key', '==', item.key).get().then(function (snapshot) {
      snapshot.forEach(function (doc) {
        console.log(doc.id)
        ref.doc(currentComponent.state.userID).collection("inventory").doc(doc.id).update(item)
      })
    })
  };

  // Delete menu Item 
  deleteInventoryItem = () => {

    // TODO: - Delete menu item in Firebase
    // let currentComponent = this
    // ref.doc(this.state.userID).collection("inventory").where('key', '==', item.key).get().then(function (snapshot) {
    //     snapshot.forEach(function (doc) {
    //         console.log(doc.id)
    //         ref.doc(currentComponent.state.userID).collection("inventory").doc(doc.id).delete()
    //     })
    // })

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

  };

  didSelectCell = (item,selectedIndex) => {
    this.handleMode("Details")
    let realD = this.state.fullData
    console.log("realD",realD)
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
    this.handleMode("Edit")
    if (this.state.isInvModalActive === false) {
      this.showInventoryModal()
    }
  }

  middleActionSelected = (item, selectedIndex) => {
    this.setState({ item: item, isAlertVisible: !this.state.isAlertVisible })
  }

  cancelAlert = () => {
    this.setState({ isAlertVisible: !this.state.isAlertVisible })
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
          addInventoryItem={this.addInventoryItem}
          editInventoryITem={this.updateInventoryItem}
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
