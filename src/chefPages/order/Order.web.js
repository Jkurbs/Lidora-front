import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';

import CustomHeader from '../../components/customHeader'
import { FlatList } from 'react-native-gesture-handler';
import { DATA } from './order.data.js';

const {
    width: windowWidth,
    height: windowHeight,
} = Dimensions.get('window');


const Item = ({ imageURL, name }) => (
    <View style={{ flexDirection: 'row', height: 70 }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{name}</Text>
    </View>
);

function OrdersScreen() {
    const renderItem = ({ item }) => (
        <Item imageURL={item.imageURL} name={item.name} />
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F8FA' }}>
            {/* <CustomHeader title='Orders' isHome={true} /> */}
            <View style={{ width: '60%' }}>
                <CalendarList
                    horizontal={true}
                    pagingEnabled={false}
                    calendarWidth={500}
                    calendarHeight={300}
                    theme={{
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                    }}
                    onDayPress={(day) => { console.log('Day pressed', day.dateString); }}
                />
                <FlatList style={{ marginTop: 50, marginLeft: 16 }}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
}
export default OrdersScreen;
