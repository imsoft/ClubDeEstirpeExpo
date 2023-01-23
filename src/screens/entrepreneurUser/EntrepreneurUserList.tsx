import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { styles } from "../../theme/appTheme";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<any, any> {}

const EntrepreneurUsersList = ({ navigation }: Props) => {
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
          curriculumProfesional:
            doc.data().entrepreneurUser.curriculumProfesional,
          creditBureauOpinion: doc.data().entrepreneurUser.creditBureauOpinion,
          personalReference: doc.data().entrepreneurUser.personalReference,
          email: doc.data().entrepreneurUser.email,
          password: doc.data().entrepreneurUser.password,
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
              <Title>Curriculum Profesional</Title>
              <Paragraph>{entrepreneurUser.curriculumProfesional}</Paragraph>
              <Title>Opinion de Buro de Crédito</Title>
              <Paragraph>{entrepreneurUser.creditBureauOpinion}</Paragraph>
              <Title>Referencias Personales</Title>
              <Paragraph>{entrepreneurUser.personalReference}</Paragraph>
              <Title>E-mail</Title>
              <Paragraph>{entrepreneurUser.email}</Paragraph>
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

export default EntrepreneurUsersList;
