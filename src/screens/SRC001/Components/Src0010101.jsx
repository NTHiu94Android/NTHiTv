import { View, Text, ScrollView, RefreshControl, } from 'react-native';
import React, { useState, useCallback } from 'react';


const Src0010101 = ({ type }) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <ScrollView
            style={{ flex: 1, paddingTop: 5 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl 
                    progressBackgroundColor={null}
                    colors={['white']}
                    progressViewOffset={30}
                    refreshing={refreshing} 
                    onRefresh={onRefresh} 
                />
            }
        >
            <Text>Src0010101</Text>
        </ScrollView>
    )
}

export default Src0010101