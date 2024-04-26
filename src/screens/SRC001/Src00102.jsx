import { Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react';
import Color from '../../assest/colors';
import TTLoading from '../../components/TTLoading';
import ECTab from '../../components/ECTab';
import CustomAxios from '../../helpers/FetchApi';
import Src0010201 from '../components/Src0010201';

const Src00102 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lstType, setLstType] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      //-----Lay danh sach phim
      CustomAxios().post("/api/exec-no-auth", {
        pro: 'NTH_MV_SEL_MVL_001',
        data: ['ALL']
      })
        .then(res => {
          if (res && res.error) {
            console.log(res.error);
            return;
          }
          if (res && res.data) {
            const lstPhimBo = res.data[3] ? res.data[3] : [];
            const lstPhimLe = res.data[4] ? res.data[4] : [];
            const lstPhimHoatHinh = res.data[5] ? res.data[5] : [];
            fetchDataFillter([lstPhimBo, lstPhimLe, lstPhimHoatHinh]);
          }
        })
        .catch(err => {
          console.log(err);
        })
    };
    // fetchDatas();
    fetchDataFillter();
  }, []);

  //--------------- Lay danh sach filter -------------------
  const fetchDataFillter = () => {
    CustomAxios().post("/api/exec-no-auth", {
      pro: 'NTH_MV_SEL_TPE_001',
      data: []
    })
      .then(res => {
        if (res.data && res.data[0]) {
          console.log(res.data[0]);
          const lst1 = res.data[0].map((item, index) => {
            const lstArea0 = [{ code: 'ALL_AREA', code_nm: 'Tất cả khu vực' }]
            const lstArea = [...lstArea0, ...(res.data[1] ? res.data[1] : [])];
            const lstGenge0 = [{ code: 'ALL_GENGE', code_nm: 'Tất cả thể loại' }]
            const lstGenge = [...lstGenge0, ...(res.data[2] ? res.data[2] : [])];
            const lstYear0 = [{ code: 'ALL_YEAR', code_nm: 'Tất cả năm' }]
            const lstYear = [...lstYear0, ...(res.data[3] ? res.data[3] : [])];
            const lstPay0 = [{ code: 'ALL_PAY', code_nm: 'Tất cả phí' }]
            const lstPay = [...lstPay0, ...(res.data[4] ? res.data[4] : [])];
            const lstRelease0 = [{ code: 'ALL_RELEASE', code_nm: 'Tất cả tình trạng' }]
            const lstRelease = [...lstRelease0, ...(res.data[5] ? res.data[5] : [])];
            const lstFilter = [lstArea, lstGenge, lstYear, lstPay, lstRelease];
            return {
              id: index,
              name: item.code_nm,
              count: null,
              code: item.code,
              screen: <Src0010201 type={item.code} dataFilter={lstFilter}/>,
            }
          });
          setLstType(lst1);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <View style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="light-content"
      />
      {isLoading && (<TTLoading />)}
      <View style={{ flex: 1, paddingTop: 30, }}>
        <Text style={{
          color: Color.white, fontSize: 20, fontWeight: 'bold',
          paddingHorizontal: 10, marginBottom: 10
        }}>Kho phim</Text>

        {/* Tab */}
        {lstType && lstType.length > 0 && (
          <ECTab
            fullTab={false}
            hasBottomLine={true}
            scrollEnabled={true}
            onChangeTab={(tabId) => { }}
            data={lstType}
          />
        )}
      </View>
    </View>
  )
}

export default Src00102;