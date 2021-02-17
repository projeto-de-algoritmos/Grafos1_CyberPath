let labirinto = document.querySelector('.labirinto');
let ctx = labirinto.getContext('2d');
let atual;

class Labirinto {
  constructor(tamanho, linhas, colunas) {
    this.tamanho = tamanho;
    this.linhas = linhas;
    this.colunas = colunas;
    this.grid = [];
    this.pilha = [];
  }

  setup() {
    for (let l = 0; l < this.linhas; l++) {
      let linha = [];
      for (let c = 0; c < this.colunas; c++) {
        let celula = new Celula(l, c, this.grid, this.tamanho);
        linha.push(celula);
      }
      this.grid.push(linha);
    }
    atual = this.grid[0][0];
  }
}

class Celula {
  constructor(numLinhas, numColunas, paiGrid, paiTamanho) {
    this.numLinhas = numLinhas;
    this.numColunas = numColunas;
    this.paiGrid = paiGrid;
    this.paiTamanho = paiTamanho;
    this.vitado = false;
    this.paredes = {
      topParede: true,
      direitaParede: true,
      esquerdaParede: true,
      botParede: true,
    };
  }
}

let newLabirinto = new Labirinto(500, 10, 10);
newLabirinto.setup();
