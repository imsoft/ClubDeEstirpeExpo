import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FirebaseDB } from "../../firebase/config";
import { styles } from "../../theme/appTheme";

const RegularUserCard = ({
  id,
  image,
  name,
  surname,
  dateFormat,
  age,
  phoneNumber,
  email,
  sex,
}: any) => {
  const onEdit = () => {
    const docRef = doc(FirebaseDB, "regularUser", id);
  };

  const onDelete = () => {
    const docRef = doc(FirebaseDB, "regularUser", id);
    deleteDoc(docRef);
  };

  return (
    <SafeAreaView>
      <ScrollView>
          <Card style={styles.card} key={id}>
            <Card.Content>
              <Title>{id}</Title>
              <Title>{name}</Title>
              <Title>{surname}</Title>
              <Title>{dateFormat}</Title>
              <Title>{age}</Title>
              <Title>{phoneNumber}</Title>
              <Title>{email}</Title>
              <Title>{sex}</Title>
            </Card.Content>
            {/* <Card.Cover source={{ uri: `${image}` }} /> */}
            <Card.Actions>
              <Button color="green">Ver más</Button>
              <Button
                onPress={() => {
                  onDelete;
                }}
                color="red"
              >
                Eliminar
              </Button>
              <Button
                onPress={() => {
                  onEdit;
                }}
                color="blue"
              >
                Editar
              </Button>
            </Card.Actions>
          </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegularUserCard;
