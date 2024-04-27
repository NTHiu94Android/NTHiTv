import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { View, Image, StatusBar } from 'react-native'
import { LogBox, SafeAreaView } from "react-native";
import "react-native-gesture-handler";
import AppIntroSlider from 'react-native-app-intro-slider';
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//Redux
import Redux from './src/redux/stores';
//Colors
import Color from './src/assest/colors';
//Screens
import SRC00001 from './src/screens/SRC000/Src00001'; //Login
import SRC00002 from './src/screens/SRC000/Src00002'; //Register
import SRC001 from './src/screens/SRC001';            //Home
import SRC00201 from './src/screens/SRC002/Src00201'; //Movie detail
import SRC00202 from './src/screens/SRC002/Src00202'; //Search movie
import SRC00203 from './src/screens/SRC002/Src00203'; //
//Create Stack 
const Stack = createStackNavigator();

LogBox.ignoreLogs(["Warning: ", "EventEmitter.removeListener"]);
LogBox.ignoreAllLogs(); 

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const slides = [
    {
      key: 'one',
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('./src/assest/images/logo_iqiyi.png'),
      backgroundColor: '#59b2ab',
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      setShowRealApp(true);
    }, 2000);
  }, []);

  return (
    <Provider store={Redux.store}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="dark-content"
        hidden={false}
      />
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: Color.backgroundColor,
      }}>
        {!showRealApp ? (
          <AppIntroSlider
            renderItem={({ item }) => (
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.backgroundColor
              }}>
                <Image
                  source={item.image}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  resizeMode='contain'
                />
              </View>
            )}
            data={slides}
            showPrevButton={false}
            bottomButton={false}
            showSkipButton={false}
            showDoneButton={false}
          />
        ) : (
          <NavigationContainer independent={true}>
            <Stack.Navigator
              initialRouteName="SRC001"
              screenOptions={{
                headerShown: false,
                gestureEnabled: false
              }}
            >
              <Stack.Screen name="SRC00001" component={SRC00001} />
              <Stack.Screen name="SRC00002" component={SRC00002} />
              <Stack.Screen name="SRC001" component={SRC001} />
              <Stack.Screen name="SRC00201" component={SRC00201} />
              <Stack.Screen name="SRC00202" component={SRC00202} />
              <Stack.Screen name="SRC00203" component={SRC00203} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaView>
    </Provider>
  )
}

export default App;