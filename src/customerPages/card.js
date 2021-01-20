import React, {useState} from "react";
import { View, Text, TouchableOpacity, SectionList } from "react-native";
import firebase from '../firebase/Firebase'
import EmptyBag from '../components/emptyBagView'
import { Entypo } from '@expo/vector-icons';
import styles from './storeFront/storeFront.style'

function Checkout(props) {

  const navigation = props.navigation
  const items = props.route.params.items
  // const [items, setItems] = useState([addedItems]) 

  const FlatListItemSeparator = () => {
    return ( <View style={styles.listItemSeparatorStyle}/> )
  }

  const ItemsCell = ({item}) => (
    <View style={styles.checkoutItemCellContainer}>
        <View style={ styles.checkoutItemContainer}>
            <Text style={styles.menuQuantity}>{ `${item?.quantity ?? 1}x`}</Text>
            <Text style={styles.menuName}>{item?.name ?? ""}</Text>
        </View>
        <View>
          <Text style={styles.menuPrice}>${item?.total ?? item?.price ?? ""}</Text>
        </View>
    </View>
);

  return (
    <View>
      <View style={[{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}]}>
        <Text style={{fontWeight: '500', fontSize: 18}}>Checkout</Text>
          <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=> { navigation.pop()} } style={{  }}>
                <Entypo name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
          </View>
      </View>
      {
        items.length === 0 ?
        <EmptyBag/>
        :
        <View style={styles.bagContainer}>
            <SectionList
                style={styles.bagSectionList}
                keyExtractor={(item, index) => item + index}
                sections={ [
                  { title: "Items", data: items },
              ]}
                renderSectionHeader={({ section }) => {
                    if (section.title === "Items") {
                        return <Text></Text>
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
                        default:
                            break
                    }
                }}
                ItemSeparatorComponent={FlatListItemSeparator}
                stickySectionHeadersEnabled={false}
            />
          <View style={styles.listItemSeparatorStyle} />
        </View>
      }
    </View>
  )
}
  
  export default Checkout
