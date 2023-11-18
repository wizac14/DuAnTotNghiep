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
import MasonryList from 'reanimated-masonry-list';
import ImageSlider from '../../components/home/ImagesSlider';
import { Pressable } from 'react-native';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { UIActivityIndicator } from 'react-native-indicators';
import { AppContext } from '../../components/ultil/AppContext';
import Animated from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { Layout } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Home = () => {
  const AVATAR_URL =
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4225f4a7-dc73-4926-a99f-a677f56346fe/cortez-se-shoes-Pfr5Qh.png';

  const { colors } = useTheme();
  const bottomSheetModalRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isProductLoading, setIsProductLoading] = useState(true);
  const { inforuser } = useContext(AppContext);
  const newFirstProduct = products[0];
  const newSecondProduct = products[1];
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const pageSize = 6;
  let offset = 0;
  const paddingPercentage = 2;
  const { width, height } = Dimensions.get('window');

  // const loadMoreProducts = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await AxiosIntance().get(`/product/get-limited?limit=4&offset=${offset}`);
  //     if (response.result) {
  //       const newProducts = response.products;
  //       setProducts((oldProducts) => [...oldProducts, ...newProducts]);
  //       offset += 4;
  //       console.log(offset);
  //     } else {
  //       ToastAndroid.show('Lấy data thất bại');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching more products:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getBrands();
    getProducts();
  }, []);

  // useEffect(() => {
  //   loadMoreProducts();
  // }, []);

  // const handleScroll = (event) => {
  //   // console.log('hi');
  //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  //   // Kiểm tra nếu người dùng đã cuộn đến cuối trang và chưa tải hết sản phẩm
  //   if (
  //     layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
  //     !isLoading &&
  //     !isAllLoaded
  //   ) {
  //     loadMoreProducts();
  //   }
  // };

  //lấy all product
  const getProducts = async () => {
    const response = await AxiosIntance().get('/product/get-all');
    if (response.result) {
      // Đảo ngược danh sách sản phẩm
      const reversedProducts = response?.products.reverse();
      // Giới hạn chỉ hiển thị 12 sản phẩm
      // const limitedProducts = reversedProducts.slice(0, 4);

      setProducts(reversedProducts);
      setIsProductLoading(false);
    } else {
      ToastAndroid.show('Lấy data thất bại');
    }
  };

  const getBrands = async () => {
    const response = await AxiosIntance().get('/brand/get-all-brands');
    const allProduct = {
      name: 'Tất Cả',
    };
    if (response.result) {
      setBrands([allProduct, ...response.brands]);
    } else {
      console.log('Lấy data thất bại');
    }
  };

  //xử lý chọn thương hiệu
  const handleBrandSelect = async (brandName) => {
    setSelectedBrand(brandName);
    setIsProductLoading(true);
    try {
      let url = `/product/get-by-brand?brandName=${brandName}`;
      if (brandName === 'Tất Cả') {
        url = `/product/get-all`;
      }
      const response = await AxiosIntance().get(url);

      if (response.products) {
        const reversedProducts = response?.products.reverse();
        // const limitedProducts = reversedProducts.slice(0, 4);

        setProducts(reversedProducts);
        setIsProductLoading(false);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm theo thương hiệu:', error);
    }
  };

  //mở filter view
  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const navigation = useNavigation();
  return (
    // <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        <Animated.View
          layout={Layout}
          entering={FadeIn.duration(1000)}
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 8,
                color: colors.text,
              }}
              numberOfLines={1}
            >
              Xin chào {inforuser?.name} 👋
            </Text>
            <Text
              style={{
                color: colors.text,
                opacity: 0.75,
              }}
              numberOfLines={1}
            >
              Tìm phong cách yêu thích của bạn {'>'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <TouchableOpacity
              style={{
                width: 52,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 52,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 52,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 52,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <MaterialIcons name="favorite-border" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ImageSlider />
        <View style={{ paddingHorizontal: (width * paddingPercentage) / 100 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'center',
              marginBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
              borderTopColor: COLORS.gray2,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: COLORS.red,
                marginBottom: 6,
                marginTop: 6,
                textAlign: 'left',
              }}
            >
              SẢN PHẨM MỚI
            </Text>
          </View>
          <View style={{ flexDirection: 'row', height: 250, gap: 12 }}>
            {newFirstProduct ? (
              <View style={{ flex: 1, gap: 6 }}>
                <View style={{ gap: 6, flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      gap: 6,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray2,
                    }}
                  >
                    <View
                      style={{
                        aspectRatio: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        height: 140,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      <Pressable
                        style={{ width: '100%', height: 200, flex: 1 }}
                        onPress={() => {
                          navigation.navigate('ProductDetail', { id: newFirstProduct?._id });
                        }}
                      >
                        <Image
                          style={{ height: 200, width: '100%', flex: 1, aspectRatio: 1 }}
                          source={{ uri: newFirstProduct?.variances[0]?.images[0]?.url }}
                        />
                        <Text
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: 'red',
                            color: 'white',
                            padding: 6,
                            borderBottomRightRadius: 10,
                          }}
                        >
                          NEW
                        </Text>
                      </Pressable>

                      <View
                        style={[
                          StyleSheet.absoluteFill,
                          {
                            padding: 12,
                          },
                        ]}
                      >
                        <View style={{}}></View>
                      </View>
                    </View>
                    <View
                      style={{
                        aspectRatio: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        height: 140,
                        borderRadius: 10,
                        // elevation: 1,
                      }}
                    >
                      <Pressable
                        style={{ width: '100%', height: 200, flex: 1 }}
                        onPress={() => {
                          navigation.navigate('ProductDetail', { id: newFirstProduct?._id });
                        }}
                      >
                        <Image
                          style={{ height: 200, width: '100%', flex: 1, aspectRatio: 1 }}
                          source={{ uri: newFirstProduct?.variances[0]?.images[1]?.url }}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      aspectRatio: 3 / 4,
                      position: 'relative',
                      overflow: 'hidden',
                      height: 310,
                      borderRadius: 10,
                      elevation: 1,
                    }}
                  >
                    <Pressable
                      style={{ width: '100%', flex: 1 }}
                      onPress={() => {
                        navigation.navigate('ProductDetail', { id: newFirstProduct?._id });
                      }}
                    >
                      <Image
                        style={{
                          flex: 1,
                          aspectRatio: 1,
                        }}
                        source={{ uri: newFirstProduct?.variances[0]?.images[2]?.url }}
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: 'white',
                          color: 'black',
                          padding: 3,
                          borderTopLeftRadius: 10,
                          // width: 80,
                          fontSize: 16,
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        {newFirstProduct?.title.toUpperCase()}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 16, color: colors.text }}>
                  Rất tiếc, không có sản phẩm mới. Vui lòng quay lại sau!
                </Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', height: 250, gap: 12, marginTop: 100 }}>
            {newSecondProduct ? (
              <View style={{ flex: 1, gap: 6 }}>
                <View style={{ gap: 6, flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      gap: 6,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray2,
                    }}
                  >
                    <View
                      style={{
                        aspectRatio: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        height: 140,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      <Pressable
                        style={{ width: '100%', height: 200, flex: 1 }}
                        onPress={() => {
                          navigation.navigate('ProductDetail', { id: newSecondProduct?._id });
                        }}
                      >
                        <Image
                          style={{ height: 200, width: '100%', flex: 1, aspectRatio: 1 }}
                          source={{ uri: newSecondProduct?.variances[0]?.images[0]?.url }}
                        />
                        <Text
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: 'red',
                            color: 'white',
                            padding: 6,
                            borderBottomRightRadius: 10,
                          }}
                        >
                          NEW
                        </Text>
                      </Pressable>

                      <View
                        style={[
                          StyleSheet.absoluteFill,
                          {
                            padding: 12,
                          },
                        ]}
                      >
                        <View style={{}}></View>
                      </View>
                    </View>
                    <View
                      style={{
                        aspectRatio: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        height: 140,
                        borderRadius: 10,
                      }}
                    >
                      <Pressable
                        style={{ width: '100%', height: 200, flex: 1 }}
                        onPress={() => {
                          navigation.navigate('ProductDetail', { id: newSecondProduct?._id });
                        }}
                      >
                        <Image
                          style={{ height: 200, width: '100%', flex: 1, aspectRatio: 1 }}
                          source={{ uri: newSecondProduct?.variances[0]?.images[1]?.url }}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      aspectRatio: 3 / 4,
                      position: 'relative',
                      overflow: 'hidden',
                      height: 310,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      style={{ width: '100%', flex: 1 }}
                      onPress={() => {
                        navigation.navigate('ProductDetail', { id: newSecondProduct?._id });
                      }}
                    >
                      <Image
                        style={{ flex: 1, aspectRatio: 1 }}
                        source={{ uri: newSecondProduct?.variances[0]?.images[2]?.url }}
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: 'white',
                          color: 'black',
                          padding: 3,
                          borderTopLeftRadius: 10,
                          // width: 80,
                          fontSize: 16,
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        {newSecondProduct?.title.toUpperCase()}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 16, color: colors.text }}>
                  Rất tiếc, không có sản phẩm mới. Vui lòng quay lại sau!
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{ paddingHorizontal: (width * paddingPercentage) / 100 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray2,
              marginTop: 60,
              // width: '100%',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: COLORS.red,
                marginBottom: 6,
                marginTop: 6,
                textAlign: 'left',
              }}
            >
              KHÁM PHÁ
            </Text>
          </View>
          <FlatList
            data={brands}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: (width * paddingPercentage) / 100,
              gap: 6,
              // marginTop: 90,
            }}
            renderItem={({ item, index }) => {
              const isSelected = selectedBrand === item?.name;
              return (
                <View>
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleBrandSelect(item.name)}
                    style={{
                      backgroundColor: isSelected ? COLORS.black : COLORS.white,
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.border,
                      width: 130,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? colors.background : colors.text,
                        fontWeight: '600',
                        fontSize: isSelected ? 18 : 16,
                        opacity: isSelected ? 1 : 0.6,
                        textAlign: 'center',
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        {/* Mesonary */}
        {isProductLoading ? (
          <View
            style={{
              height: Dimensions.get('window').height * 0.25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={colors.text} />
          </View>
        ) : (
          <MasonryList
            data={products}
            numColumns={2}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: (width * paddingPercentage) / 100,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  height: Dimensions.get('window').height * 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>Rất tiếc, không có sản phẩm nào.</Text>
                <Text>Hãy khám phá các thương hiệu khác nhé!</Text>
              </View>
            }
            renderItem={({ item, i }) => (
              <View style={{ padding: 2, alignContent: 'center' }}>
                <View
                  style={{
                    aspectRatio: i === 0 ? 2.5 / 4 : 2.5 / 4,
                    position: 'relative',
                    overflow: 'hidden',
                    elevation: 0,
                  }}
                >
                  <Pressable
                    style={{
                      width: '100%',
                      height: '100%',
                      borderWidth: 0.7,
                      borderColor: COLORS.gray2,
                      paddingBottom: 45,
                    }}
                    onPress={() => {
                      navigation.navigate('ProductDetail', {
                        id: item._id,
                      });
                    }}
                  >
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item?.variances[0].images[0].url,
                      }}
                      resizeMode="contain"
                    />

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'column',
                        color: 'white',
                        fontSize: 16,
                        textAlign: 'center',
                        justifyContent: 'center',
                        paddingLeft: 10,
                        gap: 3,
                        paddingBottom: 10,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: 'white',
                          width: 140,
                          alignItems: 'flex-start',
                        }}
                      >
                        <Text style={{ textAlign: 'left', color: 'black', fontSize: 16 }}>
                          {item?.title}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          backgroundColor: 'black',
                          fontSize: 18,
                          letterSpacing: 0.5,
                          width: 100,
                        }}
                      >
                        đ {item?.price.toLocaleString()}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            )}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item._id}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: 'absolute',
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    zIndex: 999,
  },
  cartNumber: {
    fontWeight: '600',
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});
