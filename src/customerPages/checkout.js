import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import firebase from '../firebase/Firebase'
import EmptyBag from '../components/emptyBagView'
import { Entypo } from '@expo/vector-icons';

function Checkout(props) {
  const navigation = props.navigation
  return (
    <View>
      <View style={[{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}]}>
        <Text style={{fontWeight: '500', fontSize: 18}}>Checkout</Text>
          <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=> { props.navigation.pop()} } style={{  }}>
                <Entypo name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
          </View>
      </View>
      <EmptyBag/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    sectionList: {
      padding: 8
    },
    item: {
      backgroundColor: "#fff",
      height: 50, 
      justifyContent: 'space-between', 
      flexDirection: 'row',
      marginTop: 8
    },
    header: {
      fontSize: 20,
      fontWeight: '500',
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 17
    }
  });
  
  export default Checkout
