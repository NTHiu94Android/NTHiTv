import {
  Text, View, ScrollView, TouchableOpacity, Alert, Pressable,
  TextInput, Platform, Image, PermissionsAndroid
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import TTHeader from '../../components/TTHeader';
import Color from '../../assest/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { USER, REFRESH_TOKEN } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import CustomAxios from '../../helpers/FetchApi';
import Loading from '../../components/TTLoading';
import RefreshToken from '../../helpers/RefreshToken';

const OptionsImage = {
  quality: 1,
  cameraType: "back",
  includeBase64: false,
  mediaType: "photo",
};

//Xac minh tai lieu
const Src00201 = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  //Name store
  const nameStoreRef = useRef(null);
  const [nameStore, setNameStore] = useState('');
  const [checkName, setCheckName] = useState(null);
  const [strErrorNameStore, setStrErrorNameStore] = useState('');
  //Image
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  //Phone & Email
  const emailRef = useRef(null);
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [strErrorEmail, setStrErrorEmail] = useState('');
  const phoneRef = useRef(null);
  const [phone, setPhone] = useState('');
  const [checkPhone, setCheckPhone] = useState(false);
  const [strErrorPhone, setStrErrorPhone] = useState('');
  //Checkbox
  const [isAgree, setIsAgree] = useState(true);
  const [userPk, setUserPk] = useState('');
  //Status Auth Store
  const [statusAuthStore, setStatusAuthStore] = useState(0);
  const [strButtonAuth, setStrButtonAuth] = useState('Xác thực');

  useEffect(() => {
    const getUser = async () => {
      const userAsyncStorage = await AsyncStorage.getItem(USER);
      if (userAsyncStorage) {
        const userLocal = JSON.parse(userAsyncStorage);
        console.log('User: ', userLocal);
        setUserPk(userLocal.pk);
        getStoreStatus(userLocal.pk);
      }
    };
    getUser();
  }, []);

  //------------Lay trang thai xac thuc cua cua hang--------------
  const getStoreStatus = async (userPk) => {
    setIsLoading(true);
    const body = {
      pro: 'EC_SYS_MBI_SEL_CUST001_001_1',
      data: [userPk]
    };
    console.log('body: ', body);
    CustomAxios().post('/api/exec-auth', body)
      .then(res => {
        if(!res) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
        }
        if (res.error) {
          Alert.alert('Thông báo', res.message);
        }
        if (res.message == 'Token expired') {
          RefreshToken({
            token: REFRESH_TOKEN,
            username: userPk,
            calback: getStoreStatus(userPk),
            logout: async () => {
              await AsyncStorage.clear();
              navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
            }
          });
          return;
        }
        if (res.data[0][0].status_auth == 1) {
          setStatusAuthStore(1);
          setNameStore(res.data[0][0].name);
          setCheckName(true);
          setPhone(res.data[0][0].phone);
          setEmail(res.data[0][0].email);
          setImage(res.data[0][0].certificate_img);
        } else {
          setStatusAuthStore(0);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log('Error: ', err);
        setIsLoading(false);
      });
  };

  //----------------Logout----------------
  const logout = async () => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn đăng xuất?',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Đăng xuất',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
          }
        }
      ]);
  }

  //---------------------Kiem tra ten cua hang---------------------
  const checkNameStore = () => {
    if (!nameStore) return;
    setIsLoading(true);
    const body = {
      pro: 'EC_SYS_MBI_SEL_CUST001_001_0',
      data: [nameStore]
    };
    console.log('body: ', body);
    CustomAxios().post('/api/exec-auth', body)
      .then(res => {
        setIsLoading(false);
        if (!res) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
          return;
        }
        if (res.message == 'Token expired') {
          Alert.alert(
            'Thông báo',
            'Phiên làm việc hết hạn, vui lòng đăng nhập lại',
            [{
              text: 'Đóng', onPress: async () => {
                await AsyncStorage.clear();
                navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
              }
            }]
          );
          return;
        }
        if (res.error) {
          Alert.alert('Thông báo', res.message);
          return;
        }
        if (res.data[0][0].status == -2) {
          setCheckName(false);
          setStrErrorNameStore('Tên cửa hàng đã tồn tại, vui lòng chọn tên khác');
        } else {
          setCheckName(true);
        }
      })
      .catch(err => {
        console.log('Error: ', err);
        setIsLoading(false);
      });
  };

  //---------------------Xac thuc thong tin--------------------
  const onSubmit = async () => {
    if (!nameStore) {
      setCheckName(false);
      setStrErrorNameStore('Tên cửa hàng không được để trống');
      if (nameStoreRef.current) nameStoreRef.current.focus();
      return;
    }
    if (!image) {
      Alert.alert('Thông báo', 'Vui lòng chụp ảnh giấy chứng nhận đăng ký kinh doanh');
      return;
    }
    if (!phone) {
      setCheckPhone(false);
      setStrErrorPhone('Số điện thoại không được để trống');
      if (phoneRef.current) phoneRef.current.focus();
      return;
    }
    if (!email) {
      setCheckEmail(false);
      setStrErrorEmail('Email không được để trống');
      if (emailRef.current) emailRef.current.focus();
      return;
    }
    if (!isAgree) {
      Alert.alert('Thông báo', 'Vui lòng đồng ý cung cấp thông tin cửa hàng và thông tin liên hệ bổ sung cho EatCrazies');
      return;
    }
    return;
    //Call API upload file
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('images', {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });
      const resImage = await CustomAxios('multipart/form-data').post('/api/upload-images', formData);
      if (!resImage) {
        setIsLoading(false);
        Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
        return;
      }
      if (resImage.error) {
        setIsLoading(false);
        Alert.alert('Thông báo', resImage.message);
        return;
      }
      if (resImage.message == 'Token expired') {
        setIsLoading(false);
        Alert.alert(
          'Thông báo',
          'Phiên làm việc hết hạn, vui lòng đăng nhập lại',
          [{ text: 'Đóng', onPress: async () => { 
            await AsyncStorage.clear();
            navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
          }}]
        );
        return;
      }
      if (!resImage.data[0]) {
        const body = {
          pro: 'EC_SYS_MBI_INS_CUST001_001_0',
          data: [userPk, nameStore, phone, email, resImage.data[0]]
        };
        const res = await CustomAxios().post('/api/exec-auth', body);
        setIsLoading(false);
        if (!res) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra, vui lòng thử lại sau');
          return;
        }
        if (res.message == 'Token expired') {
          Alert.alert(
            'Thông báo',
            'Phiên làm việc hết hạn, vui lòng đăng nhập lại',
            [{ text: 'Đóng', onPress: async () => {  
              await AsyncStorage.clear();
              navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
            } }]
          );
          return;
        }
        if (res.error) {
          Alert.alert('Thông báo', res.message);
          return;
        }
        console.log('res: ', res.data[0][0]);
        if (res.data[0][0].pk_customer == -2) {
          Alert.alert(
            'Thông báo',
            'Tên cửa hàng đã tồn tại, vui lòng chọn tên khác',
            [{ text: 'Đóng' }]
          );
          return;
        } else {
          Alert.alert(
            'Thông báo',
            'Xác minh tài liệu thành công, chờ xác nhận từ EatCrazies',
            [{ text: 'Đóng' }]
          );
        }
      }

    } catch (error) {
      console.log('Error: ', error);
      setIsLoading(false);
    }
  };

  //--------------------------Camera & Library--------------------------
  const [isShowChangeType, setIsShowChangeType] = useState(false);
  const onChangeType = () => {
    return (
      <View style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
      }}>
        <TouchableOpacity
          onPress={() => { setIsShowChangeType(false) }}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }} />
        <View style={{
          height: 120,
          width: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
          <Text style={{
            textAlign: 'center',
            padding: 10,
            fontSize: 16,
            marginTop: 10,
            fontWeight: 'bold',
          }}>Chọn nguồn ảnh</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
            <TouchableOpacity
              onPress={() => { onChangeCamera() }}
              style={{
                borderRadius: 30,
                padding: 10,
                backgroundColor: Color.mainColor,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
              }}>Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { onChangeLibrary() }}
              style={{
                borderRadius: 30,
                padding: 10,
                backgroundColor: Color.mainColor,
                marginLeft: 10,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
              }}>Chọn từ thư viện</Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  };
  // Chup anh 
  const onChangeCamera = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Thông báo",
            message: "Xin hãy cấp quyền truy cập camera cho ứng dụng.",
            buttonNegative: "Hủy bỏ",
            buttonPositive: "Xác nhận",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          takePhoto();
        } else {
          Alert.alert(
            "Thông báo",
            "Xin hãy cấp quyền truy cập camera cho ứng dụng.",
            [{ text: "Đóng" }]
          );
        }
      } else if (Platform.OS === "ios") {
        takePhoto();
      } else {
        Alert.alert("Thông báo", "Thiết bị không hỗ trợ chức năng này.", [
          { text: "Đóng" },
        ]);
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const takePhoto = () => {
    setIsShowChangeType(false);
    setTimeout(
      () =>
        launchCamera(OptionsImage, (res) => {
          if (res.errorCode == "camera_unavailable") {
            //   ShowError('camera_unavailable');
            Alert.alert("Thông báo", "camera_unavailable");
            return;
          } else if (!res.didCancel) {
            // setImage(res.assets[0].base64);
            const selectedImages = res.assets.map((asset) => asset.uri);
            console.log('selectedImages: ', res.assets);
            console.log('selectedImages: ', selectedImages);
            setImage(selectedImages[0]);
            setFile(res.assets[0]);
          }
        }),
      500
    );
  };

  // Chon anh tu thu vien
  const onChangeLibrary = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Thông báo",
            message: "Xin hãy cấp quyền truy cập thư viện ảnh cho ứng dụng.",
            buttonNegative: "Hủy bỏ",
            buttonPositive: "Xác nhận",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          selectImage();
        } else {
          Alert.alert(
            "Thông báo",
            "Xin hãy cấp quyền truy cập thư viện ảnh cho ứng dụng.",
            [{ text: "Đóng" }]
          );
        }
      } else if (Platform.OS === "ios") {
        selectImage();
      } else {
        Alert.alert("Thông báo", "Thiết bị không hỗ trợ chức năng này.", [
          { text: "Đóng" },
        ]);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  const selectImage = () => {
    setIsShowChangeType(false);
    setTimeout(() => {
      launchImageLibrary(OptionsImage, (res) => {
        if (res.errorCode == "camera_unavailable") {
          //   ShowError('camera_unavailable');
          Alert.alert("Thông báo", "camera_unavailable");
        } else if (!res.didCancel) {
          // setImage(res.assets[0].base64);
          const selectedImages = res.assets.map((asset) => asset.uri);
          console.log('selectedImages: ', res.assets);
          setImage(selectedImages[0]);
          setFile(res.assets[0]);
        }
      });
    }, 500);
  };

  return (
    <View style={{ backgroundColor: Color.backgroundColor, flex: 1 }}>
      <TTHeader
        width='100%'
        hasTitle={true}
        title='Xác thực thông tin cửa hàng'
        hasIconRight1={true}
        iconRight1='headset'
        iconRightOnPress={() => {
          console.log('headset');
        }}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1, padding: 10 }}>
          <Text style={{
            marginLeft: 2,
            marginBottom: 10,
            fontSize: 15,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>Hãy bắt đầu tạo cửa hàng của bạn</Text>

          {/* Ten cua hang */}
          <View style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
          }}>
            <Text style={{ fontWeight: 'bold' }}>
              Tên cửa hàng <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <Text style={{ marginTop: 3 }}>
              Hiện bạn chỉ có thể soạn thảo tên cửa hàng một lần duy nhất.
              Vui lòng kiểm tra kỹ trước khi xác nhận.
              Nhập tên cửa hàng của bạn dưới đây.
            </Text>
            {checkName != null && !checkName && (
              <Text style={{ color: 'red', marginTop: 5, fontStyle: 'italic' }}>
                {strErrorNameStore}
              </Text>
            )}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 10,
              borderRadius: 8,
              marginTop: 5,
              backgroundColor: Color.backgroundColor,
            }}>
              <TextInput
                ref={nameStoreRef}
                value={nameStore}
                onChangeText={setNameStore}
                placeholder='Nhập tên cửa hàng'
                onBlur={() => { checkNameStore() }}
                style={{ flex: 1, marginRight: 20 }}
              />
              {checkName != null && (
                <Icon
                  name={checkName ? 'check-circle' : 'close-circle'}
                  size={20}
                  color={checkName ? 'green' : 'red'}
                />
              )}
            </View>
          </View>

          <Text style={{ marginVertical: 10, marginLeft: 2, fontStyle: 'italic', }}>
            Vì mục đích tuân thủ pháp luật, chúng tôi cần xác minh thông tin của bạn.
            Thông tin này sẽ được bảo mật và không bao giờ được chia sẻ với bên thứ ba.
          </Text>

          {/* Giay chung nhan dang ky kinh doanh */}
          <View style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
          }}>
            <Text style={{ fontWeight: 'bold' }}>Giấy chứng nhận đăng ký kinh doanh</Text>
            <Text style={{ marginTop: 3 }}>
              1. Vui lòng chụp ảnh giấy chứng nhận đăng ký kinh doanh của bạn.
            </Text>
            <Text style={{}}>
              2. Ảnh phải rõ nét, không bị mờ hoặc bị che khuất thông tin.
            </Text>
            <Text style={{}}>
              3. Tập tin ảnh phải có định dạng JPG, JPEG, PNG hoặc PDF
            </Text>
            <View style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
              <View>
                <TouchableOpacity onPress={() => {
                  setIsShowImage(true);
                }} style={{
                  width: 100,
                  height: 100,
                  borderRadius: 4,
                  overflow: 'hidden',
                  backgroundColor: Color.backgroundColor,
                }}>
                  <Image
                    source={require('../../assest/images/img_dkkd.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='contain'
                  />
                  <View style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                  }}>
                    <Text style={{
                      color: 'white',
                      textAlign: 'center',
                      padding: 3,
                      fontSize: 12,
                    }}>
                      Mẫu
                    </Text>
                  </View>

                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                  onPress={() => { setIsShowChangeType(true) }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 4,
                    overflow: 'hidden',
                    backgroundColor: Color.backgroundColor,
                  }}>
                  {!image ? (
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                      <Icon
                        name='camera'
                        size={26}
                        color={'gray'}
                        style={{ textAlign: 'center' }}
                      />
                      <Text style={{ color: 'gray', fontSize: 12, }}>
                        Thêm ảnh
                      </Text>
                    </View>
                  ) :
                    <View style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                      <Image
                        source={{ uri: image }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='contain'
                      />
                    </View>}
                </TouchableOpacity>

              </View>
            </View>
          </View>

          {/* Thong tin lien he bo sung */}
          <View style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
            marginTop: 10,
          }}>
            <Text style={{ fontWeight: 'bold' }}>Thông tin liên hệ bổ sung</Text>
            <Text style={{ marginTop: 3 }}>
              Thông tin liên hệ bổ sung sẽ được sử dụng để liên hệ với bạn trong trường hợp cần thiết.
              Thông tin này không dùng để đăng nhập, EatCrazies Seller sẽ nổ lực bảo vệ thông tin của bạn.
            </Text>

            <Text style={{
              fontWeight: 'bold', marginTop: 5,
              marginLeft: 2, marginBottom: 3
            }}
            >Số điện thoại <Text style={{ color: 'red' }}>*</Text>
            </Text>
            {!checkPhone && strErrorPhone != '' && (
              <Text style={{ color: 'red', marginTop: 5, fontStyle: 'italic' }}>
                {strErrorPhone}
              </Text>
            )}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: Color.backgroundColor,
            }}>
              <TextInput
                ref={phoneRef}
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  setStrErrorPhone('');
                }}
                placeholder='Nhập số điện thoại'
              />
            </View>

            <Text style={{
              fontWeight: 'bold', marginTop: 5,
              marginLeft: 2, marginBottom: 3
            }}>
              Email <Text style={{ color: 'red' }}>*</Text>
            </Text>
            {!checkEmail && strErrorEmail != '' && (
              <Text style={{ color: 'red', marginTop: 5, fontStyle: 'italic' }}>
                {strErrorEmail}
              </Text>
            )}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: Color.backgroundColor,
            }}>
              <TextInput
                ref={emailRef}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setStrErrorEmail('');
                }}
                placeholder='Nhập email'
              />
            </View>
          </View>

          {/* Checkbox */}
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
            <Icon
              name={isAgree ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
              color={Color.mainColor}
              onPress={() => { setIsAgree(!isAgree) }}
            />
            <Text style={{ marginLeft: 5, flex: 1 }}>
              Tôi đồng ý cung cấp thông tin cửa hàng và thông tin liên hệ bổ sung cho EatCrazies
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            disabled={statusAuthStore == 1 ? true : false}
            style={{
              backgroundColor: statusAuthStore == 1 ? 'gray' : Color.mainColor,
              padding: 10,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => { onSubmit() }}
          >
            <Text style={{ color: 'white' }}>
              {strButtonAuth}
            </Text>
          </TouchableOpacity>

          {/* Note */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginTop: 10 }}>
              Bằng việc xác minh tài liệu, bạn đồng ý với các điều khoản và điều kiện của EatCrazies
            </Text>
            <Text style={{ marginTop: 5 }}>
              Bạn không thể thay đổi thông tin cửa hàng sau khi xác minh tài liệu
            </Text>
            <Text style={{ marginTop: 5 }}>
              Nếu đây không phải là tài khoản bạn muốn xác minh, vui lòng &nbsp;
              <Text
                style={{ color: Color.mainColor, fontWeight: 'bold' }}
                onPress={() => { logout() }}
              >đăng xuất </Text> và đăng nhập bằng tài khoản khác
            </Text>
          </View>

        </ScrollView>
      </KeyboardAwareScrollView>

      {/* Modal */}
      {isLoading && <Loading />}
      {isShowChangeType && onChangeType()}
      {isShowImage && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            <Image
              source={require('../../assest/images/img_dkkd.jpg')}
              style={{ width: '100%', height: '100%' }}
              resizeMode='contain'

            />
          </View>

          <Pressable
            style={{
              backgroundColor: Color.mainColor,
              borderRadius: 8,
              padding: 10,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              marginHorizontal: 10,
              marginBottom: 30
            }}
            onPress={() => {
              setIsShowImage(false);
            }}
          >
            <Text style={{ color: 'white' }}>Đóng</Text>
          </Pressable>
        </View>

      )}
    </View>
  )
}

export default Src00201