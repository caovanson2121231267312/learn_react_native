import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import Animated from "react-native-reanimated";

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Construction Projects</Text>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                >
                    Go to Login
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F3EF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 30,
    },
    buttonContainer: {
        margin: 20,
    },
    button: {
        width: 200,
        paddingVertical: 10,
        backgroundColor: "#F5C518",
    },
});
