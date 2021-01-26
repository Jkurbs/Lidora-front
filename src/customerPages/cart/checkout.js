import React, { useState} from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, SectionList } from "react-native";
import firebase from '../../firebase/Firebase'
import { Entypo } from '@expo/vector-icons';
import NavBar from '../navigation/navBar'
import styles from '../storeFront/storeFront.style'
import OrderDone from '../cart/orderDone'

var db = firebase.firestore();
function Checkout(props) {

  const navigation = props.navigation
  const chef = props.route.params.chef
  const subTotal = (props.route.params.subTotal * 100).toFixed()
  const total = (props.route.params.total * 100).toFixed()
  const [address, setAddress] = useState({})
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [payment, setPayment] = useState({})
  const [disable, setDisable] = useState(false)
  const [done, setDone] = useState(false)

  const FlatListItemSeparator = () => {
    return ( <View style={styles.listItemSeparatorStyle}/> )
  }

  const getData = (props) => {
    if (props === undefined) {return}
    switch(props.type) {
      case "Address":
        setAddress(props.data) 
        break;
      case "Email":
        setEmail(props.data)
        break; 
      case "Phone":
        setPhone(props.data)
        break;
      case "Payment":
        setPayment(props.data)
      default:
        break;
    }
  }

  const readData = (item) => {
    if (item === "Address") {
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
    if (token === null, email === null, phone === null) {  setDisable(false); return }

    console.log("TRESHOLD: ", chef.threshold)
    if (total < chef.threshold) {
        alert(`The minimum order amount is ${chef.threshold}`)
       return 
      }

      await db.collection("payments").doc().set({
        email: email, 
        subtotal: subTotal,
        total: total, 
        currency: "USD", 
        payment_method: token, 
        destination: chef.account_id
    })
    .then(function() {
        setDisable(false)
        setDone(true)
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        setDisable(false)
        console.error("Error writing document: ", error);
    });
};

  const DetailsCell = ({item}) => {
    return (
      <View style={{margin: 20, justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=> 
          navigation.navigate(item, {back: getData, addedAddress: address, addedPhone: phone})
          } style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16}}>{item}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.totalItemValue}>{ readData(item) }</Text>
                  <Entypo name="chevron-right" size={24} color="black" />
              </View>
          </TouchableOpacity>
      </View>
    );
  }

  if (done) {
    return <OrderDone email={email}/>
  } else {
    return (
      <View style={styles.container}>
        <NavBar title={"Checkout"} navigation={navigation}/>
        <View style={styles.bagContainer}>
            <SectionList
                style={styles.bagSectionList}
                keyExtractor={(item, index) => item + index}
                sections={ [
                  { title: "Delivery Details", data: ["Address", "Phone Number", "Email Address"] },
                  { title: "Payment", data: ["Add Payment"] },
                ]}
                renderSectionHeader={({ section }) => {
                  return (
                      <View style={styles.headerView}>
                          <Text style={styles.sectionTitle}>{section.title}</Text>
                      </View>
                  )
                }}
                renderItem={({ item, section }) => {
                  return <DetailsCell item={item} />
                }}
                ItemSeparatorComponent={FlatListItemSeparator}
                stickySectionHeadersEnabled={false}
            />
          </View>
          <View style={styles.listItemSeparatorStyle} />
          <TouchableOpacity disabled={disable} onPress={()=> checkout()} style={ disable? [styles.mainButtonDisable, {bottom: 50}] : [styles.mainButton, {bottom: 50}]}> 
              <View style={styles.mainButtonContainer}>
                <Text style={styles.mainButtonText}>{disable ? "":"Checkout"}</Text>
              </View>
              <ActivityIndicator hidesWhenStopped={true} animating={disable} color="#0000ff" style={{ position: 'absolute', alignSelf: 'center' }} />
            </TouchableOpacity>
        </View>
    )
  }
}
  
export default Checkout
