import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FirebaseDB } from "../../firebase/config";
import { CompanyUser } from "../../interfaces";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const CompanyUserProfile = ({ navigation, route }: Props) => {
  // const { id } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;

  const handleAuth = () => {
    onAuthStateChanged(auth, (id) => {
      if (id) {
        const uid = id.uid;
        const user = auth.currentUser;
      } else {
        handleSignOut();
      }
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [companyUser, setCompanyUser] = useState<CompanyUser>({
    image: "",
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const docRef = doc(FirebaseDB, "companyUser", user.uid);
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

  const onEdit = () => {
    navigation.navigate("UpdateCompanyUser", {
      id: user.uid,
    });
  };

  return (
    <ScrollView>
      <View style={styles.globalMargin}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                ¿Seguro que quieres eliminar esta cuenta?
              </Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Si</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: companyUser.image }}
          />
        </View>

        <Text style={styles.labelTitle}>ID</Text>
        <Text style={styles.labelInfo}>{user.uid}</Text>

        <Text style={styles.labelTitle}>Nombre de la empresa</Text>
        <Text style={styles.labelInfo}>{companyUser.companyName} </Text>

        <Text style={styles.labelTitle}>Giro de la empresa</Text>
        <Text style={styles.labelInfo}>{companyUser.role}</Text>

        <Text style={styles.labelTitle}>Número de teléfono</Text>
        <Text style={styles.labelInfo}>{companyUser.phoneNumber}</Text>

        <Text style={styles.labelTitle}>Dirección</Text>
        <Text style={styles.labelInfo}>{companyUser.address}</Text>

        <Text style={styles.labelTitle}>Código Postal</Text>
        <Text style={styles.labelInfo}>{companyUser.postalCode}</Text>

        <Text style={styles.labelTitle}>Estado</Text>
        <Text style={styles.labelInfo}>{companyUser.state}</Text>

        <Text style={styles.labelTitle}>Ciudad</Text>
        <Text style={styles.labelInfo}>{companyUser.city}</Text>

        <Text style={styles.labelTitle}>Descripción</Text>
        <Text style={styles.labelInfo}>{companyUser.description}</Text>

        <Text style={styles.labelTitle}>Enlace a Youtube</Text>
        <Text style={styles.labelInfo}>{companyUser.youtubeLink}</Text>

        <Text style={styles.labelTitle}>Imagenes</Text>
        <Text style={styles.labelInfo}>{companyUser.images}</Text>

        <Text style={styles.labelTitle}>Promociones</Text>
        <Text style={styles.labelInfo}>{companyUser.promotions}</Text>

        <Text style={styles.labelTitle}>Descuentos</Text>
        <Text style={styles.labelInfo}>{companyUser.discounts}</Text>

        <Text style={styles.labelTitle}>Correo Electrónico</Text>
        <Text style={styles.labelInfo}>{companyUser.email}</Text>

        <Text style={styles.labelTitle}>Enlace a Google Maps</Text>
        <Text style={styles.labelInfo}>{companyUser.googleMapsLink}</Text>

        <TouchableOpacity style={styles.updateButton} onPress={() => onEdit()}>
          <Text style={styles.updateButtonText}>Editar Pérfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate("MembershipPayment")}>
          <Text style={styles.updateButtonText}>Membresía</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate("ApplyForCredit")}>
          <Text style={styles.updateButtonText}>Solicitar crédito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CompanyUserProfile;
function handleSignOut() {
  throw new Error("Function not implemented.");
}

