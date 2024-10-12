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
import HomeScreen from "./src/screens/HomeScreen";
import SettingScreen from "./src/screens/SettingScreen";
import IntroduceScreen from "./src/screens/IntroduceScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDetail from "./src/screens/UserDetail";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Trang chủ", headerShown: true }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingScreen}
                    options={{ title: "Cài đặt" }}
                />
                <Stack.Screen
                    name="Introduce"
                    component={IntroduceScreen}
                    options={{ title: "Giới thiệu" }}
                />
                <Stack.Screen
                    name="UserDetail"
                    component={UserDetail}
                    options={{ title: "chi tiết người dùng" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
