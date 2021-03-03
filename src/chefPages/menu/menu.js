import React from "react";
import styles from './menu.styles';
import { View, ScrollView } from "react-native";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import TableView from '../../components/tableView';
import HeaderBar from '../../components/headerBar';

var db = firebase.firestore();
const ref = db.collection('chefs')

function Menu(props) {
  
    const userID = firebase.auth().currentUser.uid

    const [tableHead] = React.useState(['Image', 'Name', 'Price', 'Category', 'Actions'])
    const [tableData, setTableData] = React.useState([])
    const [fullData, setFullData] = React.useState([])
    const [filteredTableData, setFilteredTableData] = React.useState([])
    const [filteredFullData, setFilteredFullData] = React.useState([])
    const [item, setItem] = React.useState({})
    const [hasData, setHasData] = React.useState(null)
    const [isSearching, setIsSearching] = React.useState(false)
    const [isInvModalActive, setIsInvModalActive] = React.useState(false)
  
    const menuRef = ref.doc(userID).collection("menu")
  
    // Fetch Menu
    React.useEffect(() => {
        menuRef.onSnapshot(function (querySnapshot) {
          // setTableData([])
          if (querySnapshot.empty) {
            setHasData(false)
          } else {
            querySnapshot.forEach(function (doc) {
              const data = doc.data()
              const propertyValues = [data.imageURL, data.name, data.price, data.group, '']
              setTableData(prevState => [...prevState, propertyValues])
              setFullData(prevState => [...prevState, data])
              setHasData(true)
            });
          }
        });
    }, [])
  

    // MARK: - Functions 
  
    // Show Iventory item details 
    const handleDetails = (item) => {
      setItem(item)
    };
  
    // Add new menu item
    const addMenuItem = (item) => {
      setFullData(prevState => [...prevState, item])
      setItem(item) 
  
      // Add menu item to Firebase 
      menuRef.add(
        {
          key: item.key,
          name: item.name,
          description: item.description,
          price: item.price,
          ingredients: item.ingredients,
          isVisible: item.isVisible, 
          group: item.group
        }
      )
      //check and Add Image to Firebase Storage
      if (item.image != null) {
        var storage = firebase.storage().ref(item.image.name)
        storage.put(item.image.file).then((snapshot) => {
          snapshot.ref.getDownloadURL().then(function (downloadURL) {
  
            menuRef.where('key', '==', item.key).get().then(function (snapshot) {
              snapshot.forEach(function (doc) {
                menuRef.doc(doc.id).update(
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
    const updateMenuItem = (item) => {
      const newData = fullData.filter(prevItem => prevItem === item );
      setFullData(newData)
  
      // Update menu item in Firebase 
      menuRef.where('key', '==', item.key).get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
          ref.doc(userID).collection("menu").doc(doc.id).update(
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
      if (item.image !== null) {
        var storage = firebase.storage().ref(item.image.name)
        storage.put(item.image.file).then((snapshot) => {
          snapshot.ref.getDownloadURL().then(function (downloadURL) {
            menuRef.where('key', '==', item.key).get().then(function (snapshot) {
              snapshot.forEach(function (doc) {
                menuRef.doc(doc.id).update(
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
    const deleteMenuItem = () => {
  
      menuRef.where('key', '==', item.key).get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
          menuRef.doc(doc.id).delete()
        })
      })
  
      if (item.image != null) {
        var storage = firebase.storage().ref(item.image.name)
        storage.delete(item.image.name)
      }
  
      const itemF = [item.image, item.name, item.price, '']
      const filteredData = filteredTableData.filter(otherItem => otherItem[1] !== itemF[1]);
      setFilteredTableData(filteredData)    
      setIsAlertVisible(false)
      if (isInvModalActive === false) { showRightModal() }  
    };
  
  
  // Called when cell is selected 
  const didSelectCell = (item, selectedIndex) => {
    if (isSearching === true) { fullData = filteredFullData }
    item = {
      ...fullData[selectedIndex],
      image: fullData[selectedIndex].imageURL
    }
    handleDetails(item)
    if (isInvModalActive === false) {
      showRightModal()
    }
  }
  
  // MARK: - Item actions 
  
  const leftActionSelected = (selectedIndex) => {
    if (isSearching === true) { fullData = filteredFullData }
    let item = {
      ...fullData[selectedIndex],
      image: fullData[selectedIndex].imageURL,
    }
    if (isInvModalActive === false) { showRightModal() }
    setItem(item)
  }
  
  const middleActionSelected = (item, selectedIndex) => {
    // IF SEARCH IS ON GET DATA FROM FILTERED
    if (isSearching === true) { fullData = tfilteredFullData }
    let newItem = {
      ...fullData[selectedIndex],
      key: fullData[selectedIndex].key,
      image: fullData[selectedIndex].imageURL
    }
    handleDetails(newItem)
    setItem(newItem)
    setIsAlertVisible(true)
  }
  
  const rightActionSelected = (selectedIndex) => {
    if (isInvModalActive === false) { showRightModal() }
  }
  
  const search = (searchTerm) => {
    let filteredData = tableData.filter(dataRow => dataRow[1].toLowerCase().includes(searchTerm));
    let filteredReal = fullData.filter(dataRow => dataRow.name.toLowerCase().includes(searchTerm));
    setIsSearching(true)
    setFilteredTableData(filteredData)
    setFilteredFullData(filteredReal)
  }
  
    if (tableData != []) {
      return (
        <View style={[styles.container]}>
          <HeaderBar
            title={"Menu"}
            subtitle={tableData.length}
            search={(term)=> {search(term)}}
            isSearchEnabled={true}
            showCalendar={()=> {showCalendarModal()}}
            showInv={()=> {showRightModal()}}
            isModalActive={isInvModalActive}
          />
        <ScrollView>
            <TableView
              tableHead={tableHead}
              tableData={isSearching ? filteredTableData : tableData}
              hasData={hasData}
              hasImage={true}
              didSelectCell={(item, selectedIndex)=> {didSelectCell(item, selectedIndex)}}
              leftImage={require('../../assets/icon/edit.png')}
              middleImage={require('../../assets/icon/remove-100.png')}
              rightImage={require('../../assets/icon/info-100.png')}
              leftAction={()=> {leftActionSelected()}}
              middleAction={()=>  {middleActionSelected()}}
              rightAction={()=> {rightActionSelected()}}
              action={()=> {alert("")}}
            />
        </ScrollView>
        </View>
      )
    }
  }

export default Menu;