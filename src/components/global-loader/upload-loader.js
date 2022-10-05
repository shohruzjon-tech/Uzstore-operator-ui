import React from "react";
import { View, Modal } from "react-native";
import LottieView from 'lottie-react-native';

const UploadLoader = ()=> (<Modal
              animationType="none"
              transparent={true}
              visible={true}
               >
                <View
              style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
             }}
             >
          <LottieView source={require('./upload.json')} autoPlay loop />
         </View>
      </Modal>)
 export default UploadLoader;