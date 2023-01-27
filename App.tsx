import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import { Routes } from "./routes";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <Routes />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
