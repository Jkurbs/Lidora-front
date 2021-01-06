import React, { useState, useRef, useEffect } from "react";
import { 
    View, SafeAreaView, Image, Text, SectionList, TouchableOpacity,
    Dimensions, TextInput, Animated
} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from "../../firebase/Firebase"
import styles from './storeFront.style'
import { SimpleLineIcons } from '@expo/vector-icons'
import BottomSheet from 'reanimated-bottom-sheet'
import ReactPlaceholder from 'react-placeholder'
import Footer from "../../components/Footer"

var db = firebase.firestore();

var unsubscribe;

const { height, width } = Dimensions.get("window")

const FlatListItemSeparator = () => {
    return (
        <View style={styles.listItemSeparatorStyle} />
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
    const[isOpen, setIsOpen] = useState(false) 
    const [opacity, setOpacity] = useState(new Animated.Value(0))
    var [scrollY, setScrollY] = useState(new Animated.Value(0))

    // Refs  
    const bs = React.createRef(null);
    const scrollRef = useRef(null)
    const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
    
    useEffect(() => {
        // Fetch Current chef menu
        let sectionListData = []
        let isCancelled = false;

        setMenu([]);

        // Fetch chefs 
        async function fetchChef() {
             await db.collection('chefs').doc(props.chefId).get().then(function (doc) {
                if (doc.exists) {
                    let userObj = {}
                    userObj["title"] = "user"
                    userObj["data"] = [doc.data()]
                    sectionListData.push(userObj)
                } else {
                    console.log("Chefs doesn't exist")
                }
            })
        }
        
        // Fetch Menus 
        async function fetchMenu() {
            await db.collection('chefs').doc(props.chefId).collection("menu").get().then(function (querySnapshot) {
                let array = []
    
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    array.push(doc.data())
                });
    
                const groups = [...new Set(array.map(item => item.group))]; 
    
                groups.forEach( item => {
                    let newObj = {}
                    newObj["title"] = item
                    newObj["data"] = array.filter(a => a.group == item)
                    sectionListData.push(newObj)
                    }
                    )

                    if (!isCancelled) {
                        setMenu(sectionListData);
                    }                
                // map and filter array here
            });
        }

        fetchChef();
        fetchMenu();
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

    // Handle confirm code button press
    async function confirmCode() {
            try {
            const credential = auth.PhoneAuthProvider.credential(
                confirm.verificationId,
                code,
            );
            let userData = await auth().currentUser.linkWithCredential(credential);
            setUser(userData.user);
            } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                console.log('Account linking error');
            }
        }
    }

    //Verify if customer is logged in
    React.useEffect(() => {
        unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // setUserLoggedIn(true)
            return
          } else {
            // No user is signed in.
            // setUserLoggedIn(false)
          }
        })

    }, [])

    const checkLoggedIn = () => {
        
    }

    const loginUser = (info) => {
        console.log(info)
        firebase
        .auth()
        .signInWithEmailAndPassword(info.email, info.password)
        .then(data => {
        //   navigation.navigate('Dashboard', { navigation: navigation, userID: data.user.uid })
        //   setIndicatorAnimating(false)
        //   setLoginText("Login")
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          // ...
        });
    }

    const regUser = (info) => {
        console.log(info)
        console.log("REGBUTENPRESS")
            firebase
            .auth()
            .createUserWithEmailAndPassword(info.email, info.password)
            .then(data => {
                console.log(data.user.uid)
                db.collection('customers').doc(data.user.uid).update({
                    phone: info.phone
                })
            })
            .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ...
            });
            verifyPhoneNumber(info.phone)

    }

    // Handle the verify phone button press
    async function verifyPhoneNumber(phoneNumber) {
        const phoneProvider = new firebase2.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber('+17207052327',recaptchaVerifier.current)
        setConfirm(verificationId);
    }


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
                <ReactPlaceholder color='red' showLoadingAnimation={false} type='rect' ready={item != null} style={{ height: 250, width: '100%' }}>
                    <Image style={styles.storeImage} source={{ uri: item.item.imageURL }} />
                </ReactPlaceholder>
                <View style={styles.storeInfoContainer}>
                    <Text style={styles.title}>{item.item.title}</Text>
                    <Text style={styles.description}>{item.item.description}</Text>
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
            <View style={styles.header}>
                <TouchableOpacity onPress={ onClose } style={{ justifyContent: 'center', position: 'absolute', left: 16 }}>
                    <Text style={{ color: '#34C759', fontSize: 17, fontWeight: '500', alignSelf: 'center' }}>{titles.LeftButtonTitle}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle} onPress={()=>onOpen()}>{titles.headerTitle}</Text>
                <View style={[styles.listItemSeparatorStyle, { position: 'absolute', bottom: 0 }]} />
            </View>
        ) 
    }

    // MARK: - BAG 

    // Cell to show Item Infos
    const ItemInfosCell = (item) => (
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

    // Cell to show Combos
    const CombosCell = (item) => (
        <View style={{ alignItems: 'center', margin: 20, flexDirection: 'row' }}>
            <Image style={styles.comboImage} source={{
                        uri: item.item.imageURL,
            }} />
           <Text style={{fontSize: 14}}>{item.item?.name ?? ""}</Text>
        </View>
    );


    // TODO 

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
    
        const groupMenus = menu.filter(group => group.title == selectedItem.group)
        const result = groupMenus[0].data.filter(a => a.name != selectedItem.name)

        return (
            <View style={styles.bagContainer}>
                <SectionList
                    style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, marginTop: 30, paddingBottom: '70%'}}
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
                        console.log("SECTION", section)
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

    
   if (data.user != null) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
        <Animated.View style={[styles.container]}>

        {/* Header */}
           <Animated.View style={[{backgroundColor: 'white', height: 45, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1'}]}>
               <View style={{ position: 'absolute', right: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={ onClose } style={{  }}>
                        <SimpleLineIcons name="options" size={18} color="black" />
                    </TouchableOpacity>
               </View>

               <View style={{ position: 'absolute', left: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
               <TouchableOpacity onPress={ onClose } style={{  }}>
                   <Image source={require('../../assets/icon/bag.png')} style={{height: 27, width: 27}}/>
                   <View style={{backgroundColor: 'rgb( 255, 59, 48)', padding: 6, height: 14, width: 14, borderRadius: 7, position: "absolute", right: 0, justifyContent: 'center', alignItems: 'center'}}>
                       <Text style={{color: '#ecf0f1', fontSize: 11, fontWeight: '700'}}>1</Text>
                    </View>
                  </TouchableOpacity>
               </View>
           
           </Animated.View>

        {/* Section List */}
        <AnimatedSectionList
            style={[{height: height, backgroundColor: 'white'}]}
            keyExtractor={(item, index) => item + index}
            sections={ menu }
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
          snapPoints={["0%", "90%"]}
          initialSnap={0}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onCloseEnd={onClose}
          onOpenStart={() => setTitle({ headerTitle: "", LeftButtonTitle: "Dismiss" })}
        onCloseStart={() => setTitle({ headerTitle: "View Bag", LeftButtonTitle: "" })}
        />
      </Animated.View>

        {/* Footer */}
        <Footer/>

        </SafeAreaView>
 </SafeAreaProvider>
      
    );
   } else {
        return null
   }
}

export default  React.memo(StoreFront)