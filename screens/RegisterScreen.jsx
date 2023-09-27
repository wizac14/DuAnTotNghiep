import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
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
    const [isSecureEntry, setIsSecureEntry] = useState(true);

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
            Alert.alert("Registration Error", "an error occured during registration!");
            console.log("registration error!", error);
        })
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image style={{ width: 350, height: 300 }} source={require('../assets/images/logo.png')} />
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

                    <Ionicons style={{ padding: 5 }} name="person-circle" size={24} color="grey" />
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{ width: 250, fontFamily: "regular" }} placeholder='Enter your name' />
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

                    <MaterialCommunityIcons style={{ padding: 5 }} name="email" size={24} color="grey" />
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{ width: 250, fontFamily: "regular" }} placeholder='Enter your email' />
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

                    <Ionicons style={{ padding: 5 }} name="lock-closed" size={24} color="grey" />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={isSecureEntry}
                        style={{ width: 250, fontFamily: "regular" }} placeholder='Enter your password' />
                    <Ionicons style={{ padding: 5 }} name={isSecureEntry ? 'eye' : 'eye-off'}  size={24} color="grey" onPress={() => setIsSecureEntry(!isSecureEntry)} />
                </View>

               
                <View style={{ marginTop: 30 }} />

                <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                        width: 300,
                        backgroundColor: "#D80032",
                        borderRadius: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 10,

                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.white,
                            fontSize: SIZES.Large,
                            fontFamily: "semibold"
                        }}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.imgView}>
                    <TouchableOpacity style={styles.img}  activeOpacity={0.5}>
                        <Image style={{width : 100, height : 100}}  source={require('../assets/images/google.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.img} activeOpacity={0.5}>
                        <Image style={{width : 100, height : 100}}  source={require('../assets/images/facebook.png')} />
                    </TouchableOpacity>

                </View>

                <View style={styles.text}>
                    <Text>Already have an account?</Text>
                    <Text onPress={() => navigation.navigate("Login")} style={{ left: 5, fontWeight: "bold" }}>Sign in</Text>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,  alignItems: "center", justifyContent : "center" 
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
        borderColor: '#e3e3e3',
        borderRadius: 10,
        resizeMode : 'center'
    },
    text: {
        flexDirection: "row",
        marginLeft: 10,
        justifyContent: "center",
        top: 10,
    },
})