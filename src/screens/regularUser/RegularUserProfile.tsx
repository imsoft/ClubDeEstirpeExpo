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
import { FirebaseAuth, FirebaseDB } from "../../firebase/config";
import { RegularUser } from "../../interfaces";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const RegularUserProfile = ({ navigation, route }: Props) => {
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

  const handleSignOut = () => {
    FirebaseAuth.signOut();
    console.log("Signed out!");
    navigation.navigate("Login");
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [regularUser, setRegularUser] = useState<RegularUser>({
    image: undefined,
    name: "",
    surname: "",
    dateOfBirth: new Date(),
    age: 0,
    phoneNumber: "",
    email: "",
    sex: "",
    password: "",
  });

  useEffect(() => {
    handleAuth();
    loadData();
  }, []);

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: `${regularUser.name} ${regularUser.surname}`,
  //   });
  // }, []);

  const loadData = async () => {
    const docRef = doc(FirebaseDB, "regularUser", user.uid);
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
        password: "",
      });
    } else {
      console.log("No such document!");
    }
  };

  const onEdit = () => {
    navigation.navigate("UpdateRegularUser", {
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
            source={{ uri: regularUser.image }}
          />
        </View>

        <Text style={styles.labelTitle}>ID</Text>
        <Text style={styles.labelInfo}>{user.uid}</Text>

        <Text style={styles.labelTitle}>Nombre(s)</Text>
        <View style={styles.nameSurname}>
          <Text style={styles.labelInfo}>{regularUser.name} </Text>
          <Text style={styles.labelInfo}>{regularUser.surname}</Text>
        </View>

        <Text style={styles.labelTitle}>Fecha de nacimiento</Text>
        <Text style={styles.labelInfo}>
          {new Date(regularUser.dateOfBirth).getDate()} /{" "}
          {new Date(regularUser.dateOfBirth).getMonth() + 1} /{" "}
          {new Date(regularUser.dateOfBirth).getFullYear()}{" "}
        </Text>

        <Text style={styles.labelTitle}>Edad</Text>
        <Text style={styles.labelInfo}>{regularUser.age}</Text>

        <Text style={styles.labelTitle}>Teléfono</Text>
        <Text style={styles.labelInfo}>{regularUser.phoneNumber}</Text>

        <Text style={styles.labelTitle}>Correo Electrónico</Text>
        <Text style={styles.labelInfo}>{regularUser.email}</Text>

        <Text style={styles.labelTitle}>Sexo</Text>
        <Text style={styles.labelInfo}>{regularUser.sex}</Text>

        <TouchableOpacity style={styles.updateButton} onPress={() => onEdit()}>
          <Text style={styles.updateButtonText}>Editar Pérfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("AddEntrepreneurUser")}
        >
          <Text style={styles.updateButtonText}>Subir a emprendedor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("AddCompanyUser")}
        >
          <Text style={styles.updateButtonText}>Subir a empresa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("AddAdminUser")}
        >
          <Text style={styles.updateButtonText}>
            Agregar usuario Administrador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("MembershipPayment")}
        >
          <Text style={styles.updateButtonText}>
            Pagar Membresía
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegularUserProfile;
