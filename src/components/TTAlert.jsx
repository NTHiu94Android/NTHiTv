import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const TTAlert = ({
    width = '100%',
    height = 72,
    backgroundColor = Color.buttonColor,
    borderRadius = 10,
    fontSize = 24,
    fontWeight = 'bold',
    iconSize = 18,
    iconColor = Color.mainColor,
    title = 'Alert',
    children,
    hasBtn1 = true,
    icon1,
    onPress1,
    btn1Color = Color.mainColor,
    hasBtn2 = true,
    icon2,
    onPress2,
    btn2Color = '#e8e8e8',
}) => {
    return (
        <View style={{
            width: width,
            height: height,
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: Color.mainColor,
                width: '100%',
                height: '100%',
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                }}>{title}</Text>
            </View>
            <View style={{
                padding: 10,
                backgroundColor: Color.white,
                width: '100%',
                height: '100%',
            }}>
                {children}
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {hasBtn1 ? (
                    <TouchableOpacity onPress={onPress1}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: btn1Color,
                            borderRadius: 8,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            margin: 5,
                        }}>
                            {icon1 ?
                                <Icon
                                    name={icon1}
                                    size={iconSize}
                                    color={iconColor}
                                /> : null
                            }

                        </View>
                    </TouchableOpacity>
                ) : null}

                {hasBtn2 ? (
                    <TouchableOpacity onPress={onPress2}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: btn2Color,
                            borderRadius: 8,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            margin: 5,
                        }}>
                            {icon2 ?
                                <Icon
                                    name={icon2}
                                    size={iconSize}
                                    color={iconColor}
                                /> : null
                            }
                        </View>
                    </TouchableOpacity>
                ) : null}

            </View>
        </View>
    )
}

export default TTAlert