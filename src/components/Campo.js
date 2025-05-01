import React from "react"
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native"
import params from "../params"
import Mina from "./Mina"
import Bandeira from "./Bandeira"

export default (props) => {
  const { minado, aberto, minasPerto, explodida, marcado } = props

  const styleCampo = [styles.campo]
  if (aberto) {
    styleCampo.push(styles.aberto)
  }
  if (explodida) {
    styleCampo.push(styles.explodida)
  }
  if (marcado) {
    styleCampo.push(styles.marcado, styles.regular)
  }
  if (!aberto && !marcado) {
    styleCampo.push(styles.regular)
  }

  let cor = null
  if (minasPerto > 0) {
    if (minasPerto === 1) {
      cor = "#2A28D7"
    }
    if (minasPerto === 2) {
      cor = "#2B520F"
    }
    if (minasPerto > 2 && minasPerto < 6) {
      cor = "#F9060A"
    }
    if (minasPerto >= 6) {
      cor = "#F221A9"
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={props.onOpen}
      onLongPress={props.onMarcar}
    >
      <View style={styleCampo}>
        {!minado && aberto && minasPerto > 0 ? (
          <Text style={[styles.label, { color: cor }]}>{minasPerto}</Text>
        ) : (
          false
        )}
        {minado && aberto ? <Mina /> : false}
        {marcado && !aberto ? <Bandeira /> : false}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  campo: {
    height: params.blocksize,
    width: params.blocksize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: "#a47a58",
    borderLeftColor: "#d4a271",
    borderTopColor: "#d4a271",
    borderRightColor: "#4b4230",
    borderBottomColor: "#4b4230",
    borderRadius: 10,
  },
  aberto: {
    backgroundColor: "#a47a58",
    borderColor: "#4b4230",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  label: {
    fontWeightht: "bold",
    fontSize: params.fontSize,
  },
  explodida: {
    backgroundColor: "#940404",
    borderColor: "#940404",
  },
})
