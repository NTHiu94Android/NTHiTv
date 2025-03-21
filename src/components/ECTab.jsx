import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import * as AMT from 'react-native-animatable';
import Color from '../assest/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ECTab = ({
  scrollEnabled = true,
  fullTab = false,
  onChangeTab = null,
  hasIcon = false,
  iconName = 'format-list-bulleted',
  iconOnPress = null,
  hasBottomLine = false,
  ...props
}) => {
  const flatlistRef = useRef();
  const { data } = props;

  const windowWidth = (Dimensions.get('window').width - 20) / data.length;

  //customize tab
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>

        <FlatList
          ref={flatlistRef}
          scrollEnabled={scrollEnabled}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => {
            const onlyKey = index.toString() + 'tabs' + Math.random();
            return onlyKey;
          }}
          renderItem={({ item }) => (
            <View style={{}}>
              <TouchableOpacity
                key={'tab' + Math.random()}
                activeOpacity={0.7}
                style={{
                  width: fullTab ? windowWidth : null,
                  flex: fullTab ? 1 : 0,
                  padding: 2,
                  paddingHorizontal: 10,
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}
                onPress={() => {
                  let index = 0;
                  if (item.id === 0 || item.id === data.length - 1) {
                    index = item.id;
                  } else {
                    index = item.id - 1;
                  }
                  console.log("itemID: ", item.id);
                  
                  flatlistRef.current.scrollToIndex({ index });
                  setCurrentTab(item.id);
                  onChangeTab && onChangeTab(item.id);
                }}>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  borderBottomColor: item.id === currentTab && hasBottomLine ? Color.mainColor : Color.backgroundColor,
                  borderBottomWidth: item.id === currentTab && hasBottomLine ? 1.5 : 0,
                }}>
                  <Text style={{
                    fontWeight: 'bold',
                    color: item.id === currentTab ? 'white' : '#dddddd',
                    fontSize: item.id === currentTab ? 18 : 16,
                    textAlign: 'center',
                  }}>
                    {item.name}
                  </Text>
                </View>
                {item.count != null ? (
                  <View
                    style={{
                      minWidth: 10,
                      minHeight: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 2,
                      marginLeft: 2,
                    }}>
                    <Text
                      style={{
                        // color: item.id === currentTab ? Color.mainColor : '#7F8C8D',
                        color: 'white',
                        fontSize: 17,
                        fontWeight: 'bold',
                      }}>
                      ({item.count})
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
              {/* Bottom line */}
              {/* {hasBottomLine && (
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }} >
                  <View style={{
                    height: 3,
                    width: '20%',
                    borderRadius: 30,
                    backgroundColor: item.id === currentTab
                      ? item.bottomColor != null
                        ? Color.backgroundColor
                        : Color.mainColor
                      : Color.backgroundColor,
                  }} />
                </View>
              )} */}

            </View>

          )}
        />
        {hasIcon && (
          <Icon
            name={iconName}
            size={24}
            onPress={iconOnPress}
            style={{
              marginHorizontal: 10,
            }}
          />
        )}
      </View>
      <Effect key={data[currentTab].id}>
        {data[currentTab] ? data[currentTab].screen : null}
      </Effect>
    </View>
  );
};
const Effect = ({ children }) => {
  return (
    <AMT.View style={{ flex: 1 }} animation={'fadeInRight'} duration={300}>
      {children}
    </AMT.View>
  );
};
export default ECTab;