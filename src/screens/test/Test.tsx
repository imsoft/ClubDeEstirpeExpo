import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { FirebaseAuth } from "../../firebase/config";
import { EntrepreneurUser } from "../../interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const Test = ({ navigation, route }: Props) => {
  const [entrepreneurUser, setEntrepreneurUser] = useState<EntrepreneurUser>({
    image: "",
    curriculumProfesional: "",
    creditBureauOpinion: "",
    personalReference: "",
    email: "",
    password: "",
    project: {
      image: "",
      role: "",
      size: "",
      experience: "",
      employeeNumber: "",
      amountToRequest: "",
      documents: "",
      renders: [],
      ubication: "",
      executiveIdea: "",
      investmentStatus: 0,
    },
  });

  const onSubmit = () => {
    console.log('ENTREPRENEURUSER: ' + entrepreneurUser);
    console.log('ENTREPRENEURUSER.PROJECT: ' + entrepreneurUser.project);
    console.log('JSON: ' + JSON.stringify(entrepreneurUser));
  };

  const onAdd = () => {
    console.log('ENTREPRENEURUSER: ' + entrepreneurUser);
    setEntrepreneurUser({ ...entrepreneurUser, project: {image: "",
    role: "",
    size: "",
    experience: "",
    employeeNumber: "",
    amountToRequest: "",
    documents: "",
    renders: [],
    ubication: "",
    executiveIdea: "",
    investmentStatus: 0,} });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAwareScrollView>
          <View style={styles.globalMargin}>
            <TouchableOpacity style={styles.button} onPress={onAdd}>
              <Text>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text>Ver información</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );

  // const { id } = route.params;

  // const handleAuth = () => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (id) => {
  //     if (id) {
  //       const uid = id.uid;
  //       console.log("UID: ", uid);
  //     } else {
  //       // id is signed out
  //       handleSignOut();
  //     }
  //   });
  // };

  // const handleSignOut = () => {
  //   FirebaseAuth.signOut();
  //   console.log("Signed out!");
  //   navigation.navigate("Login");
  // };

  // useEffect(() => {
  //   handleAuth();
  // }, []);

  // return (
  //   <View>
  //     <Text>ID:</Text>
  //     <Text>{id}</Text>
  //     <TouchableOpacity onPress={handleSignOut}>
  //       <Text>Cerrar Sesión</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};

export default Test;
