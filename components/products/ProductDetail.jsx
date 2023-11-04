import { View, Text, TouchableOpacity, Image, StyleSheet ,ToastAndroid} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../../constants';
import BottomSheet from '@gorhom/bottom-sheet';
import { SliderBox } from 'react-native-image-slider-box';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { useContext } from 'react';
import { AppContext } from '../ultil/AppContext';

const ProductDetail = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(1);
  const [imageHeight, setImageHeight] = useState();
  const [isImageFlex, setIsImageFlex] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sliderImages, setSliderImages] = useState([]);
  const [colorVariances, setColorVariances] = useState([]);
  const {inforuser}=useContext(AppContext);
  const [sizeVariances, setSizeVariances] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizesForSelectedColor, setSizesForSelectedColor] = useState([]);
  const [quantityVariences, setQuantityVariences] = useState([]);
  const [remainingQuantity, setRemainingQuantity] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const [product, setProduct] = useState('');

  
  const handleSizeSelect = (varianceDetail) => {
    console.log('Kích cỡ đã chọn:', varianceDetail);
    // console.log("saiiiii",selectedSize.size);
    setSelectedSize(varianceDetail);
  
    // Tìm kích thước tương ứng và lấy số lượng sản phẩm còn lại
    const index = sizeVariances.indexOf(varianceDetail?.size);
    if (index !== -1) {
      setRemainingQuantity(quantityVariences[index]);
     
    }
  };

  const handleColorSelect = (color) => {
    console.log('Màu sắc đã chọn:', color);

    // Lấy danh sách size tương ứng với màu đã chọn từ product.variances.varianceDetail
    const sizesForSelectedColor = getSizesForColor(product?.variances, color);

    setSelectedSize(null); // Đặt kích thước đã chọn về null trước khi chọn màu mới
    setSelectedColor(color); // Lưu màu được chọn
    setSizesForSelectedColor(sizesForSelectedColor);
    setShowSizes(true); // Hiển thị danh sách kích thước
  };

  function getSizesForColor(variances, color) {
    let sizesForColor = [];

    variances?.forEach((variance) => {
      if (variance?.color === color) {
        sizesForColor = variance?.varianceDetail;
      }
    });
    console.log("aaa",sizesForColor);
    console.log("aaaaaa",count);

    return sizesForColor;
  }
  // http://localhost:3000/api/cart/new-to-cart
  const addNewCart =async()=>{
    const response = await AxiosIntance().post("/cart/new-to-cart", { idUser:inforuser._id, idProduct:product._id,color: selectedColor,size:parseInt(selectedSize.size),quantity: parseInt(count)});
    if (response.result) {
      ToastAndroid.show("Thêm vào giỏ hành thành công", ToastAndroid.SHORT);
      navigation.navigate("Cart");
    }
    else {
      ToastAndroid.show("Thêm thất bại! Hãy kiểm tra lại?", ToastAndroid.SHORT);
    }
  }
  //Hiển thị chi tiết sản phẩm theo ID
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await AxiosIntance().get('/product/get-by-id?id=' + params.id);

        if (response.result === true) {
          const productData = response.product;
          setProduct(productData); // Gán dữ liệu sản phẩm cho biến state product
          const imageUrls = [];
          const varianceShoes = [];
          const sizeOfShoes = [];
          const quantityOfShoes = [];

          productData?.variances?.forEach((variance) => {
            varianceShoes.push(variance);

            variance?.images?.forEach((image) => {
              imageUrls.push(image?.url);
            });

            variance?.varianceDetail.forEach((sizes) => {
              sizeOfShoes.push(sizes.size);
            });
            variance?.varianceDetail.forEach((quantity) => {
              quantityOfShoes.push(quantity.quantity);
            });
          });

          //lấy dữ liệu thành công
          setTitle(response.product?.title);
          setDescription(response.product.description);
          setPrice(response.product.price);
          setSliderImages(imageUrls);
          setColorVariances(varianceShoes);
          setSizeVariances(sizeOfShoes);
          setQuantityVariences(quantityOfShoes);
          console.log(varianceShoes);
        } else {
          ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        ToastAndroid.show('Lỗi kết nối', ToastAndroid.SHORT);
      }
    };

    getDetails();

    return () => {};
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SliderBox
        sliderBoxHeight={350}
        images={sliderImages}
        dotColor={COLORS.primary}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
        }}
        inactiveDotColor={COLORS.gray2}
        ImageComponentStyle={{ borderRadius: 15, width: '95%', marginTop: 30 }}
      />

      <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <StatusBar style="light" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: COLORS.black,
            }}
          >
            <Icons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: COLORS.black,
            }}
          >
            <Icons name="favorite-border" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: COLORS.black,
            }}
          >
            <Icons name="add-shopping-cart" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <BottomSheet
        detached
        snapPoints={[64, 470]}
        index={0}
        style={{ marginHorizontal: 20 }}
        bottomInset={insets.bottom + 20}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        onChange={() => {
          setImageHeight(imageHeight === '100%' ? '50%' : '100%');
          setIsImageFlex(isImageFlex === 1 ? undefined : 1);
        }}
      >
        <View style={{ padding: 16, gap: 16, flex: 1 }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: colors.text }}>{title}</Text>
            {/* {selectedSize && <Text>Số lượng: {remainingQuantity}</Text>} */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: colors.primary,
                padding: 6,
                borderRadius: 100,
              }}
            >
              <TouchableOpacity
                onPress={() => setCount((count) => Math.max(1, count - 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 34,
                }}
              >
                <Icons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.background,
                }}
              >
                {count}
              </Text>
              <TouchableOpacity
                onPress={() => setCount((count) => Math.min(remainingQuantity, count + 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 34,
                }}
              >
                <Icons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ color: colors.text, opacity: 0.5 }}>Màu sắc</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginTop: 6,
                }}
              >
                {product?.variances?.map((variance, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleColorSelect(variance?.color)}
                    style={{
                      width: selectedColor === variance?.color ? 32 : 28,
                      height: selectedColor === variance?.color ? 32 : 28,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: variance?.color,
                      borderWidth: selectedColor === variance?.color ? 3 : 1,

                      borderRadius: 44,
                    }}
                  ></TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {showSizes && (
            <View>
              {/* Hiển thị danh sách kích thước */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: colors.text, opacity: 0.5 }}>Kích thước</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginTop: 6,
                }}
              >
                {sizesForSelectedColor?.map((varianceDetail, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleSizeSelect(varianceDetail)}
                    style={{
                      width: 44,
                      height: 44,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedSize === varianceDetail ? COLORS.black : COLORS.lightWhite,
                      borderRadius: 44,
                    }}
                  >
                    <Text
                      style={{
                        color: selectedSize === varianceDetail ? colors.card : colors.text,
                        fontWeight: '600',
                        fontSize: 16,
                      }}
                    >
                      {varianceDetail?.size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 6,
                color: colors.text,
              }}
            >
              Mô tả
            </Text>
            <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={8}>
              {description}
            </Text>
          </View>

          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, opacity: 0.75, marginBottom: 4 }}>Tổng</Text>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>
                {price.toLocaleString()} đ
              </Text>
            </View>

            <TouchableOpacity 
            onPress={addNewCart}
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexDirection: 'row',
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.background,
                  paddingHorizontal: 10,
                }}
              >
                Thêm vào giỏ hàng
              </Text>

              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icons name="arrow-forward" size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ProductDetail;
