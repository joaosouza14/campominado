import React from "react";
import { View, StyleSheet, Text } from "react-native";
import params from "../params";
import Mina from "./Mina";
import Bandeira from "./Bandeira";

export default (props) => {
  const { minado, aberto, minasPerto, explodida, comBandeira } = props;

  const styleCampo = [styles.campo];
  if (aberto) {
    styleCampo.push(styles.aberto);
  }
  if (explodida) {
    styleCampo.push(styles.explodida);
  }
  if (comBandeira) {
    styleCampo.push(styles.comBandeira, styles.regular);
  }
  if (!aberto && !comBandeira) {
    styleCampo.push(styles.regular);
  }

  let cor = null;
  if (minasPerto > 0) {
    if (minasPerto === 1) {
      cor = "#2A28D7";
    }
    if (minasPerto === 2) {
      cor = "#2B520F";
    }
    if (minasPerto > 2 && minasPerto < 6) {
      cor = "#F9060A";
    }
    if (minasPerto >= 6) {
      cor = "#F221A9";
    }
  }

  return (
    <View style={styleCampo}>
      {!minado && aberto && minasPerto > 0 ? (
        <Text style={[styles.label, { color: cor }]}>{minasPerto}</Text>
      ) : (
        false
      )}
      {minado && aberto ? <Mina /> : false}
      {comBandeira && !aberto ? <Bandeira /> : false}
    </View>
  );
};

const styles = StyleSheet.create({
  campo: {
    height: params.blocksize,
    width: params.blocksize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: "#999",
    borderLeftColor: "#ccc",
    borderTopColor: "#ccc",
    borderRightColor: "#333",
    borderBottomColor: "#333",
  },
  aberto: {
    backgroundColor: "#999",
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeightht: "bold",
    fontSize: params.fontSize,
  },
  explodida: {
    backgroundColor: "red",
    borderColor: "red",
  },
});
