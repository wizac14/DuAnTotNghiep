import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../constants/index';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/index';
import { AppContext } from '../../components/ultil/AppContext';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { ToastAndroid } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const windowWIdth = Dimensions.get('window').width;

const Person = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={styles.title}>Thông tin người dùng</Text>
        </View>
        <View
          style={{ borderWidth: 1, borderColor: '#F5F7F8', left: '5%', width: windowWIdth - 30 * 2 , marginBottom:20, }}
        />
        <TouchableOpacity onPress={() => {navigation.navigate('Profile')}}>
          <View style={{ flexDirection: 'row', height: 50, justifyContent:'space-between' }}>
            <View style={{ justifyContent: 'center', left: 10 }}>
              <Ionicons name="person-outline" size={25} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 500 , right:'30%'}}>
                Cập nhật thông tin
              </Text>
            </View>
            <View style={{ justifyContent: 'center', }}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('ChangePassword')}}>
          <View style={{ flexDirection: 'row', height: 50, justifyContent:'space-between' }}>
            <View style={{ justifyContent: 'center', left: 10 }}>
              <Ionicons name="key-outline" size={25} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 500 , right:'60%'}}>
                Đổi mật khẩu
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
          <View style={{ flexDirection: 'row', height: 50 , justifyContent:'space-between'}}>
            <View style={{ justifyContent: 'center', left: 10 }}>
              <Ionicons name="log-out-outline" size={25} color='red' />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 500 , color:'red',right:'90%'}}>
                Đăng xuất
              </Text>
            </View>
            <View style={{ justifyContent: 'center',}}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Person;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 70,
    marginBottom: 20,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
