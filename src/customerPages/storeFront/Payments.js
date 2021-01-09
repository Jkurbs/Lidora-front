import React, { useState } from "react";
import {  View, Image, Text, FlatList, TouchableOpacity,
} from "react-native";

import firebase from "../../firebase/Firebase"

var db = firebase.firestore();


const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];


const FlatListItemSeparator = () => {
    return (
        <View style={styles.listItemSeparatorStyle} />
    )
}

function Payments(props) {

    const chefId = props.chefId
    const navigation = props.navigation

    // States 
    const [data, setData] = useState({ user: [] })

    
    useEffect(() => {
        // Fetch Current chef menu
        
        // Fetch Menus 
        async function fetchPayments() {
            const groupsRef =  db.collection('chefs').doc(chefId).collection("settings").doc("menu")
            await db.collection('chefs').doc(chefId).collection("menu").where("isVisible",  "==", true).get().then(function (querySnapshot) {
                let array = []
    
                querySnapshot.forEach(function(doc) {
                    array.push(doc.data())
                });
                
                if (!isCancelled) {
                    setMenu(sectionListData);
                }                
            });
        }

        return () => {
            isCancelled = true;
          };
    }, [])

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
      

    // SectionList header 
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    
        return (
          <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            style={{ backgroundColor }}
          />
        );
      };

   if (data.user != null) {
    return (

        <View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </View>      
    );
   } else {
        return null
   }
}

export default App