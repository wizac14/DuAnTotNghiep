import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect, createRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { TextInput } from "react-native-paper";

const EmailScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          flexWrap: "wrap",
          margin: 5,
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        Enter your Email Address
      </Text>
      <Text
        style={{
          fontSize: 17,
          flexWrap: "wrap",
          margin: 5,
          textAlign: "center",
        }}
      >
        We will send you the 6 digit verification code
      </Text>

      <TextInput
        label="Email Address"
        mode="outlined"
        outlineColor="#000000"
        activeOutlineColor="#000000"
        keyboardType="phone-pad"
        autoComplete="email"
        style={{ width: 350, fontFamily: "regular", marginTop: 10 }}
      />

      <TouchableOpacity
        style={{
          width: 300,
          backgroundColor: "#D80032",
          borderRadius: 10,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 10,
          top: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: COLORS.white,
            fontSize: SIZES.Large,
            fontFamily: "semibold",
          }}
        >
          Generate OTP
        </Text>
      </TouchableOpacity>

      <View style={styles.otpView}>
        <TextInput
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
      </View>

      <TouchableOpacity style={[styles.submit]}>
        <Text
          style={{
            textAlign: "center",
            color: COLORS.white,
            fontSize: SIZES.Large,
            fontFamily: "semibold",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    top: 10,
  },
  otpView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
    marginTop: 50,
  },
  inputView: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    fontWeight: "700",
  },
  submit: {
    width: 300,
    backgroundColor: "#D80032",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    marginTop: 20,
  },

  resendReview: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
