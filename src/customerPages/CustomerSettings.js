import React from "react";
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from "react-native";
import firebase from '../firebase/Firebase'
import { Entypo } from '@expo/vector-icons';

const DATA = [
  {
    title: "Payment",
      data: ["Payment"]
  },
  {
    title: "Logins",
    data: ["Log Out"]
  },
];

const FlatListItemSeparator = () => {
    return (
        <View style={styles.listItemSeparatorStyle} />
    )
}


function CustomerSettings(props) {

  const navigation = props.navigation
    
    // Cell to show the chef
    const Item = ({ title }) => {
      if (title == "Log Out") {
        return (
          <TouchableOpacity onPress={() => signOut(navigation) } style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Entypo name="chevron-right" size={24} color="Gray" />
          </TouchableOpacity>
        )
      } else {
        return (
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Entypo name="chevron-right" size={24} color="Gray" />
          </View>
        )
        

      }   
  }

    return (
        <View style={styles.container}>
          {/* Header */}
          <View style={[{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}]}>
            <Text style={{fontWeight: '500', fontSize: 18}}>Settings</Text>
               <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=> {navigation.pop()} } style={{  }}>
                      <Entypo name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
               </View>
           </View>
            <SectionList
                style={styles.sectionList}
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => <Item title={item}/>}
                renderSectionHeader={({ section }) => {
                  if (section.title === "Payments") {
                      return <Text></Text>
                  } else {
                    <Text style={styles.header}>{section.title}</Text>

                  }
                }}/>
        </View>
    )
}

// Sign out 
function signOut(navigation) {
  firebase.auth().signOut().then(function () {
      // Sign-out successful.
      navigation.navigate("Authenticate")
  }).catch(function (error) {
      // An error happened.
      alert(error)
  });
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
  
  export default CustomerSettings
