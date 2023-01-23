import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import RegularUserProfile from "../screens/regularUser/RegularUserProfile";

import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import { colores } from "../theme/appTheme";
import CompanyUserList from "../screens/companyUser/CompanyUserList";
import EntrepreneurUserList from "../screens/entrepreneurUser/EntrepreneurUserList";
import RegularUsersList from "../screens/regularUser/RegularUsersList";
import ClubDeEstirpe from "../screens/businessClub/ClubDeEstirpe";

export const Tabs = () => {
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
          fontSize: 10,
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName: string = "";

          switch (route.name) {
            case "ClubDeEstirpe":
              iconName = "globe-outline";
              break;
              
            case "CompanyUserList":
              iconName = "business-outline";
              break;

            case "EntrepreneurUserList":
              iconName = "people-circle-outline";
              break;

            case "RegularUsersList":
              iconName = "person-outline";
              break;

            case "RegularUserProfile":
              iconName = "person-circle-outline";
              break;
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <BottomTabAndroid.Screen
        name="ClubDeEstirpe"
        options={{ title: "Club de Estirpe" }}
        component={ClubDeEstirpe}
      />
      <BottomTabAndroid.Screen
        name="CompanyUserList"
        options={{ title: "Empresas" }}
        component={CompanyUserList}
      />
      <BottomTabAndroid.Screen
        name="EntrepreneurUserList"
        options={{ title: "Emprendedores" }}
        component={EntrepreneurUserList}
      />
      <BottomTabAndroid.Screen
        name="RegularUsersList"
        options={{ title: "Regular" }}
        component={RegularUsersList}
      />
      <BottomTabAndroid.Screen
        name="RegularUserProfile"
        options={{ title: "Perfil" }}
        component={RegularUserProfile}
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
          fontSize: 10,
        },
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: string = "";

          switch (route.name) {
            case "ClubDeEstirpe":
              iconName = "globe-outline";
              break;
              
            case "CompanyUserList":
              iconName = "business-outline";
              break;

            case "EntrepreneurUserList":
              iconName = "people-circle-outline";
              break;

            case "RegularUsersList":
              iconName = "person-outline";
              break;

            case "RegularUserProfile":
              iconName = "person-circle-outline";
              break;
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <BottomTabAndroid.Screen
        name="ClubDeEstirpe"
        options={{ title: "Club de Estirpe" }}
        component={ClubDeEstirpe}
      />
      <BottomTabAndroid.Screen
        name="CompanyUserList"
        options={{ title: "Empresas" }}
        component={CompanyUserList}
      />
      <BottomTabAndroid.Screen
        name="EntrepreneurUserList"
        options={{ title: "Emprendedores" }}
        component={EntrepreneurUserList}
      />
      <BottomTabAndroid.Screen
        name="RegularUsersList"
        options={{ title: "Regular" }}
        component={RegularUsersList}
      />
      <BottomTabAndroid.Screen
        name="RegularUserProfile"
        options={{ title: "Perfil" }}
        component={RegularUserProfile}
      />
    </BottomTabIOS.Navigator>
  );
};
