import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Icons from "@expo/vector-icons/MaterialIcons";
import CustomBottomTabs from "./CustomBottomTabs";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AppContext } from "../components/ultil/AppContext";
import BottomTabNavigation from "./BottomTabNavigation";
import Search from "../screens/Home/Search";
import SearchTitle from "../screens/Home/SearchTitle";
import FilterView from "../components/home/FilterView";
import FilterScreen from "../screens/Home/FilterScreen";

const Stack = createNativeStackNavigator();
const TabsStack = createBottomTabNavigator();

const Filter=()=>{
  return(
    <Stack.Navigator>
      
     
  </Stack.Navigator>
  

  )
}
const NotAuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Intro">
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
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={TabsNavigator}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />



      <Stack.Screen
        name="SearchTitle"
        component={SearchTitle}
        options={{ headerShown: false }}
      />

      <Stack.Screen  options={{ headerShown: false }} name="FilterView" component={FilterView}></Stack.Screen>
      <Stack.Screen   options={{ headerShown: false }} name="FilterScreen" component={FilterScreen}></Stack.Screen>

    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  const { isLogin } = useContext(AppContext);

  return (
    <>
      {
        isLogin == false ? <NotAuthNavigator /> : <AuthNavigator />
        // <Mains></Mains>
        // <AuthNavigator/>
      }
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
