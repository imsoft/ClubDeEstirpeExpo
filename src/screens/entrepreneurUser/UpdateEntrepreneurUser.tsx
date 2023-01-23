import React, { useEffect, useState } from "react";
import { Image, Platform, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { styles } from "../../theme/appTheme";
import * as ImagePicker from "expo-image-picker";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { StackScreenProps } from "@react-navigation/stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EntrepreneurUser } from "../../interfaces";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import DocumentPicker from "react-native-document-picker";

interface Props extends StackScreenProps<any, any> {}

const UpdateEntrepreneurUser = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const docRef = doc(FirebaseDB, "entrepreneurUser", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEntrepreneurUser({
        image: docSnap.data().entrepreneurUser.image,
        curriculumProfesional:
          docSnap.data().entrepreneurUser.curriculumProfesional,
        creditBureauOpinion:
          docSnap.data().entrepreneurUser.creditBureauOpinion,
        personalReference: docSnap.data().entrepreneurUser.personalReference,
        email: docSnap.data().entrepreneurUser.email,
        password: docSnap.data().entrepreneurUser.password,
        project: {
          image: docSnap.data().entrepreneurUser.image,
          role: docSnap.data().entrepreneurUser.role,
          size: docSnap.data().entrepreneurUser.size,
          experience: docSnap.data().entrepreneurUser.experience,
          employeeNumber: docSnap.data().entrepreneurUser.employeeNumber,
          amountToRequest: docSnap.data().entrepreneurUser.amountToRequest,
          documents: docSnap.data().entrepreneurUser.documents,
          renders: docSnap.data().entrepreneurUser.renders,
          ubication: docSnap.data().entrepreneurUser.ubication,
          executiveIdea: docSnap.data().entrepreneurUser.executiveIdea,
          investmentStatus: docSnap.data().entrepreneurUser.investmentStatus,
        },
      });
    } else {
      console.log("No such document!");
    }
  };

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

  const onDelete = () => {
    deleteDoc(doc(FirebaseDB, "entrepreneurUser", id));
  };

  const onEdit = () => {
    const docRef = updateDoc(doc(FirebaseDB, "entrepreneurUser", id), {
      entrepreneurUser,
    });
    navigation.navigate("EntrepreneurUsersList");
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

          <TouchableOpacity style={styles.button} onPress={onEdit}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete()}
          >
            <Text style={styles.deleteButtonText}>Eliminar Pérfil</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default UpdateEntrepreneurUser;
