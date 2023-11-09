import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { AppContext } from '../../components/ultil/AppContext';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { UIActivityIndicator } from 'react-native-indicators';
import { Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CartDetail = (props) => {
  const { route } = props;
  const [data, setdata] = useState([]);
  const { inforuser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isVnpayChecked, setVnpayChecked] = useState(false);
  const [isCodChecked, setCodChecked] = useState(false);

  useEffect(() => {
    getDetailByIdUser();
    return () => {};
  }, []);
  useEffect(() => {
    // Tính tổng giá trị các sản phẩm trong giỏ hàng khi danh sách sản phẩm thay đổi
    const calculateTotalPrice = () => {
      let total = 0;
      for (const item of data) {
        // Tính giá trị của mỗi sản phẩm và cộng vào tổng giá trị
        total += item?.idProduct?.price * item?.quantity;
      }
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [data]);

  const getDetailByIdUser = async () => {
    try {
      const response = await AxiosIntance().get('/cart/get-by-idUser?idUser=' + inforuser._id);
      if (response?.result === true) {
        setdata(response?.cart);
        console.log(response?.cart[0]);
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

  return (
    <SafeAreaView>
      <View style={styles.cartDetailContainer}>
        <View>
          <Text style={styles.cartDetailTitle}>Chi tiết đơn hàng</Text>
        </View>
        <View>
          <Text style={styles.placeToShip}>Giao đến</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 26,
              //   justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: COLORS.gray2,
            }}
          >
            <Entypo style={{ marginRight: 5 }} name="location-pin" size={28} color="red" />
            <View style={{ flexDirection: 'column', alignSelf: 'flex-start', flex: 1 }}>
              <Text style={{ color: 'grey' }}>Địa chỉ của bạn</Text>
              <TextInput style={{ fontSize: 18 }} value={inforuser.address} placeholder="Address" />
            </View>
            <SimpleLineIcons
              style={{
                justifyContent: 'flex-end',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}
              name="arrow-right"
              size={14}
              color="grey"
            />
          </View>
        </View>
        <View>
          <Text style={styles.placeToShip}>Hình thức giao hàng</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 26,
              alignItems: 'center',
              borderBottomWidth: 0.5,
              borderBottomColor: COLORS.gray2,
            }}
          >
            <MaterialCommunityIcons
              style={{ marginRight: 5 }}
              name="truck-cargo-container"
              size={28}
              color="green"
            />
            <Text style={{ fontSize: 16 }}>Vận chuyển nhanh</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'colunm',
            marginBottom: 26,
            borderBottomWidth: 0.5,
            borderBottomColor: COLORS.gray2,
          }}
        >
          <Text style={styles.placeToShip}>Phương thức thanh toán</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BouncyCheckbox
                isChecked={isVnpayChecked}
                fillColor="green"
                onPress={() => setVnpayChecked(!isVnpayChecked)}
              />
              <Text>VNPAY</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BouncyCheckbox
                isChecked={isCodChecked}
                fillColor="green"
                onPress={() => setCodChecked(!isCodChecked)}
              />
              <Text>COD</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.cartInShort}>Tóm tắt đơn hàng</Text>
        </View>
        {isLoading ? (
          <View
            style={{
              height: '70%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={COLORS.primary} />
          </View>
        ) : (
          <View style={{ height: '45%' }}>
            <FlatList
              data={data}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={(item) => item._id}
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
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 18, color: COLORS.red, textAlign: 'center' }}>
              Tổng thanh toán: ₫{totalPrice.toLocaleString()}
            </Text>
            <TouchableOpacity style={styles.buttonBuy}>
              <Text style={styles.textBuy}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CartItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            alignSelf: 'center',
            alignContent: 'center',
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 30,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <Text style={styles.quantity}>{item?.quantity}x</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.title}>{item.idProduct?.title}</Text>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Text style={styles.colorSizeText}>
                  {item?.color.charAt(0).toUpperCase() + item?.color.slice(1)}
                </Text>
                <Text style={styles.colorSizeText}> - Kích cỡ: {item.size}</Text>
              </View>
              <View style={styles.priceQuantityContainer}>
                <Text style={styles.price}>
                  ₫{(item?.idProduct?.price * item?.quantity).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    // padding: 10,
    // elevation: 5,
    borderBottomWidth: 0.2,
    marginBottom: 5,
    borderBottomColor: COLORS.gray2,
    marginTop: 5,
  },
  detailsContainer: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorSizeText: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceQuantityContainer: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
  },
  unitPrice: {
    fontSize: 16,
    // marginRight: 15,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cartDetailContainer: {
    flexDirection: 'column',
    padding: 16,
  },
  cartDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartInShort: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 16,
  },
  placeToShip: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 16,
  },
  buttonBuy: {
    height: 48,
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-end',
    marginTop: 10,
  },
  textBuy: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CartDetail;
