import React, { useEffect, useState } from "react";
import { Button, Image, Platform, Text, View } from "react-native";
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
import { EntrepreneurUser, Project } from "../../interfaces";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import RNPickerSelect from "react-native-picker-select";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
} from "react-native-document-picker";

interface Props extends StackScreenProps<any, any> {}

const UpdateProject = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [show, setShow] = useState(false);
  const [multipleImages, setMultipleImages] = useState([]);

  const [newProject, setNewProject] = useState<Project>({
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
  });

  const [entrepreneurUser, setEntrepreneurUser] = useState<EntrepreneurUser>({
    image: "",
    curriculumProfesional: "",
    creditBureauOpinion: "",
    personalReference: "",
    email: "",
    password: "",
    project: newProject,
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

  const pickMultipleImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMultipleImages([
        result.assets[0].uri,
        result.assets[1].uri,
        result.assets[2].uri,
        result.assets[3].uri,
        result.assets[4].uri,
      ]);

      console.log("1.- result.assets[0].uri" + result.assets[0].uri);
      console.log("2.- result.assets[1].uri" + result.assets[1].uri);
      console.log("3.- result.assets[2].uri" + result.assets[2].uri);
      console.log("4.- result.assets[3].uri" + result.assets[3].uri);
      console.log("5.- result.assets[4].uri" + result.assets[4].uri);

      try {
        const urlMultipleImages = multipleImages.map(async (imageInfo) => {
          const storageRef = ref(
            FirebaseStorage,
            "/ImagesEntrepreneurUser/" + Date.now() + ".jpg"
          );
          const img = await fetch(imageInfo);
          const bytes = await img.blob();
          await uploadBytes(storageRef, bytes);
          const urlCompanyUserImage = await getDownloadURL(storageRef);
          onTextFieldChangeRenders([
            ...newProject.renders,
            urlCompanyUserImage,
          ]);
          console.log("URL: " + urlCompanyUserImage);
          return urlCompanyUserImage;
        });
        Promise.all(urlMultipleImages).then((data) => {
          console.log("PROMISE: " + data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pickDocs = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        presentationStyle: "fullScreen",
        type: [DocumentPicker.types.allFiles],
      });
      console.log("res: " + JSON.stringify(res));
      // console.log('URI: ' + res.uri);
      // console.log('Type: ' + res.type);
      // console.log('File Name: ' + res.);
      // console.log('File Size: ' + res);
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
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        "multiple pickers were opened, only the last will be considered"
      );
    } else {
      throw err;
    }
  };

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
    setNewProject({ ...newProject, image: value });
  };

  const onTextFieldChangeRole = (value: string) => {
    setNewProject({ ...newProject, role: value });
  };

  const onTextFieldChangeSize = (value: string) => {
    setNewProject({ ...newProject, size: value });
  };

  const onTextFieldChangeExperience = (value: string) => {
    setNewProject({ ...newProject, experience: value });
  };

  const onTextFieldChangeEmployeeNumber = (value: string) => {
    setNewProject({ ...newProject, employeeNumber: value });
  };

  const onTextFieldChangeAmountToRequest = (value: string) => {
    setNewProject({ ...newProject, amountToRequest: value });
  };

  const onTextFieldChangeDocuments = (value: string) => {
    setNewProject({ ...newProject, documents: value });
  };

  const onTextFieldChangeRenders = (value: string[]) => {
    setNewProject({ ...newProject, renders: value });
  };

  const onTextFieldChangeUbication = (value: string) => {
    setNewProject({ ...newProject, ubication: value });
  };

  const onTextFieldChangeExecutiveIdea = (value: string) => {
    setNewProject({ ...newProject, executiveIdea: value });
  };

  const onTextFieldChangeInvestmentStatus = (value: string) => {
    setNewProject({ ...newProject, investmentStatus: parseInt(value) });
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
          "/ImagesEntrepreneurUser/" + entrepreneurUser.email + ".jpg"
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
            {entrepreneurUser.image && (
              <Image
                style={styles.profileImage}
                source={{
                  uri: entrepreneurUser.project.image,
                }}
              />
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Selecciona foto de perfíl</Text>
          </TouchableOpacity>

          <Text style={styles.inputTitle}>Giro</Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderBottomColor: "black",
              paddingBottom: 10,
            }}
          >
            <RNPickerSelect
              pickerProps={{
                accessibilityLabel: "Secondary long descriptive text ...",
              }}
              onValueChange={(value) => onTextFieldChangeRole(value)}
              placeholder={{ label: "Selecciona una opción", value: null }}
              items={[
                { label: "Alimentos", value: "alimentos" },
                { label: "Belleza", value: "belleza" },
                { label: "Comercios", value: "comercios" },
                { label: "Marketing", value: "marketing" },
                { label: "Salud", value: "salud" },
                { label: "Servicios", value: "servicios" },
              ]}
            >
              <Text style={styles.inputTitle}>
                {entrepreneurUser.project.role}
              </Text>
            </RNPickerSelect>
          </View>

          <Text style={styles.inputTitle}>Tamaño</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeSize}
            value={entrepreneurUser.project.size}
          />

          <Text style={styles.inputTitle}>Experiencia</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeExperience}
            value={entrepreneurUser.project.experience}
          />

          <Text style={styles.inputTitle}>Número de empleados</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeEmployeeNumber}
            value={entrepreneurUser.project.employeeNumber}
          />

          <Text style={styles.inputTitle}>Monto a solicitar</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeAmountToRequest}
            value={entrepreneurUser.project.amountToRequest}
          />

          <Text style={styles.inputTitle}>Documentos</Text>
          <TouchableOpacity style={styles.button} onPress={pickDocs}>
            <Text style={styles.buttonText}>Selecciona documentos</Text>
          </TouchableOpacity>

          <Button
            title="open picker for single file selection"
            onPress={async () => {
              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  type: [DocumentPicker.types.allFiles],
                  presentationStyle: "fullScreen",
                  copyTo: "cachesDirectory",
                });
                console.log(pickerResult);
                // setResult([pickerResult]);
              } catch (e) {
                handleError(e);
              }
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  type: [DocumentPicker.types.allFiles],
                  presentationStyle: "fullScreen",
                  copyTo: "cachesDirectory",
                });
                console.log(pickerResult);
                // setResult([pickerResult]);
              } catch (e) {
                handleError(e);
              }
            }}
          >
            <Text style={styles.buttonText}>
              open picker for single file selection
            </Text>
          </TouchableOpacity>

          <Text style={styles.inputTitle}>Imagenes</Text>
          <TouchableOpacity style={styles.button} onPress={pickMultipleImages}>
            <Text style={styles.buttonText}>Seleccionar imagenes</Text>
          </TouchableOpacity>
          <ScrollView horizontal={true}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              {multipleImages.map((image) => (
                <Image
                  key={image}
                  style={styles.imagesGallery}
                  source={{
                    uri: image,
                  }}
                />
              ))}
            </View>
          </ScrollView>

          <Text style={styles.inputTitle}>Dirección</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeUbication}
            value={entrepreneurUser.project.ubication}
          />

          <Text style={styles.inputTitle}>Idea Ejecutiva</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeExecutiveIdea}
            value={entrepreneurUser.project.executiveIdea}
          />

          <Text style={styles.inputTitle}>Estado de la inversión</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeInvestmentStatus}
            value={entrepreneurUser.project.investmentStatus.toString()}
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

export default UpdateProject;
