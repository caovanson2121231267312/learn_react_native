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

function SettingScreen({props, navigation}) {
    return (
        <View>
            <Text>
                Đây là trang setting
            </Text>
            <Button onPress={() => navigation.navigate('Home')} title='trang chủ' />
        </View>
    );
}

export default SettingScreen;