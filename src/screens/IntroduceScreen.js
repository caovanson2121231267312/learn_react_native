import React from 'react';
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Pressable,
    FlatList,
} from "react-native";
import { useState } from "react";

function IntroduceScreen({props, navigation}) {
    return (
        <View>
            <Text>Đây là trang giới thiệu</Text>
            <Button title='Về trang chủ' onPress={()=>navigation.navigate('Home')}/>
        </View>
    );
}

export default IntroduceScreen;