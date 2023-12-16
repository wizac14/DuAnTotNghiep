import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, SafeAreaView, StatusBar, Image, TouchableWithoutFeedback, Button } from 'react-native'
import React, { useState } from 'react'
import { useTheme, useNavigation } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/Ionicons';
import { Video, ResizeMode } from 'expo-av';
import { COLORS } from '../../constants';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Collapsible from 'react-native-collapsible';
import AxiosIntance from '../ultil/AxiosIntance';
import { useEffect } from 'react';

const ItemRating = (props) => {
  const video = React.useRef(null);
  const {dulieu, navigation } = props;
  const [status, setStatus] = React.useState({});
  const [collapsedProduct, setCollapsedProduct] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [countHearts, setCountHearts] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const moment = require('moment');
  require('moment/locale/vi'); 
  const thoiDiemCanFormat = moment(dulieu?.date);
  const khoangThoiGian = thoiDiemCanFormat.fromNow();
  const handleImagePress = (image) => {
    setPreviousImage(selectedImage); // Lưu hình ảnh cũ
    setSelectedImage(image); // Chọn hình ảnh mới
    setModalVisible(true); // Hiển thị modal
  };
  const handleHeartClick = async () => {
    try {
      setCountHearts(dulieu?.countHearts);
      const action = isClicked ? 'unclick' : 'click'; // Toggle the action based on the current state
      const response = await AxiosIntance().post('/ratingProduct/updateCountHearts?id='+dulieu._id +'&action=' +action, 

      );
      if(response.result)
      {
        setCountHearts(response.updatedRating.countHearts);
      setIsClicked(!isClicked); // Toggle the state of isClicked
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handlePlayPause = () => {
    if (status.isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };
  const toggleCollapseProduct = () => {
    setCollapsedProduct(!collapsedProduct);
    
  };
  useEffect(() => {
  
}, [countHearts]);
  const { colors } = useTheme();
  const paddingPercentage = 2;
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={styles.image}>
          <Image
            style={styles.img}
            source={require("../../assets/images/logo.png")}
          />
        </View>
        <Text style={{ fontSize: 18, margin: 10, fontWeight: "bold" }}>{dulieu.idUser?.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center", marginLeft: 60, width: 60, borderWidth: 1.5, height: 45, borderColor: "black", borderRadius: 20, paddingVertical: 12, }}>
          <Image style={{
            width: 15,
            height: 15
          }}
            source={
              require('../../assets/images/star.png')
            }
          >
          </Image>
          <Text
            style={{
              color: "black",
              fontWeight: "600",
              fontSize: 14,
              opacity: 0.6,

              marginLeft: 10
            }}
          >
            {dulieu?.star}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 15, margin: 10, }}>{dulieu?.ratingStatus}</Text>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
        onPress={toggleCollapseProduct}>
        <Text style={{ fontSize: 15 }}>
          Xem hình ảnh
        </Text>
        <Icon name={collapsedProduct ? 'chevron-down-outline' : 'chevron-up-outline'} size={24} color="grey" />
      </TouchableOpacity>
      <Collapsible style={{}} collapsed={collapsedProduct}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Modal visible={modalVisible} transparent={true} animationType="fade">
              <View style={{  justifyContent: 'center', alignItems: 'center', height: 500, backgroundColor: "lightgrey" }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={selectedImage}
                  />
                </TouchableWithoutFeedback>
              </View>
            </Modal>
            <View style={{ margin:20  }}>
            
              <TouchableWithoutFeedback onPress={() => handleImagePress({uri:dulieu?.image})}>
                <Image
                 source={{uri: dulieu?.image}}
                  style={{ width: 100, height: 100 }}
                  
                 
                />
              </TouchableWithoutFeedback>

            </View>
          </View>
          <View style={{ width: 50, height: 50, backgroundColor: 'white' }} />

          <View >
          <TouchableWithoutFeedback onPress={() => setModalVisible1(true)}>
            <Video
              ref={video}
              style={{ width: 200, height: 200 }}
              source={{uri: dulieu?.video}}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={status => setStatus(status)}
            />
          </TouchableWithoutFeedback>
          </View>
        </View>
      </Collapsible>
      <Modal visible={modalVisible1} transparent={true}>
        <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
          <Video
            ref={video}
            style={{ width: 350, height: 450, position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            source={{uri: dulieu?.video}}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(status)}
          />
          <TouchableWithoutFeedback onPress={() => setModalVisible1(false)}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,  }} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={handleHeartClick}> 
        
          <Icon name={isClicked ? 'heart' : 'heart-outline'}  style={{color:"red"}} size={30}></Icon>
      
          </TouchableOpacity>
          <Text style={{margin:5}}>{countHearts}</Text>
          </View>
          <Text style={{margin:5,color:"grey"}}>{khoangThoiGian}</Text>
       
      </View>
    </View>
  )
}

export default ItemRating

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    flexDirection: "column",
    borderWidth: 0.5,
    borderColor: "red"

  },
  image: {
    width: 50, // Đặt kích thước của hình ảnh
    height: 50,
    borderRadius: 75, // Đặt borderRadius bằng một nửa chiều rộng (hoặc chiều cao) để tạo hình tròn
    overflow: 'hidden',
    backgroundColor: "lightgrey",

  },
  img: {
    width: '100%',
    height: '100%',
  }
})