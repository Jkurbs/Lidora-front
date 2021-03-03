import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator, SectionList } from "react-native";
import { useTheme } from '@react-navigation/native';
import firebase from '../../firebase/Firebase'
import NavBar from '../navigation/navBar'
import useGlobalStyles  from '../../globalStyle'
import styles from '../storeFront/storeFront.lightStyle'

var db = firebase.firestore();

function Checkout(props) {

  const navigation = props.navigation
  const params = props.route.params
  const chef = params.chef
  const personal = params.personal
  const card = params.card.token.card
  const address = params.address
  const subTotal = parseFloat((params.subTotal * 100).toFixed())
  const total = parseFloat((params.total * 100).toFixed())

  const data = params.data 
  const items = params.items
  const quantity = params.quantity
  const serviceFee = params.serviceFee
  const deliveryFee = params.deliveryFee

  const globalStyles = useGlobalStyles()
  const { colors } = useTheme();

  const [disable, setDisable] = useState(false)

  const FlatListItemSeparator = () => {
    return ( <View style={globalStyles.border}/> )
  }


  const checkout = async () => {
    
    setDisable(true)
    const token = params.card.token.id 
    
    const ref = db.collection("payments").doc()
    await ref.set({

      chefId: chef.id,
      chefEmailAddress: chef.email_address,
      storeName: chef.title,
      destination: chef.account_id, 
      customerName: params.name,
      email: personal.emailAddress, 
      phone: personal.phoneNumber,
      location: params.location,
      apt: address.apt, 
      line1: address.street, 
      state: address.state,
      zip: address.zipCode,
      subtotal: subTotal,
      total: total, 
      serviceFee: serviceFee,
      deliveryFee: deliveryFee,
      quantity: quantity,
      currency: "USD", 
      payment_method: token, 
      allergies: personal.allergies,
      data: data,
      // items
    }).then(function() {
        items.forEach(async (item) => { 
          ref.collection("items").doc().set({
            categoryName: item.categoryName,
            comboName:item.comboName,
            deliveryDates:item.deliveryDates,
            description:item.description ,
            imageURL: item.imageURL ?? "",
            key: item.key,
            name: item.name,
            price:item.price,
            quantity:item.quantity,
            total: item.total,
        })
      })
    }).then(function() {
      const unsubcribe = ref.onSnapshot((doc) => { 
        const status = doc.data().status
        if (status != undefined) {
          if (doc.data().status === "succeeded") {
            navigation.navigate("Order Done", {items: items, email: personal.emailAddress})
            setDisable(false)
            unsubcribe()
          } else {
            setDisable(false)
            alert('An error occured with your card, please try again')
            unsubcribe()
            return 
          }
        } 
      })
    })
    .catch(function(error) {
        alert(error)
        setDisable(false)
    });
};


const ItemsCell = ({item}) => {
  return (
    <View style={{flexDirection: 'column', padding: 20, justifyContent: 'center'}}>
      <View style={styles.checkoutItemCellContainer}>
          <View style={styles.checkoutItemContainer}>
              <Text style={[globalStyles.textSecondary, styles.menuQuantity, {marginTop: 6,
      marginBottom: 6,}]}>{ `${item?.quantity ?? 1}x`}</Text>
              <Text style={[globalStyles.textPrimary, styles.menuName]}>{item?.name ?? ""}</Text>
          </View>
          <View style={styles.checkoutItemRightContainer}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={()=> onOpen(item)}>
              <Text style={[globalStyles.textPrimary, { marginRight: 8}]}>${item?.total ?? item?.price ?? 0}</Text>
            </TouchableOpacity>
          </View>
      </View>
  </View>
  )
}

    const PaymentCell = () => (
      <View style={[styles.totalContainer, {flexDirection: 'row'}]}> 
        <Image style={styles.cardImage} source={require(`../../assets/icon/${card.brand.toLowerCase()}.png`)} />
        <Text style={{color: colors.textPrimary}}>***{card.last4}</Text>
      </View>
    )

    const TotalCell = () => (
      <View style={styles.totalContainer}>
          <View style={styles.totalInnerContainer}>
              <Text style={[globalStyles.textPrimary, styles.totalItemTitle]}>Subtotal</Text>
              <Text style={[globalStyles.textPrimary, styles.totalItemValue]}>${params.subTotal}</Text>
          </View>
          <View style={styles.totalInnerContainer}>
              <Text style={[globalStyles.textPrimary, styles.totalItemTitle]}>Service Fee</Text>
              <Text style={[globalStyles.textPrimary, styles.totalItemValue]}>${params.serviceFee}</Text>
          </View>
          <View style={styles.totalInnerContainer}>
              <Text style={[globalStyles.textPrimary, styles.totalItemTitle]}>Amount due</Text>
              <Text style={[globalStyles.textPrimary, styles.totalItemValue]}>${params.total}</Text>
          </View>
      </View>
    );

    return (
      <View style={globalStyles.backgroundPrimary}>
        <NavBar title={"Checkout"} rightIcon={params.total} navigation={navigation}/>
        
        <SectionList
          ListHeaderComponent={
            <View style={{padding: 20, marginTop: 70, width: '100%'}}>
            <Text style={[globalStyles.textPrimary, {fontSize: 22}]}>
            Ready to place your order? Let’s make sure everything’s right.</Text>
        </View>
          }
          style={styles.sectionList}
          keyExtractor={(item, index) => item + index}
          sections={data}
          renderSectionHeader={({ section }) => {
            if (section.title === "Total") {
              return null
            } else if (section.title === "Shipping Details") {
              return (
                  <View style={[styles.headerView, {marginTop: 20}]}>
                    <Text style={[globalStyles.textPrimary, styles.sectionTitle, {marginTop: 0}]}>{section.title}</Text>
                  </View>
              )
            } else if (section.title === "Payment Details") {
              return (
                <View style={[styles.headerView, {marginTop: 20}]}>
                  <Text style={[globalStyles.textPrimary, styles.sectionTitle, {marginTop: 0}]}>{section.title}</Text>
                </View>
              )
            }
            else {
                return (
                  <View style={styles.headerView}>
                        <Text style={[globalStyles.textPrimary, styles.sectionTitle, {marginTop: 0}]}>Delivery for: {section.title}</Text>
                  </View>
                )
              }
            }}
            renderItem={({ item, section }) => {
                switch (section.title) {
                    case "Total":
                      return <TotalCell item={item} />
                    case "Shipping Details":
                      return (
                        <Text style={{padding: 20, maxWidth: '50%', color: colors.textPrimary}}>{params.name}{"\n"}{params.location}</Text>
                      )
                    case "Payment Details":
                      return <PaymentCell/>
                    default:
                      return <ItemsCell item={item} />
                }
            }}
            ListFooterComponent={<View style={{width: '100%', height: 150}}/>}
            ItemSeparatorComponent={FlatListItemSeparator}
            stickySectionHeadersEnabled={false}
            />
        <TouchableOpacity
          onPress={() => checkout()}
          style={[styles.buttonPrimary, globalStyles.btnPrimary, {marginTop: 0, position: 'relative'}]}>
          <Text style={styles.textCentered}>{disable ? "":"Checkout"}</Text>
          <ActivityIndicator hidesWhenStopped={true} animating={disable} color={colors.textSecondary} style={{ position: 'absolute', alignSelf: 'center' }} />
        </TouchableOpacity>
        <View style={{ margin: 20, marginTop: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image resizeMode={'cover'} style={{ marginRight: 16, width: 25, height: 25}} source={require("../../assets/img/Stripe Climate Badge.svg")}/>
          <Text style={globalStyles.textTertiary}>Lidora will contribute 1% of your purchase to remove CO₂ from the atmosphere.</Text>
        </View>
      </View>
    )
}
  
export default Checkout
