
import React, { useState, useRef, useEffect } from "react";
import { View, SafeAreaView, Image, Text, SectionList, TouchableOpacity, Dimensions, TextInput, Linking, Animated,} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import firebase from "../../firebase/Firebase";
import styles from './storeFront.style'
import "firebase/firestore";
var db = firebase.firestore();

import EmptyBag from '../../components/emptyBagView'
import BottomSheet from 'reanimated-bottom-sheet';
import ReactPlaceholder from 'react-placeholder';

const { height, width } = Dimensions.get("window")

const FlatListItemSeparator = () => {
    return (
        <View style={styles.listItemSeparatorStyle} />
    );
};

function ChefCell(item) {
    return (
        <View>
            <ReactPlaceholder color='red' showLoadingAnimation={false} type='rect' ready={item != null} style={{ height: 250, width: '100%' }}>
                <Image style={styles.storeImage} source={{ uri: item.item.user.imageURL }} />
            </ReactPlaceholder>
            <View style={styles.storeInfoContainer}>
                <Text style={styles.title}>{item.item.user.title}</Text>
                <Text style={styles.description}>{item.item.user.description}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

function StoreInfoCell(item) {
    return (
        <View>
            <View style={{ margin: 20, marginTop: 10, marginBottom: 10 }}>
                <Text style={styles.description}>{item.item.user.city}, {item.item.user.state}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

function StoreFront(props) {
    // States 
    const [data, setData] = useState({ user: [] })
    const [menu, setMenu] = useState([])
    const [titles, setTitle] = useState({ headerTitle: "View Bag", LeftButtonTitle: "" })
    const [selectedItem, setSelectedItem] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)
    const [note, setNote] = useState("")
    const [bag, setBag] = useState([])
    const[isOpen, setIsOpen] = useState(false) 
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    const [isInnerScrollEnabled, setIsInnerScrollEnabled] = useState(false)

    // Refs  
    const bs = React.createRef(null);
    const sheetRef = useRef(null);
    const scrollRef = useRef(null)

    // Fetchs 
    useEffect(() => {
        // Fetch Current chef 
        db.collection('chefs').doc(props.chefId).get().then(function (doc) {
            if (doc.exists) {
                setData({ user: doc.data() })
            } else {
                console.log("No such document!");
            }
        })
    }, [])

    useEffect(() => {
        // Fetch Current chef menu
        db.collection('chefs').doc(props.chefId).collection("menu").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.exists) {
                    setMenu(oldArray => [...oldArray, doc.data()]);
                } else {
                    console.log("No such document!");
                }
            })
        })
    }, [])

    const calculateTotal = (add) => {
        if (add) {
            setQuantity(quantity + 1)
            const result =  +(total + selectedItem.price).toFixed(2)
            setTotal(result)
        } else {
            if (quantity < 2) {
                return 
            }  else {
                setQuantity(quantity - 1)
                const result =  +(total - selectedItem.price).toFixed(2)
                setTotal(result)
            }
        }
    }


