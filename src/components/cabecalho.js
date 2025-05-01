import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Bandeira from "./Bandeira"

export default (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerBandeira}>
        <TouchableOpacity
          onPress={props.onPressBandeira}
          style={styles.botaoBandeira}
        >
          <Bandeira bigger />
        </TouchableOpacity>
        <Text style={styles.bandeirasRestantes}>
          {" "}
          = {props.bandeirasRestantes}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onNovoJogo} style={styles.botao}>
        <Text style={styles.txtBotao}>Novo Jogo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f4c28a",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  containerBandeira: {
    flexDirection: "row",
  },
  botaoBandeira: {
    marginTop: 10,
    minWidth: 30,
  },
  bandeirasRestantes: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 5,
    color: "#000",
  },
  botao: {
    backgroundColor: "#4b4230",
    padding: 5,
    borderRadius: 10,
  },
  txtBotao: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
})
