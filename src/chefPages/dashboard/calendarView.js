import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './dashboard.styles'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class CalendarView extends Component {
    render() {
        return (
            <View style={styles.balanceContainer}>
                <Calendar
                    horizontal={true}
                    pagingEnabled={false}
                    calendarWidth={200}
                    calendarHeight={200}
                    theme={{
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                    }}

                    // onDayPress={(day) => { this.fetchOrders.bind(this, day) }}

                    // onClick={(day) => this.handleSort(column)}

                    onDayPress={(day) => console.log(day)}
                />

                <View style={{ backgroundColor: '#D6D6D6', height: 1, width: '100%' }} />
            </View>
        )
    }
}

export default CalendarView;