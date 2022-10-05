import React from "react";
import LottieView from "lottie-react-native";

const GlobalLoader = () => (
  <LottieView
    source={require("./anima.json")}
    autoPlay
    loop
    style={{
      width: "100%",
      marginTop: 100,
    }}
  />
);

export default GlobalLoader;
