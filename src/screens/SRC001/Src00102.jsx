import { View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TTHeader from '../../components/TTHeader';
import Color from '../../assest/colors';
import { USER, REFRESH_TOKEN } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import {UD_LST_PRD_TOTAL} from '../../redux/actions';
import CustomAxios from '../../helpers/FetchApi';
import TTLoading from '../../components/TTLoading';
import TTButton from '../../components/TTButton';
import ECTab from '../../components/ECTab';
import RefreshToken from '../../helpers/RefreshToken';

const Src00102 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customerState = useSelector(state => state.updateCustomerReducer.customer);
  const lstPrdTotal = useSelector(state => state.updateListProductTotalReducer);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const userLocal = await AsyncStorage.getItem(USER);
      if (userLocal) {
        if(customerState && customerState.pk){
          fetchDataProduct(customerState.pk, userLocal.pk);
        }
      }
    };
    getData();
  }, []);

  const fetchDataProduct = async (customerPk, userPk) => { 
    CustomAxios().post('/api/exec-auth', {
      pro: 'EC_SYS_MBI_SEL_PROD001_001_0',
      data: [customerPk] 
    })
      .then(res => {
        if (!res) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
        if (res.error) {
          Alert.alert('Thông báo', res.message);
        }
        if (res.message == 'Token expired') {
          RefreshToken({
            token: REFRESH_TOKEN,
            username: userPk,
            calback: () => { fetchDataProduct(customerPk, userPk) },
            logout: async () => {
              await AsyncStorage.clear();
              navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
            }
          }); 
          return;
        }
        if (res.data && res.data.length > 0) {
          const payload = {
            totalDHD: res.data[0][0].total,
            totalCITK: res.data[1][0].total,
            totalBHNY: res.data[2][0].total,
            totalDXD: res.data[3][0].total,
            totalKTC: res.data[4][0].total,
            totalDB: res.data[5][0].total 
          }
          dispatch({ type: UD_LST_PRD_TOTAL, payload: payload });
        } else {
          Alert.alert('Thông báo', 'Không tìm thấy thông tin');
        }
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <View style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <TTHeader
        hasTitleLeft={true}
        titleLeft='Sản phẩm'
        width='100%'
        hasIconRight1={true}
        iconRight1='search'
        iconRightOnPress={() => {
          console.log('Search');
        }}
      />
      
      <ECTab
        fullTab={false}
        scrollEnabled={true}
        hasIcon={true}
        iconName='filter-outline'
        iconOnPress={() => {
          console.log('Icon');
        }}
        data={[
          {
            id: 0,
            name: 'Đang hoạt động',
            count: lstPrdTotal.totalDHD ? lstPrdTotal.totalDHD : 0,
            screen: <View style={{
              flex: 1,
              backgroundColor: 'yellow'
            }} />,
          },
          {
            id: 1,
            name: 'Còn ít tồn kho',
            count: lstPrdTotal.totalCITK ? lstPrdTotal.totalCITK : 0,
            screen: <View style={{
              flex: 1,
              backgroundColor: 'red'
            }} />,
          },
          {
            id: 2,
            name: 'Bị hủy niêm yết',
            count: lstPrdTotal.totalBHNY ? lstPrdTotal.totalBHNY : 0,
            screen: <View style={{
              flex: 1,
              backgroundColor: 'purple'
            }} />,
          },
          {
            id: 3,
            name: 'Đang xét duyệt',
            count: lstPrdTotal.totalDXD ? lstPrdTotal.totalDXD : 0,
            screen: <View style={{
              flex: 1,
              backgroundColor: 'blue'
            }} />,
          },
          {
            id: 4,
            name: 'Không thành công',
            count: lstPrdTotal.totalKTC ? lstPrdTotal.totalKTC : 0,
            screen: <View style={{
              flex: 1,
              backgroundColor: 'blue'
            }} />,
          },
          {
            id: 5,
            name: 'Đóng băng',
            count: lstPrdTotal.totalDB ? lstPrdTotal.totalDB : 0,
            screen: <View style={{
              flex: 1,
              backgroundColor: 'blue'
            }} />,
          },
        ]}
      />
      {/* {data.length > 0 ? (
        <View style={{ flex: 1 }}>

        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assest/images/ic_package.png')}
            style={{ width: 200, height: 200 }}
            resizeMethod='contain'
          />
          <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
            Không có sản phẩm nào
          </Text>
          <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 10 }}>
            Thêm sản phẩm đầu tiên của bạn
          </Text>

          <TTButton
            width={200}
            height={50}
            hasIcon={true}
            icon='add'
            iconSize={20}
            iconColor={Color.white}
            value='Thêm sản phẩm'
            onPress={() => {
              console.log('Thêm sản phẩm');
            }}
            backgroundColor={Color.mainColor}
            textColor={Color.white}
          />
        </View>

      )} */}

    </View>
  )
}

export default Src00102;