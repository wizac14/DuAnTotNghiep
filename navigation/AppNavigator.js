import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Icons from "@expo/vector-icons/MaterialIcons";
import CustomBottomTabs from "../navigation/CustomBottomTabs";
import Home from "../screens/Home/Home";
import Cart from "../screens/Home/Cart";
import Profile from "../screens/Home/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import Intro from "../screens/Intro";
import Guide from "../screens/Begin/Guide";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import ProductDetail from "../components/products/ProductDetail";
import PhoneScreen from "../screens/PhoneScreen";
import EmailScreen from "../screens/EmailScreen";
import NewPassword from "../screens/NewPassword";
import ItemListHistory from "../components/item/ItemListHistory";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AppContext } from "../components/ultil/AppContext";
const Stack = createNativeStackNavigator();
const TabsStack = createBottomTabNavigator();
const Users = () => {
  return (
    <Stack.Navigator initialRouteName="Intro">
      <Stack.Screen
        name="Tab Navigator"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Guide"
        component={Guide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Reset"
        component={ResetPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Phone Screen"
        component={PhoneScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Email Screen"
        component={EmailScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="New Password"
        component={NewPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Mains = () => {
  <TabsStack.Navigator
    screenOptions={{
      tabBarShowLabel: false,
    }}
    tabBar={(props) => <Cust {...props} />}
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
  </TabsStack.Navigator>;
};
const AppNavigator = () => {
  const { isLogin } = useContext(AppContext);
  return (
    <>
      {
        isLogin == false ? <Users /> : <TabsNavigator />
        // <Mains></Mains>
      }
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
