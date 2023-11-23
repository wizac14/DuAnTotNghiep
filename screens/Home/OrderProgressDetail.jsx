import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS } from '../../constants';
import { AppContext } from '../../components/ultil/AppContext';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps/index';
import { useRef } from 'react';
import Icons from '@expo/vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';

const OrderProgressDetail = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();
  const products = order.detail;
  const { inforuser } = useContext(AppContext);
  const [orderStatusIndex, setOrderStatusIndex] = useState(0);

  const [collapsed, setCollapsed] = useState(false);
  const [collapsedDetail, setCollapsedDetail] = useState(false);
  const [collapsedProduct, setCollapsedProduct] = useState(true);

  const statusBackgroundColor = order.status === 'PURCHASED' ? 'lightgrey' : 'red';
  const statusColorPayment = order.status === 'PURCHASED' ? 'green' : 'orange';
  const statusPayment = order.status === 'PURCHASED' ? 'Đã thanh toán' : 'Chưa thanh toán';

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleCollapseDetail = () => {
    setCollapsedDetail(!collapsedDetail);
  };

  const toggleCollapseProduct = () => {
    setCollapsedProduct(!collapsedProduct);
  };

  useEffect(() => {
    if (order.status === 'PURCHASED') {
      setOrderStatusIndex(1);
    } else if (order.status === 'ORDERED') {
      setOrderStatusIndex(0);
    }
  }, [order.status]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 32,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            borderWidth: 2,
            borderColor: COLORS.black,
          }}
        >
          <Icons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold', borderBottomWidth: 0.5 }}>
          CHI TIẾT ĐƠN HÀNG
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            // marginVertical: 20,
            gap: 5,
            paddingHorizontal: 10,
            flex: 1,
          }}
        >
          <View style={{ height: 100 }}>
            <ProgressSteps activeStep={orderStatusIndex}>
              <ProgressStep
                labelFontSize={28}
                label="Đặt hàng"
                previousBtnDisabled
                nextBtnDisabled
                nextBtnText=""
                previousBtnText=""
              ></ProgressStep>

              <ProgressStep
                label="Giao hàng"
                previousBtnDisabled
                nextBtnDisabled
                nextBtnText=""
                previousBtnText=""
              ></ProgressStep>

              <ProgressStep
                label="Đã nhận"
                previousBtnDisabled
                nextBtnDisabled
                nextBtnText=""
                previousBtnText=""
              ></ProgressStep>
            </ProgressSteps>
          </View>

          <View
            style={{
              backgroundColor: COLORS.offwhite,
              padding: 15,
              borderRadius: 10,
              elevation: 1,
              borderWidth: 0.7,
              borderColor: 'lightgrey',
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={toggleCollapse}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Thông Tin Đơn Hàng
              </Text>
              <Icon
                name={collapsed ? 'chevron-down-outline' : 'chevron-up-outline'}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
            <Collapsible style={{ gap: 5 }} collapsed={collapsed}>
              <View
                style={{
                  gap: 5,
                  marginTop: 15,
                  borderBottomWidth: 1,
                  borderColor: 'lightgrey',
                  marginBottom: 15,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, color: 'grey' }}>Mã đơn hàng</Text>
                  <Text style={{ fontSize: 16, color: 'grey' }}>#{order.uuid}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 16, color: 'grey' }}>Ngày đặt hàng</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: 'grey' }}>
                      {moment(order?.createdAt).format('HH:mm')},{' '}
                    </Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>
                      {moment(order?.createdAt).format('DD-MM-YYYY')}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ fontSize: 16, color: 'grey' }}>Trạng thái</Text>
                  <Text style={{ fontSize: 16, color: statusColorPayment }}>{statusPayment}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={toggleCollapseDetail}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  Thông tin địa chỉ
                </Text>
                <Icon
                  name={collapsedDetail ? 'chevron-down-outline' : 'chevron-up-outline'}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
              <Collapsible style={{}} collapsed={collapsedDetail}>
                <View
                  style={{
                    gap: 5,
                    marginTop: 15,
                    borderBottomWidth: 1,
                    borderColor: 'lightgrey',
                    marginBottom: 15,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, color: 'grey' }}>Số điện thoại</Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>{order.phoneNumber}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontSize: 16, color: 'grey' }}>Địa chỉ</Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>{order.address}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 15,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: 'grey' }}>Tên người nhận</Text>
                    <Text style={{ fontSize: 16, color: 'grey' }}>{inforuser.name}</Text>
                  </View>
                </View>
              </Collapsible>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={toggleCollapseProduct}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {order.productCount} mặt hàng
                </Text>

                <Icon
                  name={collapsedProduct ? 'chevron-down-outline' : 'chevron-up-outline'}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
              <Collapsible style={{}} collapsed={collapsedProduct}>
                <View
                  style={{
                    gap: 5,
                    marginTop: 15,
                    borderColor: 'lightgrey',
                    marginBottom: 15,
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {products.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate('ProductDetail', {
                            id: item?.productId?._id,
                          });
                        }}
                      >
                        <View style={styles.productItem}>
                          <Image
                            style={styles.productImage}
                            source={{ uri: item?.productId?.variances[0].images[0].url }}
                            resizeMode="contain"
                          />
                          <View style={{ flexDirection: 'colunm', gap: 3 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                              {item.productId.title} (
                              {item?.color.charAt(0).toUpperCase() + item?.color.slice(1)},{' '}
                              {item.size})
                            </Text>

                            <Text style={{ fontSize: 16, color: 'grey' }}>{item.quantity}x</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                              {item.unitPrice.toLocaleString()} VND
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Collapsible>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 16, color: 'grey' }}>Tạm tính</Text>
                <Text style={{ fontSize: 16, color: 'grey' }}>
                  {order.totalAmount.toLocaleString()} VND
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: 'lightgrey',
                }}
              >
                <Text style={{ fontSize: 16, color: 'grey' }}>Vận chuyển</Text>
                <Text style={{ fontSize: 16, color: 'green', marginBottom: 15 }}>FREE</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}
              >
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Tổng cộng</Text>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
                  {order.totalAmount.toLocaleString()} VND
                </Text>
              </View>
            </Collapsible>
            <TouchableOpacity
              disabled={order.status === 'PURCHASED'}
              style={{
                justifyContent: 'center',
                marginTop: 30,
                backgroundColor: statusBackgroundColor,
                height: 30,
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                Hủy đơn hàng
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 40, color: 'grey', fontWeight: 'bold', paddingLeft: 10 }}>
                Shop in Styles!
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 60, width: 60 }}
                source={require('../../assets/images/logo.png')}
              />
              <Text style={{ fontSize: 18, color: 'grey' }}>THEFIVEMENSSHOES</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: COLORS.lightWhite,
    paddingVertical: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default OrderProgressDetail;
