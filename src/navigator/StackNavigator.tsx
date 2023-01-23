import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { BussinessClub } from "./ScreenTabs/BussinessClub";
import { GuestUser } from "./ScreenTabs/GuestUser";
import { Tabs } from "./Tabs";
import AddAdminUser from "../screens/adminUser/AddAdminUser";
import AddCompanyUser from "../screens/companyUser/AddCompanyUser";
import AddEntrepreneurUser from "../screens/entrepreneurUser/AddEntrepreneurUser";
import AddProject from "../screens/projects/AddProject";
import AddRegularUser from "../screens/regularUser/AddRegularUser";
import AdminUserList from "../screens/adminUser/AdminUserList";
import AdminUserProfile from "../screens/adminUser/AdminUserProfile";
import ApplyForCredit from "../screens/general/ApplyForCredit";
import ApprovalPanel from "../screens/general/ApprovalPanel";
import BecomeRegularUser from "../screens/regularUser/BecomeRegularUser";
import ClubDeEstirpe from "../screens/businessClub/ClubDeEstirpe";
import CompanyUserList from "../screens/companyUser/CompanyUserList";
import CompanyUserProfile from "../screens/companyUser/CompanyUserProfile";
import EntrepeneurInvestments from "../screens/investments/EntrepeneurInvestments";
import EntrepreneurUserList from "../screens/entrepreneurUser/EntrepreneurUserList";
import EntrepreneurUserProfile from "../screens/entrepreneurUser/EntrepreneurUserProfile";
import ExclusiveContent from "../screens/businessClub/ExclusiveContent";
import Login from "../screens/login/Login";
import MembershipPayment from "../screens/general/MembershipPayment";
import NetworkBenefits from "../screens/businessClub/NetworkBenefits";
import ProjectList from "../screens/projects/ProjectList";
import ProjectProfile from "../screens/projects/ProjectProfile";
import RegularUserProfile from "../screens/regularUser/RegularUserProfile";
import RegularUsersList from "../screens/regularUser/RegularUsersList";
import Test from "../screens/test/Test";
import UpdateAdminUser from "../screens/adminUser/UpdateAdminUser";
import UpdateCompanyUser from "../screens/companyUser/UpdateCompanyUser";
import UpdateEntrepreneurUser from "../screens/entrepreneurUser/UpdateEntrepreneurUser";
import UpdateProject from "../screens/projects/UpdateProject";
import UpdateRegularUser from "../screens/regularUser/UpdateRegularUser";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent",
          backgroundColor: "#FEEB3B",
        },
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      {/******* AdminUser *******/}

      <Stack.Screen
        name="AddAdminUser"
        options={{ title: "Agregar Usuario Administrador" }}
        component={AddAdminUser}
      />

      <Stack.Screen
        name="AdminUserList"
        options={{ title: "Lista Usuario Administrador" }}
        component={AdminUserList}
      />

      <Stack.Screen
        name="AdminUserProfile"
        options={{ title: "Perfil Usuario Administrador" }}
        component={AdminUserProfile}
      />

      <Stack.Screen
        name="UpdateAdminUser"
        options={{ title: "Actualizar Usuario Administrador" }}
        component={UpdateAdminUser}
      />

      {/******* End AdminUser *******/}

      {/******* BusinessClub *******/}

      <Stack.Screen
        name="ClubDeEstirpe"
        options={{ title: "ClubDeEstirpe", headerShown: false }}
        component={ClubDeEstirpe}
      />

      <Stack.Screen
        name="ExclusiveContent"
        options={{ title: "Contenido exclusivo" }}
        component={ExclusiveContent}
      />

      <Stack.Screen
        name="NetworkBenefits"
        options={{ title: "Beneficios exclusivo" }}
        component={NetworkBenefits}
      />

      {/******* End BusinessClub *******/}

      {/******* CompanyUser *******/}

      <Stack.Screen
        name="AddCompanyUser"
        options={{ title: "Agregar Usuario Empresa" }}
        component={AddCompanyUser}
      />

      <Stack.Screen
        name="CompanyUserList"
        options={{ title: "Lista Usuario Empresa" }}
        component={CompanyUserList}
      />

      <Stack.Screen
        name="CompanyUserProfile"
        options={{ title: "Perfil Usuario Empresa" }}
        component={CompanyUserProfile}
      />

      <Stack.Screen
        name="UpdateCompanyUser"
        options={{ title: "Actualizar Usuario Empresa" }}
        component={UpdateCompanyUser}
      />

      {/******* End CompanyUser *******/}

      {/******* EntrepreneurUser *******/}

      <Stack.Screen
        name="AddEntrepreneurUser"
        options={{ title: "Agregar Usuario Emprendedor" }}
        component={AddEntrepreneurUser}
      />

      <Stack.Screen
        name="EntrepreneurUserList"
        options={{ title: "Lista Usuario Emprendedor" }}
        component={EntrepreneurUserList}
      />

      <Stack.Screen
        name="EntrepreneurUserProfile"
        options={{ title: "Perfil Usuario Emprendedor" }}
        component={EntrepreneurUserProfile}
      />

      <Stack.Screen
        name="UpdateEntrepreneurUser"
        options={{ title: "Actualizar Usuario Emprendedor" }}
        component={UpdateEntrepreneurUser}
      />

      {/******* End EntrepreneurUser *******/}

      {/******* General *******/}

      <Stack.Screen
        name="ApplyForCredit"
        options={{ title: "Solicitar crédito" }}
        component={ApplyForCredit}
      />

      <Stack.Screen
        name="MembershipPayment"
        options={{ title: "Pago de membresía" }}
        component={MembershipPayment}
      />

      <Stack.Screen
        name="ApprovalPanel"
        options={{ title: "Panel de aprobación" }}
        component={ApprovalPanel}
      />

      {/******* End General *******/}

      {/******* Investments *******/}

      <Stack.Screen
        name="EntrepeneurInvestments"
        options={{ title: "Inversión a emprendedores" }}
        component={EntrepeneurInvestments}
      />

      {/******* End Investments *******/}

      {/******* Login *******/}

      <Stack.Screen
        name="Login"
        options={{ title: "Iniciar Sesión", headerShown: false }}
        component={Login}
      />

      {/******* End Login *******/}

      {/******* Project *******/}

      <Stack.Screen
        name="AddProject"
        options={{ title: "Agregar proyecto" }}
        component={AddProject}
      />

      <Stack.Screen
        name="ProjectList"
        options={{ title: "Lista de proyectos" }}
        component={ProjectList}
      />

      <Stack.Screen
        name="ProjectProfile"
        options={{ title: "Perfil del proyecto" }}
        component={ProjectProfile}
      />

      <Stack.Screen
        name="UpdateProject"
        options={{ title: "Actualizar proyecto" }}
        component={UpdateProject}
      />

      {/******* End Project *******/}

      {/******* RegularUser *******/}

      <Stack.Screen
        name="AddRegularUser"
        options={{ title: "Agregar Usuario Regular" }}
        component={AddRegularUser}
      />

      <Stack.Screen
        name="RegularUserProfile"
        options={{ title: "Perfil Usuario Regular" }}
        component={RegularUserProfile}
      />

      <Stack.Screen
        name="BecomeRegularUser"
        options={{ title: "Convertirse en usuario regular" }}
        component={BecomeRegularUser}
      />
      <Stack.Screen
        name="RegularUsersList"
        options={{ title: "Lista Usuario Regular" }}
        component={RegularUsersList}
      />

      <Stack.Screen
        name="UpdateRegularUser"
        options={{ title: "Actualizar Usuario Regular" }}
        component={UpdateRegularUser}
      />

      {/******* End RegularUser *******/}

      {/******* Tabs Menu *******/}

      <Stack.Screen
        name="Tabs"
        options={{ title: "Tabs", headerShown: false }}
        component={Tabs}
      />

      <Stack.Screen
        name="GuestUser"
        options={{ title: "GuestUser", headerShown: false }}
        component={GuestUser}
      />

      <Stack.Screen
        name="BussinessClub"
        options={{ title: "BussinessClub", headerShown: false }}
        component={BussinessClub}
      />

      {/******* End Tabs Menu *******/}

      <Stack.Screen name="Test" options={{ title: "Test" }} component={Test} />
    </Stack.Navigator>
  );
};
