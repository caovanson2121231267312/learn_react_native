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

import { useEffect, useState } from 'react';

function UserDetail({props, route}) {

    const user = route.params

    useEffect(() => {
        console.log(route)
        console.log(route.key)
        console.log(route.name)
    }, [])

    return (
        <View>
            <Text>Chi tiết người dùng</Text>
            <Text>id: { user.id }</Text>
            <Text>Name: { user.name }</Text>
            <Text>Age: { user.age }</Text>
        </View>
    );
}

export default UserDetail;