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
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { UIActivityIndicator } from 'react-native-indicators';
import noImageAvailable from '../../assets/images/no_image_available.jpg';
import { AppContext } from '../../components/ultil/AppContext';
const Home = () => {
  const BRANDS = ['Nike', 'Adidas', 'Converse', 'New Balance', 'Vans', 'FILA', 'Other'];

  const AVATAR_URL =
    'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4225f4a7-dc73-4926-a99f-a677f56346fe/cortez-se-shoes-Pfr5Qh.png';

  const MESONARY_LIST_DATA = [
    {
      imageUrl:
        'https://product.hstatic.net/1000383440/product/dscf5501_4fff8f1b43554d7c83b7b29a3393d6bb_master.jpg',
      title: "Nike Air Force 1 '07 LV8",
      price: 160,
    },
    {
      imageUrl:
        'https://media.jdsports.com/i/jdsports/DR9761_002_P2?$default$&w=670&h=670&bg=rgb(237,237,237)',
      title: 'Nike Tech Hera',
      price: 180,
    },
    {
      imageUrl:
        'https://media.jdsports.com/i/jdsports/DM9537_002_P1?$default$&w=671&&h=671&bg=rgb(237,237,237)',
      title: 'NIKE AIR MAX SYSTM',
      price: 200,
    },
    {
      imageUrl:
        'https://media.jdsports.com/i/jdsports/FN7509_029_P1?$default$&w=671&&h=671&bg=rgb(237,237,237)',
      title: 'Nike P-6000 Premium',
      price: 180,
    },
    {
      imageUrl:
        'https://media.jdsports.com/i/jdsports/FQ8080_133_P1?$default$&w=671&&h=671&bg=rgb(237,237,237)',
      title: 'NIKE DUNK LOW ATHLETIC',
      price: 120,
    },
  ];
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isProductLoading, setIsProductLoading] = useState(true);
  const { inforuser } = useContext(AppContext);

  useEffect(() => {
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

    //lấy all product
    const getProducts = async () => {
      const response = await AxiosIntance().get('/product/get-all');
      if (response.result) {
        setProducts(response.products);
        setIsProductLoading(false);
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
    setIsProductLoading(true);
    try {
      // gọi API hoặc truy vấn cơ sở dữ liệu để lấy danh sách sản phẩm của thương hiệu được chọn
      let url = `/product/get-by-brand?brandName=${brandName}`;
      if (brandName === 'Tất Cả') {
        url = `/product/get-all`;
      }
      const response = await AxiosIntance().get(url);

      if (response.products) {
        setProducts(response?.products);
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
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header Section */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {inforuser.image != '' ? (
            <Image
              style={{
                width: 52,
                aspectRatio: 1,
                borderRadius: 52,
              }}
              resizeMode="cover"
              source={{ uri: inforuser?.image }}
            />
          ) : (
            <Image
              source={{
                uri: AVATAR_URL,
              }}
              style={{
                width: 52,
                aspectRatio: 1,
                borderRadius: 52,
              }}
              resizeMode="cover"
            />
          )}

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
              Tìm phong cách yêu thích của bạn
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Favourite');
            }}
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
        {/* Search Bar Section */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 24,
            gap: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              paddingHorizontal: 24,
              flexDirection: 'row',
              gap: 12,
            }}
          >
            <MaterialIcons name="search" size={24} color={colors.text} style={{ opacity: 0.5 }} />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: colors.text,
                opacity: 0.5,
              }}
            >
              Tìm kiếm
            </Text>
          </TouchableOpacity>
          {/* filter       */}
          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              backgroundColor: colors.primary,
            }}
          >
            <MaterialIcons name="tune" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>
        <ImageSlider />
        {/* Grid Collection View */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
              }}
            >
              Sản phẩm mới
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: colors.primary,
                }}
              >
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 200,
              gap: 12,
            }}
          >
            <Card
              onPress={() => {
                navigation.navigate('ProductDetail', {
                  // screen: "ProductDetail",
                  id: '123',
                });
              }}
              price={120}
              imageUrl="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/88dd90f5-a2a1-41f9-b44a-f5f1227c706c/cortez-se-shoes-Pfr5Qh.png"
            />
            <View style={{ flex: 1, gap: 12 }}>
              <Card
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    id: '456',
                  });
                }}
                price={120}
                imageUrl="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4225f4a7-dc73-4926-a99f-a677f56346fe/cortez-se-shoes-Pfr5Qh.png"
              />
              <Card
                onPress={() => {
                  navigation.navigate('ProductDetail', {
                    id: '789',
                  });
                }}
                price={120}
                imageUrl="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cc4e52ff-007b-4934-9bac-368604f0d54d/cortez-se-shoes-Pfr5Qh.png"
              />
            </View>
          </View>
        </View>
        {/* Brands Section */}
        <FlatList
          data={brands}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = selectedBrand === item?.name;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleBrandSelect(item.name)}
                style={{
                  backgroundColor: isSelected ? colors.text : colors.background,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: colors.border,
                  width: 120,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: '600',
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.6,
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {/* Mesonary */}
        {isProductLoading ? (
          <View
            style={{
              height: Dimensions.get('window').height * 0.25,
              // backgroundColor: 'red',
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
            contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
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
            renderItem={({ item, i }) => (
              <View style={{ padding: 6 }}>
                <View
                  style={{
                    aspectRatio: i === 0 ? 1 : 1,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 24,
                    elevation: 2,
                  }}
                >
                  <Pressable
                    style={{ width: '100%', height: '100%' }}
                    onPress={() => {
                      navigation.navigate('ProductDetail', {
                        id: item._id,
                      });
                    }}
                  >
                    {item?.variances[0]?.images[0]?.url ? (
                      <Image
                        style={{ flex: 1 }}
                        source={{
                          uri: item?.variances[0].images[0].url,
                        }}
                        // resizeMode="contain"
                      />
                    ) : (
                      <Image resizeMode="contain" source={noImageAvailable} />
                    )}
                  </Pressable>
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        padding: 12,
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 8,
                        padding: 4,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontWeight: '900',
                          color: COLORS.black,
                          textShadowColor: 'rgba(0,0,0,0.1)',
                          textShadowOffset: {
                            height: 1,
                            width: 0,
                          },
                          textShadowRadius: 15,
                        }}
                      >
                        {item.title}
                      </Text>
                      <TouchableOpacity
                        style={{
                          // backgroundColor: colors.card,
                          borderRadius: 100,
                          height: 32,
                          aspectRatio: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialIcons name="favorite-border" size={20} color={colors.text} />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(0,0,0,0)',
                        alignItems: 'flex-end',
                        overflow: 'hidden',
                        justifyContent: 'space-between',
                      }}
                      intensity={20}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.black,
                          marginLeft: 8,
                          textShadowColor: 'rgba(0,0,0,0)',
                          textShadowOffset: {
                            height: 0,
                            width: 0,
                          },
                          textShadowRadius: 15,
                          marginTop: 25,
                          backgroundColor: COLORS.lightWhite,
                          borderRadius: 5,
                        }}
                        numberOfLines={1}
                      >
                        {item.price.toLocaleString()} đ
                      </Text>
                      {/* <TouchableOpacity
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 100,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          alignContent: 'flex-end',
                        }}
                      >
                        <MaterialIcons name="add-shopping-cart" size={18} color="#000" />
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              </View>
            )}
            onEndReachedThreshold={0.1}
            keyExtractor={(item) => item._id}
          />
        )}
      </SafeAreaView>

      <BottomSheetModal
        snapPoints={['85%']}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <FilterView />
      </BottomSheetModal>
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
