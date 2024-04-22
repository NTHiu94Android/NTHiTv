import { View, Text , StyleSheet, Image, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import TTHeader from '../../components/TTHeader';
import Color from '../../assest/colors';
import RNRestart from 'react-native-restart';
import { TOKEN, USERNAME, USER, LOGO } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Src00104 = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const user_local = await AsyncStorage.getItem(USER);
      if (user_local) {
        setUser(JSON.parse(user_local));
        if(JSON.parse(user_local).picture_url){
          setAvatar(JSON.parse(user_local).picture_url);
        }
      }
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TTHeader
        hasIconLeft={true}
        iconLeft='search'
        iconLeftOnPress={() => {
          console.log('Back');
        }}
        hasTitleLeft={true}
        titleLeft='Search'
        width='100%'
        hasIconRight={true}
        iconRight='settings-sharp'
        iconRightOnPress={() => {
          console.log('settings-outline');
        }}
      />

      {/* Body */}
      <View>
        {/* Profile */}
        <View style={styles.viewProfile}>
          <TouchableOpacity onPress={() => {
            console.log('Profile');
          }}>
            <View style={styles.viewImgProfile}>
              <Image
                style={[styles.iconTopBar, { borderRadius: 50, width: 50, height: 50 }]}
                resizeMode='cover'
                source={{ uri: avatar || LOGO }} />
              <View style={styles.viewInfo}>
                <Text style={styles.textName}>Nguyễn Trọng Hiếu</Text>
                <Text style={styles.textStatus}>View my profile</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.iconTopBar}
              resizeMode='cover'
              source={require('../../assest/images/ic_sw_account512.png')} />
          </TouchableOpacity>
        </View>

        {/* Wallet */}
        <View style={styles.viewOption}>
          <View style={styles.viewImgProfile}>
            <Image
              style={styles.iconTopBar}
              resizeMode='cover'
              source={require('../../assest/images/ic_wallet512.png')} />
            <View style={styles.viewInfo}>
              <Text style={styles.textName}>QR Wallet</Text>
              <Text style={styles.textStatus}>View my profile</Text>
            </View>
          </View>
        </View>

        {/* My cloud */}
        <View style={styles.viewOption}>
          <View style={styles.viewImgProfile}>
            <Image
              style={styles.iconTopBar}
              resizeMode='cover'
              source={require('../../assest/images/ic_cloud512.png')} />
            <View style={styles.viewInfo}>
              <Text style={styles.textName}>My cloud</Text>
              <Text style={styles.textStatus}>Keep important messages</Text>
            </View>
          </View>
        </View>

        {/* Data and storage */}
        <View style={styles.viewOption}>
          <View style={styles.viewImgProfile}>
            <Image
              style={styles.iconTopBar}
              resizeMode='cover'
              source={require('../../assest/images/ic_data512.png')} />
            <View style={styles.viewInfo}>
              <Text style={styles.textName}>Data and storage</Text>
              <Text style={styles.textStatus}>Manager your data</Text>
            </View>
          </View>
        </View>

        {/* Account and security */}
        <View style={styles.viewOption}>
          <View style={styles.viewImgProfile}>
            <Image
              style={styles.iconTopBar}
              resizeMode='cover'
              source={require('../../assest/images/ic_security512.png')} />
            <View style={styles.viewInfo}>
              <Text style={styles.textName}>Account and security</Text>
            </View>
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.viewOption}>
          <View style={styles.viewImgProfile}> 
            <Image
              style={styles.iconTopBar}
              resizeMode='cover'
              source={require('../../assest/images/ic_private512.png')} />
            <View style={styles.viewInfo}>
              <Text style={styles.textName}>Privacy</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity onPress={()=>{
          AsyncStorage.clear();
          // RNRestart.Restart();
          navigation.reset({ index: 0, routes: [{ name: "SRC00001" }] });
        }}>
          <View style={[styles.viewOption, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[styles.textName, { color: 'red', fontWeight: '800' }]}>Logout</Text>
          </View>
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default Src00104;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#F1f1f1'
  },
  topBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#aeea00'
  },
  marginTopBar: {
    padding: 10
  },
  iconTopBar: {
    width: 24, height: 24,
    marginRight: 10
  },
  nameText: {
    fontWeight: '500',
    marginStart: 10,
    fontSize: 16,
    color: '#000000'
  },
  viewProfile: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 6,
    backgroundColor: 'white',
  },
  viewOption: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 2,
    backgroundColor: 'white'
  },
  viewImgProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  viewInfo: {
    marginStart: 10
  },
  textName: {
    maxHeight: 25,
    fontWeight: '900',
    fontSize: 16,
  },
  textStatus: {
    maxHeight: 25,
    fontWeight: '400',
    fontSize: 13,
  },

});