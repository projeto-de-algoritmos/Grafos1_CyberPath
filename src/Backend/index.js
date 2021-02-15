class Graph {

    constructor(noOfVertices){
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();   
    }
    addVertex (v)
    {   
        this.AdjList.set(v, []);
    }
    addEdge(v, w){
 
        this.AdjList.get(v).push(w);
        //this.AdjList.get(w).push(v);
    }
    printGraph(){
        var get_keys = this.AdjList.keys();
 
        for (var i of get_keys){
            var get_values = this.AdjList.get(i);
            var conc = "";
            for (var j=0; j<get_values.length; j++)
                conc += get_values[j] + " ";
            console.log(i + " -> " + conc);
        }
    }   

}
var alunos = [
	{
		nome: "Carlos",
		nota :9.6
    },
	{
		nome : "Pedro",
		nota : 7.6
	},
	{
		nome:"Gabriela",
		nota:6.7
	},
	{
		nome:"Rafael",
		nota:4.6
	},
	{
		nome:"Juliana",
		nota:5.6
	},
	{
		nome:"Enzo",
		nota:3.0
	},
	{
		nome:"Daniel",
		nota:5.0
	},
	{
		nome:"John",
		nota:4.6
	},
	{
		nome:"Lennon",
		nota:3.3
	},
	{
		nome:"Dalbert",
		nota:4.6
	},
	{
		nome:"André",
		nota:9.6
	},
	{
		nome:"Zyra",
		nota:2.2
	},
	{
		nome:"Rakan",
		nota:1.2
	},
	{
		nome:"Yasuo",
		nota:0.0
	},
	{
		nome:"MasterYi",
		nota:8.6
	}
]
var maiores = [];
var menores = [];
console.log(maiores);
alunos.forEach(aluno => {
    (aluno["nota"] >= 5) ? maiores.push(aluno) : menores.push(aluno);
})

console.log(maiores, menores)
/*
while(1){

    var graph = new Graph(10);
        for (var i = 0; i < 10; i++) {
            graph.addVertex(alunos[i].nome);
        }
    
        for(var i=0 ; i<5; ++i){
                graph.addEdge(alunos[i], alunos[i+5]);
        }
        graph.printGraph();
        break;
}
*/