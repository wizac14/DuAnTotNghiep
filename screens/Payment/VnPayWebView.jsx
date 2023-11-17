import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import queryString from 'query-string';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { UIActivityIndicator } from 'react-native-indicators';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import OrderProcessing from '../../components/order/OrderProcessing';
export default function VnPayWebView(props) {
  const { paymentUrl } = props.route.params;
  const navigation = useNavigation();
  const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(document.querySelector("pre").innerHTML);
})();`;
  const [isLoading, setIsLoading] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  console.log('khoi tao', isLoading);
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (!isLoading) {
        navigation.dispatch(e.data.action);
        return;
      }
      console.log('Dauma');
      e.preventDefault();
    });
  }, [navigation, isLoading]);

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 24 }}>
      <View style={{ flex: isLoading ? 0 : 1 }}>
        <WebView
          source={{ uri: paymentUrl }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onMessage={(event) => {
            let responseUrl = event.nativeEvent.url;
            if (responseUrl.includes('vnpay_result')) {
              setIsLoading(true);
              let responseData = JSON.parse(event.nativeEvent.data);
              console.log(responseData);
              //   if (responseData.responseCode === '24') {
              //     setIsLoading(true);
              //     navigation.navigate('CartDetail');
              //   }
            }
          }}
        />
      </View>
      {isLoading && <OrderProcessing />}
    </SafeAreaView>
  );
}
