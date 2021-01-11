import React, { useState, useRef, useEffect } from "react";
import { pure } from 'recompose';

import { 
    View, SafeAreaView, Image, Text, SectionList, TouchableOpacity,
    Dimensions, TextInput, Animated
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from './storeFront.style'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons'
import firebase from "../../firebase/Firebase"

import BottomSheet from 'reanimated-bottom-sheet'

import CheckoutScreen from '../checkout';
import CustomerSettingsScreen from '../CustomerSettings'
import AuthenticateScreen from '../../components/customerComponents/authenticatePage';


const Stack = createStackNavigator();

var db = firebase.firestore();

const snapPoints = ["0%", "90%"]

var unsubscribe;

const { height, width } = Dimensions.get("window")

const FlatListItemSeparator = () => {
    return (
        <View style={styles.listItemSeparatorStyle} />
    )
}

const NavBar = (props) => {
    const itemsCount = props.items.length
    if (props.user.uid != props.chef.id) {
        return (
            <View style={[{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}]}>
                { 
                props.userLoggedIn ?
                <View style={{ width: '100%', height: '100%', alignItems: 'center' , flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ position: 'absolute', right: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} }>
                            <SimpleLineIcons name="options" size={18} color="black" />
                        </TouchableOpacity> 
                    </View>
    
                    <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate("Checkout")}}>
                            <Image source={require('../../assets/icon/bag.png')} style={{height: 27, width: 27}}/>
                            {
                                props.items.length === 0 ? 
                                    null
                                :
                                    <View style={{backgroundColor: 'rgb( 255, 59, 48)', padding: 6, height: 14, width: 14, borderRadius: 7, position: "absolute", right: 0, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: '#ecf0f1', fontSize: 11, fontWeight: '700'}}>{itemsCount}</Text>
                                    </View>
                            }
                        </TouchableOpacity>
                    </View>
                </View>   
                : 
                <TouchableOpacity onPress={()=> {props.navigation.navigate("Authenticate")} } style={{ alignSelf: 'flex-end', margin: 8  }}>
                    <Text onPress={() => {
                            props.navigation.navigate('Authenticate');
                        }}
                    style={{fontWeight: '500'}}>Login
                    </Text>
                </TouchableOpacity>
                }
            </View>
        )
    } else if (props.user.uid === props.chef.id) {
        return (
            <TouchableOpacity onPress={()=> {props.navigation.navigate("Settings")} } style={{ alignSelf: 'flex-end', margin: 8  }}>
                <Text onPress={() => {
                            navigation.navigate('Authenticate');
                        }}
                    style={{fontWeight: '500'}}>Dashboard
                </Text>
            </TouchableOpacity>
        )
    } else {
        return (<View/>)
    }
}

