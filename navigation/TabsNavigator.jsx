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
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon(props) {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Payment"
        component={Example}
        options={{
          tabBarIcon(props) {
            return <Icons name="account-balance-wallet" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;

const Example = () => {
  return <View />;
};