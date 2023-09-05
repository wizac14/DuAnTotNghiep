import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from "../constants/index";
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { SIZES } from '../constants/index';
import Welcome from '../components/home/Welcome';
import ImagesSlider from '../components/home/ImagesSlider';
import Heading from '../components/home/Heading';
import ProductsRow from '../components/products/ProductsRow';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24} />

          <Text style={styles.location}>Ho Chi Minh City</Text>

          <View style={{ alignItems: 'flex-end' }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}> 7 </Text>
            </View>
            <TouchableOpacity>
              <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        <Welcome/>
        <ImagesSlider/>
        <Heading/>
        <ProductsRow/>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: "regular",
    fontWeight: 600,
    fontSize: 10,
    color: COLORS.lightWhite,
  }
})