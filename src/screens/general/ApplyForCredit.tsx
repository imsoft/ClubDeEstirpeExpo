import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../theme/appTheme";

const ApplyForCredit = () => {
  const [investment, setInvestment] = useState("");

  const onTextFieldChangeInvestment = (value: string) => {
    setInvestment(value);
  };

  const reset = () => {
    setInvestment("");
  };

  return (
    <View style={styles.globalMargin}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageCreditCard}
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/09/18/08/56/credit-card-2761073_960_720.png",
          }}
        />
      </View>

      <View style={{ marginVertical: 10 }}></View>

      <Text style={styles.inputTitle}>
        Nombre del emprendedor(a): Ximena Castro
      </Text>
      <Text style={styles.inputTitle}>Emprendimiento: Dulcería Castro</Text>

      <View style={{ marginVertical: 10 }}></View>

      <Text style={styles.inputTitle}>Cantidad del crédito a solicitar:</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={onTextFieldChangeInvestment}
        value={investment}
      />

      <View style={{ marginVertical: 10 }}></View>

      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.buttonText}>Solictar crédito</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApplyForCredit;
