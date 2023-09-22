import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES, COLORS } from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
    
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password
        };

        //send a post request to the backend API
        axios.post("http://192.168.1.7:3000/register", user).then(response => {
            console.log(response);
            Alert.alert("Registration Done!", "We sent to your email a verification, please check it!");
            setName("");
            setEmail("");
            setPassword("");
        }).catch((error) => {
            Alert.alert("Registration Error","an error occured during registration!");
            console.log("registration error!",error);
        })
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View>
                <Image style={{ width: 350, height: 350 }} source={require('../assets/images/IconShop.png')} />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "bold", fontSize: SIZES.xLarge }}>Create your Account</Text>
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

                    <Ionicons style={{ padding: 5 }} name="person-circle-outline" size={24} color="black" />
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{ width: 250, fontFamily: "regular" }} placeholder='enter your Name' />
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
                        // secureTextEntry={true}
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
                onPress={handleRegister}
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
                        }}>Sign Up</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Login")} style = {{marginTop: 15}}>
                    <Text style = {{textAlign: 'center', color: COLORS.gray, fontFamily: "bold"}}>Already have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})