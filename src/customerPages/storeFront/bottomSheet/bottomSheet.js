import React, { forwardRef, useState, useRef } from "react";
import { View, SectionList, Image, Text, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';
import useGlobalStyles from '../globalStyle'
import styles from '../storeFront.lightStyle'
import BottomSheet from 'reanimated-bottom-sheet'

import ItemInfosCell from './itemInfosCell'
import ComboItemCell from '../comboItemCell'
import Stepper from '../stepper'

const snapPoints = ["0%", "90%"]

// Nav bar for store
const Sheet = forwardRef((props, ref) => {

    const selectedItem = props.selectedItem.item
    const items = selectedItem?.items ?? []
    const texRef = useRef()
    const [total] = useState({total: 0})

    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();


    const FlatListItemSeparator = () => {
        return ( <View style={globalStyles.border}/> )
    }

    const changeSingleMenuItem = (props) => {
        items.forEach(async function(item) { 
            if (item.key === props.itemId) {
                total.total = props.total
                ref.current.value = props.total;
                item["total"] = props.total
                item["quantity"] = props.quantity
            }
        })
    }

    // Add to bag 
    const addToBag = async () => {
        items.forEach(async function(item) {
            let copiedItem = JSON.parse(JSON.stringify(item))
            if (copiedItem.total === undefined) { copiedItem.total = copiedItem.price}
            if (copiedItem.quantity === undefined) {copiedItem.quantity = 1}
            props.item(copiedItem)
        })
     onClose()
    }

    // Cell to show Combos
    const CombosCell = (item) => (
        <ComboItemCell ref={texRef} item={item} changeSingleMenuItem={(props)=> {changeSingleMenuItem(props)}}/>
    );

    const InstructionsCell = (props) => {
        return (
            <Stepper ref={texRef} isCombo={true} selectedItem={selectedItem} addToBag={addToBag}/>
        )  
    }

        // SectionList header 
    const renderHeader = () => {
        return (
            <View style={[globalStyles.backgroundTertiary, styles.sectionListHeader]}>
                <TouchableOpacity onPress={()=> onClose() } style={styles.sectionListHeaderButton}>
                    <Text style={globalStyles.textPrimary}>Dismiss</Text>
                </TouchableOpacity>
                <View style={[globalStyles.border, styles.sectionListHeaderSeparator]} />
            </View>
        ) 
    }
    
    const renderContent = () => {

        if (items.length === 0) { 
            return (
                <View style={[styles.bagContainer, globalStyles.backgroundSecondary, {alignItems: 'center', justifyContent: 'center'}]}>
                    <Text style={[styles.textCentered, {color: colors.textPrimary}]}>Combo is Empty</Text>
                </View>
            )
        }

        const comboSection = [
            { title: "Infos", data: [selectedItem] },
            { title: "Menu", data: items },
            { title: "Special Instructions", data: [0] },
        ]

        return (
            <View style={[styles.bagContainer, globalStyles.backgroundSecondary]}>
                <SectionList
                    style={styles.sectionList}
                    keyExtractor={(item, index) => item + index}
                    sections={comboSection}
                    renderSectionHeader={({ section }) => {
                        if (section.title === "Infos" || 
                            section.title === "Special Instructions") {
                            return <Text></Text>
                        } else {
                            return (
                                <View style={styles.headerView}>
                                    <Text style={[globalStyles.textPrimary, styles.sectionTitle]}>{section.title}</Text>
                                </View>
                            )
                        }
                    }}
                    renderItem={({ item, section }) => {
                        switch (section.title) {
                            case "Infos":
                                return <ItemInfosCell item={item} />
                            case "Menu":
                                return <CombosCell item={item} />
                            case "Special Instructions":
                                return <InstructionsCell items={items} />
                            default:
                                break
                        }
                    }}
                    ListFooterComponent={<View style={{width: '100%', height: 100}}/>}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    stickySectionHeadersEnabled={false}
                />
                <View style={styles.listItemSeparatorStyle} />
            </View>
        )
    }

    const onClose = async () => {
        ref.current.snapTo(0);
    };

    return (
        <BottomSheet ref={ref} snapPoints={snapPoints} initialSnap={0}
        renderHeader={renderHeader}
        renderContent={renderContent}
        enabledGestureInteraction={false}
    />) 
})

    export default Sheet