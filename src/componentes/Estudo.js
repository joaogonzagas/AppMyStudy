import React, { useState, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Svg, { Circle, Ellipse } from "react-native-svg";
import NetInfo from "@react-native-community/netinfo";
import { Audio } from "expo-av";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { estudos } from "./StyleEstudos";
import * as Font from "expo-font";

const Estudo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [painelHora, setPainelHora] = useState();
  const [materia, setMateria] = useState();
  const [imagem, setImagem] = useState();
  const [interruptor, setInterruptor] = useState(false);
  const intervaloTempo = useRef(null);
  const intervaloProgresso = useRef(null);
  const referenciaTempoAtual = useRef(null);
  const [dashOff, setdashOff] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [painelSegundos, setPainelSegundos] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [sound, setSound] = useState(null);
  const [fontesCarregadas, setFontesCarregadas] = useState(false);
  const referenciaLinha = useRef(null);
  let horarioH = route.params.tempoH;
  let horarioM = route.params.tempoM;
  let nomeMateria = route.params.materia;
  let imagemMateria = route.params.imagem;
  let horasNum = Number(horarioH);
  let minutosNum = Number(horarioM);
  let tempoTotalEmSegundos = (minutosNum + horasNum * 60) * 60;
  let tempoDash = 283 / 30;
  let linhaCircular = (tempoTotalEmSegundos / 60 / 30) * 60000;
  referenciaLinha.current = linhaCircular;
  let segundos = "";

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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is Connected", state.isConnected);
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      "focus",
      () => {
        clearInterval(intervaloTempo.current);
        clearInterval(intervaloProgresso.current);
        setInterruptor(false);
        setMateria(nomeMateria);
        setPainelHora(
          `${horarioH < 10 ? "0" : ""}${horarioH}:${
            horarioM < 10 ? "0" : ""
          }${horarioM}`
        );
        setPainelSegundos("00");
        setImagem(imagemMateria);
        setdashOff(0);
        setDisabled(false);
      },
      [horarioH, nomeMateria]
    );

    /* Retorne uma função de limpeza para remover o listener quando o componente
     for desmontado*/
    return unsubscribe;
  }, [horarioH, nomeMateria]);

  const startTimer = (x) => {
    intervaloProgresso.current = setInterval(() => {
      startCircle();
    }, referenciaLinha.current);

    //Assite a execução
    setInterruptor(true);

    // Defina a função que será executada a cada segundo
    intervaloTempo.current = setInterval(function () {
      // Subtraia um segundo do tempo restante
      referenciaTempoAtual.current = x--;

      // Calcule as horas, minutos e segundos restantes
      let horas = Math.floor(x / 3600);
      let minutos = Math.floor((x % 3600) / 60);
      segundos = Math.floor(x % 60);

      // Formate a saída com as horas e os minutos restantes
      let tempoRestante = `${horas < 10 ? "0" : ""}${horas}:${
        minutos < 10 ? "0" : ""
      }${minutos}`;

      // Exibe o tempo restante
      setPainelHora(tempoRestante);
      setPainelSegundos(`${segundos < 10 ? "0" : ""}${segundos}`);

      // Verifique se o tempo acabou
      if (x <= 0) {
        clearInterval(intervaloTempo.current);
        clearInterval(intervaloProgresso.current);
        //Intera mais uma vez para não desconpassar
        startCircle();
        //Mostra o fim do estudo
        setPainelHora("  FIM");
        setPainelSegundos("");
        //toca o alarme
        playSound();
      }
    }, 1000);
  };

  const startCircle = () => {
    setdashOff((item) => item + tempoDash);
    return;
  };

  const pauseTimer = () => {
    clearInterval(intervaloProgresso.current);
    clearInterval(intervaloTempo.current);
  };

  const stopTimer = () => {
    clearInterval(intervaloProgresso.current);
    clearInterval(intervaloTempo.current);
    setPainelHora("  FIM");
    setPainelSegundos("");
    //Desativa o botão iniciar
    setDisabled(true);
    setdashOff(283);
  };

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/beep.mp3")
      );
      setSound(sound);
      await sound.playAsync({ volume: 0.1 });
    } catch (error) {
      console.log("Erro ao reproduzir o áudio:", error);
    }
  }

  return (
    <SafeAreaView style={estudos.container}>
      <StatusBar backgroundColor="black" />
      <Image
        source={imagem}
        style={{
          resizeMode: "contain",
          position: "absolute",
          width: "150%",
          height: "100%",
        }}
      />

      <Svg
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Circle cx="15" cy="80" r="110" fill="#159FFB" />

        <Ellipse
          cx="120"
          rx="100"
          cy="25"
          ry="115"
          r="120"
          // stroke="green"
          strokeWidth="1"
          fill="#237ddb"
        />
      </Svg>

      <View style={estudos.container1}>
        <Text
          style={{
            fontSize: 25,
            color: "black",
            top: 158,
            fontFamily: "Quicksand-Bold",
          }}
        >
          {materia}
        </Text>
        <Svg
          width="100%"
          height="80%"
          viewBox="0 5 100 100"
          style={{ bottom: -65 }}
        >
          <Circle
            cx="35"
            cy="50"
            r="42"
            stroke="#000"
            strokeWidth="0.8"
            strokeDasharray={0.8}
            strokeDashoffset={0}
            fill="transparent"
            transform={`rotate(-90 50 50)`}
          />
          <Circle
            cx="35"
            cy="50"
            r="42"
            stroke="#000"
            strokeWidth="0.8"
            fill="transparent"
            strokeDasharray={283}
            strokeDashoffset={dashOff}
            transform={`rotate(-90 50 50)`}
          />
        </Svg>
      </View>
      <View style={estudos.container2}>
        <TouchableOpacity
          style={estudos.pause}
          onPress={() => {
            stopTimer();
          }}
        >
          <FontAwesome5
            name="stop"
            size={35}
            color="black"
            style={{ color: "#fff" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estudos.play}
          disabled={disabled}
          onPress={() => {
            clearInterval(intervaloTempo.current);
            clearInterval(intervaloProgresso.current);
            if (!interruptor) {
              startTimer(tempoTotalEmSegundos);
            } else {
              startTimer(referenciaTempoAtual.current);
            }
          }}
        >
          <FontAwesome
            name="play"
            size={54}
            color="black"
            style={{ left: 30, color: "#fff" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={estudos.stop}
          onPress={() => {
            pauseTimer();
          }}
        >
          <FontAwesome
            name="pause"
            size={25}
            color="black"
            style={{ color: "#fff" }}
          />
        </TouchableOpacity>
      </View>
      <View style={estudos.container3}>
        <Text
          style={{
            fontSize: 20,
            color: `red`,
            left: 15,
            fontFamily: "Quicksand-Bold",
          }}
        >
          {isConnected ? "desligue a sua internet" : ""}
        </Text>

        <Text
          style={{
            fontSize: 60,
            color: `black`,
            fontFamily: "Quicksand-Medium",
          }}
        >
          {painelHora}
        </Text>
        <View style={estudos.container4}>
          <Text
            style={{
              fontSize: 25,
              position: "absolute",
              bottom: 32,
              right: -30,
            }}
          >
            {painelSegundos}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Estudo;
