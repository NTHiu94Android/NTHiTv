import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const TTTab = ({ data, resultTab, hasSelected }) => {

    const handleResult = (item) => {
        console.log('Item RST: ', item);
        resultTab(item.pk);
    }

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => handleResult(item)}>
                        <View style={{
                            marginRight: 10,
                            borderRadius: 20,
                            paddingVertical: 5,
                            marginBottom: 5,
                            marginRight: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                color: Color.white,
                                opacity: hasSelected === item.pk ? 1 : 0.6,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: 'Roboto-Bold',
                            }}>{item.tabName}</Text>
                            {hasSelected === item.pk && (
                                <View style={{
                                    backgroundColor: Color.buttonColor,
                                    width: 15,
                                    height: 2,
                                    borderBottomWidth: 2,
                                    borderBottomEndRadius: 5,
                                    borderBottomStartRadius: 5,
                                }} />
                            )}
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.pk}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default TTTab;