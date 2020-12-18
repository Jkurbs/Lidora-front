import React, { useState, useRef, useEffect } from "react";

import { View, Image, Text, SectionList, ScrollView, TouchableOpacity, Dimensions, TextInput } from "react-native";

import firebase from "../../firebase/Firebase";
import styles from './storeFront.style'
import "firebase/firestore";

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

import EmptyBag from '../../components/emptyBagView'

import BottomSheet from 'reanimated-bottom-sheet';
import { } from "react-native-gesture-handler";
const { height } = Dimensions.get("window")

var db = firebase.firestore();

const FlatListItemSeparator = () => {
    return (
        //Item Separator
        <View style={styles.listItemSeparatorStyle} />
    );
};

function ChefCell(item) {
    return (
        <View>
            <ReactPlaceholder color='red' showLoadingAnimation={false} type='rect' ready={item != null} style={{ height: 250, width: '100%' }}>
                <Image style={styles.storeImage} source={{ uri: item.item.user.imageURL }} />
            </ReactPlaceholder>
            <View style={styles.storeInfoContainer}>
                <Text style={styles.title}>{item.item.user.title}</Text>
                <Text style={styles.description}>{item.item.user.description}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

function StoreInfoCell(item) {
    return (
        <View>
            <View style={{ margin: 20, marginTop: 10, marginBottom: 10 }}>
                <Text style={styles.description}>{item.item.user.city}, {item.item.user.state}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

function StoreFront(props) {

    // States 
    const [data, setData] = useState({ user: [] })
    const [menu, setMenu] = useState([])
    const [titles, setTitle] = useState({ headerTitle: "View Bag", LeftButtonTitle: "" })
    const [selectedItem, setSelectedItem] = useState(null)
    const [order, setOrder] = useState({ quantity: 1, note: "" })
    const [bag, setBag] = useState([])

    const [isInnerScrollEnabled, setIsInnerScrollEnabled] = useState(false)

    // Refs 
    const sheetRef = useRef(null);
    const scrollRef = useRef(null)

    // Fetchs 
    useEffect(() => {
        // Fetch Current chef 
        db.collection('chefs').doc(props.chefId).get().then(function (doc) {
            if (doc.exists) {
                setData({ user: doc.data() })
            } else {
                console.log("No such document!");
            }
        })
    }, [])

    useEffect(() => {
        // Fetch Current chef menu
        db.collection('chefs').doc(props.chefId).collection("menu").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    setMenu(oldArray => [...oldArray, doc.data()]);
                } else {
                    console.log("No such document!");
                }
            })
        })
    }, [])


    const selectItem = (item) => {
        console.log(item.item.ingredients)
        setSelectedItem(item.item)
        sheetRef.current.snapTo(1)
    }

    const dismissItem = () => {
        setSelectedItem(null)
        sheetRef.current.snapTo(0)
    }


    const onOpenEnd = () => {
        if (scrollRef.current !== null) {
            setIsInnerScrollEnabled(true)
            scrollRef.current.forceUpdate()
        }
    }

    const onCloseEnd = () => {
        if (scrollRef.current !== null) {
            setIsInnerScrollEnabled(false)
            scrollRef.current.forceUpdate()
        }
    }


    const RenderItemInfos = (item) => (
        <View style={styles.itemDescriptionContainer}>
            <View style={{ flexDirection: 'column', maxWidth: '50%' }}>
                <Text style={styles.menuName}>{item.item?.name ?? ""}</Text>
                <Text style={styles.menuDescription}>{item.item?.description ?? ""}</Text>
                <Text style={styles.menuPrice}>${item.item?.price ?? ""}</Text>
            </View>
            <Image style={styles.menuImage} source={{
                uri: item.item?.imageURL ?? "",
            }} />
        </View>
    );


    const RenderIngredientsItem = (item) => (
        <Text style={{ margin: 8, padding: 8, fontWeight: '500', fontSize: 15 }}>{item.item?.name ?? ""}</Text>
    );

    const RenderInstructions = () => (
        <View>
            <TextInput
                style={{ height: 60, padding: 20 }}
                placeholder={"Add a note (Extra sauce, no salt, etc.)"}
                onChangeText={(text) => setOrder({ note: text })}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity pointerEvents={() => { order.quantity < 2 ? 'none' : "auto" }} onPress={() => { order.quantity < 2 ? setOrder({ quantity: 1 }) : setOrder({ quantity: order.quantity - 1 }) }} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'black', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', margin: 8 }}>{order.quantity}</Text>
                <TouchableOpacity onPress={() => setOrder({ quantity: order.quantity + 1 })} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'black', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )



    const MenuCell = (item) => {
        return (
            <TouchableOpacity onPress={() => { selectItem(item) }} >
                <View style={{ alignItems: 'center', margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '70%' }}>
                        <Text style={styles.menuName}>{item.item.name}</Text>
                        <Text style={styles.menuDescription}>{item.item.description}</Text>
                        <Text style={styles.menuPrice}>${item.item.price}</Text>
                    </View>
                    <Image style={styles.menuImage} source={{
                        uri: item.item.imageURL,
                    }} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderContent = () => {
        if (selectedItem === null) {
            return <EmptyBag />
        } else {
            return (
                <View style={styles.bagContainer}>
                    <SectionList
                        ref={scrollRef}
                        style={{}}
                        keyExtractor={(item, index) => item + index}
                        sections={[
                            { title: "Infos", data: [selectedItem] },
                            { title: "Ingredients", data: selectedItem?.ingredients ?? [] },
                            { title: "Special Instructions", data: [0] },
                        ]}
                        renderSectionHeader={({ section }) => {
                            if (section.title === "Infos") {
                                return <Text></Text>
                            } else {
                                return (
                                    <View style={styles.headerView}>
                                        <Text style={styles.sectionTitle}>{section.title}</Text>
                                    </View>
                                );
                            }

                        }}
                        renderItem={({ item, section }) => {
                            switch (section.title) {
                                case "Infos":
                                    return <RenderItemInfos item={item} />
                                case "Ingredients":
                                    return <RenderIngredientsItem item={item} />
                                case "Special Instructions":
                                    return <RenderInstructions />
                                default:
                                    break;
                            }
                        }}
                        pointerEvents={isInnerScrollEnabled === true ? 'auto' : 'none'}
                        scrollEnabled={isInnerScrollEnabled}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        stickySectionHeadersEnabled={false}
                    />

                    <View style={styles.listItemSeparatorStyle} />


                </View>
            )
        }
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { dismissItem() }} style={{ justifyContent: 'center', position: 'absolute', left: 8 }}>
                <Text style={{ color: '#34C759', fontSize: 15, fontWeight: '500' }}>{titles.LeftButtonTitle}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} onPress={() => { sheetRef.current.snapTo(1) }}>{titles.headerTitle}</Text>
            <View style={[styles.listItemSeparatorStyle, { position: 'absolute', bottom: 0 }]} />
        </View>
    )

    // Fetch chef
    return (
        <View style={styles.container}>
            <View>
                <SectionList
                    style={{ height: height, paddingBottom: 120 }}
                    keyExtractor={(item, index) => item + index}
                    sections={[
                        // homogenous rendering between sections
                        {
                            title: "user",
                            data: [data]
                        },
                        {
                            title: "Additional Info",
                            data: [data],
                        },
                        {
                            title: "Menu",
                            data: menu
                        },
                    ]}
                    renderSectionHeader={({ section }) => {
                        if (section.title === "user") { return null } else {
                            return (
                                <View style={styles.headerView}>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                </View>
                            );
                        }
                    }}
                    renderItem={({ item, section }) => {
                        switch (section.title) {
                            case "user":
                                return <ChefCell item={item} />
                            case "Additional Info":
                                return <StoreInfoCell item={item} />
                            case "Menu":
                                return <MenuCell item={item} />
                            default:
                                break;
                        }
                    }}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    stickySectionHeadersEnabled={false}
                />
            </View>
            <BottomSheet
                ref={sheetRef}
                initialSnap={0}
                snapPoints={["10%", "90%"]}
                // enabledInnerScrolling={true}
                // enabledGestureInteraction={false}
                // enabledHeaderGestureInteraction={true}
                // enabledContentGestureInteraction={false}
                renderContent={renderContent}
                renderHeader={renderHeader}
                onOpenStart={() => setTitle({ headerTitle: "", LeftButtonTitle: "Dismiss" })}
                onCloseStart={() => setTitle({ headerTitle: "View Bag", LeftButtonTitle: "" })}
                onOpenEnd={onOpenEnd}
                onCloseEnd={onCloseEnd}
            >

            </BottomSheet>
        </View>
    );
}

export default StoreFront