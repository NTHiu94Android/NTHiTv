import {
  Text, View, ScrollView, TouchableOpacity, Alert, Pressable,
  TextInput, Platform, Image, PermissionsAndroid, StatusBar, ActivityIndicator
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
import VideoView from 'react-native-easy-video'

//Xem video
const Src00201 = ({ route }) => {
  const navigation = useNavigation();
  const [movieId, setMovieId] = useState(null)
  const [videoSource, setVideoSource] = useState('https://fetch.cloudz.win/tt/play/260510ea-f015-44e3-a2bd-aa4a65f6ff4c.m3u8');
  const [lstVideo, setLstVideo] = useState([]);
  const [videoSelected, setVideoSelected] = useState(null);
  useEffect(() => {
    if (route.params && route.params.movie_id) {
      setMovieId(route.params.movie_id);
      fetchData(route.params.movie_id);
    }
  }, []);

  //------------FetchData--------------
  const fetchData = async (movieId) => {
    const body = {
      pro: 'NTH_MV_SEL_LEP_001',
      data: [movieId]
    };
    console.log('body: ', body);
    CustomAxios().post('/api/exec-no-auth', body)
      .then(res => {
        if (!res) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
        if (res.error) {
          Alert.alert('Thông báo', res.message);
        }
        // if (res.message == 'Token expired') {
        //   RefreshToken({
        //     token: REFRESH_TOKEN,
        //     username: userPk,
        //     calback: fetchData(userPk),
        //     logout: async () => {
        //       await AsyncStorage.clear();
        //       navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
        //     }
        //   });
        //   return;
        // }
        if (res.data && res.data[0]) {
          console.log('res.data: ', res.data[0]);
          setLstVideo(res.data[0]);
          if(res.data[0][0]){
            setVideoSelected(res.data[0][0]);
            setVideoSource(res.data[0][0].link);
          }
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };


  return (
    <View style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="light-content"
      />
      <View style={{ paddingTop: 30, }}>
        {videoSource ? (
          <VideoView
            source={{ uri: videoSource, type: 'm3u8' }}
            height={250}
            controls={true}
            resizeMode="contain"
            allowsExternalPlayback={true}
            autoPlay={true}
            selectedTextTrack={{ type: 'title', value: 'English' }}
            goBack={() => navigation.goBack()}
          />
        ) : (
          <View style={{
            height: 250, width: '100%',
            backgroundColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={{ color: '#fff', marginTop: 10 }}>
              Đang tải video...
            </Text>
          </View>
        )}
      </View>
      <ScrollView style={{ flex: 1, padding: 10, minHeight: 300, backgroundColor: 'yellow' }}>


      </ScrollView>

    </View>
  )
}

export default Src00201