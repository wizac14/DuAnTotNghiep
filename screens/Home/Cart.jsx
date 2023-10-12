import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIZES } from '../../constants/index';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../constants/index";
import ItemCart from '../../components/item/ItemCart';
import BouncyCheckbox from 'react-native-bouncy-checkbox';



const Cart = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <View style={styles.viewIcBack}>
          <TouchableOpacity style={styles.iconBack}>
            <Ionicons name='arrow-back-outline' size={30} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>My Cart</Text>
        </View>
        <View style={styles.viewIcSearch}>
          <TouchableOpacity style={styles.iconSeacrch}>
            <Ionicons name='search' size={30} />
          </TouchableOpacity>
        </View>

      </View>
      <View style={{height:480}}>
      <FlatList 
        data={dataNe}
        renderItem={({ item }) => <ItemCart dulieu={item} navigation={navigation} />}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
      </View>
     
      <View style={styles.viewBuy}>
        <View>
          <BouncyCheckbox
            size={25}
            fillColor="black"
            unfillColor="#FFFFFF"
            innerIconStyle={{ borderWidth: 2 }}
          />
        </View>
        <View style={styles.viewAll}>
          <Text style={{fontSize:15, marginRight:30}}>Tất cả</Text>
        </View>
        <View style={{marginLeft:50}}>
          <Text style={{fontSize:15}}>Tổng thanh toán</Text>
        </View>
        <View style={{marginLeft:10}}>
          <Text style={{fontSize:15, color:'red', fontWeight:'bold'}}>$10.000</Text>
        </View>
      </View>
      <View>
      <Pressable style={styles.buttonBuy} >
        <Text style={styles.textBuy}>Mua</Text>
      </Pressable>
      </View>


    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginEnd: 10,
    marginLeft: 10,
    marginBottom: 30,
    flexDirection: 'column',
  },
  viewContent: {
    flexDirection: 'row',
    marginBottom: 10
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 100
  },
  viewIcSearch: {
    marginLeft: 90
  },
  viewBuy:{
    flexDirection:'row',
    marginTop:50
  },
  buttonBuy: {
    height:48,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  textBuy: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'

  }
})

const dataNe = [
  {
    "_id": "1",
    "title": "Nike Air Jordan 1",
    "price": "$105",
    "color": 'https://vuanem.com/blog/wp-content/uploads/2022/12/pha-mau-tim.jpg',
    "nameColor": "Purple",
    "size": "Size = 42",
    "quantity": "1",
    "image": 'https://hncmua.com/images/thumbs/0003220_giay-nike-air-jordan-1-low-se-tim_550.jpeg'
  },
  {
    "_id": "2",
    "title": "Nike Air Jordan 1",
    "price": "$105",
    "color": 'https://vuanem.com/blog/wp-content/uploads/2022/12/pha-mau-tim.jpg',
    "nameColor": "Purple",
    "size": "Size = 42",
    "quantity": "1",
    "image": 'https://hncmua.com/images/thumbs/0003220_giay-nike-air-jordan-1-low-se-tim_550.jpeg'
  },
  {
    "_id": "3",
    "title": "Nike Air Jordan 1",
    "price": "$105",
    "color": 'https://vuanem.com/blog/wp-content/uploads/2022/12/pha-mau-tim.jpg',
    "nameColor": "Purple",
    "size": "Size = 42",
    "quantity": "1",
    "image": 'https://hncmua.com/images/thumbs/0003220_giay-nike-air-jordan-1-low-se-tim_550.jpeg'
  },
  {
    "_id": "4",
    "title": "Nike Air Jordan 1",
    "price": "$105",
    "color": 'https://vuanem.com/blog/wp-content/uploads/2022/12/pha-mau-tim.jpg',
    "nameColor": "Purple",
    "size": "Size = 42",
    "quantity": "1",
    "image": 'https://hncmua.com/images/thumbs/0003220_giay-nike-air-jordan-1-low-se-tim_550.jpeg'
  },
 




]
