import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import React, { useState } from 'react';
import AxiosInstance from '../components/ultil/AxiosIntance';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const RegisterUser = async () => {
    console.log(email, password);
    try {
      const response = await AxiosInstance().post('/user/register', {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      });
      console.log(response);
      if (response.result == true) {
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);

        navigation.navigate('Login');
      } else {
        ToastAndroid.show('Đăng ký không thành công', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error RegisterUser', error);
    }
  };

  return (
    <View className="bg-slate-100 h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require('../assets/images/backgroundd.png')}
      />

      <View className="h-full w-full flex justify-around pt-48">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Đăng ký
          </Animated.Text>
        </View>

        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-white p-3 rounded-2xl w-full"
          >
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ width: 250 }}
              placeholder="Tên của bạn"
              placeholderTextColor={'gray'}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-white p-3 rounded-2xl w-full"
          >
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ width: 250 }}
              placeholder="Email"
              placeholderTextColor={'gray'}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-white p-3 rounded-2xl w-full "
          >
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{ width: 250 }}
              placeholder="Mật khẩu"
              placeholderTextColor={'gray'}
              secureTextEntry
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-white p-3 rounded-2xl w-full "
          >
            <TextInput
              value={address}
              onChangeText={(text) => setAddress(text)}
              style={{ width: 250 }}
              placeholder="Địa chỉ của bạn"
              placeholderTextColor={'gray'}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-white p-3 rounded-2xl w-full mb-3"
          >
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={{ width: 250 }}
              placeholder="Số diện thoại của bạn"
              placeholderTextColor={'gray'}
            />
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(600).duration(1000).springify()}
          >
            <TouchableOpacity
              onPress={RegisterUser}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">Đăng ký</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text className="text-sky-600">Đăng nhập</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
