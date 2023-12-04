import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { axiosClient } from '../api/axiosClient';
import AxiosIntance from '../components/ultil/AxiosIntance';
import { ToastAndroid } from 'react-native';
import { AppContext } from '../components/ultil/AppContext';
import { useContext } from 'react';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const { setisLogin, setinforuser } = useContext(AppContext);

  const LoginUser = async () => {
    try {
      const response = await AxiosIntance().post('/user/login', {
        email: email,
        password: password,
      });
      if (response.error == false) {
        console.log('user:', response.data.user);
        console.log('token:', response.data.token);

        await AsyncStorage.setItem('token', response.data.token);
        ToastAndroid.show('Đăng nhập thành công ', ToastAndroid.SHORT);
        setisLogin(true);
        setinforuser(response.data.user);
        navigation.navigate('Home');
      }
    } catch (error) {
      ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
    }
  };
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('../assets/images/bgred.png')} />

      <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center ">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Đăng nhập
          </Animated.Text>
        </View>

        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full"
          >
            <TextInput
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-4 rounded-2xl w-full  justify-between flex-row"
          >
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={isSecureEntry}
              placeholder="Mật khẩu"
              placeholderTextColor={'gray'}
            />
            <Ionicons
              style={{ padding: 5 }}
              name={isSecureEntry ? 'eye' : 'eye-off'}
              size={20}
              color="grey"
              onPress={() => setIsSecureEntry(!isSecureEntry)}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row items-end justify-end"
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity onPress={() => navigation.push('Forgot Password')}>
              <Text className="text-red-600">Quên mật khẩu?</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity onPress={LoginUser} className="w-full bg-red-700 p-3 rounded-2xl ">
              <Text className="text-xl font-bold text-white text-center">Đăng nhập</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.push('Register')}>
              <Text className="text-red-600">Đăng ký ngay!</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
