import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import noImageAvailable from '../../assets/images/no_image_available.jpg';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { COLORS } from '../../constants';

const ItemCart = (props) => {
  const { dulieu, removeItemFromCart } = props;
  const [count, setCount] = useState(dulieu?.quantity || 1);

  const fetchProductQuantity = async () => {
    try {
      const response = await AxiosIntance().get(
        `/product/get-quantity?product_id=${dulieu?.idProduct?._id}&size=${dulieu?.size}&color=${dulieu?.color}`
      );
      const apiQuantity = response?.result;
      console.log(apiQuantity);
      return apiQuantity?.quantity;
    } catch (error) {
      console.error('Lỗi', error);
    }
  };

  const handleIncrease = async () => {
    // setCount((prevCount) => prevCount + 1);
    let newQuantity = await fetchProductQuantity(); //5
    setCount((pre) => {
      if (pre < newQuantity) {
        return pre + 1;
      } else {
        return pre;
      }
    });
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        {dulieu?.idProduct?.variances[0]?.images[0]?.url ? (
          <Image
            style={styles.image}
            source={{
              uri: dulieu?.idProduct?.variances[0].images[0].url,
            }}
            resizeMode="contain"
          />
        ) : (
          <Image resizeMode="contain" source={noImageAvailable} />
        )}
      </View>
      <View style={{ width: '55%' }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', height: '25%' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{dulieu.idProduct?.title}</Text>
          </View>

          <View style={{ flexDirection: 'row', height: '33%', gap: 10, alignItems: 'center' }}>
            <View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: dulieu?.color,
                  width: 28,
                  height: 28,
                  borderRadius: 44,
                  borderWidth: 1,
                }}
              ></TouchableOpacity>
            </View>
            <View>
              <Text>{dulieu?.color}</Text>
            </View>
            <View>
              <Text>{dulieu.size}</Text>
            </View>
          </View>
          <View style={styles.view2}>
            <View>
              <Text style={styles.textPrice}>đ{dulieu?.idProduct?.price.toLocaleString()}</Text>
            </View>
            <View style={styles.viewValue}>
              <View>
                <TouchableOpacity onPress={handleDecrease}>
                  <Ionicons name="remove-outline" size={20} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.textQuantity}>{count}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={handleIncrease}>
                  <Ionicons name="add-outline" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ width: '20%' }}>
        <View>
          <TouchableOpacity style={styles.icon} onPress={() => removeItemFromCart(dulieu?._id)}>
            <Ionicons name="trash-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: COLORS.offwhite,
    borderRadius: 20,
  },
  viewColor: {
    marginTop: 10,
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  viewImage: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    width: '25%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  icon: {
    marginTop: 20,
    marginRight: 30,
  },
  view1: {
    flexDirection: 'column',
  },
  view2: {
    flexDirection: 'row',
  },
  viewValue: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    width: 80,
    marginLeft: 40,
    borderRadius: 50,
    marginTop: 10,
  },
  textName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
  },

  textPrice: {
    fontSize: 20,
    // fontWeight: 'bold',
    marginTop: 10,
  },
  textQuantity: {
    marginTop: 3,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
