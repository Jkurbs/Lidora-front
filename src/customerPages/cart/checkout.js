import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, SectionList } from "react-native";
import { useTheme } from '@react-navigation/native';
import firebase from '../../firebase/Firebase'
import { Entypo } from '@expo/vector-icons';
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../storeFront/globalStyle'
import styles from '../storeFront/storeFront.lightStyle'
import OrderDone from '../cart/orderDone'

var db = firebase.firestore();

function Checkout(props) {

  const navigation = props.navigation
  const chef = props.route.params.chef
  const subTotal = (props.route.params.subTotal * 100).toFixed()
  const total = (props.route.params.total * 100).toFixed()
  const [allergies, setAllergies] = useState(null)
  const [address, setAddress] = useState(null)
  const [phone, setPhone] = useState(null)
  const [email, setEmail] = useState(null)
  const [payment, setPayment] = useState(null)
  const [disable, setDisable] = useState(false)
  const [done, setDone] = useState(false)


  const globalStyles = useGlobalStyles()
  const { colors } = useTheme();

  const FlatListItemSeparator = () => {
    return ( <View style={globalStyles.border}/> )
  }

  const getData = (props) => {
    if (props === undefined) {return}
    switch(props.type) {
      case "Allergy": 
        setAllergies(props.data)
      case "Address":
        setAddress(props.data) 
        break;
      case "Phone":
        setPhone(props.data)
        break;
      case "Email":
        setEmail(props.data)
        break; 
      case "Payment":
        setPayment(props.data)
      default:
        break;
    }
  }

  const readData = (item) => {
    if (item === "Add Allergies") {
      return allergies ?? ""
    } else if (item === "Address") {
      return address?.street ?? ""
    } else if (item === "Phone Number") {
      return phone ?? ""
    } else if (item === "Email Address") {
      return email ?? ""
    } else {
      return payment?.token?.card?.last4 ?? ""
    }
  }

  const checkout = async () => {
    setDisable(true)
    const token = payment?.token?.id 
    if (token === null, address === null, email === null,
       phone === null, dates === null, payment === null) 
    { setDisable(false); return }

    await db.collection("payments").doc().set({
      chefId: chef.id,
      allergies: allergies,
      email: email, 
      phone: phone,
      line1: address.street, 
      city: address.city,
      state: address.state, 
      zip: address.postalCode,
      subtotal: subTotal,
      total: total, 
      // serviceFee: serviceFee,
      // deliveryFee: deliveryFee,
      // quantity: quantity,
      currency: "USD", 
      payment_method: token, 
      destination: chef.account_id
    })
    .then(function() {
        setDisable(false)
        setDone(true)
    })
    .catch(function(error) {
        setDisable(false)
    });
};

  const DetailsCell = ({item}) => {
    return (
      <View style={styles.checkoutDetailsContainer}>
          <TouchableOpacity onPress={()=> 
          navigation.navigate(item, {back: getData, addedAddress: address, addedPhone: phone})}
           style={styles.checkoutDetailsButton}>
              <Text style={globalStyles.textPrimary}>{item}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={[globalStyles.textSecondary, { marginTop: 0, textAlign: 'center', alignSelf:'center'}]}>{ readData(item) }</Text>
                  <Entypo name="chevron-right" size={24} color={colors.textTertiary} />
              </View>
          </TouchableOpacity>
      </View>
    );
  }

  if (done) {
    return <OrderDone navigation={navigation} email={email}/>
  } else {
    return (
      <View style={globalStyles.backgroundPrimary}>
        <NavBar title={"Checkout"} navigation={navigation}/>
        <View style={[styles.sectionList]}>
            <SectionList
                style={styles.sectionList}
                keyExtractor={(item, index) => item + index}
                sections={[
                  {title: "Preparation Details", data:["Add Allergies"]},
                  { title: "Delivery Details", data: ["Address", "Phone Number", "Email Address"] },
                  { title: "Payment", data: ["Add Payment"] },
                ]}
                renderSectionHeader={({ section }) => {
                  return (
                      <View style={styles.headerView}>
                        <Text style={[globalStyles.textPrimary, styles.sectionTitle]}>{section.title}</Text>
                      </View>
                  )
                }}
                renderItem={({ item, section }) => {
                  return <DetailsCell item={item} />
                }}
                ListHeaderComponent={<View style={{width: '100%', height: 50}}/>}
                ListFooterComponent={<View style={{width: '100%', height: 150}}/>}
                ItemSeparatorComponent={FlatListItemSeparator}
                stickySectionHeadersEnabled={false}
            />
          </View>

          <View style={{width: '100%',  position: "absolute", bottom: 30, flexDirection: 'column', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={()=> checkout()} style={globalStyles.btnPrimary}> 
                <Text style={styles.textCentered}>{disable ? "":"Checkout"}</Text>
                <ActivityIndicator hidesWhenStopped={true} animating={disable} color={colors.textSecondary} style={{ position: 'absolute', alignSelf: 'center' }} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8, bottom: 0}}>
                  <Entypo name="lock" size={12} color="#6A737D"/>
                  <Text style={globalStyles.textTertiary}>Payments are processed securely.</Text>
              </View>
          </View>
      </View>
    )
  }
}
  
export default Checkout
