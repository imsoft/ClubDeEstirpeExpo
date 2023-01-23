import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Paragraph, Title, Button} from 'react-native-paper';
import {styles} from '../../theme/appTheme';

const infoCards: any[] = [
  {
    companyName: '¿Cómo iniciar a emprender?',
    benefit:
      'Te llevaremos de la mano a como iniciar en el mundo del emprendimiento.',
    img: 'https://images.unsplash.com/photo-1562071707-7249ab429b2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    companyName: '¿Cómo registrar tu marca ante el IMPI?',
    benefit:
      'Con la ayuda de nuestros expertos tu saldras con tu marca registrada en el IMPI.',
    img: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    companyName: 'Los 5 tips para empresas',
    benefit:
      'Estos tips te ayudarana que tu empresa pase al siguiente nivel.',
    img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    companyName: 'El dinero es tu mejor amigo',
    benefit:
      'Es hora de empezar a tener otro tipo de relación con tu dinero.',
    img: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
  {
    companyName: 'La mejor empresa del mundo',
    benefit:
      'Tendremos un gran invitado y horador que nos contará todos los por menores para poder estar donde esta.',
    img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
];

const ExclusiveContent = () => {
  return (
    <ScrollView>
      <View style={styles.globalMargin}>
        {infoCards.map(info => (
          <Card style={styles.card} key={info.companyName}>
            <Card.Content>
              <Title>{info.companyName}</Title>
              <Paragraph>{info.benefit}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: `${info.img}` }} />
            <Card.Actions>
              <Button color='green'>Ver más</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExclusiveContent;