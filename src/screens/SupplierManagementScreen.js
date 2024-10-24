import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, Modal, Text  } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    delete_supplier,
    fetch_supplier,
} from "../stores/actions/supplierActions";
import { Button, TextInput, Card, Paragraph, Title } from "react-native-paper";
import Toast from "react-native-toast-message";

function SupplierManagementScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const [phoneNumber, setSearchPhoneNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const dispatch = useDispatch();
    const { suppliers, totalPages, currentPage } = useSelector(
        (state) => state.suppliers
    );

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
                { text: "OK", onPress: () => handleDelete(userId) },
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

    const openModal = (supplier) => {
        setSelectedSupplier(supplier);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedSupplier(null);
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
                    theme={{ colors: { primary: "#008CBA" } }}
                    onPress={() => openModal(item)}
                    style={styles.button}
                >
                    Edit
                </Button>
                <Button
                    mode="contained"
                    theme={{ colors: { primary: "#f44336" } }}
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
                theme={{ colors: { primary: "#FF9800" } }}
                onPress={() => navigation.navigate("AddSupplier")}
            >
                Add Supplier
            </Button>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Supplier Details</Text>
                        {selectedSupplier && (
                            <>
                                <Text style={styles.modalText}>
                                    Name: {selectedSupplier.supplier_name}
                                </Text>
                                <Text style={styles.modalText}>
                                    Address: {selectedSupplier.address}
                                </Text>
                                <Text style={styles.modalText}>
                                    Phone: {selectedSupplier.phone}
                                </Text>
                            </>
                        )}
                        <Button
                            mode="contained"
                            onPress={closeModal}
                            style={styles.closeModalButton}
                            color="#2196F3"
                        >
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>
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
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
    },
    cardHeader: {
        backgroundColor: "#ff9800",
        padding: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeModalButton: {
        marginTop: 20,
    },
});

export default SupplierManagementScreen;
