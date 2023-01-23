import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../theme/appTheme';

const EntrepeneurInvestments = () => {
  const [investment, setInvestment] = useState('');

  const reset = () => {
    setInvestment('');
  };

  return (
    <View style={styles.globalMargin}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageRadius}
          source={{
            uri: 'https://images.unsplash.com/photo-1601493701002-3223e7e1ebaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          }}
        />
      </View>

      <View style={{ marginVertical: 10 }}></View>

      <Text style={styles.inputTitle}>
        Nombre del emprendedor(a): Ximena Castro
      </Text>
      <Text style={styles.inputTitle}>Emprendimiento: Dulcería Castro</Text>

      <View style={{ marginVertical: 10 }}></View>
      
      <Text style={styles.inputTitle}>Cantidad de la Inversión</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={setInvestment}
        value={investment}
      />

      <View style={{ marginVertical: 10 }}></View>

      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.buttonText}>Realizar inversión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EntrepeneurInvestments;