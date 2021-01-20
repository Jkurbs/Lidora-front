


// function Menu(props) {

//     // constants 
  
//     const childRef = React.createRef(MenuRightSideBar);
  
//     const userID = props.route.params.userData.user.userID
//     const animVal = new Animated.Value(0);
  
//     const animatedTransitionShrink = Animated.spring(animVal, { toValue: 1 })
//     const animatedTransitionGrow = Animated.spring(animVal, { toValue: 0 })
  
//     const [tableHead] = React.useState(['Image', 'Name', 'Price', 'Group', 'Actions'])
//     const [tableData, setTableData] = React.useState([])
//     const [fullData, setFullData] = React.useState([])
//     const [filteredTableData, setFilteredTableData] = React.useState([])
//     const [filteredFullData, setFilteredFullData] = React.useState([])
  
//     const [inventories, setInventories] = React.useState([])
//     const [item, setItem] = React.useState({})
//     const [value, setValue] = React.useState("")
//     const [hasData, setHasData] = React.useState(null)
//     const [isSearching, setIsSearching] = React.useState(false)
//     const [isAlertVisible, setIsAlertVisible] = React.useState(false)
//     const [isInvModalActive, setIsInvModalActive] = React.useState(false)
//     const [interpolateBar, setInterpolateBar] =  React.useState(animVal.interpolate({ inputRange: [0, 1], outputRange: [getWidth, getWidth - 397] }))
  
//     const [windowWidth, setWindowWidth] = React.useState("")
//     const [mode, setMode] = React.useState(MODE.Add)
  
//     const menuRef = ref.doc(userID).collection("menu")
  
//     // Handle width animation
//     const handleWidth = () => {
//       let { isActive, translateX } = this.state;
//       Animated.spring(translateX, {
//         toValue: isActive ? -420 : 0,
//         duration: 20
//       }).start(finished => {
  
//         this.setState((prevState, props) => ({
//           isActive: !prevState.isActive,
//         }));
//       });
//     };
  
//     // Fetch Menu
//     React.useEffect(() => {
//         menuRef.onSnapshot(function (querySnapshot) {
//           // setTableData([])
//           if (querySnapshot.empty) {
//             setHasData(false)
//           } else {
//             querySnapshot.forEach(function (doc) {
//               const data = doc.data()
//               const propertyValues = [data.imageURL, data.name, data.price, data.group, '']
//               setTableData(prevState => [...prevState, propertyValues])
//               setFullData(prevState => [...prevState, data])
//               setHasData(true)
//             });
//           }
//         });
//     }, [])
  
//     // Fetch Inventories
  
//     React.useEffect(() => {
//       ref.doc(userID).collection("inventory").onSnapshot(function (querySnapshot) {
//         let ingredientArray = []
//         querySnapshot.forEach(function (doc) {
//           ingredientArray.push({
//             id: doc.data().key,
//             name: doc.data().name,
//             unit: doc.data().unit,
//           })
//         });
//         setInventories(ingredientArray)
//       });
//     }, [])
  
//     React.useEffect(() => {
//         let getWidth = ''
//           window.addEventListener('resize', function () {
//             getWidth = Dimensions.get('window').width - 200;
//             setInterpolateBar(animVal.interpolate({ inputRange: [0, 1], outputRange: [getWidth, getWidth - 397] }))
//           })
//     }, [])
  
  
//     // MARK: - Functions 
  
//     // Show Iventory item details 
//     const handleDetails = (item) => {
//       setItem(item)
//       setMode(MODE.Details)
//     };
  
//     // Add new menu item
//     const addMenuItem = (item) => {
//       setFullData(prevState => [...prevState, item])
//       setItem(item) 
  
//       // Add menu item to Firebase 
//       menuRef.add(
//         {
//           key: item.key,
//           name: item.name,
//           description: item.description,
//           price: item.price,
//           ingredients: item.ingredients,
//           isVisible: item.isVisible, 
//           group: item.group
//         }
//       )
//       //check and Add Image to Firebase Storage
//       if (item.image != null) {
//         var storage = firebase.storage().ref(item.image.name)
//         storage.put(item.image.file).then((snapshot) => {
//           snapshot.ref.getDownloadURL().then(function (downloadURL) {
  
//             menuRef.where('key', '==', item.key).get().then(function (snapshot) {
//               snapshot.forEach(function (doc) {
//                 menuRef.doc(doc.id).update(
//                   {
//                     imageURL: downloadURL
//                   }
//                 )
//               })
//             })
//           });
//         })
//       }
//       setMode(MODE.Details)
//     };
  
  
//     // Update menu Item 
//     const updateMenuItem = (item) => {
//       const newData = fullData.filter(prevItem => prevItem === item );
//       setFullData(newData)
  
//       // Update menu item in Firebase 
//       menuRef.where('key', '==', item.key).get().then(function (snapshot) {
//         snapshot.forEach(function (doc) {
//           ref.doc(userID).collection("menu").doc(doc.id).update(
//             {
//               key: item.key,
//               name: item.name,
//               description: item.description,
//               price: item.price,
//               ingredients: item.ingredients,
//               isVisible: item.isVisible
//             }
//           )
//         })
//       })
//       if (item.image !== null) {
//         var storage = firebase.storage().ref(item.image.name)
//         storage.put(item.image.file).then((snapshot) => {
//           snapshot.ref.getDownloadURL().then(function (downloadURL) {
//             menuRef.where('key', '==', item.key).get().then(function (snapshot) {
//               snapshot.forEach(function (doc) {
//                 menuRef.doc(doc.id).update(
//                   {
//                     imageURL: downloadURL
//                   }
//                 )
//               })
//             })
//           });
//         })
//       }
//       setMode(MODE.Details)
//     };
  
  
//     // Delete menu Item 
//     const deleteMenuItem = () => {
  
