import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../assest/colors';
import Src00101 from './Src00101';
import Src00102 from './Src00102';
import Src00103 from './Src00103';
import Src00104 from './Src00104';
// import Src00105 from './Src00105';

const Tab = createBottomTabNavigator();

const SRC001 = () => {
  useEffect(() => {
    //-----------------------request permission-----------------------
    // const requestUserPermission = async () => {
    //   const authStatus = await messaging().requestPermission();
    //   const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //   if (enabled) {
    //     console.log('Authorization status:', authStatus);
    //   }
    // }
    // requestUserPermission();

    //-----------------------get token-----------------------
    // const GetToken = async () => {
    //   await messaging().registerDeviceForRemoteMessages();
    //   const token = await messaging().getToken();
    //   console.log('TokenFcm--------------->: ', token);
    // }
    // GetToken();

    //-----------------------unsubcribe-----------------------
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   const data = remoteMessage.data;
    //   const datajson = JSON.parse(data.message);
    //   console.log('A new FCM message arrived!: ', datajson);
    // });
    // return unsubscribe;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused
              ? 'home' : 'home';
          } else if (route.name === 'Kho phim') {
            iconName = focused
              ? 'video-collection' : 'video-collection';
          } else if (route.name === 'Yêu thích') {
            iconName = focused
              ? 'bookmarks' : 'bookmarks'; 
          } else if (route.name === 'Cá nhân') {
            iconName = focused
              ? 'person' : 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.mainColor,
        tabBarInactiveTintColor: 'white',
        initialRouteName: 'Trang chủ',
        tabBarStyle: {
          backgroundColor: Color.backgroundColor,
          paddingBottom: 5,
          paddingTop: 5,
          height: 55,
        },
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name="Trang chủ" component={Src00101} />
      <Tab.Screen options={{ headerShown: false }} name="Kho phim" component={Src00102} />
      <Tab.Screen options={{ headerShown: false }} name="Yêu thích" component={Src00103} />
      <Tab.Screen options={{ headerShown: false }} name="Cá nhân" component={Src00104} />
    </Tab.Navigator>
  )
}

export default SRC001;