const ChefCell = (item) => {
    return (
        <View>
            <ReactPlaceholder color='red' showLoadingAnimation={false} type='rect' ready={item != null} style={{ height: 250, width: '100%' }}>
                <Image style={styles.storeImage} source={{ uri: item.item.user.imageURL }} />
            </ReactPlaceholder>
            <View style={styles.storeInfoContainer}>
                <Text style={styles.title}>{item.item.user.title}</Text>
                <Text style={styles.description}>{item.item.user.description}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

const StoreInfoCell= (item) => {
    return (
        <View>
            <View style={{ margin: 20, marginTop: 10, marginBottom: 10 }}>
                <Text style={styles.description}>{item.item.user.city}, {item.item.user.state}</Text>
                <Text style={styles.description}>{item.item.user.email_address}</Text>
            </View>
            <View style={styles.listItemSeparatorStyle} />
        </View>
    )
}

    const MenuCell = (item) => {
        return (
            <TouchableOpacity onPress={()=>onOpen(item)} >
                <View style={{ alignItems: 'center', margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '70%' }}>
                        <Text style={styles.menuName}>{item.item.name}</Text>
                        <Text style={styles.menuDescription}>{item.item.description}</Text>
                        <Text style={styles.menuPrice}>${item.item.price}</Text>
                    </View>
                    <Image style={styles.menuImage} source={{
                        uri: item.item.imageURL,
                    }} />
                </View>
            </TouchableOpacity>
        )
    }

      const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={ onClose } style={{ justifyContent: 'center', position: 'absolute', left: 16 }}>
                <Text style={{ color: '#34C759', fontSize: 17, fontWeight: '500', alignSelf: 'center' }}>{titles.LeftButtonTitle}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} onPress={()=>onOpen()}>{titles.headerTitle}</Text>
            <View style={[styles.listItemSeparatorStyle, { position: 'absolute', bottom: 0 }]} />
        </View>
    )


    const RenderIngredientsItem = (item) => (
        <Text style={{ margin: 8, padding: 8, fontWeight: '500', fontSize: 15 }}>{item.item?.name ?? ""}</Text>
    );

        const RenderItemInfos = (item) => (
        <View style={styles.itemDescriptionContainer}>
            <View style={{ flexDirection: 'column', maxWidth: '50%' }}>
                <Text style={styles.menuName}>{item.item?.name ?? ""}</Text>
                <Text style={styles.menuDescription}>{item.item?.description ?? ""}</Text>
                <Text style={styles.menuPrice}>${item.item?.price ?? ""}</Text>
            </View>
            <Image style={styles.menuImage} source={{
                uri: item.item?.imageURL ?? "",
            }} />
        </View>
    );

        const RenderInstructions = () => (
        
        <View style={{ flex: 1, marginBottom: 50}}>
            <TextInput
                style={{ height: 60, padding: 20 }}
                placeholder={"Add a note (Extra sauce, no salt, etc.)"}
                onChangeText={(text) => setOrder({ note: text })}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity pointerEvents={() => { order.quantity < 2 ? 'none' : "auto" }} onPress={() => { order.quantity < 2 ? setOrder({ quantity: 1 }) : setOrder({ quantity: order.quantity - 1 }) }} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'black', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', margin: 8 }}>{order.quantity}</Text>
                <TouchableOpacity onPress={() => setOrder({ quantity: order.quantity + 1 })} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'black', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

      const renderContent = () => {

        if (selectedItem === null) {
            return <EmptyBag />
        } else {
            return (
                <View style={styles.bagContainer}>
                    <SectionList
                        style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, marginTop: 30, paddingBottom: '70%'}}
                        keyExtractor={(item, index) => item + index}
                        sections={[
                            { title: "Infos", data: [selectedItem] },
                            { title: "Ingredients", data: selectedItem?.ingredients ?? [] },
                            { title: "Special Instructions", data: [0] },
                        ]}
                        renderSectionHeader={({ section }) => {
                            if (section.title === "Infos") {
                                return <Text></Text>
                            } else {
                                return (
                                    <View style={styles.headerView}>
                                        <Text style={styles.sectionTitle}>{section.title}</Text>
                                    </View>
                                );
                            }

                        }}
                        renderItem={({ item, section }) => {
                            switch (section.title) {
                                case "Infos":
                                    return <RenderItemInfos item={item} />
                                case "Ingredients":
                                    return <RenderIngredientsItem item={item} />
                                case "Special Instructions":
                                    return <RenderInstructions />
                                default:
                                    break;
                            }
                        }}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        stickySectionHeadersEnabled={false}
                    />
                    <View style={styles.listItemSeparatorStyle} />
                </View>
            )
        }
    }

  const onClose = () => {
    setSelectedItem(null)
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    bs.current.snapTo(0);
    setTimeout(() => {
        setIsOpen(false)
    }, 50);
  };

  const onOpen = (item) => {
    setTimeout(() => {
        
    }, 50);
    setIsOpen(true)
    setQuantity(1)
    setTotal(item.item.price)
    setSelectedItem(item?.item ?? null)
    bs.current.snapTo(1);
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  const renderBackDrop = () => (
    <Animated.View
      style={{
        opacity: opacity,
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <TouchableOpacity
        style={{
          width: width,
          height:height,
          backgroundColor: 'transparent',
        }}
        activeOpacity={1}
        onPress={onClose}
      />
    </Animated.View>
  );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
            <View style={styles.container}>
        
        <SectionList
            style={{height: height, backgroundColor: 'white', borderTopLeftRadius: 20,
            borderTopRightRadius: 20 }}
            keyExtractor={(item, index) => item + index}

            sections={[
                // homogenous rendering between sections
                {
                    title: "user",
                    data: [data]
                },
                {
                    title: "Additional Info",
                    data: [data],
                },
                {
                    title: "Menu",
                    data: menu
                },
            ]}
            renderSectionHeader={({ section }) => {
                if (section.title === "user") { return null } else {
                    return (
                        <View style={styles.headerView}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>
                    );
                }
            }}
            renderItem={({ item, section }) => {
                switch (section.title) {
                    case "user":
                        return <ChefCell item={item} />
                    case "Additional Info":
                        return <StoreInfoCell item={item} />
                    case "Menu":
                        return <MenuCell item={item} />
                    default:
                        break;
                }
            }}

            scrollEventThrottle={16}
            refreshing={false}
            ref={scrollRef}
            ItemSeparatorComponent={FlatListItemSeparator}
            stickySectionHeadersEnabled={false}
        />

{isOpen && renderBackDrop()}

        <BottomSheet
          ref={bs}
          snapPoints={["10%", "90%"]}
          initialSnap={0}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onCloseEnd={onClose}
          onOpenStart={() => setTitle({ headerTitle: "", LeftButtonTitle: "Dismiss" })}
        onCloseStart={() => setTitle({ headerTitle: "View Bag", LeftButtonTitle: "" })}
        />
      </View>
            </SafeAreaView>

</SafeAreaProvider>
      
    );
  
}

export default StoreFront



