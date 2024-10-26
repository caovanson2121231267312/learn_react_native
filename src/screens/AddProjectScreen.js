import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { add_projects, fetch_projects } from "../stores/actions/projectAction"; // Assume this action is set up to call the API

function AddProjectScreen({ navigation }) {
    const [name, setName] = useState("");
    const [budget, setBudget] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
    const [typeOpen, setTypeOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [statusOpen, setStatusOpen] = useState(false);

    const dispatch = useDispatch();

    const projectTypes = [
        { label: "Xây dựng", value: "Xây dựng" },
        { label: "Thiết kế", value: "Thiết kế" },
    ];

    const projectStatuses = [
        { label: "active", value: "active" },
        { label: "completed", value: "completed" },
    ];

    const handleSubmit = async () => {
        // Basic client-side validation
        if (
            !name ||
            !budget ||
            !type ||
            !description ||
            !startDay ||
            !endDay ||
            !status
        ) {
            Alert.alert("Error", "Please fill all fields correctly");
            return;
        }

        if (new Date(endDay) < new Date(startDay)) {
            Alert.alert("Ngay ket thuc khong duoc truoc ngay bat dau");
            return;
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("budget", budget);
        formData.append("type", type);
        formData.append("start_day", startDay);
        formData.append("end_day", endDay);
        formData.append("status", status);
        formData.append("description", description);

        try {
            await dispatch(add_projects(formData));
            await dispatch(fetch_projects());
            Toast.show({
                type: "success",
                text1: "Project added successfully",
            });
            navigation.goBack();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Failed to add project",
                text2: error.message,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Add New Project" />
                <Card.Content>
                    <TextInput
                        label="Project Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        mode="outlined"
                        required
                    />
                    <TextInput
                        label="Budget"
                        value={budget}
                        onChangeText={setBudget}
                        style={styles.input}
                        keyboardType="numeric"
                        mode="outlined"
                        required
                    />
                    <DropDownPicker
                        open={typeOpen}
                        value={type}
                        items={projectTypes}
                        setOpen={setTypeOpen}
                        setValue={setType}
                        placeholder="Select Project Type"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />

                    {/* <Dropdown
                        label="Project Type"
                        value={type}
                        onValueChange={setType}
                        items={projectTypes}
                        style={styles.input}
                        mode="outlined"
                        required
                    /> */}
                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                        mode="outlined"
                        multiline
                        maxLength={500}
                        required
                    />
                    <TextInput
                        label="Start Date"
                        value={startDay}
                        onChangeText={setStartDay}
                        style={styles.input}
                        mode="outlined"
                        placeholder="YYYY-MM-DD"
                        required
                    />
                    <TextInput
                        label="End Date"
                        value={endDay}
                        onChangeText={setEndDay}
                        style={styles.input}
                        mode="outlined"
                        placeholder="YYYY-MM-DD"
                        required
                    />
                    {/* <Dropdown
                        label="Status"
                        value={status}
                        onValueChange={setStatus}
                        items={projectStatuses}
                        style={styles.input}
                        mode="outlined"
                        required
                    /> */}
                    <DropDownPicker
                        open={statusOpen}
                        value={status}
                        items={projectStatuses}
                        setOpen={setStatusOpen}
                        setValue={setStatus}
                        placeholder="Select Status"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                </Card.Content>
            </Card>
            <Button
                mode="contained"
                onPress={() => handleSubmit()}
                style={styles.submitButton}
            >
                Add Project
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    card: {
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#dcdcdc",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    input: {
        marginBottom: 10,
    },
    dropdown: {
        marginBottom: 10,
        borderColor: "#dcdcdc",
    },
    dropdownContainer: {
        borderColor: "#dcdcdc",
    },
    submitButton: {
        backgroundColor: "#28a745",
        marginTop: 20,
        paddingVertical: 10,
    },
});

export default AddProjectScreen;
