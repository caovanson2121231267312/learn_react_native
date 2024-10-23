import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    delete_supplier,
    fetch_supplier,
} from "../stores/actions/supplierActions";
import { Button, TextInput, Card, Paragraph, Title } from "react-native-paper";
import Toast from "react-native-toast-message";

function SupplierManagementScreen({ navigation, props }) {
    const [search, setSearch] = useState("");
    const [phoneNumber, setSearchPhoneNumber] = useState("");
    const dispatch = useDispatch();
    const { suppliers, totalPages, currentPage } = useSelector(
        (state) => state.suppliers
    );

    useEffect(() => {
        dispatch(fetch_supplier(currentPage, search, phoneNumber));
        // console.log(users);
    }, [dispatch, currentPage]);

    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    const handleSearch = () => {
        dispatch(fetch_supplier(1, search, phoneNumber));
    };

    const handleDelete = async (id) => {
        console.log(id);

        try {
            await dispatch(delete_supplier(id));
            await dispatch(fetch_supplier(1, search, phoneNumber));

            Toast.show({
                type: "success",
                text1: "Delete supplier successful",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "delete supplier failed",
                text2: "Invalid email or password",
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
                    onPress={() =>
                        console.log("Edit supplier", item.supplier_id)
                    }
                >
                    Edit
                </Button>
                <Button
                    mode="contained"
                    color="red"
                    onPress={() => handleDelete(item.supplier_id)}
                >
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    );
    return (
        <View style={styles.container}>
            <TextInput
                label="Tìm kiếm nhà cung cấp"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
                mode="outlined"
            />
            <TextInput
                label="Tìm kiếm theo số điện thoại"
                value={phoneNumber}
                onChangeText={setSearchPhoneNumber}
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

            {suppliers && (
                <FlatList
                    data={suppliers}
                    renderItem={renderSuppliers}
                    keyExtractor={(item) =>
                        parseInt(item.supplier_id) *
                        Math.floor(Math.random() * 100)
                    }
                    style={styles.list}
                />
            )}
            <Button
                mode="contained"
                style={styles.addButton}
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

export default SupplierManagementScreen;
