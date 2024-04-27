import { Text, View, StatusBar, TextInput, Platform, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import Color from '../../assest/colors';
import CustomAxios from '../../helpers/FetchApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Search movie
const Src00202 = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [lstMovie, setLstMovie] = useState([]);
  const [lstMovieDefault, setLstMovieDefault] = useState([]);
  const [lstMovieName, setLstMovieName] = useState([]);
  const [lstMovieNameDefault, setLstMovieNameDefault] = useState([]);
  const [lstNameSearchHistory, setLstNameSearchHistory] = useState([]);

  useEffect(() => {
    fetchData();
    AsyncStorage.getItem('lstNameSearchHistory')
      .then(res => {
        if (res) {
          let lst = JSON.parse(res);
          console.log('lst history from asynstorage', lst);
          setLstNameSearchHistory(lst ? lst : []);
        }
      })
      .catch(err => { })
  }, []);

  //-------------Fetch data default----------------
  const fetchData = () => {
    CustomAxios().post("/api/exec-no-auth", {
      pro: 'NTH_MV_SEL_MVL_003',
      data: [input]
    })
      .then(res => {
        if (res && res.error) {
          console.log(res.error);
          return;
        }
        if (res && res.data) {
          setLstMovieDefault(res.data[0] ? res.data[0] : []);
          setLstMovie(res.data[0] ? res.data[0] : []);
          setLstMovieNameDefault(res.data[1] ? res.data[1] : []);
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  //-------------Search movie----------------
  const [isShowLstMovieName, setIsShowLstMovieName] = useState(false);
  const [isShowIconClose, setIsShowIconClose] = useState(false);
  useEffect(() => {
    if (input != '') {
      let lst = lstMovieNameDefault.filter(item => {
        return item.name.toLowerCase().includes(input.toLowerCase());
      }); //filter
      setLstMovieName(lst);
      setIsShowLstMovieName(true);
    } else {
      setIsShowLstMovieName(false);
      setLstMovie(lstMovieDefault);
      setLstMovieName(lstMovieNameDefault);
    }
  }, [input]);

  const fetchMovieDetail = (movie) => {
    CustomAxios().post("/api/exec-no-auth", {
      pro: 'NTH_MV_SEL_MVL_004',
      data: [movie._id]
    })
      .then(res => {
        if (res && res.error) {
          console.log(res.error);
          return;
        }
        if (res && res.data) {
          setLstMovie(res.data[0] ? res.data[0] : []);
          setIsShowLstMovieName(false);
          AsyncStorage.getItem('lstNameSearchHistory')
            .then(res => {
              if (res) {
                let lst = JSON.parse(res);
                console.log('lst history from asynstorage', lst);
                if (lst.length > 0) {
                  let index = lst.findIndex(item => item._id == movie._id);
                  if (index == -1) {
                    lst.unshift(movie);
                    if (lst.length > 5) {
                      lst.pop();
                    }
                  }
                } else {
                  lst.push(movie);
                }
                AsyncStorage.setItem('lstNameSearchHistory', JSON.stringify(lst));
                setLstNameSearchHistory(lst ? lst : []);
              } else {
                AsyncStorage.setItem('lstNameSearchHistory', JSON.stringify([movie]));
                setLstNameSearchHistory([movie] ? [movie] : []);
              }
            })
            .catch(err => { });
        }
      })
      .catch(err => {
        console.log(err);
      })
  };

  //-------------Render item movie----------------
  const itemMovie = (item) => {
    return (
      <Pressable onPress={() => navigation.navigate('SRC00201', { movie_id: item._id })}>
        <View style={{ flexDirection: 'row', }}>
          <Image
            source={{ uri: item.image_url }}
            style={{ width: 90, height: 130, borderRadius: 4 }}
            resizeMode='cover' />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              numberOfLines={1}
              style={{ color: Color.white, fontSize: 14, fontWeight: 'bold' }}
            >{item.name}</Text>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="star" size={14} color={Color.mainColor} />
                <Text style={{
                  color: 'white', marginLeft: 2, fontSize: 12,
                  fontWeight: 'bold', color: Color.mainColor
                }}>{item.rate}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                <Text style={{ color: '#333', }}>|</Text>
                <Text style={{ color: 'white', marginLeft: 5, fontSize: 12 }}>
                  {item.crt_yr_nm}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                <Text style={{ color: '#333', }}>|</Text>
                <Text style={{ color: 'white', marginLeft: 5, fontSize: 12 }}>
                  {item.area_nm}
                </Text>
              </View>
            </View>
            <Text
              numberOfLines={1}
              style={{ color: '#ddd', fontSize: 12, marginTop: 2, fontSize: 12 }}
            >Lee Dong Wook, Kim Bum, Cho Bo-ah</Text>
            <Text
              numberOfLines={2}
              style={{ color: '#ddd', fontSize: 12, marginTop: 2 }}
            >{item.intro} Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Donec nec odio vitae felis.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{
                flexDirection: 'row', justifyContent: 'center',
                marginTop: 5, alignItems: 'center',
                backgroundColor: Color.mainColor, padding: 5,
                borderRadius: 4, paddingHorizontal: 10
              }}>
                <Text style={{
                  color: 'white', fontSize: 12,
                  fontWeight: 'bold', marginRight: 5
                }}>Xem ngay</Text>
                <Icon name="play" size={20} color={'white'} />
              </View>
            </View>

          </View>
        </View>
      </Pressable>
    )
  };

  return (
    <View style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <KeyboardAwareScrollView
        style={{ backgroundColor: Color.backgroundColor }}
        contentContainerStyle={{ flexGrow: 1, }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          padding: 10, paddingTop: 30,
        }}>
          <View style={{
            backgroundColor: '#333', marginRight: 5,
            height: 37, justifyContent: 'center', 
            paddingHorizontal: 5, alignItems: 'center',
            borderRadius: 10, width: 37
          }}>
            <Icon
              name="chevron-left" size={18} color={'#ddd'}
              onPress={() => navigation.goBack()} />
          </View>

          <View style={{
            flex: 1, alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
            backgroundColor: '#333',
            borderRadius: 10, height: 37,
          }}>
            <Icon
              name="magnify" size={16} color={'#ddd'}
              onPress={() => navigation.navigate('SRC00202')} />
            <TextInput
              style={{ flex: 1, color: '#ddd', fontSize: 12 }}
              value={input}
              placeholder="Tìm kiếm"
              placeholderTextColor="#ddd"
              onChangeText={text => {
                setInput(text);
                text != '' ? setIsShowIconClose(true) : setIsShowIconClose(false);
              }}
            />
            {isShowIconClose && (
              <Icon
                name="close-circle" size={16} color={'#ddd'}
                onPress={() => {
                  setInput('');
                  setIsShowIconClose(false)
                }}
              />
            )}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
          {lstMovie.length > 0 && !isShowLstMovieName && lstNameSearchHistory.length > 0 && (
            <View style={{ marginBottom: 10, }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Lịch sử tìm kiếm</Text>
                <Icon name="delete-circle" size={20} color={'#ddd'} onPress={() => {
                  setLstNameSearchHistory([]);
                  AsyncStorage.setItem('lstNameSearchHistory', JSON.stringify([]));
                }} />
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                {lstNameSearchHistory.map((item, index) => {
                  return (
                    <View key={index} style={{
                      padding: 5, borderRadius: 4, marginBottom: 5,
                      flexDirection: 'row', alignItems: 'center',
                      backgroundColor: '#333', marginRight: 5,
                      paddingHorizontal: 10
                    }}>
                      <Text
                        onPress={() => fetchMovieDetail(item)}
                        style={{ color: '#ddd', fontSize: 13 }}
                      >{item.name}</Text>
                      <Icon
                        name="close-circle" size={14} color={'#ddd'}
                        style={{ marginLeft: 5 }}
                        onPress={() => {
                          let lst = lstNameSearchHistory.filter((item2, index2) => index2 != index);
                          setLstNameSearchHistory(lst);
                          AsyncStorage.setItem('lstNameSearchHistory', JSON.stringify(lst));
                        }}
                      />
                    </View>
                  )
                })}
              </View>
            </View>
          )}

          {lstMovie.length > 0 && !isShowLstMovieName && (
            <View style={{ marginBottom: 5 }}>
              <Text style={{
                color: 'white', fontSize: 14, fontWeight: 'bold'
              }}>Danh sách phim</Text>
            </View>
          )}
          {lstMovie.length > 0 && !isShowLstMovieName ?
            lstMovie.map((item, index) => {
              return (
                <View key={index} style={{
                  marginBottom: 5, padding: 10,
                  backgroundColor: '#101010', borderRadius: 4
                }}>{itemMovie(item)}</View>
              )
            }) : null
          }
          {isShowLstMovieName ? lstMovieName.map((item, index) => {
            return (
              <Pressable
                key={index} style={{ padding: 10 }}
                onPress={() => { fetchMovieDetail(item) }}>
                <Text style={{
                  color: 'white', fontSize: 14, fontWeight: 'bold'
                }}>{item.name}</Text>
              </Pressable>
            )
          }) : null}
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Src00202