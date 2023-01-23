import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import { colores } from "../../theme/appTheme";
import CompanyUserList from "../../screens/companyUser/CompanyUserList";
import EntrepreneurUsersList from "../../screens/entrepreneurUser/EntrepreneurUserList";
import BecomeRegularUser from "../../screens/regularUser/BecomeRegularUser";

export const GuestUser = () => {
  return Platform.OS === "ios" ? <MyTabsIOS /> : <MyTabsAndroid />;
};

const BottomTabAndroid = createMaterialBottomTabNavigator();

export const MyTabsAndroid = () => {
  return (
    <BottomTabAndroid.Navigator
      sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: colores.primary,
      }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colores.primary,
        tabBarStyle: {
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName: string = "";

          switch (route.name) {
            case "EntrepreneurUsersList":
              iconName = "people-circle-outline";
              break;

            case "CompanyUserList":
              iconName = "business-outline";
              break;

            case "BecomeRegularUser":
              iconName = "person-add-outline";
              break;
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <BottomTabAndroid.Screen
        name="EntrepreneurUsersList"
        options={{ title: "Emprendedores" }}
        component={EntrepreneurUsersList}
      />
      <BottomTabAndroid.Screen
        name="CompanyUserList"
        options={{ title: "Empresas" }}
        component={CompanyUserList}
      />
      <BottomTabAndroid.Screen
        name="BecomeRegularUser"
        options={{ title: "Registrate" }}
        component={BecomeRegularUser}
      />
    </BottomTabAndroid.Navigator>
  );
};

const BottomTabIOS = createBottomTabNavigator();

export const MyTabsIOS = () => {
  return (
    <BottomTabIOS.Navigator
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colores.primary,
        tabBarStyle: {
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string = "";

          switch (route.name) {
            case "EntrepreneurUsersList":
              iconName = "people-circle-outline";
              break;

            case "CompanyUserList":
              iconName = "business-outline";
              break;

            case "BecomeRegularUser":
              iconName = "person-add-outline";
              break;
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <BottomTabAndroid.Screen
        name="EntrepreneurUsersList"
        options={{ title: "Emprendedores" }}
        component={EntrepreneurUsersList}
      />
      <BottomTabAndroid.Screen
        name="CompanyUserList"
        options={{ title: "Empresas" }}
        component={CompanyUserList}
      />
      <BottomTabAndroid.Screen
        name="BecomeRegularUser"
        options={{ title: "Registrate" }}
        component={BecomeRegularUser}
      />
    </BottomTabIOS.Navigator>
  );
};
