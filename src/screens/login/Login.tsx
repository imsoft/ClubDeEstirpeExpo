import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "../../theme/appTheme";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends StackScreenProps<any, any> {}

const Login = ({ navigation }: Props) => {
  const [inputEmail, setInputEmail] = useState("bugr.2487@gmail.com");
  const [inputPassword, setInputPassword] = useState("garb9703155za");

  const onTextFieldChangeEmail = (value: string) => {
    setInputEmail(value);
  };

  const onTextFieldChangePassword = (value: string) => {
    setInputPassword(value);
  };

  // const handleCreateAccount = () => {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
  //     .then((userCredential) => {
  //       console.log("Account created!");
  //       const user = userCredential.user;
  //       navigation.navigate("Login");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       Alert.alert(errorMessage);
  //     });
  // };

  const handleSingIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Tabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
    resetForm();
  };

  const resetForm = () => {
    setInputEmail("");
    setInputPassword("");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.globalMargin}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.clubDeEstirpeImage}
                  source={{
                    uri: "data:image/png;base64,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",
                  }}
                />
              </View>

              <Text style={styles.inputTitle}>Correo Electrónico</Text>
              <TextInput
                style={styles.inputText}
                onChangeText={onTextFieldChangeEmail}
                value={inputEmail}
                keyboardType="email-address"
              />

              <Text style={styles.inputTitle}>Contraseña</Text>
              <TextInput
                style={styles.inputText}
                secureTextEntry={true}
                onChangeText={onTextFieldChangePassword}
                value={inputPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handleSingIn}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <Text style={styles.label}>¿aún no tienes cuenta?</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("AddRegularUser")}
              >
                <Text style={styles.buttonText}>Registrate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("GuestUser")}
              >
                <Text style={styles.buttonText}>Entrar como invitado</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
