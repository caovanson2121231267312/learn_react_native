import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert, Modal, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { delete_materials, fetch_materials } from "../stores/actions/materialAction";
import { Button, TextInput, Card, Paragraph, Title } from "react-native-paper";
import Toast from "react-native-toast-message";

function MaterialScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const [phoneNumber, setSearchPhoneNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const dispatch = useDispatch();
    const { materials, totalPages, currentPage } = useSelector((state) => state.materials);

    useEffect(() => {
        dispatch(fetch_materials(currentPage, search, phoneNumber));
    }, [dispatch, currentPage]);

    const handleSearch = () => {
        dispatch(fetch_materials(1, search, phoneNumber));
    };

    const handleDeleteUser = (userId) => {
        Alert.alert(
            "Delete Material",
            "Are you sure you want to delete this Material?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => handleDelete(userId) }
            ],
            { cancelable: true }
        );
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(delete_materials(id));
            await dispatch(fetch_materials(1, search, phoneNumber));

            Toast.show({
                type: "success",
                text1: "Material deleted successfully",
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Delete failed",
                text2: "An error occurred",
            });
        }
    };

    const openModal = (data) => {
        setSelectedData(data);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedData(null);
    };

    const renderData = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.material_name}</Title>
                <Paragraph><Text>Unit:</Text>{item.unit}</Paragraph>
                <Paragraph><Text>Price:</Text> {item.price}</Paragraph>
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
                    onPress={() => handleDeleteUser(item.material_id)}
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
            {/* <TextInput
                label="Search by Phone Number"
                value={phoneNumber}
                onChangeText={setSearchPhoneNumber}
                style={styles.searchInput}
                mode="outlined"
            /> */}
            <Button
                mode="contained"
                onPress={handleSearch}
                style={styles.searchButton}
                color="#4CAF50" // Green for Search
            >
                Search
            </Button>

            {materials && (
                <FlatList
                    data={materials}
                    renderItem={renderData}
                    keyExtractor={(item) => String(item.material_id)}
                    style={styles.list}
                />
            )}
            <Button
                mode="contained"
                style={styles.addButton}
                theme={{ colors: { primary: "#FF9800" } }}
                onPress={() => navigation.navigate("AddMaterial")}
            >
                Add Material
            </Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Material Details</Text>
                        {selectedData && (
                            <>
                                <Text style={styles.modalText}>
                                    Name: {selectedData.material_name}
                                </Text>
                                <Text style={styles.modalText}>
                                    Unit: {selectedData.unit}
                                </Text>
                                <Text style={styles.modalText}>
                                    Price: {selectedData.price}
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

export default MaterialScreen;
