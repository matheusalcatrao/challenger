import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import { EditProduct } from "./pages/EditProduct";

const Stack = createNativeStackNavigator();

export const Routes = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EditProduct" component={EditProduct} />
  </Stack.Navigator>
);
