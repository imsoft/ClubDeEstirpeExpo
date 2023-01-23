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
import { AdminUser } from "../../interfaces";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const AdminUserProfile = ({ navigation, route }: Props) => {
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
  const [adminUser, setAdminUser] = useState<AdminUser>({
    image: "",
    name: "",
    surname: "",
    positionInTheCompany: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const docRef = doc(FirebaseDB, "adminUser", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAdminUser({
        image: docSnap.data().adminUser.image,
        name: docSnap.data().adminUser.name,
        surname: docSnap.data().adminUser.surname,
        positionInTheCompany: docSnap.data().adminUser.positionInTheCompany,
        phoneNumber: docSnap.data().adminUser.phoneNumber,
        email: docSnap.data().adminUser.email,
        password: "",
      });
    } else {
      console.log("No such document!");
    }
  };

  const onEdit = () => {
    navigation.navigate("UpdateAdminUser", {
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
            source={{ uri: adminUser.image }}
          />
        </View>

        <Text style={styles.labelTitle}>ID</Text>
        <Text style={styles.labelInfo}>{user.uid}</Text>

        <Text style={styles.labelTitle}>Nombre(s)</Text>
        <View style={styles.nameSurname}>
          <Text style={styles.labelInfo}>{adminUser.name} </Text>
          <Text style={styles.labelInfo}>{adminUser.surname}</Text>
        </View>

        <Text style={styles.labelTitle}>Posición en la empresa</Text>
        <Text style={styles.labelInfo}>{adminUser.positionInTheCompany}</Text>

        <Text style={styles.labelTitle}>Teléfono</Text>
        <Text style={styles.labelInfo}>{adminUser.phoneNumber}</Text>

        <Text style={styles.labelTitle}>Correo Electrónico</Text>
        <Text style={styles.labelInfo}>{adminUser.email}</Text>

        <TouchableOpacity style={styles.updateButton} onPress={() => onEdit()}>
          <Text style={styles.updateButtonText}>Editar Pérfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminUserProfile;
function handleSignOut() {
  throw new Error("Function not implemented.");
}

