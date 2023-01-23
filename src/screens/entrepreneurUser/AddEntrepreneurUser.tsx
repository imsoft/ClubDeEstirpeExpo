import React, { useEffect, useState } from "react";
import { Image, Text, View, Platform, Alert, Button } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { styles } from "../../theme/appTheme";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { EntrepreneurUser } from "../../interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
} from "react-native-document-picker";

interface Props extends StackScreenProps<any, any> {}

const AddEntrepreneurUser = ({ navigation }: Props) => {
  const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();
  const [entrepreneurUser, setEntrepreneurUser] = useState<EntrepreneurUser>({
    image:
      "https://media-exp1.licdn.com/dms/image/C4E16AQHwCWOi-C6Nig/profile-displaybackgroundimage-shrink_200_800/0/1609278865652?e=2147483647&v=beta&t=8jwH-tkRQWIxMv9m8JzwRoE1n8uGF46tzSmkh2AVCnM",
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

  const onTextFieldChangeImage = (value: string) => {
    setEntrepreneurUser({ ...entrepreneurUser, image: value });
  };

  const onTextFieldChangeCurriculumProfesional = (value: string) => {
    setEntrepreneurUser({ ...entrepreneurUser, curriculumProfesional: value });
  };

  const onTextFieldChangeCreditBureauOpinion = (value: string) => {
    setEntrepreneurUser({ ...entrepreneurUser, creditBureauOpinion: value });
  };

  const onTextFieldChangePersonalReference = (value: string) => {
    setEntrepreneurUser({ ...entrepreneurUser, personalReference: value });
  };

  const onTextFieldChangeEmail = (value: string) => {
    setEntrepreneurUser({ ...entrepreneurUser, email: value });
  };

  const onTextFieldChangePassword = (value: string) => {
    setEntrepreneurUser({ ...entrepreneurUser, password: value });
  };

  useEffect(() => {
    const mediaLibraryPermission = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          console.log("Permiso negado");
        }
      }
    };

    mediaLibraryPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const storageRef = ref(
          FirebaseStorage,
          "/ImagesEntrepreneurUser/" + Date.now() + ".jpg"
        );
        const img = await fetch(result.assets[0].uri);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);

        const urlEntrepreneurUserImage = await getDownloadURL(storageRef);
        onTextFieldChangeImage(urlEntrepreneurUserImage);
      } catch (error) {
        console.log(error);
      }

      // onTextFieldChangeImage(result.assets[0].uri);
    }
  };

  const pickDocs = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
        type: [DocumentPicker.types.allFiles],
      });
      console.log("res: " + JSON.stringify(res));
    } catch (error) {
      console.log("ERROR: " + error);
      DocumentPicker.isCancel(error)
        ? console.log("Fue cancelado")
        : console.log("No fue cancelado");
    }
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn("cancelled");
    } else if (isInProgress(err)) {
      console.warn(
        "multiple pickers were opened, only the last will be considered"
      );
    } else {
      throw err;
    }
  };

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      entrepreneurUser.email,
      entrepreneurUser.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(FirebaseDB, "entrepreneurUser", auth.currentUser.uid), {
          entrepreneurUser,
        });
        Alert.alert("Account created!");
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: entrepreneurUser.image,
              }}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Selecciona foto de perfíl</Text>
          </TouchableOpacity>

          <Text style={styles.inputTitle}>Curriculum Profesional</Text>
          <TouchableOpacity style={styles.button} onPress={pickDocs}>
            <Text style={styles.buttonText}>Seleccionar curriculum</Text>
          </TouchableOpacity>

          <Text style={styles.inputTitle}>Opinión de Buro de crédito</Text>
          <TouchableOpacity style={styles.button} onPress={pickDocs}>
            <Text style={styles.buttonText}>Seleccionar buro de crédito</Text>
          </TouchableOpacity>

          <Text style={styles.inputTitle}>Referencia personal</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangePersonalReference}
            value={entrepreneurUser.personalReference}
          />

          <Text style={styles.inputTitle}>Correo Electrónico</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeEmail}
            value={entrepreneurUser.email}
            keyboardType="email-address"
          />

          <Text style={styles.inputTitle}>Contraseña</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangePassword}
            value={entrepreneurUser.password}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default AddEntrepreneurUser;
