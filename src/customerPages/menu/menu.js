

import React, { useState, useEffect, forwardRef, useCallback, useRef } from "react";
import {  View, SectionList, Text, Dimensions} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import useGlobalStyles from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import firebase from "../../firebase/Firebase"
import ChefHighlight from '../storeFront/chefHighlight'
import MenuCell from './menuCell'
import ComboCell from './comboCell'
import { useTheme } from '@react-navigation/native';
import SegmentedControl from '@react-native-community/segmented-control';


var db = firebase.firestore();

const { height } = Dimensions.get("window")

const Menu = forwardRef((props, ref) => {

    if (props.chefId === undefined) { return }

    const chef = props.chef
    const [data, setData] = useState([])
    const [categories, setCategories] = useState(["Wednesday, Thursday"])

    const globalStyle = useGlobalStyles()
    const { colors } = useTheme();
    const sectionRef = useRef()

    useEffect(() => {

        let isCancelled = false;
        var items = []
        var combos = []

        async function fetchData() {
            const groupsRef =  db.collection('chefs').doc(chef.id).collection("menu_categories")

            await groupsRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(async function (element) {
                    const categoryData = element.data()
                    setCategories(prevState => [...prevState, categoryData.name])
                    // Combo
                    const comboRef = element.ref.collection("combos")
                    await comboRef.get().then(function (querySnapshot) {
                        querySnapshot.forEach(async function (comboElement) {
                            const comboData = comboElement.data()
                            combos.push(comboData)
                            // Item
                            const itemsRef = comboRef.doc(comboElement.id).collection("items")
                            await itemsRef.get().then(function (querySnapshot) {
                                querySnapshot.forEach(async function (element) {
                                    const itemData = element.data()
                                    items.push(itemData)
                                    newObj.data.forEach(async function (element) { 
                                        element["items"] = items.filter(a => a.comboName === element.name && a.categoryName === newObj.title[0]) 
                                    })
                                })
                            })
                        })
                    })

                    let newObj = {}
                    newObj["title"] = [categoryData.name]
                    newObj["data"] = combos.filter(a => a.categoryName === categoryData.name) 
               
                    if (!isCancelled) {
                        setData(oldArray => [...oldArray, newObj]);
                    }  
                })
            })
        }
        fetchData();
        return () => {
            isCancelled = true;
          };
    }, [])

    // Open Bottom Sheet
    const onOpen = async (item) => {

        await item?.items?.forEach(async function (element) { 
            if (element.total !== undefined || element.quantity !== undefined) {
                delete element.total;
                delete element.quantity
            }
        })
        props.selectedItem(item, data)
        ref.current.snapTo(1);
    };

    const scroll = () => {
        sectionRef.current.scrollToLocation(
            {
              sectionIndex: 1,
            //   itemIndex: itemIndex
            }
          );
    }
    
     return (

        <View>
            {/* {
                categories.length > 0 ?
                <SegmentedControl
                    values={categories}
                    selectedIndex={0}
                    onChange={(event) => { scroll() }}
                />
                : 
                null
            } */}
             
            <SectionList
                ref={sectionRef}
                style={styles.sectionList}
                ListHeaderComponent={<ChefHighlight chef={props.chef}/>}
                keyExtractor={(item, index) => item.name}
                sections={ data }
                renderSectionHeader={({ section }) => {
                    return (
                        <View style={styles.headerView}>
                            <Text style={[globalStyle.textPrimary, styles.sectionTitle]}>{section.title}</Text>
                            <View style={{paddingLeft: 20, alignItems:'center', flexDirection: 'row'}}>
                                <MaterialIcons name="date-range" size={18} color={colors.textTertiary} />
                                <Text style={{alignSelf: 'center', textAlign: 'center', marginBottom: 6, marginLeft: 8, color: colors.textTertiary, fontSize: 14, marginTop: 8, }}>Delivers on {section.title}'s</Text>
                            </View>
                        </View>
                    );
                }}
                renderItem={({ item }) => {
                    return <ComboCell item={item} onOpen={onOpen}/>
                }}
                
                scrollEventThrottle={16}
                refreshing={false}
                stickySectionHeadersEnabled={false}
                disableScrollViewPanResponder={false}
                nestedScrollEnabled={false}
                ListFooterComponent={<View style={{width: '100%', height: 100}}/>}
            />  
         </View> 
    ) 
})

export default Menu