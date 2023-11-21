import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../constants";
import BottomSheet from "@gorhom/bottom-sheet";
import AxiosInstance from "../../components/ultil/AxiosInstance"

const ProductDetail = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;


  const [sizes, setSizes] = useState([]);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(1);
  const [imageHeight, setImageHeight] = useState();
  const [isImageFlex, setIsImageFlex] = useState();

  const [imageUrl, setimageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const handleIconClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setWishlist([...wishlist, "Item"]); // Thay "Item" bằng thông tin của mục trong danh sách yêu thích
    }
  };


  //Hiển thị chi tiết sản phẩm theo ID
  useEffect(() => {
    const getDetails = async () => {
      const response = await AxiosInstance().get(
        "/product/get-by-id?id=" + params.id
      );
      console.log(response);
      if (response.result === true) {
        //lấy dữ liệu thành công

        setimageUrl(response.product.image);
        setTitle(response.product.title);
        setDescription(response.product.description);
        setPrice(response.product.price);
        setSizes(response.product.sizes);
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT);
      }
    };

    getDetails();

    return () => { };
  }, []);


  useEffect(() => {
    const addFavorite = async () => {
      const response = await AxiosInstance().post("/favorite//add-new", {
        id: params.id,
      });
      console.log(response);
      if (response.result === true) {
        //lấy dữ liệu thành công
        ToastAndroid.show("Thêm vào yêu thích thành công", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Thêm vào yêu thích thất bại", ToastAndroid.SHORT);
      }
    };

    addFavorite ();
    return () => { };
  }, [wishlist]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        resizeMode="contain"
        source={{
          uri: imageUrl,
        }}
        style={{ flex: isImageFlex, height: imageHeight, position: "relative" }}
      />

      <SafeAreaView
        edges={["top"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <StatusBar style="light" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: COLORS.black,
            }}
          >
            <Icons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={handleIconClick}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: COLORS.black,
            }}
          >
            <Icons name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? COLORS.red : COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
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
        snapPoints={[64, 500]}
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
          setImageHeight(imageHeight === "100%" ? "50%" : "100%");
          setIsImageFlex(isImageFlex === 1 ? undefined : 1);
        }}
      >
        <View style={{ padding: 16, gap: 16, flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text }}>
            {title}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", gap: 2 }}>
                {new Array(5).fill("").map((_, i) => (
                  <Icons
                    key={i}
                    name={i < 5 ? "star" : "star-border"}
                    color="#facc15"
                    size={20}
                  />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  opacity: 0.5,
                  marginTop: 4,
                }}
              >
                5.0 (25K đánh giá)
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
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
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 34,
                }}
              >
                <Icons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background,
                }}
              >
                {count}
              </Text>
              <TouchableOpacity
                onPress={() => setCount((count) => Math.min(10, count + 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 34,
                }}
              >
                <Icons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: colors.text, opacity: 0.5 }}>
                Bảng size
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 6,
              }}
            >
              {sizes.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSize(s)}
                  style={{
                    width: 44,
                    height: 44,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: s === size ? colors.primary : colors.card,
                    borderRadius: 44,
                  }}
                >
                  <Text
                    style={{
                      color: s === size ? colors.card : colors.text,
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 6,
                color: colors.text,
              }}
            >
              Mô tả
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={8}
            >
              {description}
            </Text>
          </View>

          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: colors.text, opacity: 0.75, marginBottom: 4 }}
              >
                Tổng
              </Text>
              <Text
                style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}
              >
                {price.toLocaleString()} $
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexDirection: "row",
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
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
                  alignItems: "center",
                  justifyContent: "center",
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
