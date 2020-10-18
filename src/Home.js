import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import styles from '../components/style';
import { FlatList, Dimensions, Image, Text, View, Button } from 'react-native';

import image from '../assets/chef.jpg'


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Apply',
        description: 'Tell us a little about you',
        imageURL: 'https://www.pexels.com/photo/man-holding-frying-pan-3298687/'
    },
    // {
    //     id: 'bd7acb1a-c1b1-46c2-aed5-3ad53abb28ba',
    //     title: 'Join the email list',
    //     description: 'Affordable healthy meals cooked/n by a chef near you',
    //     imageURL: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80'
    // },

];

const Item = ({ imageURL, title, description }) => (
    <View style={{ width: windowWidth, height: windowHeight, flexDirection: 'column', alignItems: 'center' }}>
        <Image style={{ position: 'absolute', width: windowWidth, height: windowHeight }} source={require('../assets/chef.jpg')} />
        <View style={{ padding: 60, marginTop: 150, alignItems: 'center', backgroundColor: 'red', width: windowWidth - 200, height: windowHeight - 200 }}>
            <Text style={{ color: 'white', fontSize: 47 }}>{title}</Text>
            <Text style={{ marginTop: 20, textAlign: 'center', color: 'white', fontSize: 17 }}>{description}</Text>
            <Button title="Apply" backgroundColor='white' accessibilityLabel="You cook, we take care of the rest." style={{ position: 'absolute', bottom: 0 }}
            />
        </View>
    </View >

);


const renderItem = ({ item }) => (
    <Item title={item.title} description={item.description} imageURL={item.imageURL} />
)

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    };
}

export default registerRootComponent(Home);
