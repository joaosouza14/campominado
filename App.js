import React, { Component } from "react"
import { StyleSheet, Text, View, Alert } from "react-native"
import params from "./src/params"
import {
  criarCampoMinado,
  cloneTabuleiro,
  abrirCampo,
  temExplodida,
  ganhouJogo,
  mostrarMinas,
  inverterBandeira,
  bandeirasUsadas,
} from "./src/funcoes"
import CampoMinado from "./src/components/CampoMinado"
import Cabecalho from "./src/components/cabecalho"
import SelecionarNivel from "./src/telas/SelecionarNivel"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = this.criarEstado()
  }

  qtdMinas = () => {
    const linhas = params.getQtdLinhas()
    const colunas = params.getQtdColunas()
    return Math.ceil(linhas * colunas * params.difficultLevel)
  }

  criarEstado = () => {
    const colunas = params.getQtdColunas()
    const linhas = params.getQtdLinhas()
    return {
      tabuleiro: criarCampoMinado(linhas, colunas, this.qtdMinas()),
      ganhou: false,
      perdeu: false,
      mostrarSelecionarNivel: false,
    }
  }

  onOpenCampo = (linha, coluna) => {
    const tabuleiro = cloneTabuleiro(this.state.tabuleiro)
    abrirCampo(tabuleiro, linha, coluna)
    const perdeu = temExplodida(tabuleiro)
    const ganhou = ganhouJogo(tabuleiro)
    if (perdeu) {
      mostrarMinas(tabuleiro)
      Alert.alert("Perdeu!", "Clique em OK para recomeçar")
    }
    if (ganhou) {
      Alert.alert("Parabéns!", "Você venceu!")
    }
    this.setState({ tabuleiro, ganhou, perdeu })
  }

  onMarcarCampo = (linha, coluna) => {
    const tabuleiro = cloneTabuleiro(this.state.tabuleiro)
    inverterBandeira(tabuleiro, linha, coluna)
    const ganhou = ganhouJogo(tabuleiro)
    if (ganhou) {
      Alert.alert("Parabéns!", "Você venceu!")
    }
    this.setState({ tabuleiro, ganhou })
  }

  onSelecionarNivel = (nivel) => {
    params.difficultLevel = nivel
    this.setState(this.criarEstado())
  }

  render() {
    return (
      <View style={styles.container}>
        <SelecionarNivel
          isVisible={this.state.mostrarSelecionarNivel}
          onCancel={() => this.setState({ mostrarSelecionarNivel: false })}
          onLevelSelected={this.onSelecionarNivel}
        />
        <Cabecalho
          bandeirasRestantes={
            this.qtdMinas() - bandeirasUsadas(this.state.tabuleiro)
          }
          onNovoJogo={() => this.setState(this.criarEstado())}
          onPressBandeira={() =>
            this.setState({ mostrarSelecionarNivel: true })
          }
        />
        <View style={styles.tabuleiro}>
          <CampoMinado
            tabuleiro={this.state.tabuleiro}
            onOpenCampo={this.onOpenCampo}
            onMarcarCampo={this.onMarcarCampo}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  tabuleiro: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
})
