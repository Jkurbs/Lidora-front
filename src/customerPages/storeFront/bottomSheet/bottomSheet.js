import React, { forwardRef, useState, useCallback} from "react";
import { View, SectionList, Animated, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useTheme } from '@react-navigation/native';
import useGlobalStyles from '../globalStyle'
import styles from '../storeFront.lightStyle'
import BottomSheet from 'reanimated-bottom-sheet'
import { Entypo } from '@expo/vector-icons';
import ItemInfosCell from './itemInfosCell'
import {Calendar} from 'react-native-calendars'
import moment from 'moment'

const snapPoints = ["0%", "100%"]

const { height } = Dimensions.get("window")

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)


// Nav bar for store
const Sheet = React.memo(forwardRef((props, ref) => {

    const selectedItem = props.selectedItem.item
    const items = selectedItem?.items ?? []
    const initialTotal = items.map(a => a.price).reduce((a, b) => a + b, 0)

    const [total, setTotal] = useState(initialTotal)

    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();

    const [isChoosingDate, setIsChoosingDate] = useState(false)
    const initialState = {
        [_today]: {disabled: true, selectedColor: 'blue', marked: true, dotColor: 'gray'}
    }

    const DISABLED_DAYS = [selectedItem.categoryName]
    const [date, setDate] = useState({_markedDates: initialState})
    const [selectedDays, setSelectedDays] = useState([])

    const FlatListItemSeparator = () => {
        return ( <View style={globalStyles.border}/> )
    }


    const changeSingleMenuItem = (props) => {
        setTotal(initialTotal + props.total)
        items.forEach(async function(item) { 
            if (item.key === props.itemId) {
                ref.current.value = props.total;
                item["total"] = props.total
                item["quantity"] = props.quantity
            }
        })
    }


    const onHandleClick = useCallback(() => {
        setIsChoosingDate(!isChoosingDate)
    });


    // Add to bag 
    const addToBag = async () => {
        if (date === null) { alert("Please choose a delivery date."); return }
        items.forEach(async function(item) {
            let copiedItem = JSON.parse(JSON.stringify(item))
            if (copiedItem.total === undefined) { copiedItem.total = copiedItem.price}
            if (copiedItem.quantity === undefined) {copiedItem.quantity = 1}
            props.item(copiedItem)
        })
     onClose()
    }

    const getDaysInMonth = (month, year, days) => {
        let pivot = moment().month(month).year(year).startOf('month')
        const end = moment().month(month).year(year).endOf('month')
    
        let dates = {}
        const disabled = { disabled: true }
        while(pivot.isBefore(end)) {
          days.forEach((day) => {
            dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
          })
          pivot.add(7, 'days')
        }
        return dates
    }

    const onDaySelect = (day) => {
        const _selectedDay = moment(day.dateString).format(_format);
        let selected = true;
        if (date._markedDates[_selectedDay]) {
          // Already in marked dates, so reverse current marked state
          selected = !date._markedDates[_selectedDay].selected;
          setSelectedDays(selectedDays.filter(item => item !== day.dateString))
        } else {
            setSelectedDays(oldArray => [...oldArray, day.dateString]);
        }

        const updatedMarkedDates = {...date._markedDates, ...{ [_selectedDay]: { selected } } }
        setDate({_markedDates: updatedMarkedDates})
    }


    const saveDates = async () => {
        setIsChoosingDate(!isChoosingDate)
    }


    const onOpenStart =  () => {
        
    };
    

    // Cell to show Combos
    const CombosCell =  (item) => {

    const itemPrice = item.item["price"]
    
    // Calculate total amount 
    const calculate = (add) => {

        if (item.item.total === undefined, item.item.quantity === undefined) { 
            item.item.total = item.item.price
            item.item.quantity = 1
        }

        if (add) {
            changeSingleMenuItem({itemId: item.item.key, 
                quantity: item.item["quantity"] = (item.item["quantity"] + 1) || 1, 
                total: item.item["total"] = (item.item["total"] + itemPrice) || itemPrice, 
                price: item.item.price 
            })
        } else {
            if (item.item.quantity < 2) {
                return 
            } else {
                const quantity = item.item["quantity"] = (item.item["quantity"] - 1) || 1
                const total = item.item["total"] = (item.item["total"] - itemPrice) || itemPrice
                changeSingleMenuItem({itemId: item.item.key, quantity: quantity, total: total, price: item.item.price })
            }
        }
    }
        return (
            <View style={styles.groupContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={styles.comboImage} defaultSource={{
                    uri: item.item.imageURL,
                }} />
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={[globalStyles.textPrimary, {alignSelf: 'center'}]}>{item?.item?.name ?? ""}</Text>
                <Text style={[globalStyles.textSecondary]}>${item?.item?.total ?? item?.item?.price}</Text>
            </View>
            </View>
            
           <View style={{flexDirection: 'row', justifyContent: 'center', width: 60, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity pointerEvents={() => { item?.item?.quantity < 2 ? 'none' : "auto" }} onPress={() => { calculate(false) }} style={[{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}]}>
                    <Text style={[globalStyles.textPrimary, {textAlign: 'center', alignSelf: 'center', margin: 0}]}>-</Text>
                </TouchableOpacity>
                <Text style={[globalStyles.textSecondary,{ alignSelf: 'center', margin: 8 }]}>{item?.item?.quantity ?? 1}</Text>
                <TouchableOpacity onPress={() => calculate(true)} style={{ width: 60, height: 60, borderRadius: 30, justifyContent: 'center'}}>
                    <Text style={{ color: '#2EA44F', alignSelf: 'center', fontWeight: '500' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    const SelectDayCell = () => { 
        return (
            <View>
                <TouchableOpacity onPress={()=> onHandleClick()} style={{padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={[globalStyles.textPrimary, { marginTop: 0, textAlign: 'center', alignSelf:'center'}]}>Select Delivery dates</Text>
                    <Entypo name="chevron-right" size={24} color={colors.textTertiary} />
                </TouchableOpacity>
            </View>  
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
            { title: "Select delivery dates", data: [0] },
        ]

        if (isChoosingDate) {
            return (
                <View style={[styles.bagContainer, globalStyles.backgroundSecondary]}>
                    <Calendar
                    onMonthChange={(date) => {
                        setDate({_markedDates: getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS)})
                    }}
                    theme={{
                        calendarBackground: colors.background,
                        textMonthFontWeight: "bold",
                        todayTextColor: "gray",
                        selectedDayBackgroundColor: colors.btnPrimaryBg,
                        selectedDayTextColor: colors.btnPrimaryBg,
                        textDisabledColor: colors.textTertiary
                        }}
                    renderArrow = {(direction) => {
                        if ( direction == 'left') return (
                            <Entypo name="chevron-left" size={24} color={colors.textTertiary} />
                        )
                        if ( direction == 'right') return (
                            <Entypo name="chevron-right" size={24} color={colors.textTertiary} />
                        )
                    }}
                    minDate={_today}
                    hideExtraDays={true}
                    enableSwipeMonths={true}
                    markingType={'period'}
                    disableAllTouchEventsForDisabledDays={true}
                    onDayPress={(day) => onDaySelect(day)}
                    markedDates={date._markedDates}
                    />
                    <TouchableOpacity
                        onPress={() => saveDates()}
                        style={[styles.buttonPrimary, globalStyles.btnPrimary, {bottom: 80}]}>
                        <Text style={styles.textCentered}>Save</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.bagContainer, globalStyles.backgroundSecondary]}>


                    <SectionList
                        style={styles.sectionList}
                        keyExtractor={(item, index) => item + index}
                        sections={comboSection}
                        renderSectionHeader={({ section }) => {
                            if (section.title === "Infos" || 
                                section.title === "Select delivery dates") {
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
                                case "Select delivery dates": 
                                    return <SelectDayCell/>
                                default:
                                    break
                            }
                        }}
                        ListFooterComponent={<View style={{width: '100%', height: 150}}/>}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        stickySectionHeadersEnabled={false}
                    />

                    <TouchableOpacity
                        onPress={() => addToBag()}
                        style={[styles.buttonPrimary, globalStyles.btnPrimary, {bottom: 80}]}>
                        <Text style={styles.textCentered}>Add to bag</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const onClose = async () => {
        ref.current.snapTo(0);
    };

    return (
        <BottomSheet ref={ref} snapPoints={snapPoints} initialSnap={0}
        renderHeader={renderHeader}
        renderContent={renderContent}
        enabledGestureInteraction={false}
        onOpenEnd={() =>{onOpenStart() }}
    />) 
}))

export default Sheet