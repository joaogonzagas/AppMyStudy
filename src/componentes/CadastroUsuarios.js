import {
  View,  
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Config from "../../config/config.json";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { usuario } from "./StyleLogin";

export default function Usuarios() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
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

  useEffect(() => {
    const limparCampos = isFocused
      ? () => {
          setEmail("");
          setSenha("");
        }
      : undefined;
    return () => {
      if (limparCampos) {
        limparCampos();
      }
    };
  }, [isFocused]);

  async function novoUsuario() {
    let response = await fetch(Config.urlRoot + "create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    });
  }

  async function consultarUsuario() {
    let response = await fetch("http://192.168.1.69:3000/CadastroUsuarios", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    let json = await response.json();
    if (email != "" && senha != "") {
      if (json === "error") {
        novoUsuario();
        alert("Cadastro efetivado!");
        voltar();
        return;
      } else {
        alert("O usuário já existe, retornando a tela inicial");
        voltar();
        return;
      }
    } else {
      alert("Preencha todos os campos");
    }
    return;
  }

  function voltar() {
    if (novoUsuario) navigation.navigate("Sair");
    return;
  }

  return (
    <SafeAreaView style={usuario.container1}>
      <StatusBar />
      <View style={usuario.container2}>
        <Image
          source={require("../../assets/Imagens/logo.png")}
          style={{
            width: "70%",
            height: "40%",
            resizeMode: "contain",
            top: 18,
          }}
        />
        <Text
          style={{
            marginTop: 65,
            fontSize: 25,
            fontFamily: "Quicksand-Bold",
            color: "#01D3B5",
          }}
        >
          CRIE SUA CONTA
        </Text>
      </View>
      <View style={usuario.container3}>
        <Text
          style={{
            width: "75%",
            fontSize: 18,
            fontFamily: "Quicksand-Light",
            marginTop: 25,
            color: "#e0e0e0",
          }}
        >
          E-mail:
        </Text>
        <TextInput
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={usuario.input}
        />
        <Text
          style={{
            width: "75%",
            fontSize: 18,
            fontFamily: "Quicksand-Light",
            marginTop: 25,
            color: "#e0e0e0",
          }}
        >
          Senha:
        </Text>
        <TextInput
          secureTextEntry={true}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          style={usuario.input}
        />
        <LinearGradient
          colors={["#01D3B5", "#0AA4BE", "#1182C6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: "80%",
            height: "18%",
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <TouchableOpacity
            style={usuario.buttonCadastrar}
            onPress={() => {
              consultarUsuario();
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Quicksand-Medium",
                color: "#fff",
              }}
            >
              Cadastro
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
