import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../stores/actions/userActions";
import { Button, TextInput, Card, Paragraph, Title } from "react-native-paper";

export default function UserManagementScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { users, totalPages, currentPage } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        dispatch(fetchUsers(currentPage, search));
        // console.log(users);
    }, [dispatch, currentPage]);

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    const handleSearch = () => {
        dispatch(fetchUsers(1, search));
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const renderUser = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.email}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={() => console.log("Edit user", item.id)}
                >
                    Edit
                </Button>
                <Button
                    mode="contained"
                    color="red"
                    onPress={() => handleDelete(item.id)}
                >
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <TextInput
                label="Search"
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

            {users && (
                <FlatList
                    data={users}
                    renderItem={renderUser}
                    keyExtractor={(item) => parseInt(item.user_id) * Math.floor(Math.random() * 100)}
                    style={styles.list}
                />
            )}

            {/* Pagination (can be improved with more advanced logic) */}
            <View style={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        mode={i + 1 === currentPage ? "contained" : "text"}
                        onPress={() => dispatch(fetchUsers(i + 1, search))}
                    >
                        {i + 1}
                    </Button>
                ))}
            </View>

            <Button
                mode="contained"
                style={styles.addButton}
                onPress={() => navigation.navigate("AddUser")}
            >
                Add User
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchInput: {
        marginBottom: 10,
    },
    searchButton: {
        marginBottom: 20,
    },
    card: {
        marginBottom: 15,
    },
    list: {
        flex: 1,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20,
    },
    addButton: {
        marginTop: 20,
    },
});
