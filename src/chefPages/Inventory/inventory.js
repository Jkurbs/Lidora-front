import React from "react";
import styles from "./inventory.styles";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import IventoryItemView from "./inventoryItemView";
import InventoryDetailsView from "./inventoryDetailsView";

const data = [
    {
        key: 1,
        name: "Rice",
        quantity: 10,
        unit: 'gram'
    },
    {
        key: 2,
        name: "Bananas",
        quantity: 10,
        unit: 'piece'
    },
    {
        key: 3,
        name: "Avocado",
        quantity: 5,
        unit: 'gram'

    },
    {
        key: 4,
        name: "Whole Dates",
        quantity: 3,
        unit: 'gram'
    },
    {
        key: 5,
        name: "barley",
        quantity: 9,
        unit: 'gram'
    },
    {
        key: 6,
        name: "babaganoosh",
        quantity: 1,
        unit: 'gram'
    },
];

const FlatListItemSeparator = () => {
    return (
        <View
            style={styles.flatListItemSeparator}
        />
    );
}

class Inventory extends React.Component {

    constructor() {
        super();
        this.state = {
            mode: 'Add',
            value: '',
            data: data,
            item: data[0]
        };
        this.addInventoryItem = this.addInventoryItem.bind(this);
    }

    // Fetch current chef Inventory 
    fetchInventory = () => {
        var db = firebase.firestore();
        const [inventoryData, setInventoryData] = React.useState({ user: [] })
        React.useEffect(() => {
            // Fetch Current chef 
            const ref = db.collection('chefs').doc("cAim5UCNHnXPAvvK0sUa").collection("inventory")
            ref.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, " => ", doc.data());
                });
            });
        })
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
            };
        });
        // TODO: - Add inventory item to Firebase 
    };

    // Delete menu Item 
    deleteInventoryItem = (item) => {
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
                        <Text style={styles.mainTitle}>{this.state.data.length} items in your inventory</Text>
                        <Text style={styles.secondaryTitle}>Add, Update and Delete items to your iventory.</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ mode: 'Add' })}>
                        <Ionicons name="ios-add" size={30} color="#34C759" />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#D6D6D6', height: 1, width: '60%' }} />
                <View style={{ width: '60%' }}>
                    <FlatList
                        style={styles.flatList}
                        data={this.state.data}
                        showsVerticalScrollIndicator={true}
                        extraData={this.state}
                        renderItem={({ item }) => (
                            <IventoryItemView item={item} handleDetails={this.handleDetails} />
                        )}
                        ItemSeparatorComponent={FlatListItemSeparator}
                    />
                </View>
                <InventoryDetailsView style={{ top: 0, bottom: 0, position: 'absolute', right: 0 }}
                    item={this.state.item}
                    mode={this.state.mode}
                    addInventoryItem={this.addInventoryItem}
                    deleteInventoryItem={this.deleteInventoryItem}
                />
            </View>
        );
    }
}

export default Inventory;
