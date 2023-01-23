import React, { useEffect, useState } from "react";
import { Image, Text, View, Platform, Alert } from "react-native";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CompanyUser } from "../../interfaces";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props extends StackScreenProps<any, any> {}

const AddCompanyUser = ({ navigation }: Props) => {
  const [multipleImages, setMultipleImages] = useState([]);
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
    images: [],
    promotions: "",
    discounts: "",
    googleMapsLink: "",
    email: "",
    password: "",
  });

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

  const onTextFieldChangeimages = (value: string[]) => {
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
    }
  };

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

      console.log('1.- result.assets[0].uri' + result.assets[0].uri);
      console.log('2.- result.assets[1].uri' + result.assets[1].uri);
      console.log('3.- result.assets[2].uri' + result.assets[2].uri);
      console.log('4.- result.assets[3].uri' + result.assets[3].uri);
      console.log('5.- result.assets[4].uri' + result.assets[4].uri);

      try {
        const urlMultipleImages = multipleImages.map(async (imageInfo) => {
          
          const storageRef = ref(
            FirebaseStorage,
            "/ImagesCompanyUser/" + Date.now() + ".jpg"
          );
          const img = await fetch(imageInfo);
          const bytes = await img.blob();
          await uploadBytes(storageRef, bytes);

          const urlCompanyUserImage = await getDownloadURL(storageRef);
          onTextFieldChangeimages([...companyUser.images, urlCompanyUserImage]);
          console.log("URL: " + urlCompanyUserImage);
          return urlCompanyUserImage;
        });

        Promise.all(urlMultipleImages).then((data) => {
          console.log('PROMISE: ' + data);
        });

      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      companyUser.email,
      companyUser.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(FirebaseDB, "companyUser", auth.currentUser.uid), {
          companyUser,
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
                uri: companyUser.image,
              }}
            />
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
            keyboardType="phone-pad"
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
            keyboardType="phone-pad"
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

          <Text style={styles.inputTitle}>Correo Electrónico</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeEmail(value)}
            value={companyUser.email}
            keyboardType="email-address"
          />

          <Text style={styles.inputTitle}>Contraseña</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangePassword(value)}
            value={companyUser.password}
            secureTextEntry={true}
          />

          <Text style={styles.inputTitle}>Enlace a Google Maps</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => onTextFieldChangeGoogleMapsLink(value)}
            value={companyUser.googleMapsLink}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default AddCompanyUser;
