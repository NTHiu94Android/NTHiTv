import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert } from 'react-native'
import React, { useState, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import CustomAxios from '../../helpers/FetchApi';
import Loading from '../../components/TTLoading';
import Color from '../../assest/colors';

const Register = () => {
    const navigation = useNavigation();
    const [isFetching, setIsFetching] = useState(false);
    const [username, setUsername] = useState('adminhadilao');
    const userNameRef = useRef();
    const [password, setPassword] = useState('12345678');
    const passwordRef = useRef();
    const [rePassword, setRePassword] = useState('12345678');
    const rePasswordRef = useRef();

    //-------Dang ky tai khoan---------------------
    const handleRegister = async () => {
        try {
            //Validate
            if (!username) {
                Alert.alert('Thông báo', 'Vui lòng nhập username');
                //focus on username
                if (userNameRef.current) {
                    userNameRef.current.focus();
                }
                return;
            }
            if (username.length < 6 && username.length > 20) {
                Alert.alert('Thông báo', 'Username phải từ 6 đến 20 ký tự');
                //focus on username
                if (userNameRef.current) {
                    userNameRef.current.focus();
                }
                return;
            }
            if (!password) {
                Alert.alert('Thông báo', 'Vui lòng nhập password');
                //focus on password
                if (passwordRef.current) {
                    passwordRef.current.focus();
                }
                return;
            }
            if (password.length < 8 && password.length > 20) {
                Alert.alert('Thông báo', 'Mật khẩu phải từ 8 đến 20 ký tự');
                //focus on password
                if (passwordRef.current) {
                    passwordRef.current.focus();
                }
                return;
            }
            if (!rePassword) {
                Alert.alert('Thông báo', 'Vui lòng nhập re-password');
                //focus on re-password
                if (rePasswordRef.current) {
                    rePasswordRef.current.focus();
                }
                return;
            }
            if (password !== rePassword) {
                Alert.alert('Thông báo', 'Mật khẩu không khớp');
                //focus on re-password
                if (rePasswordRef.current) {
                    rePasswordRef.current.focus();
                }
                return;
            }

            //Call API
            setIsFetching(true);
            const response = await CustomAxios().post('api/register', {
                pro: 'EC_SYS_MBI_INS_USER001_001_0',
                data: [username, password, username]
            });
            setIsFetching(false);
            console.log(response);
            if (response) {
                if (response.error) {
                    console.log('response.message: ', response.message);
                    Alert.alert('Error', response.message);
                    return;
                } else {
                    console.log('response.data: ', response.data[0][0]);
                    if (response.data && response.data[0][0].pk_customer == -2) {
                        Alert.alert('Error', 'Tài khoản đã tồn tại!');
                        return;
                    }
                    if (response.data && response.data[0][0].pk_customer > 0) {
                        Alert.alert('Chúc mừng', 'Đăng ký tài khoản thành công!', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.navigate('SRC00001');
                                }
                            }
                        ]);
                        
                    }
                }
            }
        } catch (error) {
            console.log('error: ', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Text header */}
            {isFetching && <Loading />}
            <View style={{ padding: 25, flex: 1, backgroundColor: Color.backgroundColor }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>

                    <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold'
                        }}>Đăng ký tài khoản!</Text>
                        <Text style={{}}>
                            <Text style={{}}>Chào mừng bạn đến với </Text>
                            <Text style={{ fontWeight: 'bold' }}>Eat Crazies</Text>
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Image
                            source={require('../../assest/images/logo.png')}
                            style={{ width: 80, height: 80 }}
                        />
                    </View>
                </View>

                {/* Username */}
                <View>
                    <Text style={[styles.username, styles.password]}>
                        Tài khoản <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                        ref={userNameRef}
                        style={styles.inputUsername} placeholder="Tài khoản"
                        value={username}
                        onChangeText={(text) => setUsername(text)} />
                </View>

                {/* Password */}
                <View>
                    <Text style={[styles.username, styles.password]}>
                        Mật khẩu <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            ref={passwordRef}
                            style={[styles.inputUsername, { paddingRight: 30, position: 'relative' }]}
                            placeholder="Mật khẩu"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword} />
                    </View>
                </View>

                {/* Repassword */}
                <View>
                    <Text style={[styles.username, styles.password]}>
                        Nhập lại mật khẩu <Text style={{ color: 'red' }}>*</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            ref={rePasswordRef}
                            style={[styles.inputUsername, { paddingRight: 30, position: 'relative' }]}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry
                            value={rePassword}
                            onChangeText={setRePassword} />
                    </View>
                </View>



                {/* Register button*/}
                <View style={styles.buttonLogin}>
                    <Pressable style={[styles.wrapperCustom, {
                        backgroundColor: Color.mainColor,
                    }]} onPress={handleRegister}>
                        <Text style={styles.textPressable}>Đăng ký</Text>
                    </Pressable>
                </View>

                {/* Text footer */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                    <Text style={{ color: Color.mainColor }}>Bạn đã có tài khoản ?</Text>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('SRC00001');
                        }}>
                        <Text style={{
                            color: Color.mainColor,
                            fontWeight: 'bold',
                            marginLeft: 5,
                        }}>Đăng nhập</Text>
                    </Pressable>
                </View>
            </View>

        </KeyboardAwareScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    viewRemember: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 9.5,
        justifyContent: 'space-between',
    },
    viewCheckBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tinyLogo: {
        width: 25,
        height: 25,
        marginRight: 17,
    },
    signUp: {
        marginTop: 16,
        textAlign: 'center',
    },
    textOtherLogin: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins',
        color: '#667080',
    },
    continue: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'Poppins',
        color: '#4e4b66',
        marginTop: 16,
    },
    buttonLogin: {
        marginTop: 30,
    },
    wrapperCustom: {
        borderRadius: 8,
        paddingVertical: 13,
        paddingHorizontal: 24,
        width: '100%',
    },
    textPressable: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins',
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputUsername: {
        marginTop: 2,
        width: '100%',
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingHorizontal: 15,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4E4B66',
        marginLeft: 2,
    },
    password: {
        marginTop: 12,
    },
    welcome: {
        color: '#4E4B66',
        fontSize: 20,
        fontWeight: '400',
        marginTop: 4,
        lineHeight: 30,
        width: 220,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
})