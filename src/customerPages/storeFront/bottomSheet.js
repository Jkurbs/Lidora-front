

import React, { forwardRef } from "react";
import {  View, SectionList, Image, Text, TouchableOpacity} from "react-native";
import styles from './storeFront.style'
import BottomSheet from 'reanimated-bottom-sheet'
import ComboItemCell from './comboItemCell'
import Stepper from './stepper'

const snapPoints = ["0%", "90%"]

// Nav bar for store
const Sheet = forwardRef((props, ref) => {

    const selectedItem = props.selectedItem.item
    const data = props.selectedItem.data
    const groupMenus = data.filter(group => group.title == selectedItem.group) 

    const FlatListItemSeparator = () => {
        return ( <View style={styles.listItemSeparatorStyle}/> )
    }

    const changeSingleMenuItem = (props) => {
        groupMenus[0].data.forEach(async function(item) { 
            if (item.key === props.itemId) {
                item["total"] = props.total
                item["quantity"] = props.quantity
            } 
        })
    }

    // Add to bag 
    const addToBag = (total, quantity) => {
        const combo = groupMenus[0].combo
        if (combo) {
            groupMenus[0].data.forEach(async function(item) {
                let copiedItem = JSON.parse(JSON.stringify(item))
                if (copiedItem.total === undefined) { copiedItem.total = copiedItem.price}
                if (copiedItem.quantity === undefined) {copiedItem.quantity = 1}
                props.item(copiedItem)
            })
        } else {
            let copiedItem = JSON.parse(JSON.stringify(selectedItem))
            copiedItem["total"] = total
            copiedItem["quantity"] = quantity ?? 1
            props.item(copiedItem)
        }
      onClose()
    }

    // Cell to show Item Infos
    const ItemInfosCell = (item) => (
        <View style={styles.itemDescriptionContainer}>
            <View style={ styles.itemDescriptionContentContainer}>
                <Text style={styles.menuName}>{item?.item?.name ?? ""}</Text>
                <Text style={styles.menuDescription}>{item?.item?.description ?? ""}</Text>
                <Text style={styles.menuPrice}>${item?.item?.price ?? ""}</Text>
            </View>
            <Image style={styles.menuImage} defaultSource={{
                uri: item?.item?.imageURL ?? "",
            }} />
        </View>
    );

    // Cell to show Combos
    const CombosCell = (item) => (
        <ComboItemCell item={item} changeSingleMenuItem={(props)=> changeSingleMenuItem(props)}/>
    );

    const InstructionsCell = (props) => {
        var items; var total;
        if (props.combo === true) {
            items = props.group[0].data
            total = items.map(a => a.price).reduce((a, b) => a + b, 0)
        } else {
            total = selectedItem.price
        }
        return (
            <View style={{ flex: 1, marginBottom: 50}}> 
            <Stepper isCombo={props.combo} selectedItem={selectedItem} total={total} addToBag={addToBag} />
        </View>
        )  
    }

        // SectionList header 
    const renderHeader = () => {
        return (
            <View style={styles.sectionListHeader}>
                <TouchableOpacity onPress={()=> onClose() } style={styles.sectionListHeaderButton}>
                    <Text style={styles.sectionListHeaderText}>Dismiss</Text>
                </TouchableOpacity>
                <View style={styles.sectionListHeaderSeparator} />
            </View>
        ) 
    }
    
    const renderContent = () => {

        if (data.length === 0) { return }

        const result = groupMenus[0].data
        const combo = groupMenus[0].combo

        const regularSection = [
            { title: "Infos", data: [selectedItem] },
            { title: "Special Instructions", data: [0] },
        ]

        const comboSection = [
            { title: "Infos", data: [selectedItem] },
            { title: "Combo", data: result },
            { title: "Special Instructions", data: [0] },
        ]

        return (
            <View style={styles.bagContainer}>
                <SectionList
                    style={styles.bagSectionList}
                    keyExtractor={(item, index) => item + index}
                    sections={ combo ? comboSection : regularSection}
                    renderSectionHeader={({ section }) => {
                        if (section.title === "Infos" || 
                            section.title === "Special Instructions") {
                            return <Text></Text>
                        } else {
                            return (
                                <View style={styles.headerView}>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                </View>
                            )
                        }
                    }}
                    renderItem={({ item, section }) => {
                        switch (section.title) {
                            case "Infos":
                                return <ItemInfosCell item={item} />
                            case "Combo":
                                return <CombosCell item={item} />
                            case "Special Instructions":
                                return <InstructionsCell combo={combo} group={groupMenus} />
                            default:
                                break
                        }
                    }}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    stickySectionHeadersEnabled={false}
                />
                <View style={styles.listItemSeparatorStyle} />
            </View>
        )
    }

    const onClose = () => {
        ref.current.snapTo(0);
    };
    
    return (
        <BottomSheet ref={ref} snapPoints={snapPoints} initialSnap={0}
        renderHeader={renderHeader}
        renderContent={renderContent}
    />) 
})

    export default Sheet