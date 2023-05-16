import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BackHandler, Alert } from "react-native";
import { Feather, Ionicons,} from "@expo/vector-icons";
import Estudo from "./src/componentes/Estudo";
import CadastrarEstudo from "./src/componentes/CadastrarEstudo";
import Login from "./src/componentes/Login";
import CadastroUsuarios from "./src/componentes/CadastroUsuarios";

const Stack = createStackNavigator();
const Tab1 = createBottomTabNavigator();

function Routes({ navigation, props }) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Alerta!", "Deseja sair?", [
        {
          text: "Não",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            navigation.navigate("Sair");
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab1.Navigator>
      <Tab1.Screen
        name="Sair"
        component={Login}
        options={{
          title: "",
          headerTransparent: true,
          haederShown: false,
          tabBarStyle: { display: "none", backgroundColor:'#159FFB',},
          tabBarIcon: () => {
            return <Feather name="user" size={24} color="black" />;
          },
        }}
      />
      <Tab1.Screen
        name="Cadastrar"
        component={CadastrarEstudo}
        options={{
          title: "",
          headerTransparent: true,
          haederShown: true,
          tabBarStyle:{backgroundColor: '#159FFB'},
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="md-library" size={size} color="white" />;
            }
            return (
              <Ionicons name="md-library-outline" size={size} color="black" />
            );
          },
        }}
      />
      <Tab1.Screen
        name="Estudar"
        component={Estudo}
        options={({ route }) => ({
          title: "",
          headerTransparent: true,
          haederShown: true,
          tabBarItemStyle: { display: "none",},
          tabBarStyle:{backgroundColor: '#159FFB'},
          tabBarVisible: true,
        })}
      />
      <Tab1.Screen
        name="CadastroUsuarios"
        component={CadastroUsuarios}
        options={{
          title: "",
          headerTransparent: true,
          haederShown: true,
          tabBarStyle: { display: "none" },
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tab1.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Routes"
          component={Routes}
          options={{
            title: "",
            headerTransparent: true,
            haederShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
