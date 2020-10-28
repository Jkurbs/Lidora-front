
import React, { Component } from 'react';
import styles from './style'
import { Text, View, Image, FlatList, ScrollView, Button } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts'


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Blueberries',
        quantity: '250g',
        image: require('../assets/img/chef.jpg')
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Orange',
        quantity: '1pcs',
        image: require('../assets/img/chef2.jpg')
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Egg',
        quantity: '1pcs',
        image: require('../assets/img/chef1.jpg')
    },
    {
        id: '58684a0f-3da1-471f-bd96-145571e29d72',
        name: 'Chocolate',
        quantity: '150g',
        image: require('../assets/img/chef3.jpg')
    },
];

const Item = ({ name, quantity }) => (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 25 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{name}</Text>
        <Text style={{ fontSize: 15, color: 'gray' }}>{quantity}</Text>
    </View>
);

class ItemInfoView extends Component {


    render() {
        const renderIngredients = ({ item }) => (
            <Item image={item.image} name={item.name} quantity={item.quantity} />
        );
        return (
            <View style={{ marginTop: 50, marginBottom: 50 }}>
                <ScrollView style={{ marginBottom: 40 }}>
                    <Image style={{ width: '100%', height: 150 }} source={{ uri: this.props.item.image }} />
                    <View style={{ flexDirection: 'column', padding: 20 }}>
                        <Text style={styles.description}>{this.props.item.description}</Text>
                        <Text style={styles.price}>{'$' + this.props.item.price}</Text>
                    </View>
                    <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                        <View style={{ alignItems: 'center', margin: 5 }}>
                            <ProgressCircle style={{ height: 80, width: 80 }} progress={0.7} progressColor={'#2ecc71'} />
                            <Text style={{ position: 'absolute', marginVertical: 30, fontSize: 14 }}>{'Energy'}</Text>
                        </View>
                        <View style={{ alignItems: 'center', margin: 5 }}>
                            <ProgressCircle style={{ height: 80, width: 80 }} progress={0.7} progressColor={'#2ecc71'} />
                            <Text style={{ position: 'absolute', marginVertical: 30, fontSize: 14 }}>{'Protein'}</Text>
                        </View>
                        <View style={{ alignItems: 'center', margin: 5 }}>
                            <ProgressCircle style={{ height: 80, width: 80 }} progress={0.7} progressColor={'#2ecc71'} />
                            <Text style={{ position: 'absolute', marginVertical: 30, fontSize: 14 }}>{'Carbs'}</Text>
                        </View>
                        <View style={{ alignItems: 'center', margin: 5 }}>
                            <ProgressCircle text={"Text"} style={{ height: 80, width: 80 }} progress={0.7} progressColor={'#2ecc71'} />
                            <Text style={{ position: 'absolute', marginVertical: 30, fontSize: 14 }}>{'Fat'}</Text>
                        </View>
                    </View>
                    <View style={{ margin: 16 }}>
                        <Text style={{ fontSize: 25 }}>{'Ingredients'}</Text>
                        <FlatList style={{ marginTop: 20 }}
                            data={DATA}
                            renderItem={renderIngredients}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                </ScrollView>
                <View style={{ position: 'absolute', borderRadius: 5, height: 60, width: '80%', bottom: 0, backgroundColor: '#2ecc71', alignSelf: 'center', alignItems: 'center' }} >
                    <Text style={{ textAlign: 'center' }}>
                        {"Add to bag"}
                    </Text>
                </View>
            </View>
        )
    }
}

export default ItemInfoView;