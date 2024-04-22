import { View, Text, TextInput } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const TTTextInput = ({
    placeholder,
    secureTextEntry,
    onChangeText,
    value,
    textColor,
    fontSize = 14,
    fontFamily = 'Roboto-Regular',
    fontWeight,
    paddingX = 20,
    width = '100%',
    height = 72,
    hasIcon = false,
    icon,
    iconColor,
    iconSize,
    iconOnPress,
    marginBottom = 0,
    marginTop = 10,
    borderColor = '#D8D8D8',
    borderWidth = 1,
    borderRadius = 24,
}) => {
    const bottomIcon = height / 2 - iconSize / 2
    return (
        <View style={{
            width: width,
            height: height,
            justifyContent: 'center',
            position: 'relative',
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            marginBottom: marginBottom,
            marginTop: marginTop,
        }}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={textColor}
                onChangeText={onChangeText}
                value={value}
                style={{
                    width: width,
                    height: height,
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                    color: textColor,
                }}
                paddingHorizontal={paddingX}
                fontFamily={fontFamily}
                secureTextEntry={secureTextEntry}

            />
            {hasIcon &&
                <Icon
                    name={icon}
                    size={iconSize}
                    color={iconColor}
                    onPress={iconOnPress}
                    style={{
                        position: 'absolute',
                        right: 15,
                        bottom: bottomIcon,
                    }}
                />
            }
        </View>
    )
}

export default TTTextInput