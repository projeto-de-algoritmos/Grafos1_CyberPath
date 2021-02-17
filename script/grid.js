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
    ctx.inicioCaminho();
    ctx.movendoPara(x, y);
    ctx.lineTo(x + tamanho / colunas, y);
    ctx.strok();
  }

  drawDireitaParede(x, y, tamanho, colunas, linhas) {
    ctx.inicioCaminho();
    ctx.movendoPara(x + tamanho / colunas, y);
    ctx.lineTo(x + tamanho / colunas, y + tamanho / linhas);
    ctx.strok();
  }

  drawEsquerdaParede(x, y, tamanho, colunas, linhas) {
    ctx.inicioCaminho();
    ctx.movendoPara(x, y);
    ctx.lineTo(x, y + tamanho / linhas);
    ctx.strok();
  }

  drawBotParede(x, y, tamanho, colunas, linhas) {
    ctx.inicioCaminho();
    ctx.movendoPara(x, y + tamanho / linhas);
    ctx.lineTo(x + tamanho / colunas, y + tamanho / linhas);
    ctx.strok();
  }

  show(tamanho, linhas, colunas) {
    let x = (this.numColunas * tamanho) / colunas;
    let y = (this.numLinhas * tamanho) / linhas;

    ctx.strokStyle = 'white';
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
      ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    }
  }
}

let newLabirinto = new Labirinto(500, 10, 10);
newLabirinto.setup();
newLabirinto.draw();
