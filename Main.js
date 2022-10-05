import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import Taken from "./src/screens/Taken";
import Stream from "./src/screens/Stream";
import Profile from "./src/screens/Profile";
import Auth from "./src/screens/Auth";
import ReceivedOrder from "./src/screens/order-details";
import CustomDrawer from "./src/components/drawer";
import Settings from "./src/screens/settings";
import Search from "./src/screens/Search";
import Manual from "./src/screens/Manual";
import AddOrder from "./src/screens/Add";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Order = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Oqim") {
            iconName = "stream";
          } else if (route.name === "Olinganlar") {
            iconName = "list-alt";
          } else if (route.name === "Profil") {
            iconName = "person-outline";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4630EB",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Oqim" component={Stream} />
      <Tab.Screen
        initialParams={{ status: "new", isActive: true }}
        name="Olinganlar"
        component={Taken}
      />
      <Tab.Screen name="Profil" component={Profile} />
    </Tab.Navigator>
  );
};

const UserDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Operator bo'limi"
      screenOptions={{
        drawerActiveBackgroundColor: "#4630EB",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#666666",
        drawerLabelStyle: {
          fontSize: 15,
          marginLeft: -15,
        },
      }}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user-astronaut" size={22} color={color} />
          ),
        }}
        name="Operator bo'limi"
        component={Order}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="search" size={22} color={color} />
          ),
          headerShown: false,
        }}
        name="Buyurtmani qidirish"
        component={Search}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Fontisto name="shopping-basket-add" size={22} color={color} />
          ),
        }}
        name="Buyurtma qo'shish"
        component={AddOrder}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
        name="Sozlamalar"
        component={Settings}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={color}
            />
          ),
        }}
        name="Yo'riqnoma"
        component={Manual}
      />
    </Drawer.Navigator>
  );
};

export default function Main() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#f6f9fc",
      background: "#f6f9fc",
    },
  };

  const admin = useSelector((state) => state.signin.admin);

  return (
    <>
      <StatusBar backgroundColor="#4630EB" style="light" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!admin ? (
            <Stack.Screen name="Auth" component={Auth} />
          ) : (
            <>
              <Stack.Screen name="Order" component={UserDrawer} />
              <Stack.Screen name="Buyurtma" component={ReceivedOrder} />
              <Stack.Screen
                name="yangi"
                initialParams={{ status: "new", name: "Yangi buyurtmalar" }}
                component={Taken}
              />
              <Stack.Screen
                name="tayyor"
                initialParams={{ status: "ready", name: "Yangi buyurtmalar" }}
                component={Taken}
              />
              <Stack.Screen
                name="hold"
                initialParams={{ status: "hold", name: "Yangi buyurtmalar" }}
                component={Taken}
              />
              <Stack.Screen
                name="onway"
                initialParams={{ status: "onway", name: "Yangi buyurtmalar" }}
                component={Taken}
              />
              <Stack.Screen
                name="delivered"
                initialParams={{
                  status: "delivered",
                  name: "Yangi buyurtmalar",
                }}
                component={Taken}
              />
              <Stack.Screen
                name="archived"
                initialParams={{
                  status: "archived",
                  name: "Yangi buyurtmalar",
                }}
                component={Taken}
              />
              <Stack.Screen
                name="atkaz"
                initialParams={{
                  status: "canceled",
                  name: "Yangi buyurtmalar",
                }}
                component={Taken}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
