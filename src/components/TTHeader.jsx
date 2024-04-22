import { View, Text, Image, Platform } from 'react-native';
import React from 'react';
import Color from '../assest/colors'
import Icon from 'react-native-vector-icons/Ionicons';

const TTHeader = ({
    hasIconLeft = false,
    iconLeft,
    iconLeftColor = Color.white,
    iconLeftSize = 22,
    iconLeftOnPress,
    titleLeftOnPress,
    hasIconRight1 = false,
    iconRight1,
    hasIconRight2 = false,
    iconRight2,
    hasIconRight3 = false,
    iconRight3,
    iconRightColor = Color.white,
    iconRightSize = 22,
    iconRight1OnPress,
    iconRight2OnPress,
    iconRight3OnPress,
    hasTitleLeft = false,
    titleLeft,
    hasTitle = false,
    title,
    titleOpacity = 1,
    titleColor = Color.white,
    titleSize = 18,
    hasLogo = false,
    logo = require('../assest/images/splash_bg.png'),
    logoSize = 32,
    logoOnPress,
    backgroundColor = 'black',
    width = '100%',
    height,
    paddingTop = 40
}) => {
    return (
        <View style={{
            backgroundColor: backgroundColor,
            width: width,
            height: height,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 15,
            paddingTop: Platform.OS === 'ios' ? 15 : paddingTop,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                minWidth: iconRightSize
            }}>
                {hasIconLeft && (
                    <Icon
                        name={iconLeft}
                        size={iconLeftSize}
                        color={iconLeftColor}
                        onPress={iconLeftOnPress}
                        style={{ marginRight: 10 }}
                    />)}
                {hasTitleLeft ? (
                    <Text
                        onPress={titleLeftOnPress}
                        style={{
                            color: titleColor,
                            fontSize: titleSize,
                            fontFamily: 'Roboto-Bold',
                            fontWeight: 'bold',
                        }}
                    >
                        {titleLeft}
                    </Text>
                ) : null}
            </View>
            {hasLogo ? (
                <Image
                    source={logo}
                    style={{ height: logoSize, flex: 1}}
                    resizeMode='contain'
                    onPress={logoOnPress}
                />
            ) : null}
            {hasTitle ? (
                <Text style={{
                    color: titleColor,
                    fontSize: titleSize,
                    fontFamily: 'Roboto-Bold',
                    fontWeight: 'bold',
                    opacity: titleOpacity,
                }}>
                    {title}
                </Text>
            ) : null}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                minWidth: iconRightSize
            }}>
                {hasIconRight1 && (
                    <Icon
                        name={iconRight1}
                        size={iconRightSize}
                        color={iconRightColor}
                        onPress={iconRight1OnPress}
                    />
                )}
                {hasIconRight2 && (
                    <Icon
                        name={iconRight2}
                        size={iconRightSize}
                        color={iconRightColor}
                        onPress={iconRight2OnPress}
                        marginLeft={10}
                    />
                )}
                {hasIconRight3 && (
                    <Icon
                        name={iconRight3}
                        size={iconRightSize}
                        color={iconRightColor}
                        onPress={iconRight3OnPress}
                        marginLeft={10}
                    />
                )}
            </View>

        </View>
    )
}

export default TTHeader