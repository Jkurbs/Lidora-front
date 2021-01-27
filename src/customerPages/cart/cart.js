import React, { useState, createRef} from "react";
import { View, Text, TouchableOpacity, Image, SectionList, Animated } from "react-native";
import { Entypo } from '@expo/vector-icons';
import firebase from '../../firebase/Firebase'
import BottomSheet from 'reanimated-bottom-sheet'
import EmptyBag from '../../components/emptyBagView'
import styles from '../storeFront/storeFront.style'
import NavBar from '../navigation/navBar'

const snapPoints = ["0%", "40%"]
const ref = createRef();

var fees = { 
	USD: { Percent: 12.9, Fixed: 0.30 },
	GBP: { Percent: 12.4, Fixed: 0.20 },
	EUR: { Percent: 12.4, Fixed: 0.24 },
	CAD: { Percent: 12.9, Fixed: 0.30 },
	AUD: { Percent: 12.9, Fixed: 0.30 },
	NOK: { Percent: 12.9, Fixed: 2 },
	DKK: { Percent: 12.9, Fixed: 1.8 },
	SEK: { Percent: 12.9, Fixed: 1.8 },
	JPY: { Percent: 13.6, Fixed: 0 },
	MXN: { Percent: 13.6, Fixed: 3 }
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
    total: Number(total.toFixed(2)) 
	};
}

function Card(props) {

  const navigation = props.navigation
  const chef = props.route.params.chef
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
        <View style={styles.checkoutItemRightContainer}>
          <Text style={styles.secondaryText}>${item?.total ?? item?.price ?? 0}</Text>
          <TouchableOpacity onPress={()=> onOpen(item)}>
            <Image style={styles.removeImage} defaultSource={ require('../../assets/icon/remove-100.png')} />
          </TouchableOpacity>
        </View>
    </View>
  );

  const TotalCell = () => (
    <View style={styles.totalContainer}>
        <View style={styles.totalInnerContainer}>
            <Text style={styles.totalItemTitle}>Subtotal</Text>
            <Text style={styles.totalItemValue}>${subTotal}</Text>
        </View>
        <View style={styles.totalInnerContainer}>
            <Text style={styles.totalItemTitle}>Delivery Fee</Text>
            <Text style={styles.totalItemValue}>${calculatedAmount.deliveryFee}</Text>
        </View>
        <View style={styles.totalInnerContainer}>
            <Text style={styles.totalItemTitle}>Service Fee</Text>
            <Text style={styles.totalItemValue}>${calculatedAmount.fee}</Text>
        </View>
        <View style={styles.totalInnerContainer}>
            <Text style={[styles.totalItemTitle, {fontWeight: '500'}]}>Amount due</Text>
            <Text style={styles.totalItemValue}>${calculatedAmount.total}</Text>
        </View>
    </View>
  );

  const removeItem = async () => {
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

  const onOpen = async (item) => {
    ref.current.snapTo(1);
    setIsOpen(true)
    setSelectedItem(item)
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onClose = async () => {
    ref.current.snapTo(0);
    setIsOpen(false)
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => {
     return (
       <View style={styles.removeAlertContainer}>
         <Text style={styles.removeAlertTitle}>Remove Item?</Text>
         <Text style={styles.removeAlertDescription}>Are you sure you want to remove this item from your cart?</Text>
         <TouchableOpacity onPress={()=> removeItem()} style={styles.removeAlertButton}> 
              <Text style={styles.removeAlertButtonText}>Remove</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> onClose()} style={styles.removeAlertSecondaryButton}> 
              <Text style={styles.removeAlertSecondaryButtonText}>Go Back</Text>
           </TouchableOpacity>
       </View>
     )
  }

  return (
    <View style={styles.container}>
        <NavBar items={items} title={"Cart"} leftIcon={"md-close"} navigation={navigation}/>
       {
        items.length === 0 ?
        <EmptyBag/>
        :
        <View style={[styles.bagContainer, {paddingBottom: 50}]}>
            <SectionList
                style={styles.bagSectionList}
                keyExtractor={(item, index) => item + index}
                sections={[
                  { title: "Items", data: items },
                  { title: "Total", data: [0] },
              ]}
                renderSectionHeader={({ section }) => {
                  if (section.title === "Total") {
                    return null
                  } else {
                    return (
                      <View style={styles.headerView}>
                          <Text style={styles.sectionTitle}>{section.title}</Text>
                      </View>
                    )
                  }
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
              <TouchableOpacity onPress={()=> navigation.navigate("Checkout", {chef: chef, subTotal: subTotal, total: calculatedAmount.total}) } style={[styles.mainButton, {bottom: 75}]}> 
                  <View style={[styles.mainButtonContainer]}>
                    <Text style={styles.mainButtonText}>Proceed to Checkout</Text>
                  </View>
              </TouchableOpacity>
            <View style={[styles.mainButtonContainer, {marginBottom: 20}]}>
                <Entypo name="lock" size={12} color="#6A737D" />
                <Text style={{color:"#6A737D", fontSize: 12}}>Payments are processed securely.</Text>
            </View>
        </View>
      }

      {isOpen && renderBackDrop()}

      <BottomSheet
        borderRadius={10}
        ref={ref}
        snapPoints={snapPoints} initialSnap={0}
        renderContent={renderContent}/> 
    </View>
  )
}
  
export default Card
