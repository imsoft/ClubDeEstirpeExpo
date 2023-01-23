import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { styles } from "../../theme/appTheme";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<any, any> {}

const RegularUsersList = ({ navigation }: Props) => {
  const [regularUserList, setRegularUserList] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(FirebaseDB, "regularUser"));
    querySnapshot.forEach((doc) => {
      setRegularUserList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().regularUser.image,
          name: doc.data().regularUser.name,
          surname: doc.data().regularUser.surname,
          dateOfBirth: new Date(
            doc.data().regularUser.dateOfBirth.seconds * 1000
          ),
          age: doc.data().regularUser.age,
          phoneNumber: doc.data().regularUser.phoneNumber,
          email: doc.data().regularUser.email,
          sex: doc.data().regularUser.sex,
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
        {regularUserList.map((regularUser: any) => (
          <Card style={styles.card} key={regularUser.id}>
            <Card.Cover
              style={{ marginTop: 15 }}
              source={{ uri: `${regularUser.image}` }}
            />
            <Card.Content style={{ marginTop: 15 }}>
              <Title>Nombre</Title>
              <View style={styles.nameSurname}>
                <Paragraph>{regularUser.name} </Paragraph>
                <Paragraph>{regularUser.surname}</Paragraph>
              </View>

              <Title>Fecha de nacimiento</Title>
              <Paragraph>
                {new Date(regularUser.dateOfBirth).getDate()} /{" "}
                {new Date(regularUser.dateOfBirth).getMonth() + 1} /{" "}
                {new Date(regularUser.dateOfBirth).getFullYear()}{" "}
              </Paragraph>

              <View style={styles.nameSurname}>
                <View>
                  <Title>Número de teléfono</Title>
                  <Paragraph>{regularUser.phoneNumber}</Paragraph>
                  <Title>Correo Electrónico</Title>
                  <Paragraph>{regularUser.email}</Paragraph>
                </View>

                <View style={{ marginLeft: 50 }}>
                  <Title>Edad</Title>
                  <Paragraph>{regularUser.age}</Paragraph>
                  <Title>Sexo</Title>
                  <Paragraph>{regularUser.sex}</Paragraph>
                </View>
              </View>
            </Card.Content>

            <Card.Actions>
              <Button
                color="blue"
                onPress={() =>
                  navigation.navigate("RegularUserProfile", {
                    id: regularUser.id,
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

export default RegularUsersList;
