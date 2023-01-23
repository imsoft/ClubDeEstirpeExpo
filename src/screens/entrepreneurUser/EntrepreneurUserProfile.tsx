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
import { FirebaseDB, FirebaseAuth } from "../../firebase/config";
import { EntrepreneurUser } from "../../interfaces";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const EntrepreneurUserProfile = ({ navigation, route }: Props) => {
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
    navigation.navigate("login");
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [entrepreneurUser, setEntrepreneurUser] = useState<EntrepreneurUser>({
    image: "",
    curriculumProfesional: "",
    creditBureauOpinion: "",
    personalReference: "",
    email: "",
    password: "",
    project: {
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
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const docRef = doc(FirebaseDB, "entrepreneurUser", user.uid);
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
        },
      });
    } else {
      console.log("No such document!");
    }
  };

  const onEdit = () => {
    navigation.navigate("UpdateEntrepreneurUser", {
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
            source={{ uri: entrepreneurUser.image }}
          />
        </View>

        <Text style={styles.labelTitle}>ID</Text>
        <Text style={styles.labelInfo}>{user.uid}</Text>

        <Text style={styles.labelTitle}>Curriculum Profesional</Text>
        <Text style={styles.labelInfo}>
          {entrepreneurUser.curriculumProfesional}
        </Text>

        <Text style={styles.labelTitle}>Opinion de Buro de Crédito</Text>
        <Text style={styles.labelInfo}>
          {entrepreneurUser.creditBureauOpinion}
        </Text>

        <Text style={styles.labelTitle}>Referencias Personales</Text>
        <Text style={styles.labelInfo}>
          {entrepreneurUser.personalReference}
        </Text>

        <Text style={styles.labelTitle}>E-mail</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.email}</Text>

        <TouchableOpacity style={styles.updateButton} onPress={() => onEdit()}>
          <Text style={styles.updateButtonText}>Editar Pérfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("AddProject", {
            id: user.uid
          })}
        >
          <Text style={styles.updateButtonText}>Subir un proyecto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("MembershipPayment")}
        >
          <Text style={styles.updateButtonText}>Membresía</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EntrepreneurUserProfile;
