import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import { useTheme } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
import { Ionicons } from "@expo/vector-icons";
import Modal from "modal-react-native-web";

const { width: windowWidth } = Dimensions.get("screen");

var db = firebase.firestore();
const ref = db.collection("chefs");
const itemDimension = windowWidth / 3;

const activeProducts = [
  {
    name: "Storefront",
    description: "A portal for your customers.",
    options: ["Design your store", "Turn it off"],
  },
  {},
];

const moreProducts = [
  {
    name: "Delivery",
    description: "Delivery service for your food.",
    image: require("../../assets/icon/delivery-64.png"),
  },
  {
    name: "Packaging",
    description: "Packaging for delivery.",
    image: require("../../assets/icon/packaging-64.png"),
  },
];

function ProductSettings(props) {
  const navigation = props.navigation;

  const [visibleModal, setVisibleModal] = useState(null);
  const { colors } = useTheme();

  const optionAction = (option) => {
    alert(option);
  };

  const addProductAction = (productName) => {
    switch (productName) {
      case "Delivery":
        setVisibleModal(true);
      // navigation.navigate("Delivery Application");
    }
  };

  return (
    <View style={styles.container}>
      {/* Action Products */}

      <View>
        <Text style={[styles.title]}>Product Settings</Text>
        <Text style={{ color: colors.textSecondary }}>
          Manage Lidora products for your Store.
        </Text>
        <FlatGrid
          style={styles.flatGrid}
          itemDimension={itemDimension}
          data={activeProducts}
          spacing={0}
          renderItem={({ item, index }) => (
            <View
              style={{
                paddingTop: 8,
                borderTopColor: colors.borderPrimary,
                borderRightColor:
                  index % 2 == 0 ? colors.borderPrimary : "transparant",
                borderRightWidth: index % 2 == 0 ? 1 : 0,
                borderTopWidth: 1,
                height: 150,
              }}
            >
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={{ color: colors.textSecondary }}>
                {item.description}
              </Text>
              {item?.options?.map((option) => (
                <TouchableOpacity
                  onPress={() => optionAction(option)}
                  style={{ marginTop: 8 }}
                >
                  <Text
                    style={{ color: colors.btnPrimaryBg, fontWeight: "600" }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      {/* Explore products */}

      <View style={styles.exploreProductsContainer}>
        <Text style={[styles.title]}>Explore more Products</Text>
        <Text style={{ color: colors.textSecondary }}>
          Add Lidora products to your Store.
        </Text>
        <FlatGrid
          itemDimension={itemDimension}
          data={moreProducts}
          spacing={8}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View
                style={[
                  styles.itemInnerContainer,
                  {
                    borderColor: colors.borderPrimary,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Image style={styles.productImage} source={item.image} />
                      <Text style={styles.productName}>{item.name}</Text>
                    </View>
                    <Text
                      style={[
                        styles.productDescription,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => addProductAction(item.name)}
                    style={[
                      styles.addProductButton,
                      { borderColor: colors.borderPrimary },
                    ]}
                  >
                    <Ionicons
                      name="ios-add"
                      size={24}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visibleModal}
        backdrop={true}
        onDismiss={() => {
          //alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            height: "100%",
            // backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 22,
              width: 500,
              height: 200,
              borderRadius: 5,
              opacity: 1.0,
              backgroundColor: "red",
              alignSelf: "center",
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Get your food delivered.
            </Text>
            <Text>
              Delivery people using the Lidora platform pick up the order from
              you, then deliver it to the customer.
            </Text>
            <TouchableHighlight
              onPress={() => {
                setVisibleModal(!visibleModal);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100",
    padding: 20,
    backgroundColor: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {},

  flatGrid: {
    marginTop: 24,
  },

  exploreProductsContainer: {
    marginTop: 48,
  },

  itemContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  itemInnerContainer: {
    padding: 16,
    marginTop: 8,
    width: "100%",
    height: 90,
    borderWidth: 1,
    borderRadius: 5,
  },

  productName: {
    fontSize: 17,
    fontWeight: "600",
  },

  productImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  productDescription: {
    marginTop: 8,
  },

  addProductButton: {
    borderWidth: 2,
    borderRadius: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductSettings;
