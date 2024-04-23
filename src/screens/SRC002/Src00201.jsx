import {
  Text, View, ScrollView, TouchableOpacity, Alert, Pressable,
  TextInput, Platform, Image, PermissionsAndroid
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TTHeader from '../../components/TTHeader';
import Color from '../../assest/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAxios from '../../helpers/FetchApi';
import Loading from '../../components/TTLoading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Xac minh tai lieu
const Src00201 = ({route}) => {
  const navigation = useNavigation();
  const [movieId, setMovieId] = useState(null)
  useEffect(() => {
    console.log('route', route);
    if(route.params && route.params.movie_id){
      setMovieId(route.params.movie_id);
      console.log('route.params.movie_id', route.params.movie_id);
    }
  }, []);

  //------------FetchData--------------
  // const fetchData = async (userPk) => {
  //   const body = {
  //     pro: 'EC_SYS_MBI_SEL_CUST001_001_1',
  //     data: [userPk]
  //   };
  //   console.log('body: ', body);
  //   CustomAxios().post('/api/exec-auth', body)
  //     .then(res => {
  //       if(!res) {
  //         Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
  //       }
  //       if (res.error) {
  //         Alert.alert('Thông báo', res.message);
  //       }
  //       if (res.message == 'Token expired') {
  //         RefreshToken({
  //           token: REFRESH_TOKEN,
  //           username: userPk,
  //           calback: fetchData(userPk),
  //           logout: async () => {
  //             await AsyncStorage.clear();
  //             navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
  //           }
  //         });
  //         return;
  //       }
  //       if (res.data){

  //       }
  //     })
  //     .catch(err => {
  //       console.log('Error: ', err);
  //     });
  // };


  return (
    <View style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <TTHeader
        width='100%'
        hasTitle={true}
        title='Xác thực thông tin cửa hàng'
        hasIconRight1={true}
        iconRight1='headset'
        iconRightOnPress={() => {
          console.log('headset');
        }}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1, padding: 10 }}>
          

        </ScrollView>
      </KeyboardAwareScrollView>

    </View>
  )
}

export default Src00201