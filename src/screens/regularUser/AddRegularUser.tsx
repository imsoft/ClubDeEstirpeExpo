import React, { useEffect, useState } from "react";
import { Image, Text, View, Platform, Alert } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { styles } from "../../theme/appTheme";
import { RadioButton } from "react-native-paper";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { StackScreenProps } from "@react-navigation/stack";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { RegularUser } from "../../interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props extends StackScreenProps<any, any> {}

const AddRegularUser = ({ navigation }: Props) => {
  const [inputDateOfBirth, setInputDateOfBirth] = useState(new Date());

  const [regularUser, setRegularUser] = useState<RegularUser>({
    image:
      "https://media-exp1.licdn.com/dms/image/C4E16AQHwCWOi-C6Nig/profile-displaybackgroundimage-shrink_200_800/0/1609278865652?e=2147483647&v=beta&t=8jwH-tkRQWIxMv9m8JzwRoE1n8uGF46tzSmkh2AVCnM",
    name: "",
    surname: "",
    dateOfBirth: inputDateOfBirth,
    age: 0,
    phoneNumber: "",
    email: "",
    sex: "",
    password: "",
  });

  const onTextFieldChangeImage = (value: string) => {
    setRegularUser({ ...regularUser, image: value });
  };

  const onTextFieldChangeName = (value: string) => {
    setRegularUser({ ...regularUser, name: value });
  };

  const onTextFieldChangeSurname = (value: string) => {
    setRegularUser({ ...regularUser, surname: value });
  };

  const onTextFieldChangeDateOfBirth = (
    value: DateTimePickerEvent,
    selectedDate: Date
  ) => {
    setInputDateOfBirth(selectedDate);
    setRegularUser({ ...regularUser, dateOfBirth: selectedDate });
    calcularEdad(selectedDate);
  };

  const onTextFieldChangeAge = (value: number) => {
    setRegularUser({ ...regularUser, age: value });
  };

  const onTextFieldChangePhoneNumber = (value: string) => {
    setRegularUser({ ...regularUser, phoneNumber: value });
  };

  const onTextFieldChangeEmail = (value: string) => {
    setRegularUser({ ...regularUser, email: value });
  };

  const onTextFieldChangeSex = (value: string) => {
    setRegularUser({ ...regularUser, sex: value });
  };

  const onTextFieldChangePassword = (value: string) => {
    setRegularUser({ ...regularUser, password: value });
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

  useEffect(() => {
    navigation.setOptions({
      title: `Usuario regular`,
      headerBackTitle: "Regresar",
    });
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
          "/ImagesRegularUser/" + regularUser.email + ".jpg"
        );
        const img = await fetch(result.assets[0].uri);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);

        const urlRegularUserImage = await getDownloadURL(storageRef);
        onTextFieldChangeImage(urlRegularUserImage);
      } catch (error) {
        console.log(error);
      }

      // onTextFieldChangeImage(result.assets[0].uri);
    }
  };

  const calcularEdad = (fecha) => {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    onTextFieldChangeAge(edad);
  };

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      regularUser.email,
      regularUser.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(FirebaseDB, "regularUser", auth.currentUser.uid), {
          regularUser,
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
                uri: regularUser.image,
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
            value={regularUser.name}
          />

          <Text style={styles.inputTitle}>Apellidos</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeSurname(value)}
            value={regularUser.surname}
          />

          <Text style={styles.inputTitle}>Fecha de nacimiento</Text>
          <View style={styles.datePicker}>
            <DateTimePicker
              testID="dateTimePicker"
              value={inputDateOfBirth}
              mode={"date"}
              locale="es-MX"
              display="spinner"
              textColor="black"
              onChange={onTextFieldChangeDateOfBirth}
            />
          </View>

          <Text style={styles.inputTitle}>Edad</Text>
          <TextInput
            style={styles.inputText}
            value={regularUser.age.toString()}
            editable={false}
          />

          <Text style={styles.inputTitle}>Teléfono</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePhoneNumber(value)}
            value={regularUser.phoneNumber}
            keyboardType="phone-pad"
          />

          <Text style={styles.inputTitle}>Correo Electrónico</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeEmail(value)}
            value={regularUser.email}
            keyboardType="email-address"
          />

          <Text style={styles.inputTitle}>Contraseña</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePassword(value)}
            value={regularUser.password}
            secureTextEntry={true}
          />

          <Text style={styles.inputTitle}>Sexo</Text>
          <RadioButton.Group
            onValueChange={(value) => onTextFieldChangeSex(value)}
            value={regularUser.sex}
          >
            <RadioButton.Item label="Hombre" value="Hombre" color="#FEEB3B" />
            <RadioButton.Item label="Mujer" value="Mujer" color="#FEEB3B" />
            <RadioButton.Item label="Otro" value="Otro" color="#FEEB3B" />
          </RadioButton.Group>

          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default AddRegularUser;
