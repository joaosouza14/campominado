import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import params from "./src/params";
import Campo from "./src/components/Campo";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando o Campo Minado!</Text>
      <Text style={styles.instrucoes}>
        Tamanho da grade:
        {params.getColumnsAmount()}x{params.getRowsAmount()}
      </Text>
      <Campo />
      <Campo aberto />
      <Campo aberto minasPerto={6} />
      <Campo minado aberto />
      <Campo minado aberto explodida />
      <Campo comBandeira />
      <Campo comBandeira aberto />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
  },
});
