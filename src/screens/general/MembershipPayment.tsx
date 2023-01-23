import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../theme/appTheme";

const MembershipPayment = () => {
  const [name, setNombre] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCvv] = useState("");

  const onTextFieldChangeNombre = (value: string) => {
    setNombre(value);
  };

  const onTextFieldChangeCardNumber = (value: string) => {
    setCardNumber(value);
  };

  const onTextFieldChangeExpirationMonth = (value: string) => {
    setExpirationMonth(value);
  };

  const onTextFieldChangeExpirationYear = (value: string) => {
    setExpirationYear(value);
  };

  const onTextFieldChangeCvv = (value: string) => {
    setCvv(value);
  };

  const reset = () => {
    setNombre("");
    setCardNumber("");
    setExpirationMonth("");
    setExpirationYear("");
    setCvv("");
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageCreditCard}
              source={{
                uri: "https://cdn.pixabay.com/photo/2017/09/18/08/56/credit-card-2761073_960_720.png",
              }}
            />
          </View>

          <Text style={styles.inputTitle}>Nombre</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeNombre}
            value={name}
          />

          <Text style={styles.inputTitle}>Número de tarjeta</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeCardNumber}
            value={cardNumber}
            keyboardType="numeric"
          />

          <Text style={styles.inputTitle}>Fecha de vencimiento</Text>
          <View style={styles.expirationMonthYear}>
            <TextInput
              style={styles.inputText}
              onChangeText={onTextFieldChangeExpirationMonth}
              value={expirationMonth}
              keyboardType="numeric"
              maxLength={2}
            />
            <Text style={styles.inputTitle}> / </Text>
            <TextInput
              style={styles.inputText}
              onChangeText={onTextFieldChangeExpirationYear}
              value={expirationYear}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          <Text style={styles.inputTitle}>CVV</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={onTextFieldChangeCvv}
            value={cvv}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={reset}>
            <Text style={styles.buttonText}>Realizar pago</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default MembershipPayment;
