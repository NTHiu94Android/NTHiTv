import { View, Text, ScrollView, RefreshControl, Pressable, Image } from 'react-native';
import React, { } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MVItem = ({
    image_url,
    name,
    pay_nm,
    pay_code,
    release_code,
    episode_count,
    onPress,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                borderRadius: 4,
                overflow: 'hidden',
                width: '100%', height: 200,
                marginBottom: 5,
            }}>
            <View style={{ flex: 1, width: '100%', borderRadius: 4, overflow: 'hidden' }}>
                <Image
                    source={{ uri: image_url }}
                    style={{ width: '100%', height: '100%', }}
                    resizeMode={'cover'} />
                {pay_nm && pay_code && pay_code == 'MV05001' && (
                    <View style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 4,
                        backgroundColor: 'gold',
                        zIndex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        // width: 50,
                    }}>
                        <Text style={{ color: 'black', fontSize: 10, fontWeight: 'bold' }}>{pay_nm}</Text>
                        <Icon name="star" size={10} color="black" style={{marginLeft: 2}}/>
                    </View>
                )}

                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '30%',
                        zIndex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 5,
                        marginBottom: 5,
                    }}>
                        <Text style={{ color: 'white', fontSize: 10, }} numberOfLines={1}>
                            {release_code && episode_count && release_code == 'MV06001'
                                ? 'Trọn bộ' + ' | ' + episode_count + ' tập' : release_code = 'MV06002'
                                    ? 'Cập nhật tập ' + episode_count : ''
                            }
                        </Text>
                    </View>
                </LinearGradient>
            </View>

            <Text numberOfLines={1}
                style={{ color: 'white', fontSize: 12, marginTop: 5, }}
            >{name}</Text>

        </Pressable>
    )
}

export default MVItem