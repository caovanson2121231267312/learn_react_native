import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Toast from "react-native-toast-message";
import {
    IconButton,
    DefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";
// import Animated from "react-native-reanimated";
import HomeScreen from "./src/screens/HomeScreen";
// import AboutScreen from "./screens/AboutScreen";
import UserManagementScreen from "./src/screens/UserManagementScreen";
import AddUserScreen from "./src/screens/AddUserScreen";
// import CategoryManagementScreen from "./screens/CategoryManagementScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ToDoScreen from "./src/screens/ToDoScreen";
import SignupScreen from "./src/screens/SignupScreen";
import { DrawerContent } from "./src/components/layout/DrawerContent";
import { Provider } from "react-redux";
import store from "./src/stores/store";
import SupplierManagementScreen from "./src/screens/SupplierManagementScreen";
import AddMaterialScreen from "./src/screens/AddMaterialScreen";
import MaterialScreen from "./src/screens/MaterialScreen";
import ProjectManagementScreen from "./src/screens/ProjectManagementScreen";
import AddProjectScreen from "./src/screens/AddProjectScreen";
import TaskListScreen from "./src/screens/TaskListScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import AddSupplier from "./src/screens/AddSupplier";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Theme with soft yellow as primary color
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#F5C518", // Soft yellow
        accent: "#FF6F00", // Complementary orange
        background: "#F4F3EF",
        text: "#333",
    },
};

function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <IconButton
                            icon="menu"
                            onPress={() => navigation.toggleDrawer()}
                            color="#333"
                        />
                    ),
                    headerRight: () => (
                        <IconButton
                            icon="bell"
                            onPress={() => alert("Notifications")}
                            color="#333"
                        />
                    ),
                    // headerShown: false,
                    title: "Home",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                })}
            />
            <Stack.Screen
                name="todo"
                component={ToDoScreen}
                options={{
                    title: "Todo",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="UserManagement"
                component={UserManagementScreen}
                options={{
                    title: "User Management",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />

            <Stack.Screen
                name="AddSupplier"
                component={AddSupplier}
                options={{
                    title: "Add Supplier",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: "Login",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="SupplierManagement"
                component={SupplierManagementScreen}
                options={{
                    title: "Supplier Management",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="MaterialScreen"
                component={MaterialScreen}
                options={{
                    title: "Material Management",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="AddMaterial"
                component={AddMaterialScreen}
                options={{
                    title: "Add Material",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="ProjectManagement"
                component={ProjectManagementScreen}
                options={{
                    title: "Project Management",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="AddProject"
                component={AddProjectScreen}
                options={{
                    title: "Add Project",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="TaskList"
                component={TaskListScreen}
                options={{
                    title: "Task List",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="AddTask"
                component={AddTaskScreen}
                options={{
                    title: "Add Task",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    title: "Sign Up",
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: "#333",
                }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    // console.log(process.env.API_URL);
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Drawer.Navigator
                        screenOptions={{ headerShown: false }}
                        drawerContent={(props) => <DrawerContent {...props} />}
                    >
                        <Drawer.Screen name="AppStack" component={AppStack} />
                    </Drawer.Navigator>
                </NavigationContainer>
                <Toast />
            </PaperProvider>
        </Provider>
    );
}
