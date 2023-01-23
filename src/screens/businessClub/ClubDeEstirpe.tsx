import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { List } from "react-native-paper";
import { styles } from "../../theme/appTheme";

interface Props extends StackScreenProps<any, any> {}

const ClubDeEstirpe = ({ navigation }: Props) => {
  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={styles.globalMargin}>
          <View style={styles.fondoAmarillo}>
            <Text style={styles.title}>Club empresarial</Text>
          </View>
          <Text style={styles.labelInfo}>
            Como parte del club tienes acceso a todas las áreas de la
            plataforma:
          </Text>

          <List.Item
            title="Capacitación"
            left={(props) => <List.Icon {...props} icon="school-outline" />}
          />

          <List.Item
            title="Soporte para empresas"
            left={(props) => <List.Icon {...props} icon="storefront-outline" />}
          />

          <List.Item
            title="Inversiones"
            left={(props) => <List.Icon {...props} icon="pulse" />}
          />

          <List.Item
            title="Eventos"
            left={(props) => <List.Icon {...props} icon="balloon" />}
          />

          <List.Item
            title="Coworking"
            left={(props) => <List.Icon {...props} icon="network-outline" />}
          />

          <View style={styles.fondoAmarillo}>
            <Text style={styles.title}>Beneficios Club Empresarial</Text>
          </View>

          <Text style={styles.labelInfo}>
            En club de estirpe buscamos incrementar el volumen de ventas de
            nuestra red de empresas en conjunto. Aquí podrás encontrar
            herramientas y beneficios importantes para incrementar las ventas de
            tu negocio.
          </Text>

          <List.Item
            title="Negocio entre miembros de la red de empresas"
            left={(props) => <List.Icon {...props} icon="check" />}
          />

          <List.Item
            title="Promociones cruzadas"
            left={(props) => <List.Icon {...props} icon="check" />}
          />

          <List.Item
            title="Colaboraciones conjuntas"
            left={(props) => <List.Icon {...props} icon="check" />}
          />

          <List.Item
            title="Crédito"
            left={(props) => <List.Icon {...props} icon="check" />}
          />

          <List.Item
            title="Referenciass / Recomendaciones"
            left={(props) => <List.Icon {...props} icon="check" />}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("BussinessClub")}
          >
            <Text style={styles.buttonText}>¡Empecemos!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default ClubDeEstirpe;
