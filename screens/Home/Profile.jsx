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
  Platform
} from 'react-native';
import React, { useContext, useState } from 'react';
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

const Profile = () => {
  const { inforuser, setinforuser } = useContext(AppContext);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dob, setDob] = useState(inforuser.dob);
  const updateprofile = async () => {
    const response = await AxiosIntance().put('/user/update/' + inforuser._id, {
      name: inforuser.name,
      email: inforuser.email,
      address: inforuser.address,
      phoneNumber: inforuser.phoneNumber,
      dob:dob,
      image: inforuser.image,
      gender: inforuser.gender,
    });
    if (response.result) {
      ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Cập nhật không thành công', ToastAndroid.SHORT);
    }
  };
  const dialogImageChoose = () => {
    return Alert.alert('Thông báo', 'Chọn phương thức lấy ảnh', [
      {
        text: 'Chụp ảnh ',
        onPress: () => {
          capture();
        },
      },
      {
        text: 'Tải ảnh lên',
        onPress: () => {
          getImageLibrary();
        },
      },
      {
        text: 'Hủy',
      },
    ]);
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
    const response = await AxiosIntance('multipart/form-data').post('/user/upload-image', formdata);
    console.log(response.link);
    if (response.result) {
      setinforuser({ ...inforuser, image: response.link });
      ToastAndroid.show('Upload Image Success', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Upload Image Failed', ToastAndroid.SHORT);
    }
  };
  const getImageLibrary = async () => {
    const result = await launchImageLibraryAsync();
    console.log(result.assets[0].uri);
    const formData = new FormData();
    formData.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    const response = await AxiosIntance('multipart/form-data').post('/user/upload-image', formData);
    console.log(response.link);
    if (response.result) {
      setinforuser({ ...inforuser, image: response.link });
      ToastAndroid.show('Upload Image Success', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Upload Image Failed', ToastAndroid.SHORT);
    }
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDob(formatDate(currentDate));
        
      }
    } else {
      toggleDatePicker();
    }
  };
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
   

    //Bé hơn 10 thì thêm số 0
    month = month < 10 ? `0${month}` : `${month}`;
    day = day < 10 ? `0${day}` : `${day}`;
    return `${day}-${month}-${year}`;
  };
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={dialogImageChoose} style={styles.circle}>
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
        <KeyboardAvoidingView>
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
            value={'0' + inforuser.phoneNumber}
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
          <View>
            {showPicker && (
              <RNDateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                positiveButton={{ label: 'OK', textColor: COLORS.black}}
                negativeButton={{ label: 'Cancel', textColor: COLORS.tertiary}}
              />
            )}
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                style={[styles.textHint, {marginBottom:30}]}
                placeholder="Birthday"
                editable={false}
                value={dob}
                onChangeText={(text) => setDob({ dob: text })}
              ></TextInput>
            </Pressable>
          </View>
          <Button onPress={updateprofile} color="black" title="Press me" />
        </KeyboardAvoidingView>
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
