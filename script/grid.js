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

  draw() {
    labirinto.width = this.tamanho;
    labirinto.height = this.tamanho;
    labirinto.style.background = 'black';
    atual.visitado = true;

    for (let l = 0; l < this.linhas; l++) {
      for (let c = 0; c < this.colunas; c++) {
        let grid = this.grid;
        grid[l][c].show(this.tamanho, this.linhas, this.colunas);
      }
    }
  }
}

class Celula {
  constructor(numLinhas, numColunas, paiGrid, paiTamanho) {
    this.numLinhas = numLinhas;
    this.numColunas = numColunas;
    this.paiGrid = paiGrid;
    this.paiTamanho = paiTamanho;
    this.visitado = false;
    this.paredes = {
      topParede: true,
      direitaParede: true,
      esquerdaParede: true,
      botParede: true,
    };
  }

  drawTopParede(x, y, tamanho, colunas, linhas) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + tamanho / colunas, y);
    ctx.stroke();
  }

  drawDireitaParede(x, y, tamanho, colunas, linhas) {
    ctx.beginPath();
    ctx.moveTo(x + tamanho / colunas, y);
    ctx.lineTo(x + tamanho / colunas, y + tamanho / linhas);
    ctx.stroke();
  }

  drawBotParede(x, y, tamanho, colunas, linhas) {
    ctx.beginPath();
    ctx.moveTo(x, y + tamanho / linhas);
    ctx.lineTo(x + tamanho / colunas, y + tamanho / linhas);
    ctx.stroke();
  }

  drawEsquerdaParede(x, y, tamanho, colunas, linhas) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + tamanho / linhas);
    ctx.stroke();
  }

  show(tamanho, linhas, colunas) {
    let x = (this.numColunas * tamanho) / colunas;
    let y = (this.numLinhas * tamanho) / linhas;

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;

    if (this.paredes.topParede) {
      this.drawTopParede(x, y, tamanho, colunas, linhas);
    }
    if (this.paredes.direitaParede) {
      this.drawDireitaParede(x, y, tamanho, colunas, linhas);
    }
    if (this.paredes.botParede) {
      this.drawBotParede(x, y, tamanho, colunas, linhas);
    }
    if (this.paredes.esquerdaParede) {
      this.drawEsquerdaParede(x, y, tamanho, colunas, linhas);
    }
    if (this.visitado) {
      ctx.fillRect(x + 1, y + 1, tamanho / colunas - 2, tamanho / linhas - 2);
    }
  }

  verificandoVizinhos() {
    let grid = this.paiGrid;
    let linha = this.numLinhas;
    let col = this.numColunas;
    let vizinhos = [];

    let top = linha !== 0 ? grid[row - 1][col] : undefined;
    let direita = col !== grid.lenght - 1 ? grid[linha][col + 1] : undefined;
    let bot = linha !== grid.lenght - 1 ? grid[linha + 1][col] : undefined;
    let esquerda = col !== 0 ? grid[linha][col - 1] : undefined;

    if (top && !top.visitado) vizinhos.push(top);
    if (direita && !direita.visitado) vizinhos.push(direita);
    if (bot && !bot.visitado) vizinhos.push(bot);
    if (esquerda && !esquerda.visitado) vizinhos.push(esquerda);

    if (vizinhos.length !== 0) {
      let aleatorio = Math.floor(Math.random() * vizinhos.length);
    } else {
      return undefined;
    }
  }
}

let newLabirinto = new Labirinto(500, 10, 10);
newLabirinto.setup();
newLabirinto.draw();
