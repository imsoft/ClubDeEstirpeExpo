import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigator/StackNavigator";
import Test from './src/screens/test/Test';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

    // <Test navigation={undefined} route={undefined} />
  );
}
