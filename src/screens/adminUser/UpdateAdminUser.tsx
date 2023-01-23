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
import { AdminUser } from "../../interfaces/adminUser";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props extends StackScreenProps<any, any> {}

const UpdateAdminUser = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [show, setShow] = useState(false);

  const [adminUser, setAdminUser] = useState<AdminUser>({
    image:
      "https://media-exp1.licdn.com/dms/image/C4E16AQHwCWOi-C6Nig/profile-displaybackgroundimage-shrink_200_800/0/1609278865652?e=2147483647&v=beta&t=8jwH-tkRQWIxMv9m8JzwRoE1n8uGF46tzSmkh2AVCnM",
    name: "",
    surname: "",
    positionInTheCompany: "",
    phoneNumber: "",
    email: "",
    password: "",
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
    const docRef = doc(FirebaseDB, "adminUser", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAdminUser({
        image: docSnap.data().adminUser.image,
        name: docSnap.data().adminUser.name,
        surname: docSnap.data().adminUser.surname,
        positionInTheCompany: docSnap.data().adminUser.positionInTheCompany,
        phoneNumber: docSnap.data().adminUser.phoneNumber,
        email: docSnap.data().adminUser.email,
        password: docSnap.data().adminUser.password,
      });
    } else {
      console.log("No such document!");
    }
  };

  const onTextFieldChangeImage = (value: string) => {
    setAdminUser({ ...adminUser, image: value });
  };

  const onTextFieldChangeName = (value: string) => {
    setAdminUser({ ...adminUser, name: value });
  };

  const onTextFieldChangeSurname = (value: string) => {
    setAdminUser({ ...adminUser, surname: value });
  };

  const onTextFieldChangePositionInTheCompany = (value: string) => {
    setAdminUser({ ...adminUser, positionInTheCompany: value });
  };

  const onTextFieldChangePhoneNumber = (value: string) => {
    setAdminUser({ ...adminUser, phoneNumber: value });
  };

  const onTextFieldChangeEmail = (value: string) => {
    setAdminUser({ ...adminUser, email: value });
  };

  const onTextFieldChangePassword = (value: string) => {
    setAdminUser({ ...adminUser, password: value });
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
          "/ImagesAdminUser/" + adminUser.email + ".jpg"
        );
        const img = await fetch(result.assets[0].uri);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);

        const urlAdminUserImage = await getDownloadURL(storageRef);
        onTextFieldChangeImage(urlAdminUserImage);
      } catch (error) {
        console.log(error);
      }

      // onTextFieldChangeImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteDoc(doc(FirebaseDB, "adminUser", id));
  };

  const onEdit = () => {
    const docRef = updateDoc(doc(FirebaseDB, "adminUser", id), {
      adminUser,
    });
    navigation.navigate("AdminUsersList");
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.imageContainer}>
            {adminUser.image && (
              <Image
                style={styles.profileImage}
                source={{
                  uri: adminUser.image,
                }}
              />
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Selecciona foto de perfíl</Text>
          </TouchableOpacity>

          <Text style={styles.inputTitle}>Nombre(s)</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeName(value)}
            value={adminUser.name}
          />

          <Text style={styles.inputTitle}>Apellidos</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeSurname(value)}
            value={adminUser.surname}
          />

          <Text style={styles.inputTitle}>Posición en la compañia</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) =>
              onTextFieldChangePositionInTheCompany(value)
            }
            value={adminUser.positionInTheCompany}
          />

          <Text style={styles.inputTitle}>Teléfono</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePhoneNumber(value)}
            value={adminUser.phoneNumber}
            keyboardType="phone-pad"
          />

          <Text style={styles.inputTitle}>Correo Electrónico</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeEmail(value)}
            value={adminUser.email}
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

export default UpdateAdminUser;
