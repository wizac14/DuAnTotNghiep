import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OrderProcessing from '../../components/order/OrderProcessing';
import { OrderProcessingStatusEnum } from '../../components/ultil/OrderProcessingStatusEnum';
import { useState } from 'react';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { useEffect } from 'react';
import { getConfigFileParsingDiagnostics } from 'typescript';

const CodPayment = (props) => {
  <View>
    <Text>aaa</Text>
  </View>;
  // const { address, phoneNumber, inforuser, cartData, totalAmount } = props.route.params;
  // const [orderProcessingStatus, setOrderProcessingStatus] = useState(
  //   OrderProcessingStatusEnum.PROCESSING
  // );
  // const handleSubmitOrder = async () => {
  //   let products = await cartData.map((cart) => {
  //     return {
  //       productId: cart?._id,
  //       unitPrice: cart?.price,
  //       quantity: cart?.quantity,
  //       color: cart?.color,
  //       size: cart?.size,
  //     };
  //   });
  //   // console.log('xxxx', products);
  //   let data = {
  //     userId: inforuser?._id,
  //     totalAmount: totalAmount,
  //     address: address,
  //     phoneNumber: phoneNumber,
  //     products: products,
  //     isPaid: false,
  //     paymentTransactionRef: '',
  //   };
  //   // console.log('adasdasa', data);
  //   // const response = AxiosIntance.post();
  // };

  // useEffect(() => {
  //   handleSubmitOrder();
  // }, []);

  // return <OrderProcessing status={orderProcessingStatus} />;
};

export default CodPayment;

const styles = StyleSheet.create({});
