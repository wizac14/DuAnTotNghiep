import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES, COLORS } from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        }

        axios.post("http://192.168.1.7:3000/login", user).then((response) => {
            console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem("authToken", token);
            navigation.replace("Bottom Navigation");
        }).catch((error)=> {
            Alert.alert("Login Error!", "Invalid email!");
            console.log(error);
        })
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image style={{ width: 350, height: 350 }} source={require('../assets/images/IconShop.png')} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "bold", fontSize: SIZES.xLarge }}>Login to your Account</Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        marginTop: 35,
                    }}>

                    <MaterialCommunityIcons style={{ padding: 5 }} name="email-outline" size={24} color="black" />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{ width: 250, fontFamily: "regular" }} placeholder='enter your Email' />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        marginTop: 15,
                    }}>

                    <AntDesign style={{ padding: 5 }} name="lock" size={24} color="black" />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        style={{ width: 250, fontFamily: "regular" }} placeholder='enter your Password' />
                </View>

                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <Text style={{ fontFamily: "semibold" }}>Keep me logged in</Text>

                    <Text style={{ fontFamily: "bold", color: COLORS.red }}>Forgot Password</Text>
                </View>

                <View style={{ marginTop: 30 }} />

                <Pressable
                onPress={handleLogin}
                    style={{
                        width: 200,
                        backgroundColor: COLORS.red,
                        borderRadius: 5,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 10,
                        marginTop: 35
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.white,
                            fontSize: SIZES.xLarge,
                            fontFamily: "semibold"
                        }}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style = {{marginTop: 15}}>
                    <Text style = {{textAlign: 'center', color: COLORS.gray, fontFamily: "bold"}}>Don't have account? Sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen

const styles = StyleSheet.create({})