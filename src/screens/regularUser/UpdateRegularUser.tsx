import React, { useEffect, useState } from "react";
import { Image, Platform, Text, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { styles } from "../../theme/appTheme";
import { RadioButton } from "react-native-paper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { FirebaseDB, FirebaseStorage } from "../../firebase/config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { StackScreenProps } from "@react-navigation/stack";
import { RegularUser } from "../../interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props extends StackScreenProps<any, any> {}

const UpdateRegularUser = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [inputDateOfBirth, setInputDateOfBirth] = useState(new Date());
  const [show, setShow] = useState(false);

  const [regularUser, setRegularUser] = useState<RegularUser>({
    image:
      "https://media-exp1.licdn.com/dms/image/C4E16AQHwCWOi-C6Nig/profile-displaybackgroundimage-shrink_200_800/0/1609278865652?e=2147483647&v=beta&t=8jwH-tkRQWIxMv9m8JzwRoE1n8uGF46tzSmkh2AVCnM",
    name: "",
    surname: "",
    dateOfBirth: inputDateOfBirth,
    age: "",
    phoneNumber: "",
    email: "",
    sex: "",
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
    const docRef = doc(FirebaseDB, "regularUser", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setRegularUser({
        image: docSnap.data().regularUser.image,
        name: docSnap.data().regularUser.name,
        surname: docSnap.data().regularUser.surname,
        dateOfBirth: new Date(
          docSnap.data().regularUser.dateOfBirth.seconds * 1000
        ),
        age: docSnap.data().regularUser.age,
        phoneNumber: docSnap.data().regularUser.phoneNumber,
        email: docSnap.data().regularUser.email,
        sex: docSnap.data().regularUser.sex,
        password: docSnap.data().regularUser.password,
      });
      setInputDateOfBirth(regularUser.dateOfBirth);
    } else {
      console.log("No such document!");
    }
  };

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
  };

  const onTextFieldChangeAge = (value: string) => {
    setRegularUser({ ...regularUser, age: value });
  };

  const onTextFieldChangePhoneNumber = (value: string) => {
    setRegularUser({ ...regularUser, phoneNumber: value });
  };

  const onTextFieldChangeEmail = (value: string) => {
    setRegularUser({ ...regularUser, email: value });
  };

  const onTextFieldChangePassword = (value: string) => {
    setRegularUser({ ...regularUser, password: value });
  };

  const onTextFieldChangeSex = (value: string) => {
    setRegularUser({ ...regularUser, sex: value });
  };

  // const pickImage = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setRegularUser({
  //         ...regularUser,
  //         image: result.assets[0].uri,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const onDelete = () => {
    deleteDoc(doc(FirebaseDB, "regularUser", id));
    navigation.navigate("Login");
  };

  const onEdit = () => {
    const docRef = updateDoc(doc(FirebaseDB, "regularUser", id), {
      regularUser,
    });
    navigation.navigate("RegularUsersList");
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.imageContainer}>
            {regularUser.image && (
              <Image
                style={styles.profileImage}
                source={{
                  uri: regularUser.image,
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
              value={regularUser.dateOfBirth}
              mode={"date"}
              locale="es-MX"
              display="default"
              onChange={onTextFieldChangeDateOfBirth}
            />
          </View>

          <Text style={styles.inputTitle}>Edad</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeAge(value)}
            value={regularUser.age}
            keyboardType="number-pad"
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

          <Text style={styles.inputTitle}>Sexo</Text>
          <RadioButton.Group
            onValueChange={(value) => onTextFieldChangeSex(value)}
            value={regularUser.sex}
          >
            <View style={styles.radioOption}>
              <RadioButton value="Hombre" color="#FEEB3B" />
              <Text style={styles.radioText}>Hombre</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="Mujer" color="#FEEB3B" />
              <Text style={styles.radioText}>Mujer</Text>
            </View>
          </RadioButton.Group>

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

export default UpdateRegularUser;
