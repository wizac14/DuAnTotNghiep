import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { AppContext } from '../../components/ultil/AppContext';
import { UIActivityIndicator } from 'react-native-indicators';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const OrderProgress = () => {
  const [orders, setOrders] = useState([]);
  const { inforuser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const paddingPercentage = 2;

  //api lấy ds đơn hàng của usser
  const fetchProducts = async () => {
    try {
      const userId = inforuser._id;

      const response = await AxiosIntance().get(`order/user-orders/${userId}`);
      //   console.log(response);

      if (response.orders) {
        const reverseOrders = await response?.orders.reverse();
        setOrders(reverseOrders);
      } else {
        console.error('Failed to fetch products:', response.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={{}}>
      <Text
        style={{
          paddingHorizontal: (width * paddingPercentage) / 100,
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        ĐƠN HÀNG CỦA BẠN
      </Text>
      <View style={styles.orderList}>
        {isLoading ? (
          <View
            style={{
              height: Dimensions.get('window').height * 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={COLORS.primary} />
          </View>
        ) : (
          <View style={{ height: '95%' }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={orders}
              renderItem={({ item }) => <OrderItem item={item} />}
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
      </View>
    </SafeAreaView>
  );
};

const OrderItem = ({ item }) => {
  const { width, height } = Dimensions.get('window');
  const paddingPercentage = 2;
  const statusColor = item.status === 'PURCHASED' ? 'green' : 'orange';
  const statusPayment = item.status === 'PURCHASED' ? 'Đã thanh toán' : 'Đã đặt hàng';
  return (
    <View style={{ justifyContent: 'center' }}>
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 2,
            paddingHorizontal: (width * paddingPercentage) / 100,
            borderBottomWidth: 0.2,
            borderBottomColor: 'lightgrey',
            paddingBottom: 30,
          }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16 }}>{moment(item?.createdAt).format('HH:mm')}, </Text>
              <Text style={{ fontSize: 16 }}>{moment(item?.createdAt).format('DD-MM-YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 16 }}>{item?.productCount} mặt hàng</Text>
              <View style={{}}>
                <Text style={{ fontSize: 14, color: 'grey' }}>Nhấn để xem chi tiết</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 14, textAlign: 'right', color: statusColor }}>
              {statusPayment}
            </Text>

            <View style={{}}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'right' }}>
                  {item?.totalAmount.toLocaleString()}đ
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderProgress;

const styles = StyleSheet.create({
  orderList: {
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray2,
  },
  detailsContainer: {
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  colorSizeText: {
    fontSize: 14,
  },

  unitPrice: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
  },

  cartDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartInShort: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  placeToShip: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});
