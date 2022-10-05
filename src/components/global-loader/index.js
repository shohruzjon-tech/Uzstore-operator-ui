import React from "react";
import { View  } from "react-native";
import LottieView from 'lottie-react-native';

const GlobalLoader = ()=> (
                <View
              style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
             }}
             >
          <LottieView source={require('./loader.json')} autoPlay loop />
         </View>)
 export default GlobalLoader;