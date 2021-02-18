class Graph {

    constructor(vertex){
        this.vertex = vertex;
        this.listAdj = new Map();   
    }

    getKeys(){
        return this.listAdj.keys();
    }
    getValues(i){
        return this.listAdj.get(i);
    }
    addVertex(v){   
        this.listAdj.set(v, []);
    }
    addEdge(v, w){
        this.listAdj.get(v).push(w);
        this.listAdj.get(w).push(v); 
    }
    print(){
       var vertex = this.listAdj.keys();
       console.log("VERTEX -> LIST\n")
        for (var i of vertex)
        {
            var listAdj = this.listAdj.get(i);
            var sum = "";
            for (var j=0; j<listAdj.length; j++)
            {
                sum += listAdj[j];
                if(j!=listAdj.length-1)sum+=" && ";
                
            }
            console.log(i + " -> " + sum);
        }
    }
    bfs(v){
        var fila = [];
        var visitados = []; // vetor de visitados
    
        for(var i = 0; i < this.vertex; i++)visitados[i] = false;

        fila.push(v);
        visitados[v] = true; // marca como visitado
    
        while(fila.length!=0){
                var getElement = fila.shift();
                console.log(getElement); // Vertice atual 
                var get_values = this.listAdj.get(getElement); // Get adjList
                for(var i in get_values){
                    var value = get_values[i];
                    if(!visitados[value]){
                        visitados[value] = true;
                        fila.push(value);
                    }
                } 
        }
    } 
    dfs (v){
        var visitados = [];
        this.path(v, visitados);
    }
    path(v, visitados){
        visitados[v] = true;
        console.log(v); // Vertice atual

        var get_values = this.listAdj.get(v);

        for(var w in get_values){
            var value = get_values[w];
            if(!visitados[value])this.path(value, visitados)
        }
    }

}

module.exports = Graph;