import { Text, View, ScrollView, TouchableOpacity, Image, StatusBar, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Color from '../../assest/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TTLoading from '../../components/TTLoading';
import ECTab from '../../components/ECTab';
import Src0010101 from '../components/Src0010101';
import CustomAxios from '../../helpers/FetchApi';

const Src00101 = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [lstType, setLstType] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      // setIsLoading(true);
      CustomAxios().post("/api/exec-no-auth", {
        pro: 'NTH_MV_SEL_TPE_001',
        data: []
      })
        .then(res => {
          if (res.data && res.data[0]) {
            const lst0 = [{
              id: 0,
              name: 'Đề xuất',
              count: null,
              code: 'ALL',
              screen: <Src0010101 type={'ALL'} />,
            }];
            const lst1 = res.data[0].map((item, index) => {
              return {
                id: index + 1,
                name: item.code_nm,
                count: null,
                code: item.code,
                screen: <Src0010101 type={item.code} />,
              }
            });
            setLstType(lst0.concat(lst1));
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    };
    fetchDatas();
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
      <View style={{ flex: 1, paddingTop: 30, }}>
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          display: 'flex',
          height: 40,
          paddingHorizontal: 10,
        }}>
          <Image
            source={require('../../assest/images/logo_iqiyi.png')}
            resizeMode='contain'
            style={{ width: 40, height: '100%', }}
          />

          <Pressable
            onPress={() => navigation.navigate('SRC00202')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 5,
              marginRight: 8,
              backgroundColor: 'white',
              borderRadius: 8,
              flex: 1,
              height: '80%'
            }}
          >
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={{ color: '#666', fontSize: 13 }}>
                Tìm kiếm
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10, }}>
              <Icon name="magnify" size={20} color="#666" />
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
          ><Icon name="bell" size={20} color="#333" />
          </Pressable>
        </View>

        {/* Tab */}
        {lstType && lstType.length > 0 && (
          <ECTab
            fullTab={false}
            scrollEnabled={true}
            onChangeTab={(tabId) => {}}
            data={lstType}
          />
        )}

      </View>
    </View>
  )
}

export default Src00101;