import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../constants/index';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/index';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../components/ultil/AppContext';
import AxiosIntance from '../../components/ultil/AxiosIntance';
import { launchCameraAsync } from 'expo-image-picker';
import { ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const Profile = () => {
  const navigation = useNavigation();
  const { inforuser, setinforuser } = useContext(AppContext);
  const handleSubmit = async () => {
    const response = await AxiosIntance().put('/user/update/'+ inforuser._id,{
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
      navigation.navigate('Person');
    } else {
      ToastAndroid.show('Cập nhật không thành công', ToastAndroid.SHORT);
    }
  };

  const emailValidation = yup
    .string()
    .email('Email không hợp lệ')
    .matches(
      // Regular expression để kiểm tra định dạng email
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Email không hợp lệ'
    );

  const nameValidation = yup
    .string()
    .matches(/^[a-zA-Z0-9 ]{5,}$/, 'Tên phải có ít nhất 5 ký tự và không có ký tự đặc biệt')
    .required('Hãy điền tên của bạn');

  const phoneValidation = yup
    .string()
    .matches(/^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ');

  const validationSchema = yup.object().shape({
    email: emailValidation,
    name: nameValidation,
    address: yup.string().required('Hãy điền địa chỉ'),
    phoneNumber: phoneValidation,
  });

  const initialValues = {
    name: inforuser.name,
    email: inforuser.email,
    address: inforuser.address,
    phoneNumber: inforuser.phoneNumber,
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', top: "10%"}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={30}/>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Cập nhật thông tin</Text>
        </View>
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View > 
            <View style={styles.viewItem}>
              <TextInput style={styles.textHint} placeholder="Email" value={values.email} editable={false} />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>
            <View style={styles.viewItem} >
            <TextInput
              style={styles.textHint}
              placeholder="Name"
              onChangeText={(text) => {
                handleChange('name')(text);
                setinforuser({ ...inforuser, name: text });
              }}
              // onBlur={handleBlur('name')}
              value={inforuser.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            </View> 

            <View style={styles.viewItem}>
            <TextInput
              style={styles.textHint}
              placeholder="Sđt"
              onChangeText={(text) => {
                handleChange('phoneNumber')(text);
                setinforuser({ ...inforuser, phoneNumber: text });
              }}
              // onBlur={handleBlur('phoneNumber')}
              value={inforuser.phoneNumber.toString()}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}
            </View>
            <View style={styles.viewItem}>
            <TextInput
              style={styles.textHint}
              placeholder="Địa chỉ"
              onChangeText={(text) => {
                handleChange('address')(text);
                setinforuser({ ...inforuser, address: text });
              }}
              // onBlur={handleBlur('address')}
              value={inforuser.address}
            />
            {touched.address && errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}
            </View>
            <Pressable style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnUpdate}>CẬP NHẬT THÔNG TIN</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
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
  error: {
    color: 'red',
    marginTop:5
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 70,
    marginBottom: 30,
  },
  viewItem: {
    marginTop: 25,
    height: 55,
    width:'100%',
    backgroundColor: '#F5F7F8',
    borderRadius: 10,
  },
  textHint: {
    marginLeft: 10,
    lineHeight: 24,
    top: '20%',
    color: 'black',
    fontSize: 16,
  },
  btn: {
    marginTop:50,
    backgroundColor: 'black',
    height: 50,
    borderRadius: 10,
  },
  btnUpdate: {
    color: 'white',
    textAlign: 'center',
    top: '20%',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
