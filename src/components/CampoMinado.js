import React from "react"
import { View, StyleSheet } from "react-native"
import Campo from "./Campo"

export default (props) => {
  const linhas = props.tabuleiro.map((linha, l) => {
    const colunas = linha.map((campo, c) => {
      return (
        <Campo
          key={c}
          {...campo}
          onOpen={() => props.onOpenCampo(l, c)}
          onMarcar={(e) => props.onMarcarCampo(l, c)}
        />
      )
    })
    return (
      <View key={l} style={{ flexDirection: "row" }}>
        {colunas}
      </View>
    )
  })
  return <View style={styles.container}>{linhas}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
  },
})
