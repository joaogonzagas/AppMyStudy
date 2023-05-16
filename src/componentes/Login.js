import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { login } from "./StyleLogin";

export default function Login() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
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

  function senhaError() {
    alert("Fale conosco: senhas@mystudy.com");
  }

  async function verifcarBd() {
    let response = await fetch("http://192.168.1.69:3000/Login", {
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
    let json = await response.json();

    if (json === "error") {
      alert("usuario ou senha inválidos");
      setEmail("");
      setSenha("");
    } else {
      console.log(json);
      TelaUsuarios();
    }
  }

  function TelaUsuarios() {
    navigation.navigate("Cadastrar");
  }

  function TelaCadastro() {
    navigation.navigate("CadastroUsuarios");
  }
  return (
    <SafeAreaView style={login.container}>
      <StatusBar />

      <View style={login.container1}>
        <Image
          source={require("../../assets/Imagens/logo.png")}
          style={{
            width: "70%",
            height: "40%",
            resizeMode: "contain",
            top: 18,
          }}
        />
        <View style={login.container2}>
          <Text
            style={{
              marginTop: 22,
              fontSize: 25,
              fontFamily: "Quicksand-Bold",
              color: "#fff",
            }}
          >
            {" "}
            Bem-vindos ao {"\n"}     My Study!
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 18,
              fontFamily: "Quicksand-Bold",
              color: "#fff",
            }}
          >
            Muito bom tê-lo a bordo
          </Text>
        </View>
      </View>
      <View style={login.container3}>
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
          placeholder="Digite seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={login.input}
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
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
          style={login.input}
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
          <TouchableOpacity onPress={verifcarBd} style={login.buttonEntrar}>
            <Text
              style={{
                fontSize: 20,
                color: `#ffff`,
                fontFamily: "Quicksand-Medium",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <View style={login.container4}>
          <Text
            style={{
              fontSize: 17,
              marginTop: 20,
              color: "#e0e0e0",
              fontFamily: "Quicksand-Light",
            }}
          >
            Não tem uma conta?
          </Text>

          <TouchableWithoutFeedback onPress={() => TelaCadastro()}>
            <Text
              style={{
                textDecorationLine: "underline",
                fontSize: 17,
                fontFamily: "Quicksand-Bold",
                marginTop: 20,
                marginLeft: 10,
                marginBottom: 10,
                color: "#fff",
              }}
            >
              Cadastre-se
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            senhaError();
          }}
        >
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: 15,
              fontFamily: "Quicksand-Bold",
              color: "#fff",
            }}
          >
            Esqueci minha senha
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}
