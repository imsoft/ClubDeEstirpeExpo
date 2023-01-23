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
import { CompanyUser } from "../../interfaces";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props extends StackScreenProps<any, any> {}

const UpdateCompanyUser = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [show, setShow] = useState(false);

  const [companyUser, setCompanyUser] = useState<CompanyUser>({
    image:
      "https://media-exp1.licdn.com/dms/image/C4E16AQHwCWOi-C6Nig/profile-displaybackgroundimage-shrink_200_800/0/1609278865652?e=2147483647&v=beta&t=8jwH-tkRQWIxMv9m8JzwRoE1n8uGF46tzSmkh2AVCnM",
    companyName: "",
    role: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    state: "",
    city: "",
    description: "",
    youtubeLink: "",
    images: "",
    promotions: "",
    discounts: "",
    googleMapsLink: "",
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
    const docRef = doc(FirebaseDB, "companyUser", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCompanyUser({
        image: docSnap.data().companyUser.image,
        companyName: docSnap.data().companyUser.companyName,
        role: docSnap.data().companyUser.role,
        phoneNumber: docSnap.data().companyUser.phoneNumber,
        address: docSnap.data().companyUser.address,
        postalCode: docSnap.data().companyUser.postalCode,
        state: docSnap.data().companyUser.state,
        city: docSnap.data().companyUser.city,
        description: docSnap.data().companyUser.description,
        youtubeLink: docSnap.data().companyUser.youtubeLink,
        images: docSnap.data().companyUser.images,
        promotions: docSnap.data().companyUser.promotions,
        discounts: docSnap.data().companyUser.discounts,
        googleMapsLink: docSnap.data().companyUser.googleMapsLink,
        email: docSnap.data().companyUser.email,
        password: docSnap.data().companyUser.password,
      });
    } else {
      console.log("No such document!");
    }
  };

  const onTextFieldChangeImage = (value: string) => {
    setCompanyUser({ ...companyUser, image: value });
  };

  const onTextFieldChangeCompanyName = (value: string) => {
    setCompanyUser({ ...companyUser, companyName: value });
  };

  const onTextFieldChangeRole = (value: string) => {
    setCompanyUser({ ...companyUser, role: value });
  };

  const onTextFieldChangePhoneNumber = (value: string) => {
    setCompanyUser({ ...companyUser, phoneNumber: value });
  };

  const onTextFieldChangeAddress = (value: string) => {
    setCompanyUser({ ...companyUser, address: value });
  };

  const onTextFieldChangePostalCode = (value: string) => {
    setCompanyUser({ ...companyUser, postalCode: value });
  };

  const onTextFieldChangeState = (value: string) => {
    setCompanyUser({ ...companyUser, state: value });
  };

  const onTextFieldChangeCity = (value: string) => {
    setCompanyUser({ ...companyUser, city: value });
  };

  const onTextFieldChangeDescription = (value: string) => {
    setCompanyUser({ ...companyUser, description: value });
  };

  const onTextFieldChangeYoutubeLink = (value: string) => {
    setCompanyUser({ ...companyUser, youtubeLink: value });
  };

  const onTextFieldChangeimages = (value: string) => {
    setCompanyUser({ ...companyUser, images: value });
  };

  const onTextFieldChangePromotions = (value: string) => {
    setCompanyUser({ ...companyUser, promotions: value });
  };

  const onTextFieldChangeDiscounts = (value: string) => {
    setCompanyUser({ ...companyUser, discounts: value });
  };

  const onTextFieldChangeGoogleMapsLink = (value: string) => {
    setCompanyUser({ ...companyUser, googleMapsLink: value });
  };

  const onTextFieldChangeEmail = (value: string) => {
    setCompanyUser({ ...companyUser, email: value });
  };

  const onTextFieldChangePassword = (value: string) => {
    setCompanyUser({ ...companyUser, password: value });
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
          "/ImagesCompanyUser/" + companyUser.email + ".jpg"
        );
        const img = await fetch(result.assets[0].uri);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);

        const urlCompanyUserImage = await getDownloadURL(storageRef);
        onTextFieldChangeImage(urlCompanyUserImage);
      } catch (error) {
        console.log(error);
      }

      // onTextFieldChangeImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    deleteDoc(doc(FirebaseDB, "companyUser", id));
  };

  const onEdit = () => {
    const docRef = updateDoc(doc(FirebaseDB, "compamyUser", id), {
      companyUser,
    });
    navigation.navigate("CompanyUsersList");
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.imageContainer}>
            {companyUser.image && (
              <Image
                style={styles.profileImage}
                source={{
                  uri: companyUser.image,
                }}
              />
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Selecciona foto de perfíl</Text>
          </TouchableOpacity>

          <Text style={styles.inputTitle}>Nombre de la empresa</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeCompanyName(value)}
            value={companyUser.companyName}
          />

          <Text style={styles.inputTitle}>Giro de la empresa</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeRole(value)}
            value={companyUser.role}
          />

          <Text style={styles.inputTitle}>Número de teléfono</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePhoneNumber(value)}
            value={companyUser.phoneNumber}
          />

          <Text style={styles.inputTitle}>Dirección</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeAddress(value)}
            value={companyUser.address}
          />

          <Text style={styles.inputTitle}>Código Postal</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePostalCode(value)}
            value={companyUser.postalCode}
          />

          <Text style={styles.inputTitle}>Estado</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeState(value)}
            value={companyUser.state}
          />

          <Text style={styles.inputTitle}>Ciudad</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeCity(value)}
            value={companyUser.city}
          />

          <Text style={styles.inputTitle}>Descripción</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeDescription(value)}
            value={companyUser.description}
          />

          <Text style={styles.inputTitle}>Enlace a Youtube</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeYoutubeLink(value)}
            value={companyUser.youtubeLink}
          />

          <Text style={styles.inputTitle}>Imagenes</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeimages(value)}
            value={companyUser.images}
          />

          <Text style={styles.inputTitle}>Promociones</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePromotions(value)}
            value={companyUser.promotions}
          />

          <Text style={styles.inputTitle}>Descuentos</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeDiscounts(value)}
            value={companyUser.discounts}
          />

          <Text style={styles.inputTitle}>Correo electrónico</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeEmail(value)}
            value={companyUser.email}
            keyboardType="email-address"
          />

          <Text style={styles.inputTitle}>Enlace a Google Maps</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeGoogleMapsLink(value)}
            value={companyUser.googleMapsLink}
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

export default UpdateCompanyUser;
