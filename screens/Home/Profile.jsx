import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../constants/index';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/index';
import { AppContext } from '../../components/ultil/AppContext';
import AxiosInstance from '../../components/ultil/AxiosInstance';
import { launchCameraAsync } from 'expo-image-picker';
import { ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const Profile = () => {
  const { inforuser, setinforuser } = useContext(AppContext);
  const handleSubmit = async () => {
    const response = await AxiosInstance().post('/user/update', {
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
    .matches(/^[a-zA-Z0-9 ]{5,}$/, 'Tên phải có ít nhất 5 ký tự và không có ký tự đặc biệt');

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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput style={styles.input} placeholder="Email" value={values.email} />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Tên"
              onChangeText={(text) => {
                handleChange('name')(text);
                setinforuser({ ...inforuser, name: text });
              }}
              // onBlur={handleBlur('name')}
              value={inforuser.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              onChangeText={(text) => {
                handleChange('phoneNumber')(text);
                setinforuser({ ...inforuser, phoneNumber: text });
              }}
              // onBlur={handleBlur('phoneNumber')}
              // value={inforuser.phoneNumber.toString()}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}

            <TextInput
              style={styles.input}
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

            <Button color={COLORS.black} title="CẬP NHẬT THÔNG TIN" onPress={handleSubmit} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    fontSize: 18,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    // marginBottom: 5,
  },
});
