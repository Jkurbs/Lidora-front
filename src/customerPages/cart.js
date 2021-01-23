import React, { useState, createRef} from "react";
import { View, Text, TouchableOpacity, Image, SectionList, Animated } from "react-native";
import firebase from '../firebase/Firebase'
import BottomSheet from 'reanimated-bottom-sheet'
import EmptyBag from '../components/emptyBagView'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import styles from './storeFront/storeFront.style'

const snapPoints = ["0%", "40%"]
const ref = createRef();

var fees = { 
	USD: { Percent: 2.9, Fixed: 0.30 },
	GBP: { Percent: 2.4, Fixed: 0.20 },
	EUR: { Percent: 2.4, Fixed: 0.24 },
	CAD: { Percent: 2.9, Fixed: 0.30 },
	AUD: { Percent: 2.9, Fixed: 0.30 },
	NOK: { Percent: 2.9, Fixed: 2 },
	DKK: { Percent: 2.9, Fixed: 1.8 },
	SEK: { Percent: 2.9, Fixed: 1.8 },
	JPY: { Percent: 3.6, Fixed: 0 },
	MXN: { Percent: 3.6, Fixed: 3 }
};

// Calculate 
function calcFee(amount, currency) {
  var _fee = fees[currency];
  var _deliveryFee = 2.00;
  var amount = parseFloat(amount);
  var total = (amount + parseFloat(_fee.Fixed) + _deliveryFee) / (1 - parseFloat(_fee.Percent) / 100);
  var fee = total - amount;
	return {
		amount: amount,
    fee: fee.toFixed(2),
    deliveryFee: _deliveryFee,
    total: total.toFixed(2)
    
	};
}

function Card(props) {

  const navigation = props.navigation
  const items = props.route.params.items

  const subTotal = items.map(a => a.total).reduce((a, b) => a + b, 0)
  const calculatedAmount = calcFee(subTotal, "USD")
  
  const [isOpen, setIsOpen] = useState(false) 
  const [opacity] = useState(new Animated.Value(0))
  const [selectedItem, setSelectedItem] = useState({})

  const FlatListItemSeparator = () => {
    return ( <View style={styles.listItemSeparatorStyle}/> )
  }

  const ItemsCell = ({item}) => (
    <View style={styles.checkoutItemCellContainer}>
        <View style={ styles.checkoutItemContainer}>
            <Text style={styles.menuQuantity}>{ `${item?.quantity ?? 1}x`}</Text>
            <Text style={styles.menuName}>{item?.name ?? ""}</Text>
        </View>
        <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{alignSelf: 'center'}}>${item?.total ?? item?.price ?? ""}</Text>
          <TouchableOpacity onPress={()=> onOpen(item)}>
            <Image style={styles.removeImage} defaultSource={ require('../assets/icon/remove-100.png')} />
          </TouchableOpacity>
        </View>
    </View>
  );

  const TotalCell = () => (
    <View style={{margin: 20}}>
        <View style={{paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.totalItemTitle}>Subtotal</Text>
            <Text style={styles.totalItemValue}>${subTotal}</Text>
        </View>
        <View style={{paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.totalItemTitle}>Delivery Fee</Text>
            <Text style={styles.totalItemValue}>${calculatedAmount.deliveryFee}</Text>
        </View>
        <View style={{paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.totalItemTitle}>Service Fee</Text>
            <Text style={styles.totalItemValue}>${calculatedAmount.fee}</Text>
        </View>
    </View>
  );

  const removeItem = () => {
    if (selectedItem.group != null) {
      const group = items.filter(item => item.group == selectedItem.group) 
      group.forEach(async function(item) {
        const index = items.indexOf(item);
        if (index > -1) {
          items.splice(index, 1);
        }
      })
    } else {
      const index = items.indexOf(selectedItem);
      if (index > -1) {
        items.splice(index, 1);
      }
    }
    onClose()
  }

  const renderBackDrop = () => (
    <Animated.View style={[styles.backdrop, {opacity: opacity}]}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={()=> onClose()}/>
    </Animated.View>
  );

  const onOpen = (item) => {
    ref.current.snapTo(1);
    setIsOpen(true)
    setSelectedItem(item)
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onClose = () => {
    ref.current.snapTo(0);
    setIsOpen(false)
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderHeader = () => {
    return (
      <View style={styles.sectionListHeader}>

      </View>
    )
  }

  const renderContent = () => {
     return (
       <View style={{padding: 20, backgroundColor: 'white', paddingBottom: 20}}>
         <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 8}}>Remove Item?</Text>
         <Text style={{ fontSize: 14}}>Are you sure you want to remove this item from your cart?</Text>
         <TouchableOpacity onPress={()=> removeItem()} style={{ backgroundColor: '#FF7B72', justifyContent: 'center', marginTop: 16, borderRadius: 5, height: 60, width: '100%', alignSelf: 'center'}}> 
              <Text style={{alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 17}}>Remove</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> onClose()} style={{ justifyContent: 'center', marginTop: 16, borderRadius: 5, height: 60, width: '100%', alignSelf: 'center'}}> 
              <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 17}}>Go Back</Text>
           </TouchableOpacity>
       </View>
     )
  }

  return (
    <View style={styles.container}>
      <View style={[{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}]}>
        <Text style={{fontWeight: '500', fontSize: 18}}>Cart</Text>
          <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=> { navigation.pop()} } style={{  }}>
                <Ionicons name="md-close" size={24} color="black" />
              </TouchableOpacity>
          </View>
      </View> 
       {
        items.length === 0 ?
        <EmptyBag/>
        :
        <View style={[styles.bagContainer, {paddingBottom: 100}]}>
            <SectionList
                style={styles.bagSectionList}
                keyExtractor={(item, index) => item + index}
                sections={ [
                  { title: "Items", data: items },
                  { title: "Total", data: [0] },
              ]}
                renderSectionHeader={({ section }) => {
                  return (
                      <View style={styles.headerView}>
                          <Text style={styles.sectionTitle}>{section.title}</Text>
                      </View>
                  )
                }}
                renderItem={({ item, section }) => {
                    switch (section.title) {
                        case "Items":
                          return <ItemsCell item={item} />
                        case "Total":
                          return <TotalCell item={item} />
                        default:
                            break
                    }
                }}
                ItemSeparatorComponent={FlatListItemSeparator}
                stickySectionHeadersEnabled={false}
            />
          <View style={styles.listItemSeparatorStyle} />
        <TouchableOpacity onPress={()=> { props.addToBag(total, quantity) }} style={{ backgroundColor: '#2EA44F', justifyContent: 'center', marginTop: 28, borderRadius: 5, height: 60, width: '90%', alignSelf: 'center'}}> 
                <View style={{alignSelf: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                  <Text style={{alignSelf: 'flex-end', color: '#F6F8FA', marginLeft: 8, fontWeight: '600', fontSize: 17}}>Continue</Text>
                  <Text style={{alignSelf: 'flex-end', color: '#F6F8FA', marginLeft: 8, fontWeight: '600', fontSize: 17}}>${calculatedAmount.total}</Text>
                </View>
            </TouchableOpacity>
        </View>
      }

      {isOpen && renderBackDrop()}

      <BottomSheet
        borderRadius={10}
        ref={ref}
        snapPoints={snapPoints} initialSnap={0}
        // renderHeader={renderHeader}
        renderContent={renderContent}/> 
    </View>
  )
}
  
export default Card
