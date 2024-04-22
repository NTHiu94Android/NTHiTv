import { View, Image } from 'react-native'
import React from 'react';

const Loading = () => {
    return (
        <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute', width: '100%', height: '100%', zIndex: 100
        }}>
            <View style={{
                backgroundColor: 'white',
                width: 100, height: 100, borderRadius: 10,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <Image
                    source={require('../assest/images/loading_gif.gif')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='contain'
                />
            </View>
        </View>
    )
};

export default Loading;