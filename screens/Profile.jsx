import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES } from '../constants/index';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../constants/index";
import DatePicker from 'react-native-date-picker'






const Profile = () => {

  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity style={styles.circle}>
            <Image style={styles.image} source={require('../assets/images/fn2.jpg')}></Image>
          </TouchableOpacity>
          <Image style={{ marginTop: 70, marginLeft: -10 }} source={require('../assets/images/editing.png')}></Image>
        </View>
        <TextInput style={styles.textHint} placeholder="Martias Duarte"
          placeholderTextColor="gray"></TextInput>
        <TextInput style={styles.textHint} placeholder="Martias Duarte"
          placeholderTextColor="gray"></TextInput>
        <TextInput style={styles.textHint} placeholder="Martias Duarte"
          placeholderTextColor="gray"></TextInput>
        <TextInput style={styles.textHint} placeholder="Martias Duarte"
          placeholderTextColor="gray" keyboardType="email-address"></TextInput>
        <TextInput style={styles.textHint} placeholder="Martias Duarte"
          placeholderTextColor="gray" keyboardType="phone-pad"></TextInput>
        <TextInput style={[styles.textHint,{marginBottom:30}]} placeholder="Martias Duarte"
          placeholderTextColor="gray"  ></TextInput>
        
        <Button 
         color="black"
          title="Press me"
        />
        </View>
       
  

    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 20
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textHint: {
    marginVertical: 0,
    marginHorizontal: 10,
    marginTop: 25,
    height: 50,
    color: "black",
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: "#FFFAF0"
    // borderWidth:1
  },
  btn: {
   
    marginTop:20
  }


})