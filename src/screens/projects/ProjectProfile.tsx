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
import { Project } from "../../interfaces";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const ProjectProfile = ({ navigation, route }: Props) => {
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
  const [entrepreneurUser, setEntrepreneurUser] = useState<Project>({
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
        role: docSnap.data().entrepreneurUser.role,
        size: docSnap.data().entrepreneurUser.size,
        experience: docSnap.data().entrepreneurUser.experience,
        employeeNumber: docSnap.data().entrepreneurUser.employeeNumber,
        amountToRequest: docSnap.data().entrepreneurUser.amountToRequest,
        documents: docSnap.data().entrepreneurUser.documents,
        renders: docSnap.data().entrepreneurUser.renders,
        ubication: docSnap.data().entrepreneurUser.ubication,
        executiveIdea: docSnap.data().entrepreneurUser.executiveIdea,
        investmentStatus: docSnap.data().entrepreneurUser.investmentStatus,
      });
    } else {
      console.log("No such document!");
    }
  };

  const onEdit = () => {
    navigation.navigate("UpdateProject", {
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

        <Text style={styles.labelTitle}>Giro</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.role}</Text>

        <Text style={styles.labelTitle}>Tamaño</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.size}</Text>

        <Text style={styles.labelTitle}>Experiencia</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.experience}</Text>

        <Text style={styles.labelTitle}>Número de empleados</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.employeeNumber}</Text>

        <Text style={styles.labelTitle}>Monto a solicitar</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.amountToRequest}</Text>

        <Text style={styles.labelTitle}>Documentos</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.documents}</Text>

        <Text style={styles.labelTitle}>Ubicación</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.ubication}</Text>

        <Text style={styles.labelTitle}>Idea ejecutiva</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.executiveIdea}</Text>

        <Text style={styles.labelTitle}>Estado de la inversión</Text>
        <Text style={styles.labelInfo}>
          {entrepreneurUser.investmentStatus}
        </Text>

        <Text style={styles.labelTitle}>Renders</Text>
        <Text style={styles.labelInfo}>{entrepreneurUser.renders}</Text>

        <TouchableOpacity style={styles.updateButton} onPress={() => onEdit()}>
          <Text style={styles.updateButtonText}>Editar Pérfil</Text>
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

export default ProjectProfile;
