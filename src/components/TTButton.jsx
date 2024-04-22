import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Color from '../assest/colors'
import Icon from 'react-native-vector-icons/Ionicons';

const TTButton = ({
  width = '100%',
  height = 72,
  paddingHorizontal = 20,
  paddingVertical = 10,
  onPress,
  backgroundColor = Color.buttonColor,
  borderRadius = 80,
  borderColor = Color.mainColor,
  borderWidth = 1,
  value,
  fontSize = 14,
  fontWeight = 'bold',
  textColor = Color.mainColor,
  hasIcon = false,
  icon,
  iconSize = 24,
  iconColor = Color.mainColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {hasIcon ? (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          borderColor: borderColor,
          borderWidth: borderWidth,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          width: width,
        }}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Icon
              name={icon}
              size={iconSize}
              color={iconColor}
            />
          </View>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
            <Text style={{
              color: Color.white,
              fontSize: fontSize,
              fontFamily: 'Roboto-Bold',
              fontWeight: fontWeight,
              textAlign: 'center',
              color: textColor,
            }}>{value}</Text>
          </View>
        </View>
      ) : (
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <Text style={{
            color: Color.white,
            fontSize: fontSize,
            fontFamily: 'Roboto-Bold',
            fontWeight: fontWeight,
            textAlign: 'center',
            color: textColor,
            flex: 1,
          }}>{value}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default TTButton