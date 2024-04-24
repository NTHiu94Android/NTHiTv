import {
  Text, View, ScrollView, TouchableOpacity, Alert, Pressable, Dimensions,
  Image, StatusBar, ActivityIndicator, ImageBackground
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
import VideoView from 'react-native-easy-video';
import MVItem from '../components/MVItem';
import LinearGradient from 'react-native-linear-gradient';

//Xem video
const Src00201 = ({ route }) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  //Phim dang xem
  const [videoSource, setVideoSource] = useState(null);
  const [lstVideo, setLstVideo] = useState([]);
  const [infoMovie, setInfoMovie] = useState(null);
  const [videoSelected, setVideoSelected] = useState(null);
  //Danh sanh phim de xuat
  const [lstDeXuat, setLstDeXuat] = useState([]);
  //------------UseEffect--------------
  useEffect(() => {
    if (route.params && route.params.movie_id) {
      fetchData(route.params.movie_id);
    }
  }, []);

  //------------FetchData--------------
  const fetchData = async (movieId) => {
    const body = {
      pro: 'NTH_MV_SEL_MVD_001',
      data: [movieId]
    };
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
          // console.log('res.data: ', res.data[0]);
          setLstVideo(res.data[0]);
          if (res.data[0][0]) {
            setVideoSelected(res.data[0][0]);
            setVideoSource(res.data[0][0].link);
          }
        }
        if (res.data && res.data[1]) {
          console.log('infoMovie: ', res.data[1][0]);
          setInfoMovie(res.data[1][0]);
        }

        setLstDeXuat(dataHot);

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
      {/* Video player */}
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
      {/* Thong tin phim */}
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {infoMovie ? (
          <View style={{}}>
            {/* title */}
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              {infoMovie.name}
            </Text>
            {/* info */}
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {/* rate */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="star" size={20} color={Color.mainColor} />
                <Text style={{ color: 'white', marginLeft: 2, fontWeight: 'bold', color: Color.mainColor }}>
                  {infoMovie.rate}
                </Text>
              </View>
              {/* nam phat hanh */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Text style={{ color: '#333', }}>|</Text>
                <Text style={{ color: 'white', marginLeft: 10, }}>
                  {infoMovie.crt_yr_nm}
                </Text>
              </View>
              {/* Quoc gia */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Text style={{ color: '#333', }}>|</Text>
                <Text style={{ color: 'white', marginLeft: 10, }}>
                  {infoMovie.area_nm}
                </Text>
              </View>
            </View>
            {/* intro */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: '#999', marginTop: 5, }}>
                {infoMovie.intro} Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus,
                ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris.
              </Text>
            </View>
            {/* Danh sach dien dien + dao dien */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {lst_actor && lst_actor.map((item, index) => {
                  return (
                    <View key={index} style={{
                      alignItems: 'center', justifyContent: 'center',
                      marginRight: 15, flexDirection: 'row',
                    }}>
                      <Image
                        source={{ uri: item.avatar_url }}
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        resizeMode="cover"
                      />
                      <View style={{ marginLeft: 10, flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', }}>{item.name}</Text>
                        <Text style={{ color: '#999', }}>{item.role_nm}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>

            {/* list video */}
            {infoMovie.type_mv_code && infoMovie.type_mv_code == 'MV04001' && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Danh sách tập phim
                </Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {lstVideo.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: videoSelected && videoSelected._id == item._id ? Color.mainColor : 'white',
                          borderRadius: 5,
                          marginVertical: 5,
                          marginRight: 5,
                          paddingHorizontal: 10,
                          paddingVertical: 8
                        }}
                        onPress={() => {
                          setVideoSelected(item);
                          setVideoSource(item.link);
                          console.log('item: ', item);
                        }}
                      >
                        <Text style={{
                          color: videoSelected && videoSelected._id == item._id ? 'white' : 'black',
                          fontWeight: 'bold'
                        }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* De xuat */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>
                Phim đề xuất cho bạn
              </Text>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
                {lstDeXuat && lstDeXuat.length > 0 && (
                  lstDeXuat.map((item, index) => {
                    return (
                      <View key={index} style={{ padding: 2, width: '33%' }}>
                        <MVItem
                          image_url={item.image_url}
                          name={item.name}
                          pay_nm={item.pay_nm}
                          pay_code={item.pay_code}
                          release_code={item.release_code}
                          episode_count={item.episode_count}
                          onPress={() => { navigation.navigate("SRC00201", { movie_id: item._id }) }}
                        />
                      </View>
                    )
                  })
                )}
              </View>
            </View>

            <ImageBackground
              source={require('../../assest/images/bg_mv.jpg')}
              style={{
                height: 200,
                width: '100%',
                marginTop: 20,
              }}
              resizeMode='cover'
            >
              <LinearGradient
                colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  zIndex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{
                  alignItems: 'center',
                  marginHorizontal: 5,
                  marginBottom: 5,
                  flexDirection: 'column',
                }}>
                  <Text style={{ color: 'white', fontSize: 13, }} numberOfLines={1}>
                    Không có nội dung bạn muốn xem?
                  </Text>
                  <Text style={{ color: 'white', fontSize: 13, marginTop: 4 }} numberOfLines={1}>
                    Hãy vào kho phim của chúng tôi
                  </Text>

                  <Pressable style={{
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 4,
                    marginTop: 8,
                    paddingHorizontal: 10,
                  }}>
                    <Text style={{
                      color: '#333',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                      Tìm kiếm nhiều nội dung hơn nữa
                    </Text>
                  </Pressable>
                </View>
              </LinearGradient>
            </ImageBackground>

          </View>
        ) : (
          <ActivityIndicator
            size="small" color="#fff"
            style={{ alignSelf: 'center', marginTop: 30 }}
          />
        )}
      </ScrollView>

    </View>
  )
}

export default Src00201;

const lst_actor = [
  {
    "_id": 1,
    "name": "Ngô Thanh Vân",
    "avatar_url": "https://image.motchilltv.app/avatar/ninh-an-nhu-mong2919-x500.webp",
    "role": 1,
    "role_nm": "Đạo diễn",
    "birthday": "19121979",
    "nationality": "Việt Nam",
  },
  {
    "_id": 2,
    "name": "Will Smith",
    "avatar_url": "https://image.motchilltv.app/avatar/ninh-an-nhu-mong2919-x500.webp",
    "role": 2,
    "role_nm": "Diễn viên",
    "birthday": "19121979",
    "nationality": "Mỹ",
  },
  {
    "_id": 3,
    "name": "Will Smith",
    "avatar_url": "https://image.motchilltv.app/avatar/ninh-an-nhu-mong2919-x500.webp",
    "role": 2,
    "role_nm": "Diễn viên",
    "birthday": "19121979",
    "nationality": "Mỹ",
  },
  {
    "_id": 4,
    "name": "Will Smith",
    "avatar_url": "https://image.motchilltv.app/avatar/ninh-an-nhu-mong2919-x500.webp",
    "role": 2,
    "role_nm": "Diễn viên",
    "birthday": "19121979",
    "nationality": "Mỹ",
  },
];

const dataHot = [
  {
    "_id": 1,
    "area_code": "MV01001",
    "area_nm": "Trung Quốc",
    "crt_dt": "2024-04-22T00:00:00.000Z",
    "crt_yr_code": "MV03005",
    "crt_yr_nm": "2023",
    "episode_count": 40,
    "image_url": "https://image.motchilltv.app/avatar/ninh-an-nhu-mong2919-x500.webp",
    "name": "Trường Nguyệt Tẫn Minh Trường Nguyệt Tẫn Minh Trường Nguyệt Tẫn Minh",
    "pay_code": "MV05002",
    "pay_nm": "Miễn phí",
    "type_mv_code": "MV04001",
    "type_mv_nm": "Phim bộ",
    "release_code": "MV06001",
    "release_nm": "Hoàn tất",
  },
  {
    "_id": 2,
    "area_code": "MV01001",
    "area_nm": "Trung Quốc",
    "crt_dt": "2024-04-22T00:00:00.000Z",
    "crt_yr_code": "MV03005",
    "crt_yr_nm": "2023",
    "episode_count": 40,
    "image_url": "https://image.motchilltv.app/avatar/truong-nguyet-tan-minh-x500.webp",
    "name": "Trường Nguyệt Tẫn Minh",
    "pay_code": "MV05001",
    "pay_nm": "VIP",
    "type_mv_code": "MV04001",
    "type_mv_nm": "Phim bộ",
    "release_code": "MV06002",
    "release_nm": "Cập nhật",
  },
  {
    "_id": 3,
    "area_code": "MV01001",
    "area_nm": "Trung Quốc",
    "crt_dt": "2024-04-22T00:00:00.000Z",
    "crt_yr_code": "MV03005",
    "crt_yr_nm": "2023",
    "episode_count": 40,
    "image_url": "https://image.motchilltv.app/avatar/ninh-an-nhu-mong2919-x500.webp",
    "name": "Trường Nguyệt Tẫn Minh",
    "pay_code": "MV05001",
    "pay_nm": "VIP",
    "type_mv_code": "MV04001",
    "type_mv_nm": "Phim bộ",
    "release_code": "MV06002",
    "release_nm": "Cập nhật",
  },
  {
    "_id": 4,
    "area_code": "MV01001",
    "area_nm": "Trung Quốc",
    "crt_dt": "2024-04-22T00:00:00.000Z",
    "crt_yr_code": "MV03005",
    "crt_yr_nm": "2023",
    "episode_count": 40,
    "image_url": "https://image.motchilltv.app/avatar/truong-nguyet-tan-minh-x500.webp",
    "name": "Trường Nguyệt Tẫn Minh",
    "pay_code": "MV05001",
    "pay_nm": "VIP",
    "type_mv_code": "MV04001",
    "type_mv_nm": "Phim bộ",
    "release_code": "MV06002",
    "release_nm": "Cập nhật",
  },
  {
    "_id": 5,
    "area_code": "MV01001",
    "area_nm": "Trung Quốc",
    "crt_dt": "2024-04-22T00:00:00.000Z",
    "crt_yr_code": "MV03005",
    "crt_yr_nm": "2023",
    "episode_count": 40,
    "image_url": "https://image.motchilltv.app/avatar/ninh-an-nhu-mong2919-x500.webp",
    "name": "Trường Nguyệt Tẫn Minh",
    "pay_code": "MV05001",
    "pay_nm": "VIP",
    "type_mv_code": "MV04001",
    "type_mv_nm": "Phim bộ",
    "release_code": "MV06002",
    "release_nm": "Cập nhật",
  },
  {
    "_id": 6,
    "area_code": "MV01001",
    "area_nm": "Trung Quốc",
    "crt_dt": "2024-04-22T00:00:00.000Z",
    "crt_yr_code": "MV03005",
    "crt_yr_nm": "2023",
    "episode_count": 40,
    "image_url": "https://image.motchilltv.app/avatar/truong-nguyet-tan-minh-x500.webp",
    "name": "Trường Nguyệt Tẫn Minh",
    "pay_code": "MV05001",
    "pay_nm": "VIP",
    "type_mv_code": "MV04001",
    "type_mv_nm": "Phim bộ",
    "release_code": "MV06002",
    "release_nm": "Cập nhật",
  }
];