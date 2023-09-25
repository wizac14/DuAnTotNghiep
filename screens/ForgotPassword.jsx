import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
    const navigation = useNavigation()
    const [isClicked, setIsClicked] = useState(false);
    const buttonStyle = (button) => {
        if (button === isClicked) {
            isClicked === 'button1' ? navigation.navigate('Reset') : null
            isClicked === 'button2' ? navigation.navigate('Reset') : null
            return styles.isClicked;

        } else {
          
            return styles.button;
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image style={{ width: 350, height: 400 }} source={require('../assets/images/think.jpg')} />
            <Text style={{ fontSize: 20, }}>Select which contact details should we use to reset your password </Text>
            <TouchableOpacity onPress={() => setIsClicked('button1')} style={
                buttonStyle('button1')
            }>
                <TouchableOpacity style={styles.insideBtn}>
                    <Ionicons style={{
                        margin: 10,
                        padding: 12,
                    }} name="chatbubble-ellipses" size={24} color="black" />
                    <View style={{ flexDirection: 'column', width: 100, margin: 10, left: 10 }}>
                        <Text style={{ color: 'grey' }} >via SMS</Text>
                        <Text style={{ top: 10 }} >+84 385 2152</Text>
                    </View>


                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsClicked('button2')} style={
                buttonStyle('button2')
            }>
                <TouchableOpacity style={styles.insideBtn}>
                    <Ionicons style={{
                        margin: 10,
                        padding: 12,
                    }} name="mail" size={24} color="black" />
                    <View style={{ flexDirection: 'column', width: 300, margin: 10, left: 10 }}>
                        <Text style={{ color: 'grey' }} >via Email</Text>
                        <Text style={{ top: 10 }} >andre*****hand@gmail.com</Text>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        width: 350,
        height: 100,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 30,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    isClicked: {
        width: 350,
        height: 100,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 30,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    insideBtn: {
        width: 70,
        height: 70,
        backgroundColor: "#e3e3e3",
        borderRadius: 40,
        left: 20,
        alignSelf: "flex-start",
        flexDirection: "row",
    },

})