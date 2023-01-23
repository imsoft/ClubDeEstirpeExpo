import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { styles } from '../../theme/appTheme';

const infoCards: any[] = [
  {
    companyName: 'Starbucks',
    benefit:
      'Ven a provar nuestros nuevos sabores antes que nadie',
    img: 'https://images.unsplash.com/photo-1548364538-60b952c308b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    companyName: 'Nike',
    benefit:
      'Obten un 20% en los nuevos NIKE 3000 Plus',
    img: 'https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    companyName: 'Virgin',
    benefit:
      'Ver por el nuevo IPhone 14 este Lunes',
    img: 'https://images.unsplash.com/photo-1523728778454-06bedf489d10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    companyName: 'RedBull',
    benefit:
      'Vive la emoción de la siguiente Batalla de los gallos con nosotros.',
    img: 'https://images.unsplash.com/photo-1617727553252-65863c156eb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    companyName: 'Nutella',
    benefit:
      '¿Compartirmos con Nutella?',
    img: 'https://images.unsplash.com/photo-1519420573924-65fcd45245f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  },
];

const NetworkBenefits = () => {
  return (
    <ScrollView>
      <View style={styles.globalMargin}>
        {infoCards.map(info => (
          <Card style={styles.card} key={info.companyName}>
            <Card.Content>
              <Title>{info.companyName}</Title>
              <Paragraph>{info.benefit}</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: `${info.img}`}} />
            <Card.Actions>
              <Button color="green">Ver más</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default NetworkBenefits;