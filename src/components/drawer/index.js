import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../helpers";
import { clearUser } from "../../redux/auth-redux/signin.slice";

const CustomDrawer = (props) => {
  const [user, setUser] = useState(undefined);
  const admin = useSelector((state) => state.signin.admin);
  const dispatch = useDispatch();

  const getUserProfile = async () => {
    try {
      const result = await getUserData(admin.token);
      setUser(result.data.operator);
    } catch (error) {
      Alert.alert("", error.response.data.message, [
        {
          text: "Tushunarli",
          onPress: () => {},
          style: "cancel",
        },
      ]);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  const logOut = () => {
    dispatch(clearUser());
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#4630EB" }}
      >
        <ImageBackground
          source={require("./menu-bg.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            source={require("../../screens/Profile/user.png")}
            style={{
              height: 70,
              width: 70,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "Roboto-Medium",
              marginBottom: 5,
            }}
          >
            {user?.admin_name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="coins" size={14} color="#f4c430" />
            <Text
              style={{
                color: "#fff",
                marginLeft: 15,
              }}
            >
              {user?.balance?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              so'm
            </Text>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Ulashish
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Medium",
                marginLeft: 5,
              }}
            >
              Profildan chiqish
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
