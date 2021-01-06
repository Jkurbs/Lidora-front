import React, { useState, useRef, useEffect } from "react";
import { 
    View, Text, SectionList, TouchableOpacity, 
    StyleSheet
} from "react-native";

const DATA = [
    {
      title: "Payment",
      data: ["Payment"]
    },
    {
      title: "Sides",
      data: ["Log Out"]
    },
  ];

const FlatListItemSeparator = () => {
    return (
        <View style={styles.listItemSeparatorStyle} />
    )
}

function CustomerSettings(props) {
    
    // Cell to show the chef
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });
  
  export default CustomerSettings
