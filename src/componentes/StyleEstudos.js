import { StyleSheet } from "react-native";

export const estudos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  container1: {
    width: "100%",
    height: "70%",
    flex: 5,
    alignItems: "center",
  },
  container2: {
    width: "70%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    bottom: 50,
  },
  container3: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 322,
    right: 15,
  },
  container4: {
    width: "40%",  
  },
  stop: {
    width: 55,
    height: 55,
    backgroundColor: "#237ddb",
    borderRadius: 27.5,
    alignItems: "center",
    justifyContent: "center",
    // margin: 10,
  },
  play: {
    width: 95,
    height: 95,
    backgroundColor: "#237ddb",
    borderRadius: 47.5,
    //alignItems: "center",
    justifyContent: "center",
    // margin: 10,
  },
  pause: {
    width: 55,
    height: 55,
    backgroundColor: "#237ddb",
    borderRadius: 27.5,
    alignItems: "center",
    justifyContent: "center",
    //margin: 10,
  },
});