function StoreFront(props) {

    const storeName = props.storeName
    const navigation = props.navigation

    // States 
    const [data, setData] = useState([])
    const [chef, setChef] = useState({})
    const [user, setUser] = useState({})

    const [selectedItem, setSelectedItem] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(0)
    const [note, setNote] = useState("")
    const[isOpen, setIsOpen] = useState(false) 
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    var [scrollY, setScrollY] = useState(new Animated.Value(0))

    const [chefLoggedIn,setChefLoggedIn] = useState(null)
    const [userLoggedIn,setUserLoggedIn] = useState(null)
    const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

    // References   
    const bs = React.createRef(null);
    const scrollRef = useRef(null)

    //Verify if customer is logged in
    React.useEffect(() => {
        unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user)
                setUserLoggedIn(true)
                return
            } else {
            // No user is signed in.
                setUserLoggedIn(false)
            }
        })
    }, [])

    useEffect(() => {

        let sectionListData = []
        let isCancelled = false;

        // Fetch Current chef menu

        // Fetch chefs 
        async function fetchData() {
             await db.collection('chefs').where("storeName", "==", storeName).get().then(function (querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if (doc.exists) {
                        const chef = doc.data()
                        setChef(chef)
                        let userObj = {}
                        userObj["title"] = "user"
                        userObj["data"] = [chef]
                        sectionListData.push(userObj)

                        // Fetch menu
                        const groupsRef =  db.collection('chefs').doc(chef.id).collection("settings").doc("menu")
                        groupsRef.get().then(function (doc) {
                            if (doc.exists) {
                                const menuOptions = doc.data().groups ?? []
                                db.collection('chefs').doc(chef.id).collection("menu").where("isVisible",  "==", true).get().then(function (querySnapshot) {
                                    let array = []
                        
                                    querySnapshot.forEach(function(doc) {
                                        array.push(doc.data())
                                    });
                                    
                                    menuOptions.forEach(item => {
                                        let newObj = {}
                                        newObj["title"] = item
                                        newObj["data"] = array.filter(a => a.group == item)
                                        sectionListData.push(newObj)
                                    })
                    
                                    if (!isCancelled) {
                                        setData(sectionListData);
                                    }                
                                });
                            }
                        })
                    } else {
                        console.log("Chefs doesn't exist")
                    }
                });
            })
        }
        fetchData();
        return () => {
            isCancelled = true;
          };
    }, [])


    // Open Bottom Sheet
    const onOpen = (item) => {
        setTimeout(() => {
            
        }, 50);
        setScrollY(new Animated.Value(0))
        setIsOpen(true)
        setQuantity(1)
        setTotal(item?.item?.price ?? 0.0)
        setSelectedItem(item?.item ?? null)
        bs.current.snapTo(1);
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };

    // Close Bottom Sheet
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

    // Show background when bottom sheet is open
    const renderBackDrop = () => (
        <Animated.View
          style={[styles.backdrop, {opacity: opacity,
          }]}>
          <TouchableOpacity
            style={{ width: width, height: height,  backgroundColor: 'transparent',}}
            activeOpacity={1}
            onPress={onClose}/>
        </Animated.View>
    );

    // Calculate total amount 
    const calculateTotal = (add) => {
        if (add) {
            setQuantity(quantity + 1)
            const result =  +(total + selectedItem.price).toFixed(2)
            setTotal(result)
        } else {
            if (quantity < 2) {
                return 
            } else {
                setQuantity(quantity - 1)
                const result =  +(total - selectedItem.price).toFixed(2)
                setTotal(result)
            }
        }
    }

    // Cell to show the chef
    const ChefCell = (item) => {
        return (
            <View style={{justifyContent: 'center', alignItems: "center", padding: 20}}>
                <Image style={styles.storeImage} source={{ uri: item.item.imageURL }} />
                <View style={styles.storeInfoContainer}>
                    <Text style={styles.title}>{item.item.title}</Text>
                    <Text style={styles.description}>{item.item.storeDescription}</Text>
                </View>
                <View style={styles.listItemSeparatorStyle} />
                <View style={{ margin: 20, marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.info}>{item.item.city}, {item.item.state}</Text>
                    <Text style={styles.info}>{item.item.email_address}</Text>
                </View>
                <View style={styles.listItemSeparatorStyle} />
            </View>
        )
    }

    // Cell to show the chef infos
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

    // Cell to show the  menu
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


    // SectionList header 
    const renderHeader = () => {
        return (
            <View style={styles.sectionListHeader}>
                <TouchableOpacity onPress={()=> onClose() } style={styles.sectionListHeaderButton}>
                    <Text style={styles.sectionListHeaderText}>Dismiss</Text>
                </TouchableOpacity>
                <View style={styles.sectionListHeaderSeparator} />
            </View>
        ) 
    }

    // MARK: - BAG 

    // Cell to show Item Infos
    const ItemInfosCell = (item) => (
        <View style={styles.itemDescriptionContainer}>
            <View style={ styles.itemDescriptionContentContainer}>
                <Text style={styles.menuName}>{item.item?.name ?? ""}</Text>
                <Text style={styles.menuDescription}>{item.item?.description ?? ""}</Text>
                <Text style={styles.menuPrice}>${item.item?.price ?? ""}</Text>
            </View>
            <Image style={styles.menuImage} source={{
                uri: item.item?.imageURL ?? "",
            }} />
        </View>
    );


    // Cell to show Combos
    const CombosCell = (item) => (
        <View style={styles.groupContainer}>
            <Image style={styles.comboImage} source={{
                uri: item.item.imageURL,
            }} />
           <Text style={{fontSize: 14}}>{item.item?.name ?? ""}</Text>
        </View>
    );


    // MARK: - TODO 
    const RenderIngredientsItem = (item) => (
        <View>

        </View>
    );


    // Cell to add instruction to bag
    const InstructionsCell = () => (
        <View style={{ flex: 1, marginBottom: 50}}>
            <TextInput
                style={{ height: 60, padding: 20 }}
                placeholder={"Add a note (Extra sauce, no salt, etc.)"}
                onChangeText={(text) => setNote(text)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity pointerEvents={() => { quantity < 2 ? 'none' : "auto" }} onPress={() => { calculateTotal(false) }} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'black', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', color: '#F6F8FA' }}>-</Text>
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', margin: 8 }}>{quantity}</Text>
                <TouchableOpacity onPress={() => calculateTotal(true)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'black', justifyContent: 'center'}}>
                    <Text style={{ alignSelf: 'center', color: '#F6F8FA', fontWeight: '500' }}>+</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ justifyContent: 'center', marginTop: 16, borderRadius: 5, height: 60, width: '90%', alignSelf: 'center', backgroundColor: 'black'}}> 
            <View style={{alignSelf: 'center'}}>
                <Text style={{color: '#F6F8FA', alignSelf: 'center', fontWeight: '500', fontSize: 15}}>Add to bag</Text>
                <Text style={{alignSelf: 'flex-end', color: '#F6F8FA'}}>${total}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )

    // Render Item when selected

    const renderContent = () => {
        if (selectedItem === null) {
            return
        }
        const groupMenus = data.filter(group => group.title == selectedItem.group)
        const result = groupMenus[0].data.filter(a => a.name != selectedItem.name)

        return (
            <View style={styles.bagContainer}>
                <SectionList
                    style={styles.bagSectionList}
                    keyExtractor={(item, index) => item + index}
                    sections={[
                        { title: "Infos", data: [selectedItem] },
                        { title: "Comes with", data: result },
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
                                return <ItemInfosCell item={item} />
                            case "Comes with":
                                return <CombosCell item={item} />
                            case "Ingredients":
                                return <RenderIngredientsItem item={item} />
                            case "Special Instructions":
                                return <InstructionsCell />
                            default:
                                break
                        }
                    }}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    stickySectionHeadersEnabled={false}
                />
                <View style={styles.listItemSeparatorStyle} />
            </View>
        )
        
    }

    // renderContent.whyDidYouRender = true

    return (   
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
        <Animated.View style={[styles.container]}>

        {/* Header */}
           <NavBar items={[]} user={user} chef={chef} navigation={navigation} chefLoggedIn={chefLoggedIn} userLoggedIn={userLoggedIn}/>

        {/* Section List */}
        <AnimatedSectionList
            style={[{height: height, backgroundColor: 'white'}]}
            keyExtractor={(item, index) => item + index}
            sections={ data }
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
                    default:
                        return <MenuCell item={item} />
                }
            }}

            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset:  { y: scrollY }}}],
              )}
            scrollEventThrottle={16}
            refreshing={false}
            ref={scrollRef}
            stickySectionHeadersEnabled={false}
        />

        {isOpen && renderBackDrop()}

        <BottomSheet
          ref={bs}
          snapPoints={snapPoints}
          initialSnap={0}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onCloseEnd={onClose}
        />
      </Animated.View>
    </SafeAreaView>
</SafeAreaProvider>
      
    );
}

function App(props) {
    
    const storeName = props.storeName.toLowerCase()
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Store" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Store">
                {props => <StoreFront {...props} storeName={storeName} screenOptions={{ headerShown: false, headerMode: "none", headerTransparent: true}} />}
            </Stack.Screen>
                <Stack.Screen name="Checkout" component={CheckoutScreen}/>
                <Stack.Screen name="Settings" component={CustomerSettingsScreen}/>
                <Stack.Screen name="Authenticate" component={AuthenticateScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default pure(App)