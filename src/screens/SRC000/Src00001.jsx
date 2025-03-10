import {
    StyleSheet, Text, View, Image, TextInput, Platform,
    TouchableOpacity, Alert, ImageBackground,
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import CustomAxios from '../../helpers/FetchApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFRESH_TOKEN, ACCESS_TOKEN, USER, USERNAME, PROJECT } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RefreshToken from '../../helpers/RefreshToken';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CUSTOMER } from '../../redux/actions';
import Color from '../../assest/colors';
// import messaging from '@react-native-firebase/messaging';
import Loading from '../../components/TTLoading';

//Login screen
const Src00001 = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('adminhadilao');
    const [password, setPassword] = useState('12345678');
    const [showPassword, setShowPassword] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    //--------------Validate--------------------------
    const validateLogin = () => {
        if (username == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập username');
            return false;
        }
        if (password == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập password');
            return false;
        }
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                loginUser();
            } else {
                Alert.alert('Thông báo', 'Vui lòng kiểm tra kết nối internet');
            }
        });
        return true;
    }
    //--------------Login--------------------------
    const loginUser = async () => {
        setIsFetching(true);
        try {
            // await messaging().registerDeviceForRemoteMessages();
            // const tokenDeviceID = await messaging().getToken();
            // console.log('TokenFcm--------------->: ', tokenFcm);
            // AsyncStorage.setItem('fcmToken', tokenFcm);
            // const deviceID = await messaging().getApnsToken();
            const tokenFcm = 'fcmToken';
            const deviceID = 'Joy4';
            const body = {
                pro: 'NTH_S_LOGIN',
                data: [username, password, PROJECT, tokenFcm, deviceID],
            };
            console.log('body: ', body);
            const response = await CustomAxios().post('api/login', body);
            if (response) {
                if (response.error) {
                    console.log('response.message: ', response.message);
                    Alert.alert('Thông báo', response.message);
                    return;
                } else {
                    if (response.data && response.data.accessToken && response.data.user) {
                        console.log('AccessToken-------->: ', response.data.accessToken);
                        await AsyncStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                        await AsyncStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
                        await AsyncStorage.setItem(USERNAME, username);
                        await AsyncStorage.setItem(USER, JSON.stringify(response.data.user));
                        if (response.data.user.tb_role_pk == 5) {
                            navigation.reset({ index: 0, routes: [{ name: "SRC00201" }] });
                        } else if (response.data.user.tb_role_pk == 4) {
                            // navigation.reset({ index: 0, routes: [{ name: "SRC001" }] });
                            fetchDataCustomer(response.data.user.pk);
                        }
                    } else {
                        Alert.alert('Thông báo', 'Không có dữ liệu');
                        setIsFetching(false);
                    }
                }
            }else{
                setIsFetching(false);
                Alert.alert('Thông báo', 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.log('error: ', error);
            setIsFetching(false);
            Alert.alert('Thông báo', 'Có lỗi xảy ra');
        }
    };

    //--------------Fetch data customer--------------------------
    const fetchDataCustomer = async (pk) => {
        const body = {
            pro: 'EC_SYS_MBI_SEL_CUST001_001_2',
            data: [pk]
        }
        CustomAxios().post('/api/exec-auth', body)
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
                        username: pk,
                        calback: () => { fetchDataCustomer(pk) },
                        logout: async () => {
                            setIsFetching(false);
                            await AsyncStorage.clear();
                            navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
                        }
                    });
                    return;
                }
                if (res.data[0][0]) {
                    dispatch({ type: UPDATE_CUSTOMER, payload: { customer: res.data[0][0] } });
                    navigation.reset({ index: 0, routes: [{ name: "SRC001" }] });
                } else {
                    Alert.alert('Thông báo', 'Không tìm thấy thông tin');
                }
                setIsFetching(false);
            })
            .catch(err => {
                console.log('Error: ', err);
                setIsFetching(false);
            });
    };

    //-----------Check token login ( auto login ) -------------------
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        setIsFetching(true);
        const checkToken = async () => {
            const token = await AsyncStorage.getItem(TOKEN);
            if (!token) {
                setIsShow(true);
                setIsFetching(false);
                return;
            }
            const response = await CustomAxios().post('api/check-token', { token });
            console.log('response: ', response);
            if (response && response.data == 'Success') {
                const user = await AsyncStorage.getItem(USER);
                if (user) {
                    const userLocal = JSON.parse(user);
                    console.log('User: ', userLocal);
                    if (userLocal.tb_role_pk == 5) {
                        setIsShow(true);
                    } else if (userLocal.tb_role_pk == 4) {
                        setIsShow(false);
                        // navigation.reset({ index: 0, routes: [{ name: "SRC001" }] });
                        fetchDataCustomer(userLocal.pk);
                    }
                } else {
                    setIsShow(true);
                    setIsFetching(false);
                }
            } else {
                setIsShow(true);
                setIsFetching(false);
            }
        };
        checkToken();
    }, []);

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {isFetching && <Loading />}
            {isShow && (
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('../../assest/images/background_no_logo.png')}
                        style={styles.background}>
                        <View style={styles.container}>
                            <View>
                                <Image
                                    source={require('../../assest/images/logo.png')}
                                    style={{ width: 150, height: 150 }}
                                />
                            </View>
                            <View style={{ width: '100%', paddingHorizontal: 30 }}>
                                <Text style={styles.username}>
                                    Tài khoản <Text style={{ color: 'red' }}>*</Text>
                                </Text>
                                <View style={styles.inputContainer}>
                                    <Icon name="account" size={24} color="#F9A72B" />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Tài khoản"
                                        value={username}
                                        onChangeText={setUsername}
                                    />
                                </View>
                                <Text style={[styles.username, styles.password, { marginTop: 10 }]}>
                                    Mật khẩu <Text style={{ color: 'red' }}>*</Text>
                                </Text>
                                <View style={[styles.inputContainer,]}>
                                    <Icon name="lock-open-outline" size={24} color="#F9A72B" />
                                    <TextInput
                                        style={styles.inputPwd}
                                        placeholder="Mật khẩu"
                                        value={password}
                                        secureTextEntry={!showPassword}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: 10,
                                            bottom: 12,
                                            color: '#666',
                                        }}
                                        onPress={() => {
                                            setShowPassword(!showPassword);
                                        }}>
                                        {showPassword ? (
                                            <View>
                                                <Icon name="eye-off-outline" size={24} color="#F9A72B" />
                                            </View>
                                        ) : (
                                            <View>
                                                <Icon name="eye-outline" size={24} color="#F9A72B" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Text
                                            style={{
                                                marginTop: 10,
                                                color: Color.mainColor,
                                            }}>
                                            Quên mật khẩu?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: 20, width: '100%', paddingHorizontal: 30 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        validateLogin();
                                    }}
                                    style={{
                                        backgroundColor: '#F9A72B',
                                        paddingHorizontal: 10,
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 45,
                                    }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>
                                        Đăng nhập
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: Color.mainColor }}>
                                    Bạn chưa có tài khoản? {' '}
                                    <Text
                                        onPress={() => {
                                            navigation.navigate('SRC00002');
                                        }}
                                        style={{
                                            fontWeight: 'bold',
                                            textDecorationLine: 'underline',
                                        }}>Đăng ký
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            )}


        </KeyboardAwareScrollView>
    )
}

export default Src00001;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '10%',
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    input: {
        width: '90%',
        height: 50,
        paddingHorizontal: 10,
    },
    inputPwd: {
        width: '80%',
        height: 50,
        paddingHorizontal: 10,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4E4B66',
        marginLeft: 2,
        marginBottom: 4
    },
    password: {
        marginTop: 12,
    },
})