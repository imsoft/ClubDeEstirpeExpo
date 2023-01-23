import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { styles } from "../../theme/appTheme";
import { AdminUser } from "../../interfaces/adminUser";
import * as ImagePicker from "expo-image-picker";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props extends StackScreenProps<any, any> {}

const AddAdminUser = ({ navigation }: Props) => {
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

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, adminUser.email, adminUser.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(FirebaseDB, "adminUser", auth.currentUser.uid), {
          adminUser,
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

  // const addNewAdminUser = async () => {
  //   try {
  //     const resultImage = await uploadImage(adminUser.image);
  //     onTextFieldChangeImage(resultImage);
  //     const docRef = await addDoc(collection(FirebaseDB, "adminUser"), {
  //       adminUser,
  //     });
  //     console.log(adminUser);
  //   } catch (error) {
  //     console.error("Error al agregar el registro: ", error);
  //   }

  //   navigation.navigate("Login");
  // };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: adminUser.image,
              }}
            />
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

          <Text style={styles.inputTitle}>Posición de la compañia</Text>
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

          <Text style={styles.inputTitle}>Contraseña</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePassword(value)}
            value={adminUser.password}
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

export default AddAdminUser;
