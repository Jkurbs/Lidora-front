import React, { useState, useRef, useEffect } from "react";
import { View, Image, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import firebase from "../../firebase/Firebase"
var db = firebase.firestore();
const ref = db.collection('customers')


const FlatListItemSeparator = () => {
    return (
        <View style={styles.listItemSeparatorStyle} />
    )
}

function Payments(props) {

    var user = firebase.auth().currentUser;
    const navigation = props.navigation
    const [accounts, setAccounts] = useState([])

    // States 

    useEffect(() => {
      let isCancelled = false;
      async function fetchPayments() {
            ref.doc(user.uid).collection("payment_methods").onSnapshot(function (querySnapshot) {
              setAccounts([])
                querySnapshot.forEach(function (doc) {
                    const data = doc.data()
                    if (data.brand === null) { return }
                    if (!isCancelled) {
                      setAccounts(prevState => [...prevState, data])
                    } 
                });
            });
          }
        fetchPayments()
        return () => {
            isCancelled = true;
          };
    }, [])

    const Item = ({ account }) => (
      <View style={styles.item}>
          <View style={{ flexDirection: 'row' }}>
                  {account.brand ? (
                      <Image style={styles.image} source={require(`../../assets/icon/${account.brand.toLowerCase()}.png`)} />
                  ) : (
                          <Image style={styles.image} source={require(`../../assets/icon/unknown.png`)} />
                      )
                  }
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                          <Text style={styles.cardNumber}>{"****"}{account.last4}</Text>
                      </View>
                      <TouchableOpacity>
                          <Image />
                      </TouchableOpacity>
                  </View>
          </View>
      </View>
  
  );
  
    // SectionList header 
  const renderItem = ({ item }) => (
    <Item account={item} />
  );

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}}>
            <Text style={{fontWeight: '500', fontSize: 18}}>Payments</Text>
               <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=> {navigation.goBack()} } style={{  }}>
                      <Entypo name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
               </View>

               <View style={{ position: 'absolute', right: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={()=> navigation.navigate("AddPayments") }>
                    <Ionicons name="ios-add" size={24} color="black" />
                  </TouchableOpacity> 
                </View>
           </View>

        {/* List */}

        <ScrollView>
          <FlatList
              style={styles.flatList}
              data={accounts}
              renderItem={renderItem}
              ItemSeparatorComponent={FlatListItemSeparator}
              keyExtractor={item => item.id}
          />
          </ScrollView>
      </View>
    )
}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    flatList: {
        borderRadius: 5,
        margin: 20,
        marginTop: 40,
        width: '100%', 
        height: '100%'
    },

    item: {
        marginVertical: 8,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 32,
    },

    image: {
        width: 30,
        height: 30,
        borderRadius: 2,
        marginRight: 16,
        alignSelf: 'center'
    }
});

export default Payments