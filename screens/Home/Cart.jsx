import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../constants/index';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/index';
import ItemCart from '../../components/item/ItemCart';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useEffect } from 'react';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { ToastAndroid } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../../components/ultil/AppContext';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { UIActivityIndicator } from 'react-native-indicators';
import { Dimensions } from 'react-native';

const Cart = (props) => {
  const { navigation } = props;
  const [data, setdata] = useState([]);
  const { inforuser } = useContext(AppContext);
  const [showTotalPrice, setShowTotalPrice] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    if (isFocused) {
      calculateTotalPrice();
      getDetailByIdUser();
    }
    return () => {
      setdata([]);
      setTotalPrice(0);
      setIsLoading(true);
    };
  }, [isFocused]);

  const handleToggleTotalPrice = () => {
    setShowTotalPrice(!showTotalPrice);
    calculateTotalPrice();
  };

  const getDetailByIdUser = async () => {
    try {
      const response = await AxiosIntance().get('/cart/get-by-idUser?idUser=' + inforuser._id);
      if (response?.result === true) {
        setdata(response?.cart);
        // console.log(response?.cart[0]);
      } else {
        ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    data?.forEach((item) => {
      const price = item?.idProduct.price; //lấy giá tiền của sản phẩm qua idProduct ms đúng
      const quantity = item?.quantity;
      const productTotal = price * quantity;
      total += productTotal;
      // console.log(productTotal);
    });
    setTotalPrice(total);
  };

  const removeItemFromCart = async (productId) => {
    try {
      const response = await AxiosIntance().delete(`/cart/remove-from-cart/${productId}`);
      console.log(response);
      if (response?.result === true) {
        //xóa sản phẩm thành công
        getDetailByIdUser();
        ToastAndroid.show('Sản phẩm đã được xóa khỏi giỏ hàng', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Xóa sản phẩm thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.viewContent}>
          <View style={styles.rightContent}>
            <Text style={styles.text}>Giỏ hàng</Text>
            <View style={styles.checkboxRow}>
              <Text style={styles.checkboxText}>Tất cả</Text>
              <BouncyCheckbox
                size={30}
                fillColor="red"
                unfillColor="white"
                innerIconStyle={{ borderWidth: 1, borderColor: 'black' }}
                onPress={handleToggleTotalPrice}
              />
            </View>
          </View>
        </View>
        {isLoading ? (
          <View
            style={{
              // height: Dimensions.get('window').height * 0.75,
              height: '75%',
              // backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={colors.text} />
          </View>
        ) : (
          <View style={{ height: '75%' }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ItemCart
                  dulieu={item}
                  navigation={navigation}
                  removeItemFromCart={removeItemFromCart}
                />
              )}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View
                  style={{
                    height: Dimensions.get('window').height * 0.25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Rất tiếc, không có sản phẩm nào.</Text>
                </View>
              }
            />
          </View>
        )}
        <View style={{ height: '25%' }}>
          <View style={styles.viewBuy}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Text style={{ fontSize: 18, color: COLORS.red }}>
                Tổng thanh toán: đ{showTotalPrice ? totalPrice.toLocaleString() : '0'}
              </Text>
            </View>
          </View>
          <View>
            <Pressable style={styles.buttonBuy}>
              <Text style={styles.textBuy}>Mua hàng</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginEnd: 10,
    marginLeft: 10,
    marginBottom: 30,
    flexDirection: 'column',
  },
  viewContent: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  textAndCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 100,
  },
  checkboxText: {
    fontSize: 18,
    marginRight: 5,
  },
  viewIcSearch: {
    marginLeft: 90,
  },
  viewBuy: {
    // flexDirection: 'row',
    paddingTop: 20,
  },
  buttonBuy: {
    height: 48,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textBuy: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
