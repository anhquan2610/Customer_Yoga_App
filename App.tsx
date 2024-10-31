// App.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}


