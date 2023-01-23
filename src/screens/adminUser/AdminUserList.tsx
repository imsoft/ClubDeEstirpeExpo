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

const AdminUsersList = ({ navigation }: Props) => {
  const [adminUserList, setAdminUserList] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(FirebaseDB, "adminUser"));
    querySnapshot.forEach((doc) => {
      setAdminUserList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().adminUser.image,
          name: doc.data().adminUser.name,
          surname: doc.data().adminUser.surname,
          positionInTheCompany: doc.data().adminUser.positionInTheCompany,
          phoneNumber: doc.data().adminUser.phoneNumber,
          email: doc.data().adminUser.email,
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
        {adminUserList.map((adminUser: any) => (
          <Card style={styles.card} key={adminUser.id}>
            <Card.Cover
              style={{ marginTop: 15 }}
              source={{ uri: `${adminUser.image}` }}
            />
            <Card.Content style={{ marginTop: 15 }}>
              <Title>Nombre</Title>
              <View style={styles.nameSurname}>
                <Paragraph>{adminUser.name} </Paragraph>
                <Paragraph>{adminUser.surname}</Paragraph>
              </View>

              <View style={styles.nameSurname}>
                <View>
                  <Title>Número de teléfono</Title>
                  <Paragraph>{adminUser.phoneNumber}</Paragraph>
                  <Title>Correo Electrónico</Title>
                  <Paragraph>{adminUser.email}</Paragraph>
                </View>

                <View style={{ marginLeft: 50 }}>
                  <Title>Posición en la compañia</Title>
                  <Paragraph>{adminUser.positionInTheCompany}</Paragraph>
                </View>
              </View>
            </Card.Content>

            <Card.Actions>
              <Button
                color="blue"
                onPress={() =>
                  navigation.navigate("AdminUserProfile", {
                    id: adminUser.id,
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

export default AdminUsersList;
