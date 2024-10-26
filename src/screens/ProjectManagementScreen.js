import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    TextInput,
    Card,
    Paragraph,
    Title,
    IconButton,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import {
    fetch_projects,
    delete_projects,
} from "../stores/actions/projectAction";

function ProjectManagementScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { projects, totalPages, currentPage } = useSelector(
        (state) => state.projects
    );

    useEffect(() => {
        dispatch(fetch_projects(currentPage, search));
    }, [dispatch, currentPage, search]);

    const handleSearch = () => {
        dispatch(fetch_projects(1, search));
    };

    const handleDeleteProject = (projectId) => {
        Alert.alert(
            "Delete Project",
            "Are you sure you want to delete this project?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => handleDelete(projectId) },
            ],
            { cancelable: true }
        );
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(delete_projects(id));
            await dispatch(fetch_projects(1, search));
            Toast.show({
                type: "success",
                text1: "Project deleted successfully",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Failed to delete project",
                text2: error.message,
            });
        }
    };

    const renderProject = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title
                title={item.name}
                subtitle={item.type}
                left={(props) => <IconButton {...props} icon="folder" />}
            />
            <Card.Content>
                <Paragraph>Start date: {item.location}</Paragraph>
                <Paragraph>End date: {item.end_day}</Paragraph>
                <Paragraph>Budget: {item.budget}</Paragraph>
                <Paragraph>
                    Status:{" "}
                    <Text
                        style={
                            item.status == "completed"
                                ? styles.success
                                : styles.info
                        }
                    >
                        {item.status}
                    </Text>
                </Paragraph>
                <Paragraph>Description: {item.description}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <Button
                    mode="contained"
                    onPress={() =>
                        navigation.navigate("TaskList", { projectId: item.project_id, navigation: navigation, item: item.name })
                    }
                >
                    Manage Tasks
                </Button>
                <Button
                    mode="contained"
                    theme={{ colors: { primary: "#0d6efd" } }}
                    onPress={() =>
                        navigation.navigate("EditProject", {
                            projectId: item.project_id,
                        })
                    }
                >
                    Edit
                </Button>
                <Button
                    mode="contained"
                    theme={{ colors: { primary: "#dc3545" } }}
                    onPress={() => handleDeleteProject(item.project_id)}
                >
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <TextInput
                label="Search Projects"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                mode="outlined"
            />
            <Button
                mode="contained"
                onPress={handleSearch}
                style={styles.searchButton}
            >
                Search
            </Button>

            <FlatList
                data={projects}
                renderItem={renderProject}
                keyExtractor={(item) => item.project_id.toString()}
                style={styles.list}
            />

            <Button
                mode="contained"
                icon="plus"
                onPress={() => navigation.navigate("AddProject")}
                style={styles.addButton}
            >
                Add Project
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    searchInput: {
        marginBottom: 10,
        borderRadius: 5,
    },
    searchButton: {
        marginBottom: 20,
        backgroundColor: "#007acc",
    },
    card: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#dcdcdc",
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    cardActions: {
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
    list: {
        flex: 1,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: "#28a745",
    },
    success: {
        color: "green",
        fontWeight: "bold",
    },
    info: {
        color: "#0dcaf0",
        fontWeight: "bold",
    },
});

export default ProjectManagementScreen;
