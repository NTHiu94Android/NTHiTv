import { Text, View, ScrollView, TouchableOpacity, Image, StatusBar, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Color from '../../assest/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import TTLoading from '../../components/TTLoading';
import ECTab from '../../components/ECTab';
import Src0010101 from './Components/Src0010101';

const Src00101 = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <View style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="light-content"
      />
      {isLoading && (<TTLoading />)}
      {/* Header */}
      <View style={{ flex: 1, paddingTop: 30, padding: 10 }}>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          display: 'flex',
          height: 40,
        }}>
          <Image
            source={require('../../assest/images/logo_iqiyi.png')}
            style={{ width: 50, height: '100%', resizeMode: 'contain' }}
          />
          <Pressable
            onPress={() => { console.log('search') }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              backgroundColor: 'white',
              borderRadius: 8,
              flex: 1,
              height: '80%'
            }}
          >
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={{ color: '#999', fontSize: 13, fontWeight: '700' }}>
                Tìm kiếm
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10, }}>
              <Icon name="magnify" size={20} color="#999" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => { console.log('notification') }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              height: '80%',
              minWidth: 40,
            }}
          ><Icon name="bell" size={20} color="#999" />
          </Pressable>
        </View>

        <ECTab
          fullTab={false}
          scrollEnabled={true}
          data={[
            {
              id: 0,
              name: 'Đề xuất',
              count: null,
              screen: <Src0010101 type={0} />,
            },
            {
              id: 1,
              name: 'Phim bộ',
              count: null,
              screen: <Src0010101 type={1} />,
            },
            {
              id: 2,
              name: 'Phim lẻ',
              count: null,
              screen: <Src0010101 type={2} />,
            },
            {
              id: 3,
              name: 'Phim hoạt hình',
              count: null,
              screen: <Src0010101 type={3} />,
            }
          ]}
        />

      </View>
    </View>
  )
}

export default Src00101;