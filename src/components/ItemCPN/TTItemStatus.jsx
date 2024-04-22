import { Text, View, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import Color from '../../assest/colors';
import { AVATAR_DEFAULT } from '../../constants';

const TTItemStatus = ({
    item, gotoProfile, gotoListImage,
    likeIconClick, commentIconClick
}) => {
    const username = item.fullname;
    let userAvatar = item.avatar;
    if(item.avatar == ' ' || item.avatar == null){
        userAvatar = AVATAR_DEFAULT;
    };
    //Chuyen ngay tu dang 2024-03-10T00:00:00.000Z sang dang 10m ago hoac 1h ago
    const crt_dt = new Date(item.crt_dt);
    const now = new Date();
    const diff = now - crt_dt;
    const diffSeconds = diff / 1000;
    const diffMinutes = diffSeconds / 60;
    const diffHours = diffMinutes / 60;
    const diffDays = diffHours / 24;
    const diffMonths = diffDays / 30;
    const diffYears = diffMonths / 12;
    let time = '';
    if (diffSeconds < 60) {
        time = Math.floor(diffSeconds) + 's ago';
    } else if (diffMinutes < 60) {
        time = Math.floor(diffMinutes) + 'm ago';
    } else if (diffHours < 24) {
        time = Math.floor(diffHours) + 'h ago';
    } else if (diffDays < 30) {
        time = Math.floor(diffDays) + 'd ago';
    } else if (diffMonths < 12) {
        time = Math.floor(diffMonths) + 'm ago';
    } else {
        time = Math.floor(diffYears) + 'y ago';
    };
    const content = item.content ? item.content : '';
    const fontFamily = 'Roboto';
    const colorText = 'black';
    //Cat link anh thanh mang
    const listImage = item.list_image ? item.list_image.split(',') : [];
    const numberLike = 0;
    const numberComment = 0;
    return (
        <View style={{
            flexDirection: 'column', backgroundColor: '#F1f1f1',
            marginBottom: 10, padding: 10, borderRadius: 12
        }}>
            <Pressable onPress={gotoProfile}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', marginBottom: 10
                }}>
                    <Image
                        style={{
                            width: 36, height: 36,
                            borderRadius: 36
                        }}
                        resizeMode='cover'
                        source={{ uri: userAvatar }} />
                    <View style={{
                        flexDirection: 'column', marginLeft: 8
                    }}>
                        <Text style={{
                            color: 'black', fontSize: 13, fontWeight: '700'
                        }}>
                            {username}
                        </Text>
                        <Text style={{
                            color: 'grey', fontSize: 11,
                            fontWeight: '400'
                        }}>
                            {time}
                        </Text>
                    </View>
                </View>
            </Pressable>

            {/* Hien thi noi dung */}

            <View>
                <Text style={{
                    color: colorText, fontSize: 14,
                    fontWeight: '400', fontFamily: fontFamily,
                    paddingHorizontal: 5
                }}>
                    {content}
                </Text>
                {/* Hien thi anh */}
                {listImage.length > 1 ? (
                    // Hien thi hinh anh va so luong anh nam phia tren anh
                    <Pressable onPress={gotoListImage}>
                        <View style={{
                            position: 'relative',
                            borderRadius: 10, overflow: 'hidden',
                            height: 200, marginVertical: 10
                        }}>
                            <Image
                                style={{
                                    width: '100%', height: '100%'
                                }}
                                resizeMode='cover'
                                source={{ uri: listImage[0] ? listImage[0] : '' }}
                            />
                            <View style={{
                                position: 'absolute',
                                bottom: 0, top: 0, right: 0,
                                zIndex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
                                padding: 20, justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'white', fontSize: 12,
                                    fontWeight: '400', fontFamily: fontFamily
                                }}>
                                    + {listImage.length - 1} images
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                ) : null}
                {listImage.length === 1 ? (
                    <Image
                        style={{
                            width: '100%', height: 150,
                            borderRadius: 10, marginVertical: 10
                        }}
                        resizeMode='cover'
                        source={{ uri: listImage[0] ? listImage[0] : '' }}
                        onPress={gotoListImage}
                    />
                ) : null}
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10
            }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center', marginRight: 12
                    }}>
                        <Image
                            style={{ width: 18, height: 18, marginRight: 4 }}
                            resizeMode='cover'
                            source={require('../../assest/images/ic_heart512.png')} />
                        <Text>{numberLike}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            style={{ width: 18, height: 18, marginRight: 4 }}
                            resizeMode='cover'
                            source={require('../../assest/images/ic_coment512.png')} />
                        <Text>{numberComment}</Text>
                    </View>
                </View>


                {/* <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text>Like by</Text>
                    <Image
                        style={{ width: 18, height: 18, borderRadius: 18, marginLeft: 4 }}
                        resizeMode='cover'
                        source={require('../../assest/images/background_app.jpg')} />
                </View> */}
            </View>
        </View>
    )
}

export default TTItemStatus