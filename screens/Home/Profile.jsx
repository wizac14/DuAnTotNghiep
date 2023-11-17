import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../constants/index';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/index';
import { AppContext } from '../../components/ultil/AppContext';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { launchCameraAsync } from 'expo-image-picker';
import { ToastAndroid } from 'react-native';

const Profile = () => {
  const { inforuser, setinforuser } = useContext(AppContext);
  const updateprofile = async () => {
    const response = await AxiosIntance().post('/user/update', {
      name: inforuser.name,
      email: inforuser.email,
      address: inforuser.address,
      phoneNumber: inforuser.phoneNumber,
      dob: inforuser.dob,
      image: inforuser.image,
      gender: inforuser.gender,
    });
    if (response.result) {
      ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Cập nhật không thành công', ToastAndroid.SHORT);
    }
  };
  const capture = async () => {
    const result = await launchCameraAsync();
    console.log(result.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    // const response= await AxiosIntance("multipart/form-data").post('/media/upload',formdata);
    // console.log(response.data.path);
    // setinforuser({...inforuser,avatar: response.data.path});
    const response = await AxiosIntance('multipart/form-data').post('/user/upload-image', formdata);
    console.log('aaa' + response);
    setinforuser({ ...inforuser, image: response.link });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={capture} style={styles.circle}>
            {inforuser.image == '' ? (
              <Image style={styles.image} source={require('../../assets/images/fn2.jpg')}></Image>
            ) : (
              <Image style={styles.image} source={{ uri: inforuser.image }} />
            )}
          </TouchableOpacity>
          <Image
            style={{ marginTop: 70, marginLeft: -10 }}
            source={require('../../assets/images/editing.png')}
          ></Image>
        </View>
        <TextInput
          style={styles.textHint}
          placeholder="Email"
          value={inforuser.email}
          onChangeText={(text) => setinforuser({ ...inforuser, email: text })}
          placeholderTextColor="gray"
        ></TextInput>
        <TextInput
          style={styles.textHint}
          value={inforuser.name}
          onChangeText={(text) => setinforuser({ ...inforuser, name: text })}
          placeholder="Martias Duarte"
          placeholderTextColor="gray"
        ></TextInput>
        <TextInput
          style={styles.textHint}
          value={inforuser.address}
          onChangeText={(text) => setinforuser({ ...inforuser, address: text })}
          placeholder="Address"
          placeholderTextColor="gray"
        ></TextInput>
        <TextInput
          style={styles.textHint}
          value={'0' + inforuser.phoneNumber.toString()}
          onChangeText={(text) => setinforuser({ ...inforuser, phoneNumber: text })}
          placeholder="Phone number"
          placeholderTextColor="gray"
        ></TextInput>
        <TextInput
          style={styles.textHint}
          placeholder="gender"
          value={inforuser.gender}
          onChangeText={(text) => setinforuser({ ...inforuser, gender: text })}
          placeholderTextColor="gray"
        ></TextInput>
        <TextInput
          style={[styles.textHint, { marginBottom: 30 }]}
          placeholder="Birthday"
          value={inforuser.dob}
          onChangeText={(text) => setinforuser({ ...inforuser, dob: text })}
          placeholderTextColor="gray"
        ></TextInput>

        <Button onPress={updateprofile} color="black" title="Press me" />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textHint: {
    marginVertical: 0,
    marginHorizontal: 10,
    marginTop: 25,
    height: 50,
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#FFFAF0',
    // borderWidth:1
  },
  btn: {
    marginTop: 20,
  },
});
