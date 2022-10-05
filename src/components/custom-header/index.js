import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = ({ navigation, name }) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        elevation: 6,
        padding: 10,
        paddingLeft: 22,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        marginTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View>
          <Ionicons
            name="md-arrow-back"
            size={28}
            color="#2b3445"
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            width: "70%",
            color: "#2b3445",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;
