import { StyleSheet } from "react-native";

export const colores = {
  primary: "#FEEB3B",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  globalMargin: {
    marginHorizontal: 20,
  },
  label: {
    color: "#2A2A2A",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FEEB3B",
    padding: 10,
    marginVertical: 30,
    borderRadius: 10,
  },
  datePicker: {
    alignItems: "center",
    justifyContent: "center",
    color: "#2A2A2A",
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#2A2A2A",
    fontSize: 18,
  },
  inputTitle: {
    marginTop: 20,
    fontSize: 18,
  },
  inputText: {
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
  radioText: {
    fontSize: 16,
    marginTop: 6,
  },
  radioOption: {
    flexDirection: "row",
  },
  clubDeEstirpeImage: {
    width: 250,
    height: 250,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageCreditCard: {
    marginTop: 5,
    width: 200,
    height: 200,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginVertical: 20,
  },
  imageRadius: {
    marginTop: 5,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  profileLabelTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  gallery: {
    display: "flex",
  },
  labelTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  labelInfo: {
    marginTop: 15,
    fontSize: 16,
  },
  profileImage: {
    marginTop: 15,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  updateButton: {
    alignItems: "center",
    backgroundColor: "#79CC28",
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  updateButtonText: {
    color: "#2A2A2A",
    fontSize: 18,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#DF3A01",
    padding: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginHorizontal: 20,
  },
  buttonClose: {
    backgroundColor: "#79CC28",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  nameSurname: {
    display: "flex",
    flexDirection: "row",
  },
  expirationMonthYear: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    justifyContent: "center",
  },
  fondoAmarillo: {
    marginTop: 20,
    backgroundColor: colores.primary,
    borderRadius: 10,
  },
  imagesGallery: {
    marginTop: 15,
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
});
