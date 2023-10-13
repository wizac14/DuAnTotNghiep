import { View, Text } from "react-native";
import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Icons from "@expo/vector-icons/MaterialIcons";
import CustomBottomTabs from "../navigation/CustomBottomTabs";
import Home from "../screens/Home/Home";
import Cart from "../screens/Home/Cart";
import Profile from "../screens/Home/Profile";
import ItemListHistory from "../components/item/ItemListHistory";

const TabsStack = createBottomTabNavigator();


const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <TabsStack.Screen
        name="Trang chủ"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Giỏ hàng"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Lịch sử"
        component={ItemListHistory}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="account-balance-wallet" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Bạn"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;

