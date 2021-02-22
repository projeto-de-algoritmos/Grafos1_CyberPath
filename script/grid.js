let labirinto = document.querySelector('.labirinto');
let ctx = labirinto.getContext('2d');
let atual;
let destino;

class Graph {

  constructor(vertex) {
    this.vertex = vertex;
    this.listAdj = new Map();
  }

  getKeys() {
    return this.listAdj.keys();
  }
  getValues(i) {
    return this.listAdj.get(i);
  }
  addVertex(v) {
    this.listAdj.set(v, []);
  }
  addEdge(v, w) {
    this.listAdj.get(v).push(w);
  }
  print() {
    var vertex = this.listAdj.keys();
    console.log('VERTEX -> LIST\n');
    for (var i of vertex) {
      var listAdj = this.listAdj.get(i);
      var sum = '';
      for (var j = 0; j < listAdj.length; ++j) {
        sum += listAdj[j];
        if (j != listAdj.length - 1) sum += ' && ';
      }
      console.log(i + ' -> ' + sum);
    }
  }
  get Keys() {
    return this.listAdj.keys();
  }
  //bfs

  bfs(v) {
    var fila = [];
    var visitados = []; // vetor de visitados

    for (var i = 0; i < this.vertex; ++i) visitados[i] = false;

    fila.push(v);
    visitados[v] = true; // marca como visitado

    while (fila.length != 0) {
      var getElement = fila.shift();
      console.log(getElement); // Vertice atual
      var get_values = this.listAdj.get(getElement); // Get adjList
      for (var i in get_values) {
        var value = get_values[i];
        if (!visitados[value]) {
          //console.log(getElement);
          visitados[value] = true;
          fila.push(value);
        }
      }
    }
  }
  //dfs

  dfs(v) {
    var visitados = [];
    this.path(v, visitados);
  }
  path(v, visitados) {
    visitados[v] = true;
    console.log(v); // Vertice atual

    var get_values = this.listAdj.get(v);

    for (var w in get_values) {
      var value = get_values[w];
      if (!visitados[value]) this.path(value, visitados);
    }
  }
  //findPath

  findPath(origem, destino) {
    if (origem == destino) {
      return [origem, origem];
    }

    var fila = [origem],
      visitados = {},
      ant = {},
      aux = 0,
      steps = [];

    while (aux < fila.length) {
      var u = fila[aux];
      aux++;

      if (!this.listAdj.get(u)) {
        continue;
      }

      var get_values = this.listAdj.get(u);
      for (var i = 0; i < get_values.length; ++i) {
        var v = get_values[i];
        if (visitados[v]) {
          continue;
        }
        visitados[v] = true;
        if (v === destino) {
          steps = [v];
          while (u !== origem) {
            steps.push(u);
            u = ant[u];
          }
          steps.push(u);
          steps.reverse();
          return steps;
        }
        ant[v] = u;
        fila.push(v);
      }
    }
    return steps;
  }
}
class Labirinto {
  
  constructor(tamanho, linhas, colunas) {
    this.tamanho = tamanho;
    this.linhas = linhas;
    this.colunas = colunas;
    this.grid = [];
    this.pilha = [];
  }

  getGrid() {
    return this.grid;
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
    this.grid[this.linhas - 1][this.colunas - 1].destino = true;
  }

  drawInicial() {
    labirinto.width = this.tamanho;
    labirinto.height = this.tamanho;
    labirinto.style.background = '#221b17';
    atual.visitado = true;

    for (let l = 0; l < this.linhas; l++) {
      for (let c = 0; c < this.colunas; c++) {
        let grid = this.grid;
        grid[l][c].show(this.tamanho, this.linhas, this.colunas);
      }
    }
  }

