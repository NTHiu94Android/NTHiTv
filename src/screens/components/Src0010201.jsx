import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomAxios from '../../helpers/FetchApi';
import MVItem from './MVItem';
import Color from '../../assest/colors'
import { useNavigation } from '@react-navigation/native';

const Src0010201 = ({ type, dataFilter }) => {
    const navigation = useNavigation();
    const [lstPhim, setLstPhim] = useState([]);
    const [areaSelected, setAreaSelected] = useState({ code: '', code_nm: '' });
    const [gengeSelected, setGengeSelected] = useState({ code: '', code_nm: '' });
    const [paySelected, setPaySelected] = useState({ code: '', code_nm: '' });
    const [yearSelected, setYearSelected] = useState({ code: '', code_nm: '' });
    const [releaseSelected, setReleaseSelected] = useState({ code: '', code_nm: '' });

    //----------Lay du lieu tu props----------
    useEffect(() => {
        //-----Fillter----------
        if (dataFilter) {
            dataFilter[0] && dataFilter[0][0] && setAreaSelected(dataFilter[0][0]);
            dataFilter[1] && dataFilter[1][0] && setGengeSelected(dataFilter[1][0]);
            dataFilter[2] && dataFilter[2][0] && setYearSelected(dataFilter[2][0]);
            dataFilter[3] && dataFilter[3][0] && setPaySelected(dataFilter[3][0]);
            dataFilter[4] && dataFilter[4][0] && setReleaseSelected(dataFilter[4][0]);
        }
        fetchLstMovie(1, 'ALL', 'ALL', 'ALL', 'ALL', 'ALL');
    }, []);


    //----------Fetch danh sach phim----------
    const [isFirst, setIsFirst] = useState(true);
    const [index, setIndex] = useState(1);
    useEffect(() => {
        if (isFirst) return;
        setIndex(1);
        fetchLstMovie(
            1, areaSelected.code == 'ALL_AREA' ? 'ALL' : areaSelected.code,
            gengeSelected.code == 'ALL_GENGE' ? 'ALL' : gengeSelected.code,
            yearSelected.code == 'ALL_YEAR' ? 'ALL' : yearSelected.code,
            paySelected.code == 'ALL_PAY' ? 'ALL' : paySelected.code,
            releaseSelected.code == 'ALL_RELEASE' ? 'ALL' : releaseSelected.code
        );
    }, [
        areaSelected, gengeSelected,
        paySelected, yearSelected, releaseSelected
    ]);


    //-------Fetch data-----------------
    const fetchLstMovie = (index, areaCode, gengeCode, yearCode, payCode, releaseCode) => {
        CustomAxios().post("/api/exec-no-auth", {
            pro: 'NTH_MV_SEL_MVL_002',
            data: [index, type, areaCode, gengeCode, yearCode, payCode, releaseCode]
        })
            .then(res => {
                if (res.data && res.data[0]) {
                    console.log('res.data[0]', res.data[0].length);
                    // setLstPhim(dataHot);
                    // setIsFirst(false);
                    // setTimeout(() => { setIsLoading(false); }, 2000);
                    if(index == 1) {
                        setLstPhim(res.data[0]);
                        setIsFirst(false);
                        setTimeout(() => { setIsLoading(false); }, 2000);
                    }else {
                        setLstPhim([...lstPhim, ...res.data[0]]);
                        setTimeout(() => { setIsLoading(false); }, 2000);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                setTimeout(() => { setIsLoading(false); }, 2000);
            });
    };

    //----------Load more----------
    const [isLoading, setIsLoading] = useState(false);
    const loadMoreItems = () => {
        fetchLstMovie(
            index + 1,
            areaSelected.code == 'ALL_AREA' ? 'ALL' : areaSelected.code,
            gengeSelected.code == 'ALL_GENGE' ? 'ALL' : gengeSelected.code,
            yearSelected.code == 'ALL_YEAR' ? 'ALL' : yearSelected.code,
            paySelected.code == 'ALL_PAY' ? 'ALL' : paySelected.code,
            releaseSelected.code == 'ALL_RELEASE' ? 'ALL' : releaseSelected.code
        );
        setIndex(index + 1);
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
        if (isEndReached && !isLoading) {
            setIsLoading(true);
            loadMoreItems();
        }
    };

    return (
        <ScrollView
            style={{ flex: 1, paddingTop: 5, marginBottom: 15 }}
            showsVerticalScrollIndicator={false}
            onScroll={!isLoading ? handleScroll : null}
            scrollEventThrottle={16}
        >
            <View style={{ paddingHorizontal: 10 }}>
                {/* Filter */}
                <View style={{}}>
                    {dataFilter && dataFilter.length > 0 && (
                        dataFilter.map((data, index) => {
                            return (
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal key={index}
                                    style={{ marginBottom: 8, marginTop: 2 }}>
                                    {data && data.length > 0 && (
                                        data.map((item, index2) => {
                                            return (
                                                <Pressable
                                                    key={index2}
                                                    style={{
                                                        padding: 5, borderRadius: 5, marginRight: 5,
                                                        backgroundColor: item.code === areaSelected.code
                                                            || item.code === gengeSelected.code
                                                            || item.code === yearSelected.code
                                                            || item.code === paySelected.code
                                                            || item.code === releaseSelected.code
                                                            ? '#333' : Color.backgroundColor
                                                    }}
                                                    onPress={() => {
                                                        switch (index) {
                                                            case 0: setAreaSelected(item); break;
                                                            case 1: setGengeSelected(item); break;
                                                            case 2: setYearSelected(item); break;
                                                            case 3: setPaySelected(item); break;
                                                            case 4: setReleaseSelected(item); break;
                                                        }
                                                    }}>
                                                    <Text style={{
                                                        color: item.code === areaSelected.code
                                                            || item.code === gengeSelected.code
                                                            || item.code === yearSelected.code
                                                            || item.code === paySelected.code
                                                            || item.code === releaseSelected.code
                                                            ? Color.mainColor : Color.gray
                                                    }}>{item.code_nm}</Text>
                                                </Pressable>
                                            )
                                        })
                                    )}
                                </ScrollView>
                            )
                        })
                    )}
                </View>

                {/* Danh sach phim */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap',  }}>
                    {lstPhim && lstPhim.length > 0 && (
                        lstPhim.map((item, index) => {
                            return (
                                <View key={index} style={{ padding: 2, width: '33%' }}>
                                    <MVItem
                                        image_url={item.image_url}
                                        name={item.name}
                                        pay_nm={item.pay_nm}
                                        pay_code={item.pay_code}
                                        release_code={item.release_code}
                                        episode_count={item.episode_count}
                                        onPress={() => { navigation.navigate("SRC00201", { movie_id: item._id }) }} />
                                </View>
                            )
                        })
                    )}
                </View>
            </View>

            {isLoading && <ActivityIndicator style={{marginVertical: 20}}/>}
        </ScrollView>
    )
}

export default Src0010201;

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
    },



    {
        "_id": 7,
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
        "_id": 8,
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
        "_id": 9,
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
        "_id": 10,
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
        "_id": 11,
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
        "_id": 12,
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