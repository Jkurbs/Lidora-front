import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  PixelRatio,
  StyleSheet,
} from "react-native";

import "firebase/firestore";
import "firebase/auth";
import { useTheme } from "@react-navigation/native";

function getPixelRatio() {
  return PixelRatio.get() <= 2;
}

function PhoneGraphic() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        margin: 40,
        marginTop: 60,
        alignSelf: "center",
        width: getPixelRatio() ? 264 : 200,
        height: getPixelRatio() ? 533 : 404,
        padding: 8,
        borderRadius: getPixelRatio() ? 20 : 10,
        backgroundColor: "#f6f9fc",
        boxShadow:
          "0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          padding: 20,
          paddingTop: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderRadius: 30,
            width: getPixelRatio() ? 60 : 20,
            height: getPixelRatio() ? 60 : 20,
            alignSelf: "center",
            backgroundColor: "#F6F8FA",
          }}
        />
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#C9D1D9",
          }}
        />
        <View
          style={{
            marginTop: 8,
            backgroundColor: "#C9D1D9",
            width: "60%",
            height: 10,
            borderRadius: 5,
          }}
        />
        {/* Description */}
        <View
          style={{
            marginTop: 8,
            backgroundColor: "#C9D1D9",
            width: "90%",
            height: 10,
            borderRadius: 5,
          }}
        />

        <View
          style={{
            marginTop: 4,
            backgroundColor: "#C9D1D9",
            width: "90%",
            height: 10,
            borderRadius: 5,
          }}
        />

        {/* Items */}

        <View
          style={{
            marginTop: 10,
            width: "90%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: "#C9D1D9",
            }}
          />

          <View
            style={{
              flexDirection: "column",
              width: "50%",
              height: 40,
            }}
          >
            <View
              style={{
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />

            <View
              style={{
                marginTop: 4,
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />
          </View>
        </View>

        {/* Items */}

        <View
          style={{
            marginTop: 10,
            width: "90%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: "#C9D1D9",
            }}
          />

          <View
            style={{
              flexDirection: "column",
              width: "50%",
              height: 40,
            }}
          >
            <View
              style={{
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />

            <View
              style={{
                marginTop: 4,
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />
          </View>
        </View>

        {/* Items */}

        <View
          style={{
            marginTop: 10,
            width: "90%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: "#C9D1D9",
            }}
          />

          <View
            style={{
              flexDirection: "column",
              width: "50%",
              height: 40,
            }}
          >
            <View
              style={{
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />

            <View
              style={{
                marginTop: 4,
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />
          </View>
        </View>

        {/* Items */}

        <View
          style={{
            marginTop: 10,
            width: "90%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 5,
              backgroundColor: "#C9D1D9",
            }}
          />

          <View
            style={{
              flexDirection: "column",
              width: "50%",
              height: 40,
            }}
          >
            <View
              style={{
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />

            <View
              style={{
                marginTop: 4,
                marginLeft: 4,
                backgroundColor: "#C9D1D9",
                width: "90%",
                height: 10,
                borderRadius: 5,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.btnPrimaryBg,
              borderColor: colors.btnPrimaryBorder,
            },
          ]}
          onPress={() => props.action()}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

export default PhoneGraphic;

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
    borderRadius: 5,
    width: "90%",
    height: 25,
    marginLeft: 8,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    alignSelf: "center",
    fontSize: 12,
  },
});
