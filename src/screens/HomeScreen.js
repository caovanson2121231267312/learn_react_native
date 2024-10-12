import React from "react";
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

function HomeScreen({ props, navigation }) {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");

    const [student, setStudent] = useState({
        name: "nguyen van a",
        age: 15,
    });

    const [users, setUser] = useState([
        // { id: 1, name: "nguyen van a", age: 12 },
        { id: 2, name: "nguyen van b", age: 121 },
        { id: 3, name: "nguyen van c", age: 122 },
        { id: 4, name: "nguyen van d", age: 123 },
        { id: 5, name: "nguyen van e", age: 124 },
        { id: 6, name: "nguyen van a", age: 123 },
        { id: 7, name: "nguyen van a", age: 122 },
        { id: 8, name: "nguyen van a", age: 112 },
        { id: 9, name: "nguyen van a", age: 312 },
        { id: 10, name: "nguyen van a", age: 412 },
        { id: 11, name: "nguyen van a", age: 312 },
        { id: 12, name: "nguyen van a", age: 212 },
        { id: 13, name: "nguyen van a", age: 112 },
        { id: 14, name: "nguyen van a", age: 512 },
        { id: 15, name: "nguyen van a", age: 412 },
        { id: 16, name: "nguyen van a", age: 812 },
        { id: 17, name: "nguyen van a", age: 612 },
    ]);

    var a = 0;

    // const []
    function click_btn() {
        setCount(count + 1);
        a++;
        console.log("count :" + count);
        console.log("a :" + a);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text_red}>Hello</Text>
            <Text
                style={{
                    color: "blue",
                }}
            >
                Open up App.js to start working on your app!
            </Text>

            <Button
                onPress={() => navigation.navigate("Settings")}
                title="go to setting"
            />

            <Button
                title="Đi đến trang giới thiệu"
                onPress={() => navigation.navigate("Introduce")}
            />

            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <Button 
                        title={item.name + " - " + item.id} 
                        onPress={() => navigation.navigate("UserDetail", item)} 
                        style={styles.bg_item} key={item.id}>
                    </Button>
                )}
            />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },
    text_red: {
        color: "red",
        fontSize: 20,
        fontWeight: "bold",
    },
    text_yellow: {
        color: "yellow",
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    btn_click: {
        backgroundColor: "green",
        width: 300,
        marginTop: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "green",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    form_input: {
        borderColor: "blue",
        borderWidth: 1,
        width: "100%",
        padding: 10,
    },
    bg_item: {
        backgroundColor: "pink",
        margin: 10,
        padding: 20,
        width: "100%",
    },
});

export default HomeScreen;
