import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { AppContext } from '../../components/ultil/AppContext';
import MasonryList from 'reanimated-masonry-list';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import { UIActivityIndicator } from 'react-native-indicators';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import moment from 'moment';
const StatisticalScreen = () => {
  const { inforuser } = useContext(AppContext);
  const paddingPercentage = 2;
  const { width, height } = Dimensions.get('window');
  const [statisticaMonth, setstatisticaMonth] = useState([]);
  const [statisticaDay, setstatisticaDay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [date1, setDate1] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [date2, setDate2] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [dailyPayments, setDailyPayments] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showchart, setShowChart] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDate1(formattedDate);
    console.log(date1, "aaaa");
    hideDatePicker();
  };
  const handleConfirm1 = (date1) => {
    console.log("A date has been picked: ", date1);
    const formattedDate = moment(date1).format('YYYY-MM-DD');
    setDate2(formattedDate);
    console.log(date2, "aaaa2");
    hideDatePicker2();
  };
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional,

      }
    ],
    // legend: ["Rainy Days"] // optional
  };

  statisticaMonth.forEach(item => {
    data.labels.push(item._id.month + "/" + item._id.year);
    data.datasets[0].data.push(item.totalAmount);
  });

  const dataDailyDay = {
    labels: [],
    datasets: [
      {
        data: [],
        // optional
        strokeWidth: 2, // optional,
      }
    ]
  }
  dailyPayments.forEach(item => {
    dataDailyDay.labels.push(item.date);
    dataDailyDay.datasets[0].data.push(item.totalAmount);
  });





  const statisticalUser = async () => {
    try {
      const userId = inforuser._id;
      const response = await AxiosIntance().get("/order/getTotalAmountByMonth?userId=" + userId + "&isPaid==true");
      setstatisticaMonth(response.totalAmountByMonth);
      console.log(response.totalAmountByMonth, "aaa");
      // const totalAmountArray = statisticaMonth.map(item => item.totalAmount);
      // console.log(totalAmountArray[0]);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const statisticalDailyPayments = async () => {
    //modal notice
    const response = await AxiosIntance().post('/order/getDailyPayments', {
      userId: inforuser._id,
      isPaid: true,
      fromDate: date1,
      toDate: date2
    });
    setDailyPayments(response.totalAmount);
    setShowChart(true);
    console.log(dailyPayments);
  };
  const statisticalUserbyDay = async () => {
    try {
      const userId = inforuser._id;
      const response = await AxiosIntance().get("/order/getTotalAmount?userId=" + userId + "&isPaid==true" + "&fromDate=" + date1 + "&toDate=" + date2);
      setstatisticaDay(response.totalAmount);
      setShowStatistics(true);
      statisticalDailyPayments();
      // console.log(response.totalAmount);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    statisticalUser();
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ paddingVertical: 14, gap: 24 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 32,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 2,
              borderColor: COLORS.black,
            }}
          >
            <Icons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1 }}>
            THỐNG KÊ
          </Text>
        </View>
        {isLoading ? (
          <View
            style={{
              // height: Dimensions.get('window').height * 0.75,
              height: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UIActivityIndicator size={30} color={COLORS.black} />
          </View>
        ) : (
          <View>
            <View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1, margin: 10 }}>Thống kê theo tháng</Text>
              </View>
              {statisticaMonth.length> 0&& (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text style={{ color: "green", fontWeight: 'bold' }}>Tháng</Text>
                <Text style={{ color: "green", fontWeight: 'bold' }}>Số lượng</Text>
                <Text style={{ color: "green", fontWeight: 'bold' }}>Tiền chi</Text>
              </View>
              )}
              {statisticaMonth.length>0&&statisticaMonth.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}>
                  <Text>{item._id.month + "/" + item._id.year}</Text>
                  <Text>{item.totalProducts}</Text>
                  <Text>{item.totalAmount} VNĐ</Text>
                </View>
              ))}
              {statisticaMonth.length>0 ? (
              <BarChart
                // style={graphStyle}
                data={data}
                width={width}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#006633",
                  backgroundGradientTo: "#33CC33",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  barPercentage: 1,
                  color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                  style: {
                    borderRadius: 10
                  },
                  yAxisInterval: 1,

                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,

                }}
              // verticalLabelRotation={10}
              />
              ) : (
                <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
                  Rất tiếc, không có sản phẩm.Hãy lựa chọn sản phẩm thích hợp nào.
                </Text>
              )}

            </View>
            <View >
              <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1, margin: 10 }}>Thống kê theo ngày</Text>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <View style={{ flexDirection: 'row', height: 25 }}>
                  <TouchableOpacity onPress={showDatePicker} style={{ marginLeft: 10 }} >
                    <Icons name="date-range" size={24} color={"green"} />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 10 }} >{date1}</Text>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  <Icons name="arrow-right-alt" size={24} color={"green"} />
                  <TouchableOpacity onPress={showDatePicker2} style={{ marginLeft: 10 }} >
                    <Icons name="date-range" size={24} color={"green"} />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 10 }} >{date2}</Text>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible2}
                    mode="date"
                    onConfirm={handleConfirm1}
                    onCancel={hideDatePicker2}
                  />
                </View>
                <TouchableOpacity onPress={statisticalUserbyDay}>
                  <Text>Xem thống kê</Text>
                </TouchableOpacity>
              </View>
            </View>
            {showStatistics && (
              <View style={{ flexDirection: "column", margin: 10, backgroundColor: "#F5F7F8" }}>
               
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>Tổng tiền</Text>
                  <Icons name='attach-money' color={"green"} size={24}></Icons>
                </View>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: "green", textAlign: "center" }}>{statisticaDay} VNĐ</Text>
                {statisticaDay !== 0 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', borderTopWidth: 1 }}>
                  <Text style={{ color: "green", fontWeight: 'bold' }}>Ngày</Text>
                  <Text style={{ color: "green", fontWeight: 'bold' }}>Số lượng</Text>
                  <Text style={{ color: "green", fontWeight: 'bold' }}>Tiền chi</Text>
                </View>
                )}
                {statisticaDay !== 0 &&dailyPayments.map((item, index) => (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Text>{item.date}</Text>
                    <Text>{item.totalProducts}</Text>
                    <Text>{item.totalAmount} VNĐ</Text>
                  </View>
                ))}
              </View>
            )}
            {showchart && (
              <View style={{ flexDirection: "column", backgroundColor: "#F5F7F8" }}>
                {statisticaDay !== 0 ? (
                  <LineChart
                    data={dataDailyDay}
                    width={width}
                    height={220}
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#fb8c00",
                      backgroundGradientTo: "#ffa726",
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#e26a00",

                      }
                    }}
                    bezier
                    style={{
                      borderRadius: 16,

                    }}
                  />
                ) : (
                  <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
                    Vui lòng chọn ngày khác!
                  </Text>
                )}
              </View>

            )}
          </View>

        )}
      </SafeAreaView>
    </ScrollView>
  );

};

export default StatisticalScreen

const styles = StyleSheet.create({

})