//       menuRef.where('key', '==', item.key).get().then(function (snapshot) {
//         snapshot.forEach(function (doc) {
//           menuRef.doc(doc.id).delete()
//         })
//       })
  
//       if (item.image != null) {
//         var storage = firebase.storage().ref(item.image.name)
//         storage.delete(item.image.name)
//       }
  
//       const itemF = [item.image, item.name, item.price, '']
//       const filteredData = filteredTableData.filter(otherItem => otherItem[1] !== itemF[1]);
//       setFilteredTableData(filteredData)    
//       setIsAlertVisible(false)
//       if (isInvModalActive === false) { showRightModal() }  
//     };
  
  
//   // Called when cell is selected 
//   const didSelectCell = (item, selectedIndex) => {
//     setMode(MODE.Details)
//     if (isSearching === true) { fullData = filteredFullData }
//     item = {
//       ...fullData[selectedIndex],
//       image: fullData[selectedIndex].imageURL
//     }
//     handleDetails(item)
//     if (isInvModalActive === false) {
//       showRightModal()
//     }
//   }
  
//   // MARK: - Item actions 
  
//   const leftActionSelected = (selectedIndex) => {
  
//     if (isSearching === true) { fullData = filteredFullData }
  
//     let item = {
//       ...fullData[selectedIndex],
//       image: fullData[selectedIndex].imageURL,
//     }
//     if (isInvModalActive === false) { showRightModal() }
//     setItem(item)
//     setMode(MODE.Edit)
//   }
  
//   const middleActionSelected = (item, selectedIndex) => {
//     // IF SEARCH IS ON GET DATA FROM FILTERED
//     if (isSearching === true) { fullData = tfilteredFullData }
//     let newItem = {
//       ...fullData[selectedIndex],
//       key: fullData[selectedIndex].key,
//       image: fullData[selectedIndex].imageURL
//     }
//     handleDetails(newItem)
//     setItem(newItem)
//     setIsAlertVisible(true)
//   }
  
//   const rightActionSelected = (selectedIndex) => {
//     setMode(MODE.Details)
//     if (isInvModalActive === false) { showRightModal() }
//   }
  
//   const showRightModal = () => {
//     if (isInvModalActive === true) {
//       console.log("REF:", childRef.current)
//       setIsInvModalActive(false)
//       //childRef.current.handleSlide(true)
//       animatedTransitionGrow.start();
//     } else {
//       setIsInvModalActive(true)
//       childRef.current.handleSlide(false)
//       animatedTransitionShrink.start();
//     }
//   }
  
//   const search = (searchTerm) => {
//       let filteredData = tableData.filter(dataRow => dataRow[1].toLowerCase().includes(searchTerm));
//       let filteredReal = fullData.filter(dataRow => dataRow.name.toLowerCase().includes(searchTerm));
//       setIsSearching(true)
//       setFilteredTableData(filteredData)
//       setFilteredFullData(filteredReal)
//     }
  
  
  
  
//     if (tableData != []) {
  
//       console.log(interpolateBar)
//       return (
//         <View style={styles.container}>
//           <HeaderBar
//             title={`Menu for ${props.route.params.group}`}
//             subtitle={tableData.length}
//             search={(term)=> {search(term)}}
//             isSearchEnabled={true}
//             showCalendar={()=> {showCalendarModal()}}
//             showInv={()=> {showRightModal()}}
//             handleMode={()=> {setMode(MODE.Add)}}
//             isModalActive={isInvModalActive}
//           />
    
//         <ScrollView>
//           <Animated.View style={{ width: interpolateBar }}>
//             <TableView
//               tableHead={tableHead}
//               tableData={isSearching ? filteredTableData : tableData}
//               hasData={hasData}
//               hasImage={true}
//               didSelectCell={(item, selectedIndex)=> {didSelectCell(item, selectedIndex)}}
//               leftImage={require('../../assets/icon/edit.png')}
//               middleImage={require('../../assets/icon/remove-100.png')}
//               rightImage={require('../../assets/icon/info-100.png')}
//               leftAction={()=> {leftActionSelected()}}
//               middleAction={()=>  {middleActionSelected()}}
//               rightAction={()=> {rightActionSelected()}}
//               action={()=> {showRightModal()}}
//             />
//           </Animated.View>
//         </ScrollView>
//         <MenuRightSideBar
//             inventories={inventories}
//             isActive={isInvModalActive}
//             showInv={()=> {showRightModal()}}
//             mode={mode}
//             ref={childRef}
//             handleMode={()=> {handleMode()}}
//             item={item}
//             addMenuItem={()=> {addMenuItem()}}
//             updateMenuItem={()=>{updateMenuItem()}}
//             group={props.route.params.group}
//           />
  
//           {/* <Alert
//             cancelAction={this.cancelAlert.bind(this)}
//             deleteAction={this.deleteMenuItem.bind(this)}
//             isVisible={this.state.isAlertVisible}
//             buttonTitle1={"Delete from inventory"} /> */}
//         </View>
//       )
//     }
//   }

// export default Menu;