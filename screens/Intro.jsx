import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'


const Intro = () => {
    
 useEffect(()=>{
    const timer = setTimeout(()=>{
        // nnavigation.navigate("Guide");
    },3000)
 },[])
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Image style={{width:300, height:300}} source={require('../assets/images/IconShop.png')}/>
      <ActivityIndicator size='large' color='blue' style={{margin:10}}/>
    </View>
    
  )
}

export default Intro

const styles = StyleSheet.create({

})