import {
  View,  
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import Svg, { Circle, Ellipse } from "react-native-svg";
import * as Font from "expo-font";
import {cadastrarEstudos } from "./StyleCadastrarEstudos";

export default function CadastrarEstudo() {
  const navigation = useNavigation();
  const [painelMateria, setPainelMateria] = useState();
  const [painelHora, setPainelHora] = useState();
  const [painelMinuto, setPainelMinuto] = useState();
  const [zero, setZero] = useState();
  const [zeroM, setZeroM] = useState();
  const [imagem, setImagem] = useState();
  const [fontesCarregadas, setFontesCarregadas] = useState(false);

  async function carregarFontes() {
    await Font.loadAsync({
      "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
      "Quicksand-Light": require("../../assets/fonts/Quicksand-Light.ttf"),
      "Quicksand-Medium": require("../../assets/fonts/Quicksand-Medium.ttf"),
    });
    setFontesCarregadas(true);
  }
  useEffect(() => {
    carregarFontes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // O foco saiu da tela        
        setPainelMateria("");
        setPainelHora(0);
        setPainelMinuto(0);
        setZero(null);
        setZeroM(null);
        setImagem(null);
      };
    }, [])
  );

  const tempoDeEstudo = () => {
    if ((painelHora || painelMinuto) && painelMateria) {
      navigation.navigate("Estudar", {
        tempoH: painelHora,
        tempoM: painelMinuto,
        materia: painelMateria,
        imagem: imagem,
      });
    } else if (!painelMateria) {
      alert("Qual a matéria?");
    } else if (painelHora == 0 && painelMinuto == 0) {
      alert("Quanto tempo de estudo?");
      return;
    }
  };

  function painelH(item) {
    setPainelHora(item);
    if (painelHora < 9) {
      setZero(0);
    } else if (painelHora > 9) {
      setZero("");
    }
  }

  function painelM(item) {
    setPainelMinuto(item);
    if (painelMinuto < 9) {
      setZeroM(0);
    } else if (painelMinuto > 9) {
      setZeroM("");
    }
  }

  return (
    <SafeAreaView style={cadastrarEstudos.container}>
      <StatusBar />
      <Image
        source={imagem}
        style={{
          resizeMode: "contain",
          position: "absolute",
          width: "120%",
          height: "110%",
        }}
      />
      <Svg
        width="100%"
        height="27%"
        style={{
          top: 0,
          left: 0,
          zIndex: 1,
          position: "relative",
        }}
      >
        <Circle cx="15" cy="80  " r="110" fill="#159FFB" />
        <Ellipse
          cx="120"
          rx="100"
          cy="25"
          ry="115"
          r="120"          
          strokeWidth="1"
          fill="#237ddb"
        />
      </Svg>

      <Text
        style={{
          fontSize: 20,
          color: `#1E5EC4`,
          bottom: 30,
          fontFamily: "Quicksand-Bold",
        }}
      >
        Escolha sua materia
      </Text>
      <ScrollView
        style={cadastrarEstudos.scroll}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <TouchableOpacity
          style={cadastrarEstudos.scrollOptions}
          onPress={() => {
            setPainelMateria("Matemática");
            setImagem(require("../../assets/Imagens/matematica.jpg"));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#282C34",
              fontFamily: "Quicksand-Bold",
            }}
          >
            Matemática
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cadastrarEstudos.scrollOptions}
          onPress={() => {
            setPainelMateria("Português");
            setImagem(require("../../assets/Imagens/portugues.jpg"));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#282C34",
              fontFamily: "Quicksand-Bold",
            }}
          >
            Português
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cadastrarEstudos.scrollOptions}
          onPress={() => {
            setPainelMateria("História");
            setImagem(require("../../assets/Imagens/historia.jpg"));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#282C34",
              fontFamily: "Quicksand-Bold",
            }}
          >
            História
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cadastrarEstudos.scrollOptions}
          onPress={() => {
            setPainelMateria("Geografia");
            setImagem(require("../../assets/Imagens/geografia.jpg"));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#282C34",
              fontFamily: "Quicksand-Bold",
            }}
          >
            Geografia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cadastrarEstudos.scrollOptions}
          onPress={() => {
            setPainelMateria("Ciências");
            setImagem(require("../../assets/Imagens/ciencias.jpg"));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#282C34",
              fontFamily: "Quicksand-Bold",
            }}
          >
            Ciências
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cadastrarEstudos.scrollOptions}
          onPress={() => {
            setPainelMateria("Tecnologia");
            setImagem(require("../../assets/Imagens/tecnologia.jpg"));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#282C34",
              fontFamily: "Quicksand-Bold",
            }}
          >
            Tecnologia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cadastrarEstudos.scrollOptions}
          onPress={() => {
            setPainelMateria("Acadêmico");
            setImagem(require("../../assets/Imagens/academico.jpg"));
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#282C34",
              fontFamily: "Quicksand-Bold",
            }}
          >
            Acadêmico
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={cadastrarEstudos.container1}>
        <Text
          style={{
            fontSize: 25,
            color: `#1E5EC4`,
            marginTop: 25,
            fontFamily: "Quicksand-Bold",
          }}
        >
          {painelMateria}
        </Text>

        <Text
          style={{
            fontSize: 25,
            color: `#1E5EC4`,
            marginTop: 5,
            fontFamily: "Quicksand-Medium",
          }}
        >
          {zero}
          {painelHora}:{zeroM}
          {painelMinuto}
        </Text>
        <View style={cadastrarEstudos.container2}>
          <Text
            style={{
              fontSize: 15,
              color: `#1E5EC4`,
              fontFamily: "Quicksand-Bold",
            }}
          >
            Horas
          </Text>
        </View>
        <Slider
          style={cadastrarEstudos.sliderHora}
          minimumValue={0}
          maximumValue={12}
          value={painelHora}
          onValueChange={painelH}
          step={1}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="black"
          thumbStyle={{}}
          trackStyle={{ height: 50, borderRadius: 5 }}
        />
        <View width="70%" style={{ justifyContent: "flex-start" }}>
          <Text
            style={{
              fontSize: 15,
              color: `#1E5EC4`,
              fontFamily: "Quicksand-Bold",
            }}
          >
            Minutos
          </Text>
        </View>
        <Slider
          style={cadastrarEstudos.sliderMinuto}
          minimumValue={0}
          maximumValue={55}
          value={painelMinuto}
          onValueChange={painelM}
          step={5}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="black"
          thumbStyle={{ width: 50, height: 20, borderRadius: 10 }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          tempoDeEstudo();
        }}
        style={cadastrarEstudos.buttonEstudar}
      >
        <Text
          style={{
            fontSize: 25,
            color: `#084098`,
            fontFamily: "Quicksand-Bold",
          }}
        >
          Estudar
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 15,
          color: `#1E5EC4`,
          bottom: 5,
          fontFamily: "Quicksand-Bold",
        }}
      >
        Concentre-se!. Desative sua internet
      </Text>
    </SafeAreaView>
  );
}











