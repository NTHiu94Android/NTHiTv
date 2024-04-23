import { View, Text, ScrollView, RefreshControl, Pressable, Image, FlatList, ImageBackground } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAxios from '../../helpers/FetchApi';
import MVItem from './MVItem';
import LinearGradient from 'react-native-linear-gradient';
import { FlatListSlider } from 'react-native-flatlist-slider';
import Color from '../../assest/colors'
import { useNavigation } from '@react-navigation/native';

const Src0010101 = ({ type }) => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [lstHot, setLstHot] = useState([]);

    const [lstCoTrang, setLstCoTrang] = useState([]);
    const [lstHienDai, setLstHienDai] = useState([]);
    const [lstTinhYeu, setLstTinhYeu] = useState([]);
    const [lstGiaDinh, setLstGiaDinh] = useState([]);
    const [lstHaiHuoc, setLstHaiHuoc] = useState([]);
    const [lstHanhDong, setLstHanhDong] = useState([]);

    const [lstPhimVip, setLstPhimVip] = useState([]);
    const [lstPhimFree, setLstPhimFree] = useState([]);
    const [lstPhimBo, setLstPhimBo] = useState([]);
    const [lstPhimLe, setLstPhimLe] = useState([]);
    const [lstPhimHoatHinh, setLstPhimHoatHinh] = useState([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        console.log('type', type);
        // fetchDataScreen(type);
        setLstPhimVip(dataHot);
        setLstPhimFree(dataHot);
        setLstPhimBo(dataHot);
        setLstPhimLe(dataHot);
        setLstPhimHoatHinh(dataHot);

        setLstCoTrang(dataHot);
        setLstHienDai(dataHot);
        setLstTinhYeu(dataHot);
        setLstGiaDinh(dataHot);
        setLstHaiHuoc(dataHot);
        setLstHanhDong(dataHot);

        const lstTemp = [];
        dataHot.map((item, index) => {
            const it = {
                image_url: item.image_url,
            }
            lstTemp.push(it);
        });
        setLstHot(lstTemp);
    }, []);

    //----------------- Fetch data -----------------
    const fetchDataScreen = (code) => {
        console.log('code', code);
        CustomAxios().post("/api/exec-no-auth", {
            pro: 'NTH_MV_SEL_LMV_001',
            data: [code]
        })
            .then(res => {
                if (res && res.error) {
                    console.log(res.error);
                    return;
                }
                if (res && res.data) {
                    // console.log(res.data);
                    if (code == 'ALL') {
                        res.data[0] ? setLstHot(res.data[0]) : setLstHot([]);
                        res.data[1] ? setLstPhimVip(res.data[1]) : setLstPhimVip([]);
                        res.data[2] ? setLstPhimFree(res.data[2]) : setLstPhimFree([]);
                        res.data[3] ? setLstPhimBo(res.data[3]) : setLstPhimBo([]);
                        res.data[4] ? setLstPhimLe(res.data[4]) : setLstPhimLe([]);
                        res.data[5] ? setLstPhimHoatHinh(res.data[5]) : setLstPhimHoatHinh([]);
                    } else {
                        res.data[0] ? setLstHot(res.data[0]) : setLstHot([]);
                        res.data[1] ? setLstCoTrang(res.data[1]) : setLstCoTrang([]);
                        res.data[2] ? setLstHienDai(res.data[2]) : setLstHienDai([]);
                        res.data[3] ? setLstTinhYeu(res.data[3]) : setLstTinhYeu([]);
                        res.data[4] ? setLstGiaDinh(res.data[4]) : setLstGiaDinh([]);
                        res.data[5] ? setLstHaiHuoc(res.data[5]) : setLstHaiHuoc([]);
                        res.data[6] ? setLstHanhDong(res.data[6]) : setLstHanhDong([]);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <ScrollView
            style={{ flex: 1, paddingTop: 5 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    progressBackgroundColor={null}
                    colors={['white']}
                    progressViewOffset={30}
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
            }>
            {type && type == 'ALL' ? (
                <View style={{flex: 1}}>
                    {/* Slider */}
                    {lstHot && lstHot.length > 0 && (
                        <View style={{
                            marginHorizontal: 10,
                            borderRadius: 4,
                            overflow: 'hidden'
                        }}>
                            {/* <FlatListSlider
                                data={lstHot}
                                imageKey={'image_url'}
                                timer={2000}
                                height={400}
                                // component={}
                                onPress={item => console.log(JSON.stringify(item))}
                                contentContainerStyle={{}}
                                indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
                                indicatorActiveColor={'#8e44ad'}
                                indicatorInActiveColor={'#ffffff'}
                                indicatorActiveWidth={30}
                                animation
                            /> */}

                            <View style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                padding: 10,
                                borderRadius: 30,
                                zIndex: 999,
                                backgroundColor: Color.mainColor
                            }}>
                                <Icon name={'play'} size={20} color={'white'} />
                            </View>

                            <LinearGradient
                                colors={[
                                    'rgba(0,0,0,0.6)',
                                    'rgba(0,0,0,0)',
                                    'rgba(0,0,0,0.6)',
                                ]}
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
                            </LinearGradient>
                        </View>
                    )}
                    {/* List phim */}
                    <View style={{ paddingHorizontal: 10 }}>
                        {/* Phim VIP (thinh hanh) */}
                        <View style={{}}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>
                                Phim thịnh hành trên NTHiTv
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                            }}>
                                {lstPhimVip && lstPhimVip.length > 0 && (
                                    lstPhimVip.map((item, index) => {
                                        return (
                                            <View key={index} style={{ padding: 2, width: '33%' }}>
                                                <MVItem
                                                    image_url={item.image_url}
                                                    name={item.name}
                                                    pay_nm={item.pay_nm}
                                                    pay_code={item.pay_code}
                                                    release_code={item.release_code}
                                                    episode_count={item.episode_count}
                                                    onPress={() => { navigation.navigate("SRC00201", {movie_id: item._id})}}
                                                />
                                            </View>
                                        )
                                    })
                                )}
                            </View>
                            <Pressable
                                onPress={() => { console.log('Xem thêm') }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5,
                                    backgroundColor: '#333',
                                    borderRadius: 4,
                                    marginVertical: 5,
                                    flexDirection: 'row',
                                }}>
                                <Text style={{ color: 'white' }}>Xem thêm</Text>
                                <Icon name="chevron-down" size={20} color="white" />
                            </Pressable>
                        </View>

                        {/* Phim free */}
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>
                                Miễn phí trọn bộ có thời hạn
                            </Text>
                            <FlatList
                                data={lstPhimFree}
                                renderItem={({ item }) => (
                                    <View style={{
                                        width: 120,
                                        padding: 2,
                                    }}>
                                        <MVItem
                                            image_url={item.image_url}
                                            name={item.name}
                                            pay_nm={item.pay_nm}
                                            pay_code={item.pay_code}
                                            release_code={item.release_code}
                                            episode_count={item.episode_count}
                                            onPress={() => { console.log('item', item) }}
                                        />
                                    </View>
                                )}
                                keyExtractor={item => item._id}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        {/* Phim bo */}
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>
                                Danh sách phim bộ chọn lọc trên NTHiTv
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                            }}>
                                {lstPhimBo && lstPhimBo.length > 0 && (
                                    lstPhimBo.map((item, index) => {
                                        return (
                                            <View key={index} style={{ padding: 2, width: '33%' }}>
                                                <MVItem
                                                    image_url={item.image_url}
                                                    name={item.name}
                                                    pay_nm={item.pay_nm}
                                                    pay_code={item.pay_code}
                                                    release_code={item.release_code}
                                                    episode_count={item.episode_count}
                                                    onPress={() => { console.log('item', item) }}
                                                />
                                            </View>
                                        )
                                    })
                                )}
                            </View>
                            <Pressable
                                onPress={() => { console.log('Xem thêm') }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5,
                                    backgroundColor: '#333',
                                    borderRadius: 4,
                                    marginVertical: 5,
                                    flexDirection: 'row',
                                }}>
                                <Text style={{ color: 'white' }}>Xem thêm</Text>
                                <Icon name="chevron-down" size={20} color="white" />
                            </Pressable>
                        </View>

                        {/* Phim le */}
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>
                                Phim lẻ mới cập nhật trên NTHiTv
                            </Text>
                            <FlatList
                                data={lstPhimLe}
                                renderItem={({ item }) => (
                                    <View style={{
                                        width: 120,
                                        padding: 2,
                                    }}>
                                        <MVItem
                                            image_url={item.image_url}
                                            name={item.name}
                                            pay_nm={item.pay_nm}
                                            pay_code={item.pay_code}
                                            release_code={item.release_code}
                                            episode_count={item.episode_count}
                                            onPress={() => { console.log('item', item) }}
                                        />
                                    </View>
                                )}
                                keyExtractor={item => item._id}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        {/* Phim hoat hinh */}
                        <View style={{ marginTop: 15 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>
                                Danh sách phim hoạt hình ưa thích trên NTHiTv
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                            }}>
                                {lstPhimHoatHinh && lstPhimHoatHinh.length > 0 && (
                                    lstPhimHoatHinh.map((item, index) => {
                                        return (
                                            <View key={index} style={{ padding: 2, width: '33%' }}>
                                                <MVItem
                                                    image_url={item.image_url}
                                                    name={item.name}
                                                    pay_nm={item.pay_nm}
                                                    pay_code={item.pay_code}
                                                    release_code={item.release_code}
                                                    episode_count={item.episode_count}
                                                    onPress={() => { console.log('item', item) }}
                                                />
                                            </View>
                                        )
                                    })
                                )}
                            </View>
                            <Pressable
                                onPress={() => { console.log('Xem thêm') }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 5,
                                    backgroundColor: '#333',
                                    borderRadius: 4,
                                    marginVertical: 5,
                                    flexDirection: 'row',
                                }}>
                                <Text style={{ color: 'white' }}>Xem thêm</Text>
                                <Icon name="chevron-down" size={20} color="white" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={{flex: 1, minHeight: 500}}>
                    {/* Slider */}
                    {lstHot && lstHot.length > 0 && (
                        <View style={{
                            marginHorizontal: 10,
                            borderRadius: 4,
                            overflow: 'hidden'
                        }}>
                            <FlatListSlider
                                data={lstHot}
                                imageKey={'image_url'}
                                timer={2000}
                                height={400}
                                // component={}
                                onPress={item => console.log(JSON.stringify(item))}
                                contentContainerStyle={{}}
                                indicatorContainerStyle={{ position: 'absolute', bottom: 10, zIndex: 999}}
                                indicatorActiveColor={Color.mainColor}
                                indicatorInActiveColor={'#ffffff'}
                                indicatorActiveWidth={30}
                                animation
                            />

                            <View style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                padding: 10,
                                borderRadius: 30,
                                zIndex: 999,
                                backgroundColor: Color.mainColor
                            }}>
                                <Icon name={'play'} size={20} color={'white'} />
                            </View>

                            <LinearGradient
                                colors={[
                                    'rgba(0,0,0,0.6)',
                                    'rgba(0,0,0,0)',
                                    'rgba(0,0,0,0.6)',
                                ]}
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
                            </LinearGradient>
                        </View>
                    )}
                </View>
            )}

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


        </ScrollView>
    )
}

export default Src0010101;

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