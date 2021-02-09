import React, { forwardRef, useState, useCallback} from "react";
import { View, SectionList, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from '@react-navigation/native';
import useGlobalStyles from '../globalStyle'
import styles from '../storeFront.lightStyle'
import BottomSheet from 'reanimated-bottom-sheet'
import { Entypo } from '@expo/vector-icons';
import ItemInfosCell from './itemInfosCell'
import {Calendar} from 'react-native-calendars'
import moment from 'moment'
import NumberPlease from "react-native-number-please";


function RadioButton(props) {
    return (
        <View style={{
        marginRight: 8,
          height: 15,
          width: 15,
          borderRadius: 7.5,
          borderWidth: 1,
          borderColor:  props.selected ? '#2EA44F' : 'gray',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5}}>{
            props.selected ?
              <View style={{
                marginRight: 8,
                height: 11,
                width: 11,
                margin: 3,
                borderRadius: 5.5,
                backgroundColor: '#2EA44F',
                alignSelf: 'center'
              }}/>
              : null
          }
        </View>
    );
  }

//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const snapPoints = ["0%", "100%"]
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

function getDaysInMonth (month, year, days) {
    let pivot = moment().month(month).year(year).startOf('month')
    const end = moment().month(month).year(year).endOf('month')

    let dates = {}
    const disabled = { disabled: true }
    while(pivot.isBefore(end)) {
      days.forEach( async (day) => {
        dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
      })
      pivot.add(7, 'days')
    }
    return dates
}

// Nav bar for store
const Sheet = React.memo(forwardRef((props, ref) => {

    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();

    // Item related
    const selectedItem = props.selectedItem.item
    const DISABLED_DAYS = DAYS.filter(day=> day != selectedItem.categoryName)
    const items = selectedItem?.items ?? []
    const initialTotal = items.map(a => a.price).reduce((a, b) => a + b, 0)

    const [finalItems, setFinalItem] = useState(items)
    const [isChoosingDate, setIsChoosingDate] = useState(false)
    const [markedDates, setMarkedDates] = useState(null)

    const [selectedDays, setSelectedDays] = useState([])
    const quantities = [{ id: "quantity", label: "", min: 1, max: 99 }];
    const [selectedMenuItem, setSelectedMenuItem] = useState()
    const [extraSelected] = useState({selected: false}) 


    const FlatListItemSeparator = () => {
        return ( <View style={globalStyles.border}/> )
    }

    const changeSingleMenuItem = (props) => {
        items.forEach(async function(item) { 
            if (item.key === props.itemId) {
                ref.current.value = props.total;
                item["total"] = props.total
                item["quantity"] = props.quantity
            }
        })
    }

    const onHandleClick = useCallback(() => {
        setMarkedDates(getDaysInMonth(moment().month(), moment().year(), DISABLED_DAYS))
        setIsChoosingDate(!isChoosingDate)
    });

    const showItemDetails = (item) => {
        setSelectedMenuItem(item)
    }

    // Add to bag 
    const addToBag = async () => {
        if (selectedDays.length === 0) { alert("Please choose at least one delivery date."); return }
        items.forEach(async function(item) {
            let copiedItem = JSON.parse(JSON.stringify(item))
            if (copiedItem.total === undefined) { copiedItem.total = copiedItem.price}
            if (copiedItem.quantity === undefined) {copiedItem.quantity = 1}
            if (copiedItem.deliveryDates === undefined) {copiedItem.deliveryDates = selectedDays}
            props.item(copiedItem)
        })
     onClose()
    }

    const onDaySelect = (day) => {
        const _selectedDay = moment(day.dateString).format(_format);
        let selected = true;
        if (_selectedDay === _today) { alert("You can't order for the same day, please pick another day."); return }
        if (markedDates[_selectedDay]?.disabled ?? false  === true) { return }
        if (markedDates[_selectedDay]) {
          // Already in marked dates, so reverse current marked state
          selected = !markedDates[_selectedDay].selected;
          setSelectedDays(selectedDays.filter(item => item !== day.dateString))
        } else {
          setSelectedDays(oldArray => [...oldArray, day.dateString]);
        }
        const updatedMarkedDates = {...markedDates, ...{ [_selectedDay]: { selected } } }
        setMarkedDates(updatedMarkedDates)
    }

    const saveDates = async () => {
        setIsChoosingDate(!isChoosingDate)
    }

    // Cell to show Combos
    const CombosCell =  (item) => {

    const initialValues = [{ id: "quantity", value: item.item.quantity ?? 1 }];
    const itemPrice = item.item["price"]

    const forceUpdate = useForceUpdate();

    // Calculate total amount 
    const calculate = (values) => {
        const value = parseInt(values[0].value)
        if (item.item.total === undefined, item.item.quantity === undefined) { 
            item.item.total = item.item.price;  item.item.quantity = 1
        }

        changeSingleMenuItem({itemId: item.item.key, 
            quantity: item.item["quantity"] = value, 
            total: item.item["total"] = itemPrice * value, 
        }) 
        forceUpdate()
    }

        return (
            <View onPress={()=> {showItemDetails(item)}} style={styles.groupContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image style={styles.comboImage} defaultSource={{
                    uri: item.item.imageURL,
                }} />
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={[globalStyles.textPrimary, {alignSelf: 'center'}]}>{item?.item?.name ?? ""}</Text>
                <Text style={[globalStyles.textSecondary]}>${item?.item?.total ?? item?.item?.price}</Text>
            </View>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'center', width: 60, alignSelf: 'center', justifyContent: 'space-around'}}>
            <NumberPlease
                pickerStyle={{backgroundColor: colors.background, borderColor: colors.background, color: colors.textPrimary}}
                digits={quantities}
                values={initialValues}
                onChange={(values) => calculate(values)}
            />
                {/* <Entypo name="chevron-right" size={24} color={colors.textTertiary} /> */}
            </View>
        </View>
        )
    }

    const ExtrasCell = (item) => {
       const forceUpdate = useForceUpdate();

       const addExtra = () => {
            extraSelected.selected = !extraSelected.selected
            setFinalItem(items => [...items, item])
            forceUpdate()
       }

       return (
            <TouchableOpacity onPress={()=> addExtra()} style={styles.groupContainer}>
                <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <RadioButton selected={extraSelected.selected}/>
                <Text style={[globalStyles.textPrimary, {alignSelf: 'center'}]}>{item?.item?.name ?? ""}</Text>
                </View>
                <Text style={[globalStyles.textSecondary]}>${item?.item?.total ?? item?.item?.price}</Text>
            </TouchableOpacity>
        )
    }

    const SelectDayCell = () => { 
        return (
            <View>
                <TouchableOpacity onPress={()=> onHandleClick()} style={{padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={[globalStyles.textPrimary, { marginTop: 0, textAlign: 'center', alignSelf:'center'}]}>Select Delivery dates</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[globalStyles.textPrimary, { marginTop: 0, textAlign: 'center', alignSelf:'center'}]}>{selectedDays.length > 0 ? "Days selected": ""}</Text>
                        <Entypo name="chevron-right" size={24} color={colors.textTertiary} />
                    </View> 
                </TouchableOpacity>
            </View>  
        )
    }

        // SectionList header 
    const renderHeader = () => {
        return (
            <View style={[globalStyles.backgroundTertiary, styles.sectionListHeader]}>
                <TouchableOpacity onPress={()=> isChoosingDate ? saveDates() : onClose() } style={styles.sectionListHeaderButton}>
                    <Text style={globalStyles.textPrimary}>{ isChoosingDate ? "Back" : "Dismiss"}</Text>
                </TouchableOpacity>
                <View style={[globalStyles.border, styles.sectionListHeaderSeparator]} />
            </View>
        ) 
    }

    const calendarTheme = {
        backgroundColor: colors.background,
        calendarBackground: colors.background,
        textMonthFontWeight: "bold",
        todayTextColor: "Yellow",
        selectedDayBackgroundColor: colors.btnBg,
        selectedDayTextColor: colors.btnPrimaryBg,
        textDisabledColor: 'rgba(27, 31, 35, 0.4)', 
        dayTextColor: colors.textPrimary,
        textDayFontWeight: '600',
        dotColor: 'brown',      
    }

    const RenderItemInfos = (item) => (
        <View>
            <View style={{ padding: 20, flexDirection: 'column', alignItems: 'center' }}>
                <Image style={styles.menuImage} source={{
                    uri: item.item?.imageURL ?? "",
                }} />
                <Text style={globalStyles.textPrimary}>{item.item?.name ?? ""}</Text>
                <Text style={globalStyles.textSecondary}>{item.item?.description ?? ""}</Text>
                <Text style={globalStyles.textPrimary}>${item.item?.price ?? ""}</Text>
            </View>
            <View>
                <Text style={globalStyles.textPrimary}>Ingredients</Text>
                {/* {
                item.item?.ingredients.map((prop, key) => {
                    return (
                        <Text key={key} style={globalStyles.textSecondary}>{prop.name}</Text>
                    );
                })
                } */}
            </View>
            <Text onPress={()=> setSelectedMenuItem(null)} style={{color: colors.btnPrimaryBg}}>Go back</Text>
        </View>
        
    );
    
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
            // { title: "Extras", data: selectedItem?.extras ?? [] },
            { title: "Select delivery dates", data: [0] },
        ]

        if (selectedMenuItem!= null) {
            return (
                <View style={[styles.bagContainer, globalStyles.backgroundSecondary]}>
                    <RenderItemInfos item={selectedMenuItem.item} />
                </View>
            )
        } else if (isChoosingDate) {
            return (
                <View style={[styles.bagContainer, globalStyles.backgroundSecondary]}>
                    <Calendar
                    onMonthChange={(date) => {
                        setMarkedDates(getDaysInMonth(date.month - 1, date.year, DISABLED_DAYS))
                    }}
                    theme={calendarTheme}
                    renderArrow = {(direction) => {
                        if (direction == 'left') return (
                            <Entypo name="chevron-left" size={24} color={colors.textTertiary} />
                        )
                        if (direction == 'right') return (
                            <Entypo name="chevron-right" size={24} color={colors.textTertiary} />
                        )
                    }}
                    minDate={_today}
                    hideExtraDays={true}
                    enableSwipeMonths={true}
                    markingType={'period'}
                    disableAllTouchEventsForDisabledDays={true}
                    onDayPress={(day) => onDaySelect(day)}
                    markedDates={markedDates}
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
                            if (section.title === "Extras" && section.data.length === 0){
                                return <Text></Text>
                            }
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
                                // case "Extras":
                                //     return <ExtrasCell item={item} />
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
        setSelectedDays([])
        setIsChoosingDate(false)
        ref.current.snapTo(0);
    };

    return (
        <BottomSheet ref={ref} snapPoints={snapPoints} initialSnap={0}
        renderHeader={renderHeader}
        renderContent={renderContent}
        enabledGestureInteraction={false}
    />) 
}))

export default Sheet