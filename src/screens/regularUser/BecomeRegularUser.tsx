import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const BecomeRegularUser = ({ navigation }: Props) => {
  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.fondoAmarillo}>
            <Text style={styles.title}>¿Quiénes somos?</Text>
          </View>
          <Text style={styles.labelInfo}>
            Club de estirpe nace de la inquietud por ayudar a emprendedores a
            desarrollarse y guiarlos para reducir las curvas de aprendizaje que
            conlleva cualquier negocio. El concepto resumido, es que el
            emprendedor se dedique a pensar en lo que realmente sabe hacer y
            optimice sus recursos sin desgastarse en atender temas de su negocio
            ajenos a su talento.
          </Text>
          <View style={styles.fondoAmarillo}>
            <Text style={styles.title}>
              Atendemos principalmente dos necesidades sociales:
            </Text>
          </View>
          <Text style={styles.labelInfo}>
            Falta de oportunidades para integración de los jóvenes recién
            egresados de la universidad al campo laboral en trabajos dignos y
            correspondientes a sus habilidades y áreas de estudio. Falta de
            bases sólidas para el desarrollo de emprendedores y PyMES en
            cuestión financiera y de contexto empresarial.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddRegularUser")}
          >
            <Text style={styles.buttonText}>
              Registrarse como usuario regular
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default BecomeRegularUser;
