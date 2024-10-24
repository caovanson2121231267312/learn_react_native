import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TextInput,
} from "react-native";
import { signup } from "../stores/actions/authActions";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
function SignupScreen({ props, navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const dispatch = useDispatch();

    async function handleSignUp() {

        const form_data = new FormData();
        form_data.append("email", email);
        form_data.append("name", username);
        form_data.append("password", password);
        form_data.append("password_confirmation", confirm);

        try {
            await dispatch(signup(form_data));
            Toast.show({
                type: 'success',
                text1: 'Sign up successful',
            });
            navigation.navigate('Login');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Sign up failed',
                text2: 'Invalid email or password',
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirm}
                onChangeText={setConfirm}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSignUp()}
            >
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 100,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 8,
    },
    text: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
    link: {
        color: "blue",
        textAlign: "center",
        paddingVertical: 15,
    },
});

export default SignupScreen;
