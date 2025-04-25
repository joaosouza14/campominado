const criarTabuleiro = (linhas, colunas) => {
  return Array(linhas)
    .fill(0)
    .map((_, linha) => {
      return Array(colunas)
        .fill(0)
        .map((_, coluna) => {
          return {
            linha: linha,
            coluna: coluna,
            aberto: false,
            minado: false,
            marcado: false,
            explodida: false,
            minasPerto: 0,
          }
        })
    })
}

const espalharMinas = (tabuleiro, qtdMinas) => {
  const linhas = tabuleiro.length
  const colunas = tabuleiro[0].length
  let minasPlantadas = 0

  while (minasPlantadas < qtdMinas) {
    const linhaSelecionada = parseInt(Math.random() * linhas, 10)
    const colunaSelecionada = parseInt(Math.random() * colunas, 10)

    if (!tabuleiro[linhaSelecionada][colunaSelecionada].minado) {
      tabuleiro[linhaSelecionada][colunaSelecionada].minado = true
      minasPlantadas++
    }
  }
}

const criarCampoMinado = (linhas, colunas, qtdMinas) => {
  const tabuleiro = criarTabuleiro(linhas, colunas)
  espalharMinas(tabuleiro, qtdMinas)
  return tabuleiro
}

const cloneTabuleiro = (tabuleiro) => {
  return tabuleiro.map((linha) => {
    return linha.map((campo) => {
      return { ...campo }
    })
  })
}

const getVizinhos = (tabuleiro, linha, coluna) => {
  const vizinhos = []
  const linhas = [linha - 1, linha, linha + 1]
  const colunas = [coluna - 1, coluna, coluna + 1]
  linhas.forEach((l) => {
    colunas.forEach((c) => {
      const diferente = l != linha || c != coluna
      const linhaValida = l >= 0 && l < tabuleiro.length
      const colunaValida = c >= 0 && c < tabuleiro[0].length

      if (diferente && linhaValida && colunaValida) {
        vizinhos.push(tabuleiro[l][c])
      }
    })
  })
  return vizinhos
}

const vizinhancaSegura = (tabuleiro, linha, coluna) => {
  const seguro = (resultado, vizinhos) => resultado && !vizinhos.minado
  return getVizinhos(tabuleiro, linha, coluna).reduce(seguro, true)
}

const abrirCampo = (tabuleiro, linha, coluna) => {
  const campo = tabuleiro[linha][coluna]
  if (!campo.aberto) {
    campo.aberto = true
    if (campo.minado) {
      campo.explodida = true
    } else if (vizinhancaSegura(tabuleiro, linha, coluna)) {
      getVizinhos(tabuleiro, linha, coluna).forEach((n) =>
        abrirCampo(tabuleiro, n.linha, n.coluna)
      )
    } else {
      const vizinhos = getVizinhos(tabuleiro, linha, coluna)
      campo.minasPerto = vizinhos.filter((n) => n.minado).length
    }
  }
}

const campos = (tabuleiro) => [].concat(...tabuleiro)
const temExplodida = (tabuleiro) =>
  campos(tabuleiro).filter((campo) => campo.explodida).length > 0
const pendente = (campo) =>
  (campo.minado && !campo.aberto) || (!campo.minado && !campo.aberto)
const ganhouJogo = (tabuleiro) => campos(tabuleiro).filter(pendente).length == 0
const mostrarMinas = (tabuleiro) =>
  campos(tabuleiro)
    .filter((campo) => campo.minado)
    .forEach((campo) => (campo.aberto = true))

const inverterBandeira = (tabuleiro, linha, coluna) => {
  const campo = tabuleiro[linha][coluna]
  campo.marcado = !campo.marcado
}

const bandeirasUsadas = (tabuleiro) =>
  campos(tabuleiro).filter((campo) => campo.marcado).length

export {
  criarCampoMinado,
  abrirCampo,
  mostrarMinas,
  temExplodida,
  ganhouJogo,
  cloneTabuleiro,
  inverterBandeira,
  bandeirasUsadas,
}
