import React from "react";
import styles from "./inventory.styles";
import { View, FlatList, Text } from "react-native";
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


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.mainTitle}>{this.state.data.length} items in your inventory</Text>
                    <Text style={styles.secondaryTitle}>Add items to your iventory.</Text>
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
                <InventoryDetailsView style={{ position: 'absolute', right: 0 }}
                    item={this.state.item}
                    mode={this.state.mode}
                    addInventoryItem={this.addInventoryItem}
                />
            </View>
        );
    }
}

export default Inventory;
