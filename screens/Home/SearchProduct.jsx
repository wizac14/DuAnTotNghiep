import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useCallback, useRef, useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/index';
import { MaterialIcons } from '@expo/vector-icons';
import { SIZES } from '../../constants/index';
import { useNavigation, useTheme } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Card from '../../components/home/Card';
import MasonryList from 'reanimated-masonry-list';
import CustomBackdrop from '../../components/home/CustomBackdrop';
import ImageSlider from '../../components/home/ImagesSlider';
import { Pressable } from 'react-native';
import FilterView from '../../components/home/FilterView';
import AxiosInstance from '../../components/ultil/AxiosInstance';
import { UIActivityIndicator } from 'react-native-indicators';
import noImageAvailable from '../../assets/images/no_image_available.jpg';
import { AppContext } from '../../components/ultil/AppContext';
import { BlurView } from 'expo-blur';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const SearchProduct = () => {
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isProductLoading, setIsProductLoading] = useState(true);
  const { inforuser } = useContext(AppContext);
  const navigation = useNavigation();

  const handleSearchPress = () => {
    // Gọi điều hướng đến màn hình SearchDetail, truyền query tìm kiếm nếu cần
    navigation.navigate('SearchDetail');
  };

  useEffect(() => {
    const getBrands = async () => {
      const response = await AxiosInstance().get('/brand/get-all-brands');
      //   const allProduct = {
      //     name: 'Tất Cả',
      //   };
      if (response.result) {
        setBrands(response.brands);
      } else {
        console.log('Lấy data thất bại');
      }
    };

    //lấy all product
    const getProducts = async () => {
      const response = await AxiosInstance().get('/product/get-all');
      if (response.result) {
        setProducts(response.products);
        // setIsProductLoading(false);
      } else {
        ToastAndroid.show('Lấy data thất bại');
      }
    };

    getProducts();
    getBrands();
  }, []);

  //xử lý chọn thương hiệu
  const handleBrandSelect = async (brandName) => {
    setSelectedBrand(brandName);
    // setIsProductLoading(true);
    try {
      // gọi API hoặc truy vấn cơ sở dữ liệu để lấy danh sách sản phẩm của thương hiệu được chọn
      let url = `/product/get-by-brand?brandName=${brandName}`;
      //   if (brandName === 'Tất Cả') {
      //     url = `/product/get-all`;
      //   }
      const response = await AxiosInstance().get(url);

      if (response.products) {
        setProducts(response?.products);
        // setIsProductLoading(false);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm theo thương hiệu:', error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15 }}>
        <View>
          <Text style={styles.cartDetailTitle}>CỬA HÀNG</Text>
        </View>
      </SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={handleSearchPress}
          style={{
            paddingLeft: 7,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            borderBottomColor: COLORS.gray2,
            borderTopColor: COLORS.gray2,
            height: 50,
            width: '100%',
            paddingTop: 5,
          }}
        >
          <MaterialIcons style={{ marginRight: 5 }} name="search" size={34} color="black" />
          <Text style={{ fontSize: 14 }}>Tìm sản phẩm...</Text>
        </TouchableOpacity>
      </View>
      <ImageSlider />

      <SafeAreaView style={{ gap: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <FlatList
            data={brands}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              {
                //   paddingHorizontal: 10,
                //   gap: 12,
              }
            }
            renderItem={({ item, index }) => {
              const isSelected = selectedBrand === item?.name;
              return (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    key={index}
                    // onPress={() => handleBrandSelect(item.name)}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderColor: COLORS.gray2,
                      width: '100%',
                      //   justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                      <Text
                        style={{
                          // fontWeight: '600',
                          fontSize: 16,
                          textAlign: 'left',
                        }}
                      >
                        {item.name.toUpperCase()}
                      </Text>
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
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  cartDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 26,
  },
  placeToShip: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});
