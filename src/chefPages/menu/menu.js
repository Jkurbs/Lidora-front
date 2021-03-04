import React from "react";
import styles from "./menu.styles";
import { View, ScrollView } from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import TableView from "../../components/tableView";
import HeaderBar from "../../components/headerBar";
import Tooltip from "@material-ui/core/Tooltip";

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
  const [isInvModalActive, setIsInvModalActive] = React.useState(false);

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
            data.price,
            data.group,
            "",
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
    alert("Delete item");
  };

  const editAndDetailsAction = () => {
    navigation.navigate(menuDetailsName);
  };

  const goToItemDetails = (index) => {
    navigation.navigate(menuDetailsName, { createMode: true });
  };

  // Show Iventory item details
  const handleDetails = (item) => {
    setItem(item);
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
    if (isInvModalActive === false) {
      showRightModal();
    }
  };

  // MARK: - Item actions

  // const search = (searchTerm) => {
  //   alert(searchTerm);

  //   let filteredData = tableData.filter((dataRow) =>
  //     dataRow[1].toLowerCase().includes(searchTerm)
  //   );
  //   let filteredReal = fullData.filter((dataRow) =>
  //     dataRow.name.toLowerCase().includes(searchTerm)
  //   );
  //   setIsSearching(true);
  //   // setFilteredTableData(filteredData);
  //   // setFilteredFullData(filteredReal);
  // };

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
            buttonAction={() => buttonAction()}
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
            deleteAction={() => deleteAction()}
            editAndDetailsAction={() => editAndDetailsAction()}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Menu;
