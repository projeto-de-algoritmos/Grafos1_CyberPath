const graph = require("../logic/graphMain");

var vertice = 6;
var teste = new graph(vertice);

// Adicionando Vertice;
teste.addVertex('Carlos');
teste.addVertex('Bruna');
teste.addVertex('Chico');
teste.addVertex('John');
teste.addVertex('Pedro');
teste.addVertex('Rafael');

// Adicionando Aresta;
teste.addEdge('Carlos', 'Bruna'); 
teste.addEdge('Carlos', 'John'); 
teste.addEdge('Carlos', 'Pedro'); 
teste.addEdge('Bruna', 'Chico'); 
teste.addEdge('John', 'Pedro'); 
teste.addEdge('Pedro', 'Rafael'); 
teste.addEdge('Pedro', 'Chico'); 
teste.addEdge('Chico', 'Rafael'); 

teste.print();