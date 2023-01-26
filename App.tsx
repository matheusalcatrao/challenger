import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import Home from "./pages/Home";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <Home />
    </NativeBaseProvider>
  );
}
