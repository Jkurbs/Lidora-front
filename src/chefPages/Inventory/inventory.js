import React from "react";
import styles from "./inventory.styles";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import IventoryItemView from "./inventoryItemView";
import InventoryDetailsView from "./inventoryDetailsView";
import TableView from '../../components/tableView';
import HeaderBar from '../../components/headerBar';
const data = [
    {
        key: 1,
        name: "To add, look to the right or tap the green button!",
        quantity: 2,
        unit: 'steps'
    },
];

const FlatListItemSeparator = () => {
    return (
        <View
            style={styles.flatListItemSeparator}
        />
    );
}


var db = firebase.firestore();
const ref = db.collection('chefs')

class Inventory extends React.Component {

    constructor() {
        super();
        this.state = {
            userID: firebase.auth().currentUser.uid,
            mode: 'Add',
            value: '',
            data: [],
            item: {},
            tableHead: ['Image', 'Name', 'Price', 'Actions'],
            tableData: [],
            hasData: null,
        };
        this.addInventoryItem = this.addInventoryItem.bind(this);
    }



    componentDidMount() {
        console.log("COmponent did mount")
        let currentComponent = this;
        // Fetch Current chef 
        ref.doc('spE8oRHDBChYPTVgF8BayBTJKmP2').collection("menu").get().then(function (querySnapshot) {
            if (querySnapshot.empty) {
                currentComponent.setState({
                    hasData: false,
                });
            } else {
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
            }
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
        console.log("UPDATEINVENTORYITEM",item)
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
    deleteInventoryItem = (item) => {
        if (this.state.data.length >= 1) {
            this.setState(state => {
                const data = state.data.filter(otherItem => otherItem.key !== item.key);
                return {
                    data,
                    item: data[0]
                };
            });
            // TODO: - Delete menu item in Firebase
            let currentComponent = this
            ref.doc(this.state.userID).collection("inventory").where('key', '==', item.key).get().then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    console.log(doc.id)
                    ref.doc(currentComponent.state.userID).collection("inventory").doc(doc.id).delete()
                })
            })
        } else { return }


    };

    didSelectCell = (selectedIndex) => {
        alert(selectedIndex)
    }

    leftActionSelected = (selectedIndex) => {
        alert(selectedIndex)
    }

    middleActionSelected = (selectedIndex) => {
        alert("Middle Action")
    }

    rightActionSelected = (selectedIndex) => {
        alert(selectedIndex)
    }

    showModal = () => {
        console.log("SHOWCALENDAR!")
        this.setState({ showCalendar: !this.state.showCalendar });
        console.log(this.state.showCalendar)
    }


    render() {
        let menuData
        let menuItem
        if (this.state.data.length > 0) {
            menuData = this.state.data
            menuItem = this.state.item
        } else {
            menuData = data
            menuItem = data
        }
        return (
            <View style={styles.container}>
                <HeaderBar 
                    title={"Inventory"}
                    subtitle={"11 Items"}
                    search={""}
                    isCustomerOrders={false}
                    show={this.showModal.bind(this)}
                />
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
            </View>
        );
    }
}

export default Inventory;
