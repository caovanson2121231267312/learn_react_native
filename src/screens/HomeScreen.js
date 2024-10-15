import React from 'react';
import { View, Text } from "react-native";
import Header from '../components/layout/Header';

function HomeScreen({props, navigation}) {
    return (
        <View>
            <Header navigation={navigation} />
            <Text>Trang chủ</Text>
        </View>
    );
}

export default HomeScreen;