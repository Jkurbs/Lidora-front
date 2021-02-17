import React, { useEffect, useState, createRef} from "react";
import { View, Text, TouchableOpacity,  SectionList, Animated } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet'
import EmptyBag from '../../components/emptyBagView'
import useGlobalStyles  from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import NavBar from '../navigation/navBar'
import moment from 'moment'
import comboCell from "../menu/comboCell";
import NumberPlease from "react-native-number-please";

import {FlatList} from 'react-native-gesture-handler'

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
  var fee = (total - amount) + _deliveryFee;
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
  const [newArray, setNewArray] = useState([]) 


  useEffect(() => {
    let isCancelled = false;
    var grouped = _.mapValues(_.groupBy(items, 'deliveryDates'),
    clist => clist.map(item => _.omit(item, 'deliveryDates')));
    console.log("GROUPED",grouped)
    Object.keys(grouped).forEach(key => {
      let obj = {}
      var dates = key.split(',')
      if (key.length > 1) {
        obj['title'] = dates.map(x => moment(x).format('dddd MMM, DD')).join("\n")
        obj['data'] = grouped[key]
        if (!isCancelled) {
          setNewArray(prevState => [...prevState, obj])
        }  
      } else {
        obj['title'] = key.moment(x).format('dddd MMM, DD')
        obj['data'] = grouped[key]
        if (!isCancelled) {
          setNewArray(prevState => [...prevState, obj])
        }  
      }
    });

    setNewArray(prevState => [...prevState, {title: "Total", data: [0]}])
    return () => {
      isCancelled = true;
    };
}, [])
 
  const quantity = items.map(a => a.quantity).reduce((a, b) => a + b, 0)

  const subTotal = items.map(a => a.total).reduce((a, b) => a + b, 0)
  const calculatedAmount = calcFee(subTotal * items[0]?.deliveryDates?.length ?? 0, "USD")
  
  const [isOpen, setIsOpen] = useState(false) 
  const [opacity] = useState(new Animated.Value(0))
  const [selectedItem, setSelectedItem] = useState({})

  const globalStyles = useGlobalStyles()
  const { colors } = useTheme();

  const FlatListItemSeparator = () => {
    return ( <View style={globalStyles.border}/> )
  }

  const ItemsCell = ({item}) => {
    const initialValues = [{ id: "quantity", value: item.quantity ?? 1 }];
    return (
      <View style={{flexDirection: 'column', padding: 20, justifyContent: 'center'}}>
        <View style={styles.checkoutItemCellContainer}>
            <View style={styles.checkoutItemContainer}>
                <Text style={[globalStyles.textSecondary, styles.menuQuantity, {marginTop: 6,
        marginBottom: 6,}]}>{ `${item?.quantity ?? 1}x`}</Text>
                    <NumberPlease
                digits={[{ id: "quantity", label: "", min: 0, max: 99 }]}
                values={initialValues}
                onChange={(values) => changeQty(values,item)}
            />
                <Text style={[globalStyles.textPrimary, styles.menuName]}>{item?.name ?? ""}</Text>
            </View>
            <View style={styles.checkoutItemRightContainer}>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={()=> onOpen(item)}>
                <Text style={[globalStyles.textPrimary, { marginRight: 8}]}>${item?.total ?? item?.price ?? 0}</Text>
                <Ionicons name="ios-remove-circle-outline" size={24} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
        </View>
    </View>
    )
  }

  const TotalCell = () => (
    <View style={styles.totalContainer}>
        <View style={styles.totalInnerContainer}>
            <Text style={[globalStyles.textPrimary, styles.totalItemTitle]}>Subtotal</Text>
            <Text style={[globalStyles.textPrimary, styles.totalItemValue]}>${calculatedAmount.amount}</Text>
        </View>
        <View style={styles.totalInnerContainer}>
            <Text style={[globalStyles.textPrimary, styles.totalItemTitle]}>Service Fee</Text>
            <Text style={[globalStyles.textPrimary, styles.totalItemValue]}>${calculatedAmount.fee}</Text>
        </View>
        <View style={styles.totalInnerContainer}>
            <Text style={[globalStyles.textPrimary, styles.totalItemTitle]}>Amount due</Text>
            <Text style={[globalStyles.textPrimary, styles.totalItemValue]}>${calculatedAmount.total}</Text>
        </View>
    </View>
  );

  const changeQty = async (values,item) => {
    console.log("VALUE",values)
    console.log("ITEM",item)

  }

  const removeItem = async () => {
    const data = newArray.map(x => x.data)
    const group = data.filter(item => item.comboName == selectedItem.comboName) 
    const initialGroup = items.filter(item => item.key != selectedItem.key) 
    console.log("DATA",data)
    console.log("SELECTEDITEM",selectedItem)
    console.log("GROUP",group)
    console.log("initialgroup",initialGroup)

    if(selectedItem.quantity > 1){
      selectedItem.quantity = selectedItem.quantity - 1
      console.log("deducted item",selectedItem.quantity)
    }

    // initialGroup.forEach(async function(item) {
    //   const index = items.indexOf(item);
    //   if (index > -1) {
    //     items.splice(index, 1);
    //   }
    // })
    //   group.forEach(async function(item) {
    //     const index = data.indexOf(item);
    //     if (index > -1) {
    //       data.splice(index, 1);
    //     }
    //   })

    // onClose()
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
       <View style={[styles.removeAlertContainer, {backgroundColor: colors.background}]}>
         <Text style={globalStyles.textPrimary}>Remove Item?</Text>
         <Text style={globalStyles.textSecondary}>Are you sure you want to remove this item from your cart?</Text>
         <TouchableOpacity onPress={()=> removeItem()} style={styles.removeAlertButton}> 
              <Text style={styles.removeAlertButtonText}>Remove</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> onClose()} style={styles.removeAlertSecondaryButton}> 
              <Text style={[globalStyles.textPrimary, styles.removeAlertSecondaryButtonText]}>Go Back</Text>
           </TouchableOpacity>
       </View>
     )
  }

  const proceedToCheckout = () => {
    if (calculatedAmount.total < chef.threshold) {
      alert(`The minimum order amount is $${chef.threshold}`)
      return 
    }

    const shippingDetails = {
      title: "Shipping Details",
      data: [0]
    }
  
    const paymentDetails = {
      title: "Payment Details",
      data: [0]
    }
  
    newArray.splice(1, 0, shippingDetails) 
    newArray.splice(2, 0, paymentDetails)

    navigation.navigate("CheckoutDetails", {
      chef: chef, quantity: quantity,
      subTotal: calculatedAmount.amount,
      total: calculatedAmount.total, 
      serviceFee: calculatedAmount.fee, 
      deliveryFee: calculatedAmount.deliveryFee, 
      items: items, 
      data: newArray
    }) 
  }

  return (
    <View style={globalStyles.backgroundPrimary}>
        <NavBar items={items} title={"Cart"} leftIcon={"md-close"} navigation={navigation}/>
      {
       items.length === 0 ?
        <EmptyBag/>
        :
        <View>
            <SectionList
                style={styles.sectionList}
                keyExtractor={(item, index) => item + index}
                sections={newArray}
                renderSectionHeader={({ section }) => {
                  if (section.title === "Total") {
                    return null
                  } else {
                    return (
                      <View style={styles.headerView}>
                            <Text style={[globalStyles.textPrimary, styles.sectionTitle]}>Delivery for: {section.title}</Text>
                      </View>
                    )
                  }
                }}
                renderItem={({ item, section }) => {
                    switch (section.title) {
                        case "Total":
                          return <TotalCell item={item} />
                        default:
                          return <ItemsCell item={item} />
                    }
                }}
                ListHeaderComponent={<View style={{width: '100%', height: 50}}/>}
                ListFooterComponent={<View style={{width: '100%', height: 150}}/>}
                ItemSeparatorComponent={FlatListItemSeparator}
                stickySectionHeadersEnabled={false}
            />

            <View style={{width: '100%',  position: "absolute", bottom: 30 , flexDirection: 'column', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={()=> proceedToCheckout()} style={globalStyles.btnPrimary}> 
                      <Text style={styles.textCentered}>Proceed to Checkout</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8, bottom: 0}}>
                  <Entypo name="lock" size={12} color="#6A737D"/>
                  <Text style={globalStyles.textTertiary}>Payments are processed securely.</Text>
              </View>
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
