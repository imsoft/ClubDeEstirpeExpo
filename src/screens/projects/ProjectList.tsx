import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { styles } from "../../theme/appTheme";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<any, any> {}

const ProjectList = ({ navigation }: Props) => {
  const [entrepreneurUserList, setEntrepreneurUserList] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const querySnapshot = await getDocs(
      collection(FirebaseDB, "entrepreneurUser")
    );
    querySnapshot.forEach((doc) => {
      setEntrepreneurUserList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().entrepreneurUser.image,
          role: doc.data().entrepreneurUser.role,
          size: doc.data().entrepreneurUser.size,
          experience: doc.data().entrepreneurUser.experience,
          employeeNumber: doc.data().entrepreneurUser.employeeNumber,
          amountToRequest: doc.data().entrepreneurUser.amountToRequest,
          documents: doc.data().entrepreneurUser.documents,
          renders: doc.data().entrepreneurUser.renders,
          ubication: doc.data().entrepreneurUser.ubication,
          executiveIdea: doc.data().entrepreneurUser.executiveIdea,
          investmentStatus: doc.data().entrepreneurUser.investmentStatus,
        }))
      );
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* {regularUserList.map((regularUser: any) => (
          <RegularUserCard key={regularUser.id} {...regularUser} />
        ))} */}
        {entrepreneurUserList.map((entrepreneurUser: any) => (
          <Card style={styles.card} key={entrepreneurUser.id}>
            <Card.Cover
              style={{ marginTop: 15 }}
              source={{ uri: `${entrepreneurUser.image}` }}
            />
            <Card.Content style={{ marginTop: 15 }}>
              <Title>Giro</Title>
              <Paragraph>{entrepreneurUser.role} </Paragraph>
              <Title>Tamaño</Title>
              <Paragraph>{entrepreneurUser.size} </Paragraph>
              <Title>Experiencia</Title>
              <Paragraph>{entrepreneurUser.experience} </Paragraph>
              <Title>Número de empleados</Title>
              <Paragraph>{entrepreneurUser.employeeNumber} </Paragraph>
              <Title>Cantidad a pedir</Title>
              <Paragraph>{entrepreneurUser.amountToRequest} </Paragraph>
              <Title>Documentos</Title>
              <Paragraph>{entrepreneurUser.documents} </Paragraph>
              <Title>Render</Title>
              <Paragraph>{entrepreneurUser.renders} </Paragraph>
              <Title>Ubicación</Title>
              <Paragraph>{entrepreneurUser.ubication} </Paragraph>
              <Title>Idea Ejecutiva</Title>
              <Paragraph>{entrepreneurUser.executiveIdea} </Paragraph>
              <Title>Estado de la inversión</Title>
              <Paragraph>{entrepreneurUser.investmentStatus} </Paragraph>
            </Card.Content>

            <Card.Actions>
              <Button
                color="blue"
                onPress={() =>
                  navigation.navigate("EntrepreneurUserProfile", {
                    id: entrepreneurUser.id,
                  })
                }
              >
                Ver Pérfil
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectList;