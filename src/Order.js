import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView } from 'react-native';

import CustomHeader from '../components/customHeader'
import { FlatList } from 'react-native-gesture-handler';

const DATA = [
    {
        id: 'bd7acba-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        imageURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
        id: '0-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Second Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'

    },
    {
        id: '0-3da1-471f-bd96-145571e29d72',
        name: 'Third Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'

    },
    {
        id: 'bd7acbea-0-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'
    }, {
        id: 'bdacbea-c1b1-0-aed5-3ad53abb28ba',
        name: 'First Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'
    }, {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'
    },
    {
        id: '0-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'
    }, {
        id: '8-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'
    }, {
        id: '6-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        imageURL: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80'
    },
];

const Item = ({ imageURL, name }) => (
    <View style={{ flexDirection: 'row', height: 70 }}>
        <Image style={{ height: 50, width: 50, borderRadius: 5, marginRight: 8 }} source={{ uri: imageURL }} />
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{name}</Text>
    </View>
);


function OrdersScreen() {
    const renderItem = ({ item }) => (
        <Item imageURL={item.imageURL} name={item.name} />
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F8FA' }}>
            <CustomHeader title='Orders' isHome={true} />
            <ScrollView>
                <View style={{ backgroundColor: 'red', flex: 1, alignItems: 'center' }}>
                    <Agenda
                        // The list of items that have to be displayed in agenda. If you want to render item as empty date
                        // the value of date key has to be an empty array []. If there exists no value for date key it is
                        // considered that the date in question is not yet loaded
                        items={{
                            '2012-05-22': [{ name: 'item 1 - any js object' }],
                            '2012-05-23': [{ name: 'item 2 - any js object', height: 80 }],
                            '2012-05-24': [],
                            '2012-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
                        }}
                        // Callback that gets called when items for a certain month should be loaded (month became visible)
                        loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                        // Callback that fires when the calendar is opened or closed
                        onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                        // Callback that gets called on day press
                        onDayPress={(day) => { console.log('day pressed') }}
                        // Callback that gets called when day changes while scrolling agenda list
                        onDayChange={(day) => { console.log('day changed') }}
                        // Initially selected day
                        selected={'2012-05-16'}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={'2012-05-10'}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={'2012-05-30'}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={50}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={50}
                        // Specify how each item should be rendered in agenda
                        renderItem={(item, firstItemInDay) => { return (<View />); }}
                        // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
                        renderDay={(day, item) => { return (<View />); }}
                        // Specify how empty date content with no items should be rendered
                        renderEmptyDate={() => { return (<View />); }}
                        // Specify how agenda knob should look like
                        renderKnob={() => { return (<View />); }}
                        // Specify what should be rendered instead of ActivityIndicator
                        renderEmptyData={() => { return (<View />); }}
                        // Specify your item comparison function for increased performance
                        rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                        // Hide knob button. Default = false
                        hideKnob={true}
                        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                        markedDates={{
                            '2012-05-16': { selected: true, marked: true },
                            '2012-05-17': { marked: true },
                            '2012-05-18': { disabled: true }
                        }}
                        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                        disabledByDefault={true}
                        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                        onRefresh={() => console.log('refreshing...')}
                        // Set this true while waiting for new data from a refresh
                        refreshing={false}
                        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                        refreshControl={null}
                        // Agenda theme
                        theme={{
                            agendaDayTextColor: 'yellow',
                            agendaDayNumColor: 'green',
                            agendaTodayColor: 'red',
                            agendaKnobColor: 'blue'
                        }}
                        // Agenda container style
                        style={{}}
                    />
                </View>
                <FlatList style={{ marginTop: 50, marginLeft: 16 }}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </SafeAreaView>

    );
}
export default OrdersScreen;
