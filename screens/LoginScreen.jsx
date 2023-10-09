import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import { Button } from "react-native";
import { axiosClient } from "../api/axiosClient";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    // axiosClient
    //   .post("/login", user)
    //   .then((response) => {
    //     console.log(response);
    //     const token = response.data.token;
    //     AsyncStorage.setItem("authToken", token);
    //     navigation.replace("Bottom Navigation");
    //   })
    //   .catch((error) => {
    //     Alert.alert("Login Error!", "Invalid email!");
    //     console.log(error);
    //   });
    axiosClient.post("/login", user)
    .then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Bottom Navigation");
    })
    .catch((error) => {
      Alert.alert("Login Error!", "Invalid email!");
      console.log(error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={{ width: 350, height: 300 }}
          source={require("../assets/images/logo.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{  fontSize: SIZES.xLarge }}>
            Login to Your Account
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderRadius: 5,
            borderWidth: 0.5,
            marginTop: 35,
          }}
        >
          <MaterialCommunityIcons
            style={{ padding: 5 }}
            name="email"
            size={24}
            color="grey"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ width: 250, }}
            placeholder="Email"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderRadius: 5,
            borderWidth: 0.5,
            marginTop: 15,
          }}
        >
          <Ionicons
            style={{ padding: 5 }}
            name="lock-closed"
            size={24}
            color="grey"
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={isSecureEntry}
            style={{ width: 250, }}
            placeholder="Password"
          />
          <Ionicons
            style={{ padding: 5 }}
            name={isSecureEntry ? "eye" : "eye-off"}
            size={24}
            color="grey"
            onPress={() => setIsSecureEntry(!isSecureEntry)}
          />
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            isChecked={isChecked}
            checkBoxColor="#D80032"
            uncheckedCheckBoxColor="black"
            onClick={() => setIsChecked(!isChecked)}
          />
          <Text style={{ left: 5 }}>Remember Me</Text>
          <Text
            onPress={() => navigation.navigate("Forgot Password")}
            style={{ left: 70, color: "#D80032", fontWeight: "bold" }}
          >
            Forgot Password?
          </Text>
        </View>

        <View style={{ marginTop: 30 }} />

        <TouchableOpacity
          onPress={() => navigation.navigate("Tab Navigator")}
          style={{
            width: 300,
            backgroundColor: "#D80032",
            borderRadius: 10,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              fontSize: SIZES.Large,
              fontWeight: "bold",
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>

        <View style={styles.imgView}>
          <TouchableOpacity style={styles.img} activeOpacity={0.5}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/images/google.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.img} activeOpacity={0.5}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/images/facebook.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.text}>
          <Text>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ left: 5, fontWeight: "bold" }}
          >
            Sign up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    flexDirection: "row",
    marginLeft: 3,
    marginTop: 15,
  },
  text: {
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "center",
    top: 10,
  },
  imgView: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 10,
    resizeMode: "center",
  },
});
