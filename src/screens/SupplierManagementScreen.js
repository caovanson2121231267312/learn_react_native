import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { delete_supplier, fetch_supplier } from "../stores/actions/supplierActions";
import { Button, TextInput, Card, Paragraph, Title } from "react-native-paper";
import Toast from "react-native-toast-message";

function SupplierManagementScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const [phoneNumber, setSearchPhoneNumber] = useState("");
    const dispatch = useDispatch();
    const { suppliers, totalPages, currentPage } = useSelector((state) => state.suppliers);

    useEffect(() => {
        dispatch(fetch_supplier(currentPage, search, phoneNumber));
    }, [dispatch, currentPage]);

    const handleSearch = () => {
        dispatch(fetch_supplier(1, search, phoneNumber));
    };

    const handleDeleteUser = (userId) => {
        Alert.alert(
            "Delete Supplier",
            "Are you sure you want to delete this supplier?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => handleDelete(userId) }
            ],
            { cancelable: true }
        );
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(delete_supplier(id));
            await dispatch(fetch_supplier(1, search, phoneNumber));

            Toast.show({
                type: "success",
                text1: "Supplier deleted successfully",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Delete failed",
                text2: "An error occurred",
            });
        }
    };

    const renderSuppliers = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.supplier_name}</Title>
                <Paragraph>{item.address}</Paragraph>
                <Paragraph>{item.phone}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="contained"
                    color="#008CBA" // Blue for Edit
                    onPress={() => console.log("Edit supplier", item.supplier_id)}
                    style={styles.button}
                >
                    Edit
                </Button>
                <Button
                    mode="contained"
                    color="#f44336" // Red for Delete
                    onPress={() => handleDeleteUser(item.supplier_id)}
                    style={styles.button}
                >
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <TextInput
                label="Search Supplier"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                mode="outlined"
            />
            <TextInput
                label="Search by Phone Number"
                value={phoneNumber}
                onChangeText={setSearchPhoneNumber}
                style={styles.searchInput}
                mode="outlined"
            />
            <Button
                mode="contained"
                onPress={handleSearch}
                style={styles.searchButton}
                color="#4CAF50" // Green for Search
            >
                Search
            </Button>

            {suppliers && (
                <FlatList
                    data={suppliers}
                    renderItem={renderSuppliers}
                    keyExtractor={(item) => String(item.supplier_id)}
                    style={styles.list}
                />
            )}
            <Button
                mode="contained"
                style={styles.addButton}
                color="#FF9800" // Orange for Add Supplier
                onPress={() => navigation.navigate("AddSupplier")}
            >
                Add Supplier
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
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
    button: {
        marginRight: 10,
    },
    list: {
        flex: 1,
    },
    addButton: {
        marginTop: 20,
    },
});

export default SupplierManagementScreen;
