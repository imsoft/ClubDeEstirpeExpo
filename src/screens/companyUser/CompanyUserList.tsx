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

const CompanyUsersList = ({ navigation }: Props) => {
  const [companyUserList, setCompanyUserList] = useState<any>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(FirebaseDB, "companyUser"));
    querySnapshot.forEach((doc) => {
      setCompanyUserList(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().companyUser.image,
          companyName: doc.data().companyUser.companyName,
          role: doc.data().companyUser.role,
          phoneNumber: doc.data().companyUser.phoneNumber,
          address: doc.data().companyUser.address,
          postalCode: doc.data().companyUser.postalCode,
          state: doc.data().companyUser.state,
          city: doc.data().companyUser.city,
          description: doc.data().companyUser.description,
          youtubeLink: doc.data().companyUser.youtubeLink,
          images: doc.data().companyUser.images,
          promotions: doc.data().companyUser.promotions,
          discounts: doc.data().companyUser.discounts,
          googleMapsLink: doc.data().companyUser.googleMapsLink,
          email: doc.data().companyUser.email,
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
        {companyUserList.map((companyUser: any) => (
          <Card style={styles.card} key={companyUser.id}>
            <Card.Cover
              style={{ marginTop: 15 }}
              source={{ uri: `${companyUser.image}` }}
            />
            <Card.Content style={{ marginTop: 15 }}>
              <Title>Nombre de la empresa</Title>
              <Paragraph>{companyUser.companyName} </Paragraph>
              <Title>Giro de la empresa</Title>
              <Paragraph>{companyUser.role} </Paragraph>
              <Title>Número de teléfono</Title>
              <Paragraph>{companyUser.phoneNumber} </Paragraph>
              <Title>Dirección</Title>
              <Paragraph>{companyUser.address} </Paragraph>
              <Title>Código Postal</Title>
              <Paragraph>{companyUser.postalCode} </Paragraph>
              <Title>Estado</Title>
              <Paragraph>{companyUser.state} </Paragraph>
              <Title>Ciudad</Title>
              <Paragraph>{companyUser.city} </Paragraph>
              <Title>Descripción</Title>
              <Paragraph>{companyUser.description} </Paragraph>
              <Title>Enlace a Youtube</Title>
              <Paragraph>{companyUser.youtubeLink} </Paragraph>
              <Title>Imagenes</Title>
              <Paragraph>{companyUser.images} </Paragraph>
              <Title>Promociones</Title>
              <Paragraph>{companyUser.promotions} </Paragraph>
              <Title>Descuentos</Title>
              <Paragraph>{companyUser.discounts} </Paragraph>
              <Title>Enlace a Google Maps</Title>
              <Paragraph>{companyUser.googleMapsLink} </Paragraph>
              <Title>Correo Electrónico</Title>
              <Paragraph>{companyUser.email} </Paragraph>
            </Card.Content>

            <Card.Actions>
              <Button
                color="blue"
                onPress={() =>
                  navigation.navigate("CompanyUserProfile", {
                    id: companyUser.id,
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

export default CompanyUsersList;
