import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "@gorhom/bottom-sheet";
import AxiosInstance from "../../components/ultil/AxiosInstance"
import { COLORS } from "../../constants/index";
import { MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../../constants/index";
import MasonryList from "reanimated-masonry-list";

const Favorite = (props) => {
  const { navigation } = props;
  const [brandIndex, setBrandIndex] = useState(0);
  const { colors } = useTheme();
  const [dataNe, setdataNe] = useState([]);

  const BRANDS = [
    "Nike",
    "Adidas",
    "Converse",
    "New Balance",
    "Vans",
    "FILA",
    "Other",
  ];

  useEffect(() => {
    const getFavorite = async () => {
      const response = await AxiosInstance().get("/product/get-all");
      console.log(response.products);
      if (response.result) {
        setdataNe(response.products)
      } else {
        ToastAndroid.show("Lấy data thất bại")
      }
    }
    getFavorite();
    return () => {

    }
  }, [])

  return (
    <View style={styles.container} >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 25, padding: 10, marginLeft: 130, top: 5 }}>My Wishlist</Text>
      </View>

      <FlatList
        style={{ marginTop: 10 }}
        data={BRANDS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
        }}
        renderItem={({ item, index }) => {
          const isSelected = brandIndex === index;
          return (
            <TouchableOpacity
              onPress={() => setBrandIndex(index)}
              style={{
                backgroundColor: isSelected ? colors.primary : colors.card,
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 100,
                borderWidth: isSelected ? 0 : 1,
                borderColor: "#000",
                height: 54,
                width: 100,
                justifyContent: "center",

              }}
            >
              <Text
                style={{
                  color: isSelected ? colors.background : colors.text,
                  fontWeight: "600",
                  fontSize: 12,
                  opacity: isSelected ? 1 : 0.6,
                  textAlign: "center",

                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}



      />


      <MasonryList
        data={dataNe}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => (
          <View style={{ padding: 6 }}>
            <View
              style={{
                aspectRatio: i === 0 ? 1 : 1,
                position: "relative",
                overflow: "hidden",
                borderRadius: 24,
              }}
            >
              <Pressable
                style={{ flex: 1 }}
                onPress={() => {
                  navigation.navigate("ProductDetail", {
                    id: item._id
                  });
                }}

              >
                <Image
                  source={{
                    uri: item.image
                  }}
                  resizeMode="contain"
                  style={{ flex: 1 }}
                />
              </Pressable>
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    padding: 12,
                  },
                ]}
              >
                <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#fff",
                      textShadowColor: "rgba(0,0,0,0.2)",
                      textShadowOffset: {
                        height: 1,
                        width: 0,
                      },
                      textShadowRadius: 15,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      backgroundColor: colors.card,
                      borderRadius: 100,
                      height: 32,
                      aspectRatio: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MaterialIcons
                      name="favorite-border"
                      size={20}
                      color={colors.text}

                    />
                  </View>
                </View>
                <View style={{ flex: 1 }} />
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                // intensity={20}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#fff",
                      marginLeft: 8,
                      textShadowColor: "rgba(0,0,0,0.2)",
                      textShadowOffset: {
                        height: 1,
                        width: 0,
                      },
                      textShadowRadius: 15,
                      marginTop: 15,
                    }}
                    numberOfLines={1}
                  >
                    ${item.price}
                  </Text>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 100,
                      backgroundColor: "#fff",
                    }}
                  >
                    <MaterialIcons
                      name="add-shopping-cart"
                      size={18}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        onEndReachedThreshold={0.1}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  }
})