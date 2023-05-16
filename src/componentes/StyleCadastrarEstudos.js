import { StyleSheet } from "react-native";

export const cadastrarEstudos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container1: {
    width:"100%",
    height:"34%",
    alignItems: "center",
  },
  container2: {
    width:"70%",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  scroll: {
    flex: 3,
    width: "70%",
    heigth: "40",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRightColor: `#dcdcdc`,
    borderLeftColor: `#dcdcdc`,
    Bottom: 20,
  },
  scrollOptions: {
    width: "45%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginLeft: 10,
  },
  sliderHora: {
    width: 300,
    height: 30,
    marginBottom: 10,    
    position: "relative",
  },
  sliderMinuto: {
    width: 300,
    height: 30,
  },
  buttonEstudar: {
    width: "80%",
    height: "9%",
    backgroundColor: `#8CC8EF`,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 12,
    position: "relative",
    bottom: 20,
  },

});
