

import React, { useState, useEffect, forwardRef, useCallback, useRef } from "react";
import {  View, FlatList, SectionList, Text, Dimensions, Animated, TouchableOpacity} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import useGlobalStyles from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import firebase from "../../firebase/Firebase"
import ChefHighlight from '../storeFront/chefHighlight'
import MenuCell from './menuCell'
import ComboCell from './comboCell'
import { useTheme } from '@react-navigation/native';

const ITEM_HEIGHT = 50;
var db = firebase.firestore();

const { width, height } = Dimensions.get("window")

const Menu = forwardRef((props, ref) => {

    if (props.chefId === undefined) { return }

    const chef = props.chef
    const [data, setData] = useState([])
    const [categories, setCategories] = useState(["Wednesday", "Friday", "Thursday"])
    const [tabIndex, setTabIndex] = useState(1);

    const globalStyle = useGlobalStyles()
    const { colors } = useTheme();
    const sectionRef = useRef()

    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

    var scrollRef = useRef()
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    var [scrollY, setScrollY] = useState(new Animated.Value(0))


    const handleTabsChange = index => {
        setTabIndex(index);
    };

    var TabHeight = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 30]
    });

    var Opacity = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [0, 1]
    });

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
                    newObj["ref"] = React.createRef()
                    newObj["data"] = combos.filter(a => a.categoryName === categoryData.name) 
               
                    console.log("New object: ", newObj)
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

    const onScroll = () => {
        console.log(data)
        
        data.filter(a => a.title === ["Monday"]) 
    }
    

    const getItemLayout = (data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      });

    const Item = ({ item, count }) => {
        const { colors } = useTheme();
          return (
            <TouchableOpacity onPress={()=> onScroll()} style={[styles.item, {width: (width/count) + 10}]}>
                <Text style={[styles.title, {color: colors.textPrimary}]}>{item}</Text>
            </TouchableOpacity>
          )
      }
    
    
     return (

        <View>
            {
                categories.length > 0 ?
                <AnimatedFlatList
                style={{ height: 60, opacity: Opacity, zIndex:1, backgroundColor: colors.bgTertiary, position: 'absolute', left: 0, top: 0, right: 0, width: width}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => {
                        return <Item item={item} count={categories.length}/>
                    }}
                   
                    keyExtractor={item => item}
                />
                : 
                null
            }
             
            <SectionList
             scr
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

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset:  { y: scrollY }}}],
                    // { useNativeDriver: true }
                  )}
                
                  onScrollToIndexFailed
                ref ={ scrollRef }
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