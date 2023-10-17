import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useCallback, useMemo } from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "./screens/Home/Cart";
import Intro from "./screens/Intro";
import Guide from "./screens/Begin/Guide";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ProductDetail from "./components/products/ProductDetail";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabsNavigator from "./navigation/TabsNavigator";
import PhoneScreen from "./screens/PhoneScreen";
import EmailScreen from "./screens/EmailScreen";
import NewPassword from "./screens/NewPassword";
import AppNavigator from "./navigation/AppNavigator";
import { AppContextProvider } from "./components/ultil/AppContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  const theme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: "#fff",
              text: "#fff",
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: "#fff",
              text: "#191919",
              border: "#D9D9D9",
              primary: "#191919",
            },
          },
    [colorScheme]
  );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {/* <Stack.Screen
          name='Bottom Navigation'
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />

        
        <Stack.Screen
          name='Cart'
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Intro'
          component={Intro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Guide'
          component={Guide}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Forgot Password'
          component={ForgotPassword}
          options={{ headerShown: false }}
        /> */}

        {/* <Stack.Screen
          name='Email Screen'
          component={EmailScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name='New Password'
          component={NewPassword}
          options={{ headerShown: false }}
        /> */}


        <Stack.Screen
          name='Phone Screen'
          component={PhoneScreen}
          options={{ headerShown: false }} />

        {/* <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }} /> */}


      </Stack.Navigator>


    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textstyle: {
    fontFamily: "regular",
    fontSize: 20,
  },
});
