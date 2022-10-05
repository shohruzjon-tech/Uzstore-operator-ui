import React from "react";
import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

const EmptyPage = () => (
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <LottieView
      source={require("./10000-empty-box.json")}
      autoPlay
      loop
      style={{
        width: "100%",
        marginTop: 100,
      }}
    />
    <Text
      style={{
        fontSize: 17,
        marginTop: 30,
        color: "#666666",
      }}
    >
      Malumot topilmadi!
    </Text>
  </View>
);

export default EmptyPage;
