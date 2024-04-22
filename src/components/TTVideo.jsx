import { View, Text, TouchableOpacity, Image, Dimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

const TTVideo = ({url}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isShowIcon, setIsShowIcon] = useState(false);

    useEffect(() => {
        setIsPlaying(true);
        setIsShowIcon(false);
    }, []);

    const handleClickVideo = () => {
        setIsPlaying(!isPlaying);
        setIsShowIcon(true);
        setTimeout(() => {
            setIsShowIcon(false);
        }, 1000);
    };

    return (
        <Pressable
            onPress={handleClickVideo}
            style={{
                flex: 1, width,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}
        >
            <Video
                source={{ uri: url }}
                style={{
                    flex: 1, width, height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                }}
                resizeMode="contain"
                onEnd={onEnd}
                repeat={true}
                paused={!isPlaying}
            />

            {isShowIcon && (
                <View style={{
                    position: 'absolute',
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                }}>
                    <Icon
                        name={isPlaying ? 'pause' : 'play'}
                        size={50}
                        color="white"
                        style={{}}
                        onPress={handleClickVideo}
                    />
                </View>
            )}
        </Pressable>
    );
};

export default TTVideo;