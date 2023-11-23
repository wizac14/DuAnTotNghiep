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
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Person = () => {
  const navigation = useNavigation();
  const { inforuser, setisLogin} = useContext(AppContext);

  const logOut = () =>{
     setisLogin(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cài đặt</Text>
          </View>
          <View style={styles.viewAvatar}>
             <Image style={styles.avatar} source={require('../../assets/images/fn5.jpg')} /> 
          </View>
          <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
            {inforuser?.name}
          </Text>
          <Text style={{ textAlign: 'center' }}>{inforuser?.email}</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mua hàng</Text>
        </View>

        <TouchableOpacity>
          <View style={styles.item}>
            <View style={{ justifyContent: 'center', left: 10 }}>
              <Ionicons name="reader-outline" size={25} color="orange" />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 500, right: '50%',top:'10%'}}>Lịch sử mua hàng</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{marginBottom:10, marginLeft:10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cài đặt chung</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <View style={styles.item}>
            <View style={{ justifyContent: 'center', left: 10 }}>
              <Ionicons name="person-outline" size={25} color='green' />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 500, right: '45%', top:'10%' }}>
                Cập nhật thông tin
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
        >
          <View style={styles.item}>
            <View style={{ justifyContent: 'center', left: 10 }}>
              <Ionicons name="key-outline" size={25} color='blue'/>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 500, right: '80%' , top:'10%' }}>Đổi mật khẩu</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut}>
          <View style={styles.item}>
            <View style={{ justifyContent: 'center', left: 10 }}>
              <Ionicons name="log-out-outline" size={25} color="red" />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 500, color: 'red', right: '120%', top:'10%'  }}>
                Đăng xuất
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
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
  header: {
    height: '40%',
    backgroundColor: '#F5F7F8',
    borderRadius: 30,
  },
  viewAvatar: {
    alignItems: 'center',
    borderRadius: 30,
    height: '50%',
    bottom: '5%',
  },
  avatar: {
    width: '35%',
    height: '100%',
    borderRadius: 60,
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
  item: {
    backgroundColor: '#F5F7F8',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 20,
  },
});
