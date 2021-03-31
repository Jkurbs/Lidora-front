import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import globalStyle from "../../globalStyle";
import { useTheme } from "@react-navigation/native";
import DashboardNavBar from "../../components/dashboardNavBar";
import Input from "../../components/inputs/input";
import { TextInputMask } from "react-native-masked-text";
import { Picker } from "@react-native-picker/picker";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

var db = firebase.firestore();
const ref = db.collection("chefs");

function MenuDetails(props) {
  const userID = firebase.auth().currentUser.uid;
  const { colors } = useTheme();

  const navigation = props.navigation;
  const params = props.route.params;
  const item = params.item;
  const [price, setPrice] = useState("");
  const [newItem] = useState({ name: "", description: "", price: 0 });
  const categories = [""];
  const [newCategory, setNewCategory] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const [indicatorAnimating, setIndicatorAnimating] = useState(false);

  var PickerItem = Picker.Item;
  const saveNewCategory = () => {};

  const saveAndAddMoreTapped = () => {
    navigation.goBack();
  };

  const saveButtonTapped = () => {
    if (params.mode == "add") {
      console.log("Add item");
      add();
    } else {
      console.log("Edit item");
      //setIndicatorAnimating(true);
      // Edit Menu item
      //navigation.goBack();
    }
  };

  const add = () => {
    ref.doc(userID).collection("menu").add({
      name: newItem.name,
      description: newItem.description,
      price: price,
      category: category,
      isVisible: true,
    });
    //check and Add Image to Firebase Storage
    // if (item.image != null) {
    //   var storage = firebase.storage().ref(item.image.name);
    //   let currentComponent = this;
    //   storage.put(item.image.file).then((snapshot) => {
    //     snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //       ref
    //         .doc(currentComponent.state.userID)
    //         .collection("menu")
    //         .where("key", "==", item.key)
    //         .get()
    //         .then(function (snapshot) {
    //           snapshot.forEach(function (doc) {
    //             ref
    //               .doc(currentComponent.state.userID)
    //               .collection("menu")
    //               .doc(doc.id)
    //               .update({
    //                 imageURL: downloadURL,
    //               });
    //           });
    //         });
    //     });
    //   });
    // }
  };

  function title() {
    switch (params.mode) {
      case "add":
        return "Add menu item";
      case "edit":
        return "Edit menu item";
      case "details":
        return item?.name ?? "";
      default:
    }
  }

  return (
    <View style={globalStyle.backgroundPrimary}>
      <DashboardNavBar
        navigation={navigation}
        title={title()}
        hasOptions={true}
        hasComplimentary={true}
        mainButtonTapped={() => saveButtonTapped()}
        complemantaryButtonTapped={() => saveAndAddMoreTapped()}
        mainButtonTitle={"Save Item"}
        indicatorAnimating={indicatorAnimating}
      />
      <View style={styles.container}>
        <View>
          <Text style={[globalStyle.textPrimary, styles.header]}>
            Item Information
          </Text>

          <View style={styles.imageContainer}>
            <View>
              <Input
                placeholder={"Name"}
                defaultValue={item?.name ?? ""}
                onChangeText={(text) => (newItem.name = text)}
              />
              <Input
                placeholder={"Description"}
                defaultValue={item?.description ?? ""}
                onChangeText={(text) => (newItem.description = text)}
              />
            </View>
            <View
              style={{
                marginLeft: 30,
                flexDirection: "column",
                justifyContent: "center",
                width: 150,
                height: 150,
                alignSelf: "center",
              }}
            >
              <Text
                style={[styles.inputTitle, { color: colors.textSecondary }]}
              >
                Image
              </Text>
              <Image
                style={[
                  styles.image,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: colors.borderPrimary,
                  },
                ]}
                source={{
                  uri: item?.imageURL ?? "",
                  cache: "only-if-cached",
                }}
              />
              <TouchableOpacity
                style={[
                  styles.image,
                  {
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    top: 28,
                    opacity: 0.9,
                    backgroundColor: colors.bgSecondary,
                    borderColor: colors.borderPrimary,
                  },
                ]}
                onPress={() => setAddCategory(true)}
              >
                <Text
                  style={[styles.uploadText, { color: colors.btnPrimaryBg }]}
                >
                  Upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.inputTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {"Price"}
              </Text>
            </View>

            <TextInputMask
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: colors.borderPrimary,
                },
              ]}
              options={{
                precision: 2,
                separator: ".",
                delimiter: ".",
                unit: "$",
                suffixUnit: "",
              }}
              type={"money"}
              placeholder={"Price"}
              value={price}
              defaultValue={`$${item?.price ?? 0.0}`}
              onChangeText={(text) => {
                newItem.price = text;
              }}
            />
          </View>

          <View>
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.inputTitle,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {"Choose category"}
              </Text>
            </View>

            {/* Here */}
            <View style={styles.addCategoryContainer}>
              <Picker
                style={[styles.input]}
                dropdownIconColor={colors.textTertiary}
                onValueChange={(itemValue, itemIndex) =>
                  setNewCategory(itemValue)
                }
              >
                {categories.map((s, i) => {
                  return <Picker.Item key={i} value={s} label={s} />;
                })}
              </Picker>
              <TouchableOpacity
                onPress={() => setAddCategory(true)}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: colors.borderPrimary,
                  },
                ]}
              >
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                  {"Add new category"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {addCategory ? (
            <View style={styles.addCategoryContainer}>
              <Input
                placeholder={"Add new category"}
                onChangeText={(text) => setNewCategory(text)}
              />
              <TouchableOpacity
                onPress={() => {
                  setAddCategory(false);
                  saveNewCategory();
                }}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: colors.borderPrimary,
                  },
                ]}
              >
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                  {"Save"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default MenuDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
  },

  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    marginTop: 8,
    width: "80%",
    height: "80%",
    borderWidth: 1,
    borderRadius: 5,
  },
  uploadText: {
    textAlign: "center",
    fontWeight: "600",
  },

  addCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    position: "absolute",
    width: 140,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: 0,
    right: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },

  inputTitle: {
    fontWeight: "490",
    marginTop: 16,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    marginTop: 8,
    padding: 8,
    padding: 8,
    fontSize: 14,
    borderColor: "#d6d6d6",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    width: 350,
  },

  inputTitle: {
    fontWeight: "490",
    marginTop: 16,
  },
});
