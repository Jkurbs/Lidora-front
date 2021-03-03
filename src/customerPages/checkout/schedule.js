import React, {useState} from "react";
import { View } from "react-native";
import { useTheme } from '@react-navigation/native';
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../../globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import {Calendar} from 'react-native-calendars'
import { Entypo } from '@expo/vector-icons';
import moment from 'moment'

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)

function Schedule(props) {

    const navigation = props.navigation
    const addedDates = props.route.params.addedDates

    const initialState = {
        [_today]: {disabled: true, selectedColor: 'blue', marked: true, dotColor: 'gray', marked: true}
    }

    const [date, setDate] = useState({_markedDates: initialState})
    const [selectedDays, setSelectedDays] = useState([])
    const globalStyles = useGlobalStyles()
    const { colors } = useTheme();

    const DISABLED_DAYS = ['Monday', 'Tuesday']

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

    const save = () => {
        props.route.params.back({type: "Dates", data: selectedDays})
        navigation.navigate('Checkout');
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

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = {...date._markedDates, ...{ [_selectedDay]: { selected } } }
        
        // Triggers component to render again, picking up the new state
        setDate({_markedDates: updatedMarkedDates})
    }

    return (
        <View style={globalStyles.backgroundPrimary}>
            <NavBar title={"Select dates"} rightButtonPressed={save} rightIcon={"Save"} navigation={navigation}/>
            <View style={{height: '100%', width: '100%', marginTop: 50}}>
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
            </View>
            
        </View>
    )
}
export default Schedule