  draw() {
    labirinto.width = this.tamanho;
    labirinto.height = this.tamanho;
    labirinto.style.background = '#221b17';
    atual.visitado = true;

    for (let l = 0; l < this.linhas; l++) {
      for (let c = 0; c < this.colunas; c++) {
        let grid = this.grid;
        grid[l][c].show(this.tamanho, this.linhas, this.colunas);
      }
    }

    let proximo = atual.verificandoVizinhos();

    if (proximo) {
      proximo.visitado = true;

      this.pilha.push(atual);

      atual.destaque(this.colunas);

      atual.removendoParedes(atual, proximo);

      atual = proximo;
    } else if (this.pilha.length > 0) {
      //Backtraking
      let celula = this.pilha.pop();
      atual = celula;
      atual.destaque(this.colunas);
    }

    if (this.pilha.length === 0) {
      atual.destaque1(this.colunas);
      atual.destaqueOrigem(this.colunas);
      return;
    }

    window.requestAnimationFrame(() => {
      this.draw();
    });
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
    this.destino = false;
  }

  ParedeTop(aux) {
    this.paredes.topParede = aux;
  }
  ParedeBot(aux) {
    this.paredes.botParede = aux;
  }
  ParedeDireita(aux) {
    this.paredes.direitaParede = aux;
  }
  ParedeEsquerda(aux) {
    this.paredes.esquerdaParede = aux;
  }
  get Paredes() {
    return this.paredes;
  }
  get Visitados() {
    return this.visitado;
  }
  setVisitad(bool) {
    this.visitado = bool;
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
    ctx.fillStyle = '#221b17';
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

  removendoParedes(celula1, celula2) {
    let x = celula1.numColunas - celula2.numColunas;

    if (x == 1) {
      celula1.paredes.esquerdaParede = false;
      celula2.paredes.direitaParede = false;
    } else if (x == -1) {
      celula1.paredes.direitaParede = false;
      celula2.paredes.esquerdaParede = false;
    }

    let y = celula1.numLinhas - celula2.numLinhas;

    if (y == 1) {
      celula1.paredes.topParede = false;
      celula2.paredes.botParede = false;
    } else if (y == -1) {
      celula1.paredes.botParede = false;
      celula2.paredes.topParede = false;
    }
  }

  verificandoVizinhos() {

    let grid = this.paiGrid;
    let linha = this.numLinhas;
    let col = this.numColunas;
    let vizinhos = [];

    let top = linha !== 0 ? grid[linha - 1][col] : undefined;
    let direita = col !== grid.length - 1 ? grid[linha][col + 1] : undefined;
    let bot = linha !== grid.length - 1 ? grid[linha + 1][col] : undefined;
    let esquerda = col !== 0 ? grid[linha][col - 1] : undefined;

    if (top && !top.visitado) vizinhos.push(top);
    if (direita && !direita.visitado) vizinhos.push(direita);
    if (bot && !bot.visitado) vizinhos.push(bot);
    if (esquerda && !esquerda.visitado) vizinhos.push(esquerda);

    if (vizinhos.length !== 0) {
      let aleatorio = Math.floor(Math.random() * vizinhos.length);
      return vizinhos[aleatorio];
    } else {
      return undefined;
    }
    
  }

  destaque(colunas) {
    let x = (this.numColunas * this.paiTamanho) / colunas + 1;
    let y = (this.numLinhas * this.paiTamanho) / colunas + 1;

    ctx.fillStyle = '#7CF000';
    ctx.fillRect(
      x,
      y,
      this.paiTamanho / colunas - 3,
      this.paiTamanho / colunas - 3
    );
  }
  destaque1(colunas) {
    let x = (this.numColunas * this.paiTamanho) / colunas + 1;
    let y = (this.numLinhas * this.paiTamanho) / colunas + 1;

    ctx.fillStyle = '#221b17';
    ctx.fillRect(
      x,
      y,
      this.paiTamanho / colunas - 3,
      this.paiTamanho / colunas - 3
    );
  }

  destaqueOrigem(colunas) {
    let x = (this.numColunas * this.paiTamanho) / colunas + 1;
    let y = (this.numLinhas * this.paiTamanho) / colunas + 1;

    ctx.fillStyle = 'red';
    ctx.fillRect(
      x,
      y,
      this.paiTamanho / colunas - 3,
      this.paiTamanho / colunas - 3
    );
  }
}

// BUSCANDO CAMINHOS NO LABIRINTO

function buscar() {

  var ponto1, ponto2;

  let min = 5;
  let max = 99;

  let aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

  ponto1 = parseInt(0);
  ponto2 = parseInt(aleatorio);

  var matrixLogic = newLabirinto.getGrid();

  var graphLogic = new Graph(100);

  for (var i = 0; i < 100; ++i) {
      graphLogic.addVertex(i);
  }

  for (var i = 0; i < 10; ++i) {
    for (var j = 0; j < 10; ++j) {

      var parede = matrixLogic[i][j].Paredes;
      let origem, destino;
        
        if (parede.topParede == false && matrixLogic[i - 1][j].Visitados) {
          origem = i * 10 + j;
          destino = (i - 1) * 10 + j;
          graphLogic.addEdge(origem, destino);
          matrixLogic[i][j].ParedeTop(true);
        }
        if (parede.botParede == false && matrixLogic[i + 1][j].Visitados) {
          origem = i * 10 + j;
          destino = (i + 1) * 10 + j;
          graphLogic.addEdge(origem, destino);
          matrixLogic[i][j].ParedeBot(true);
        }
        if (parede.direitaParede == false && matrixLogic[i][j + 1].Visitados) {
          origem = i * 10 + j;
          destino = i * 10 + (j + 1);
          graphLogic.addEdge(origem, destino);
          matrixLogic[i][j].ParedeDireita(true);
        }
        if (parede.esquerdaParede == false && matrixLogic[i][j - 1].Visitados) {
          origem = i * 10 + j;
          destino = i * 10 + (j - 1);
          graphLogic.addEdge(origem, destino);
          matrixLogic[i][j].ParedeEsquerda(true);
        }
    }
  }

    paintPath(graphLogic.findPath(ponto1, ponto2));
    paintDestiny(graphLogic.findPath(ponto1, ponto2));

}

function paintPath(steps) {
  let p, q;
  var counter = 0;
 
   var i = setInterval(function () {
      counter++;
      if (counter === steps.length) {
        clearInterval(i);
        paintCheack(p, q);
      }
      if (steps[counter] < 10) {
        p = (steps[counter] * 500) / 10 + 1;
        q = 0;
      } else {
        p = (parseInt(steps[counter] % 10) * 500) / 10 + 1;
        q = (parseInt(steps[counter] / 10) * 500) / 10 + 1;
      }
      //  x = (this.numColunas * this.paiTamanho) / colunas + 1;
      paint(p, q);
  }, 200);
  function paint(p, q) {
    ctx.fillStyle = '#e72cd1';
    ctx.fillRect(p, q, 500 / 10 - 3, 500 / 10 - 3);
  }

  function paintCheack(p, q) {
     ctx.fillStyle = '#7CF000';
     ctx.fillRect(p, q, 500 / 10 - 3, 500 / 10 - 3);
  }
}

function paintDestiny(steps) {
  let p, q;
  var counter = -1;
  var i = setInterval( function () {
    counter++;
    if (counter === steps.length) {
      clearInterval(i);
      paintDestino(p, q);
    }
    if (steps[counter] < 10) {
      p = (steps[counter] * 500) / 10 + 1;
      q = 0;
    } else {
      p = ( parseInt(steps[counter] % 10) * 500) / 10 + 1;
      q = ( parseInt(steps[counter] / 10) * 500) / 10 + 1;
    }
  });

  function paintDestino(p, q) {
    ctx.fillStyle = '#efe804';
    ctx.fillRect(p, q, 500 / 10 - 3, 500 / 10 - 3);
  }
}

/* Botões */

function ativar() {
  let btnGerar = document.querySelector('#gerar');

  btnGerar.addEventListener('click', () => {
    newLabirinto.draw();
  });
}

function buscarAtiva() {
  let btnGerar = document.querySelector('#buscar');

  btnGerar.addEventListener('click', () => {
    buscar();
  });
}

function novo() {
  let btnNovo = document.querySelector('#new');

  btnNovo.addEventListener('click', () => {
    location.reload();
  });
}

let newLabirinto = new Labirinto(500, 10, 10);
newLabirinto.setup();
newLabirinto.drawInicial();
ativar();
novo();
buscarAtiva();
