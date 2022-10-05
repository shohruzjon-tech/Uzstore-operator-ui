import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"

const CustomHeader = ({ navigation, name, ready, pdf, bgc })=>{
   

    return(
        <View
         style={{
            backgroundColor: bgc? bgc: '#ffffff',
            elevation: 6,
            padding: 10,
            paddingLeft: 22,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
         }}
        >
          <View
           style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
           }}
          >
            <View>
                <Ionicons
                  name="menu"
                  size={28}
                  color={bgc?"#fff":'#2b3445'}
                  onPress={()=>navigation.openDrawer()}
                />
            </View>
            <Text
             style={{textAlign: 'center', width: '70%', color: bgc?"#fff":'#2b3445', fontWeight: 'bold', fontSize: 16}}
            >{name}</Text>
             {ready?<TouchableOpacity>
                <Ionicons
                  name="download-outline"
                  size={28}
                  color='#2b3445'
                  onPress={pdf}
                />
            </TouchableOpacity>:undefined}
          </View>
        </View>
    )
};

export default CustomHeader;