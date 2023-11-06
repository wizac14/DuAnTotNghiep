import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import noImageAvailable from '../../assets/images/no_image_available.jpg';

const ItemCart = (props) => {
  const { dulieu, removeItemFromCart } = props;
  const [count, setCount] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        {/* <Image style={styles.image} source={{ uri: dulieu.idProduct.image }} /> */}
        {dulieu.idProduct?.variances[0]?.images[0]?.url ? (
          <Image
            style={styles.image}
            source={{
              uri: dulieu.idProduct?.variances[0].images[0].url,
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
              {/* <Image style={styles.color} source={{ uri: dulieu?.color }} /> */}
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
              <Text style={styles.textPrice}>{dulieu.idProduct.price.toLocaleString()}đ</Text>
            </View>
            <View style={styles.viewValue}>
              <View>
                <TouchableOpacity onPress={() => setCount((count) => Math.max(1, count - 1))}>
                  <Ionicons
                    name="remove-outline"
                    size={15}
                    style={{ marginLeft: 10, marginTop: 5 }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.textQuantity}>{dulieu.quantity}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => setCount((count) => Math.min(remainingQuantity, count + 1))}
                >
                  <Ionicons name="add-outline" size={15} style={{ marginLeft: 10, marginTop: 5 }} />
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
    backgroundColor: '#EEEEEE',
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
