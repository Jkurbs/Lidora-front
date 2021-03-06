import React from "react";
import styles from "./menu.styles";
import { View, ScrollView } from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import TableView from "../../components/tableView";
import HeaderBar from "../../components/headerBar";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "modal-enhanced-react-native-web";

var db = firebase.firestore();
const ref = db.collection("chefs");
const menuDetailsName = "MenuDetails";

const SearchComponent = ({ buttonAction, subtitle, search }) => (
  <HeaderBar
    title={"Menu"}
    buttonAction={() => buttonAction()}
    subtitle={subtitle}
    search={(term) => {
      search(term);
    }}
    isSearchEnabled={true}
  />
);

function Menu(props) {
  const navigation = props.navigation;
  const userID = firebase.auth().currentUser.uid;

  const [tableHead] = React.useState([
    "Image",
    "Name",
    "Price",
    "Category",
    "Actions",
  ]);
  const [tableData, setTableData] = React.useState([]);
  const [fullData, setFullData] = React.useState([]);
  const [filteredTableData, setFilteredTableData] = React.useState([]);
  const [filteredFullData, setFilteredFullData] = React.useState([]);
  const [item, setItem] = React.useState({});
  const [hasData, setHasData] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(null);

  const menuRef = ref.doc(userID).collection("menu");

  // Fetch Menu
  React.useEffect(() => {
    menuRef.onSnapshot(function (querySnapshot) {
      if (querySnapshot.empty) {
        setHasData(false);
      } else {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          const propertyValues = [
            data.imageURL,
            data.name,
            `$${data.price}`,
            data.group,
            null,
          ];
          setTableData((prevState) => [...prevState, propertyValues]);
          setFullData((prevState) => [...prevState, data]);
          setHasData(true);
        });
      }
    });
  }, []);

  // MARK: - Functions

  const deleteAction = () => {
    setVisibleModal(true);
    // if (isSearching === true) {
    //   fullData = tfilteredFullData;
    // }
    // let newItem = {
    //   ...fullData[selectedIndex],
    //   key: fullData[selectedIndex].key,
    //   image: fullData[selectedIndex].imageURL,
    // };
    // handleDetails(newItem);
    // setItem(newItem);
    // setIsAlertVisible(true);
  };

  const editAndDetailsAction = (index) => {
    navigation.navigate(menuDetailsName, { createMode: false, item: item });
  };

  const goToItemDetails = (item) => {
    navigation.navigate(menuDetailsName, { createMode: true, item: item });
  };

  // Show Iventory item details
  const handleDetails = (item) => {
    console.log("ITEM: ", item);
    setItem(item);
    goToItemDetails(item);
  };

  // Called when cell is selected
  const didSelectCell = (item, selectedIndex) => {
    if (isSearching === true) {
      fullData = filteredFullData;
    }
    item = {
      ...fullData[selectedIndex],
      image: fullData[selectedIndex].imageURL,
    };
    handleDetails(item);
  };

  // MARK: - Item actions

  const search = (searchTerm) => {
    let filteredData = tableData.filter((dataRow) =>
      dataRow[1].toLowerCase().includes(searchTerm)
    );
    let filteredReal = fullData.filter((dataRow) =>
      dataRow.name.toLowerCase().includes(searchTerm)
    );
    setIsSearching(true);
    setFilteredTableData(filteredData);
    setFilteredFullData(filteredReal);
  };

  if (tableData != []) {
    return (
      <View style={[styles.container]}>
        <ScrollView>
          <SearchComponent
            title={"Menu"}
            buttonAction={() => goToItemDetails()}
            subtitle={tableData.length}
            search={(term) => {
              search(term);
            }}
            isSearchEnabled={true}
          />
          <TableView
            tableHead={tableHead}
            tableData={isSearching ? filteredTableData : tableData}
            hasData={hasData}
            hasImage={true}
            didSelectCell={(item, selectedIndex) => {
              didSelectCell(item, selectedIndex);
            }}
            buttonAction={(index) => goToItemDetails(index)}
            deleteAction={(item) => deleteAction(item)}
            editAndDetailsAction={(index) => editAndDetailsAction(index)}
          />
          {/* <Modal
            isVisible={visibleModal}
            onBackdropPress={() => setVisibleModal(false)}
          >
            {
              <View>
                <Text>TEst</Text>
              </View>
            }
          </Modal> */}
        </ScrollView>
      </View>
    );
  }
}

export default Menu;
