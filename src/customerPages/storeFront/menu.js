

import React, { useState, useEffect, forwardRef, useCallback } from "react";
import {  View, SectionList, Image, Text, TouchableOpacity, Dimensions} from "react-native";
import styles from './storeFront.style'
import firebase from "../../firebase/Firebase"
import ChefHighlight from './chefHighlight'
import MenuCell from './menuCell'

var db = firebase.firestore();

const { height, width } = Dimensions.get("window")

const Menu = forwardRef((props, ref) => {

    if (props.chefId === undefined) { return }

    const chef = props.chef
    const [data, setData] = useState([])
    
    useEffect(() => {

        let sectionListData = []
        let isCancelled = false;

        async function fetchData() {
            const categoryRef =  db.collection('chefs').doc(chef.id).collection("menu_categories")

            let array = []

            await categoryRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if (doc.exists) {
                        const category = doc.data()
                        console.log(category)
                        let newObj = {}
                        newObj["title"] = category.name
                        newObj["data"] = category
                        sectionListData.push(newObj)
                    } else {

                    }
                });

                if (!isCancelled) {
                    setData(sectionListData);
                } 
            })
                    

            //         db.collection('chefs').doc(chef.id).collection("menu").where("isVisible",  "==", true).where("combo",  "!=", "").get().then(function (querySnapshot) {
            //             let array = []
            
            //             querySnapshot.forEach(function(doc) {
            //                 array.push(doc.data())
            //             });
                        
            //             groups.forEach(item => {
            //                 let newObj = {}
            //                 newObj["title"] = item
            //                 newObj["combo"] = groupOptions[item]
            //                 newObj["data"] = array.filter(a => a.group == item)
            //                 sectionListData.push(newObj)
            //             })
        
            //             if (!isCancelled) {
            //                 setData(sectionListData);
            //             }                
            //         });
            //     }
            // })
        }
        fetchData();
        return () => {
            isCancelled = true;
          };
    }, [])

    // Open Bottom Sheet
    const onOpen = (item) => {

        if (item.total !== undefined || item.quantity !== undefined) {
            delete item.total;
            delete item.quantity
        }
        props.selectedItem(item, data)
        ref.current.snapTo(1);
    };
    
     return (
         console.log("Data: ", data)
        // <View>
        //     <SectionList
        //         style={{ paddingBottom: 120, backgroundColor: 'white', height: height}}
        //         ListHeaderComponent={<ChefHighlight chef={props.chef}/>}
        //         keyExtractor={(item, index) => item.name}
        //         sections={ data }
        //         renderSectionHeader={({ section }) => {
        //             console.log()
        //             return (
        //                 <View style={styles.headerView}>
        //                     <Text style={styles.sectionTitle}>{section.title}</Text>
        //                 </View>
        //             );
        //         }}
        //         renderItem={({ item, section }) => {
        //             console.log("ITEM: ", item)
        //             return <MenuCell item={item} onOpen={onOpen}/>
                    
        //         }}
        //         scrollEventThrottle={16}
        //         refreshing={false}
        //         stickySectionHeadersEnabled={false}
        //         disableScrollViewPanResponder={false}
        //         nestedScrollEnabled={false}
        //     />
        // </View>
    ) 
})

export default Menu