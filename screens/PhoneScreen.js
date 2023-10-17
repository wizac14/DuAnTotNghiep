import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useRef, useEffect, createRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { SIZES, COLORS } from '../constants'
import { KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app'
import { TextInput } from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const PhoneScreen = () => {
  const navigation = useNavigation();

  const [count, setCount] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      await phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
      setPhoneNumber("");
    } catch (err) {
      console.log(err);
    }
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        setCode("");
      })
      .catch((error) => {
        console.log(error);
      });
    Alert.alert("Successful!");
    navigation.navigate("New Password");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      <Text
        style={{
          fontSize: 20,
          flexWrap: "wrap",
          margin: 5,
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        Enter your Phone Number
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
        label="Phone Number"
        mode="outlined"
        outlineColor="#000000"
        activeOutlineColor="#000000"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        autoComplete="tel"
        style={{ width: 350, marginTop: 10 }}
      />

      <TouchableOpacity
        onPress={sendVerification}
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
          }}
        >
          Generate OTP
        </Text>
      </TouchableOpacity>

      <View style={styles.otpView}>
        <TextInput
          onChangeText={setCode}
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          onChangeText={setCode}
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          onChangeText={setCode}
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          onChangeText={setCode}
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          onChangeText={setCode}
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
        <TextInput
          onChangeText={setCode}
          maxLength={1}
          keyboardType="numeric"
          style={[
            styles.inputView,
            { borderColor: code.length >= 1 ? "blue" : "black" },
          ]}
        />
      </View>

      {/* lhjo */}

      <TouchableOpacity onPress={confirmCode} style={[styles.submit]}>
        <Text
          style={{
            textAlign: "center",
            color: COLORS.white,
            fontSize: SIZES.Large,
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};


export default PhoneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
