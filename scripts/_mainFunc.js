function Start() { 
    var buttonStartX = 40 ;
    
    for(var i = 0 ; i < 10 ; i++) {  // Initiating our buttons
        var tempButton = new Button(buttonStartX , 500 , 30 , 30) ;
        ButtonObjects.push(tempButton) ;
        
        buttonStartX += 60 ;
    }
    
    var circuitStartX = 40 ;
    for(var i = 0 ; i < 4 ; i++) {
        var tempCircuit = new Circuit(circuitStartX , 200 , 150 , 250) ;
        CircuitObjects.push(tempCircuit) ;
        
        circuitStartX += 180 ;
    }
    
    var outputStartX = 60 ;
    for(var i= 0 ; i < 10 ; i++) {
        var tempOutput = new Circle(outputStartX , 115 , 12) ;
        OutputObjects.push(tempOutput) ;
        
        outputStartX += 60 ;
    }
}


function Draw() { // A normal function which inclues complete draw method
    
    ctx.clearRect(0, 0 , 800 , 600) ;
    
    for(var i = 0 ; i< ButtonObjects.length ; i++) { // All Input buttons 
        ButtonObjects[i].Draw(ctx) ;
    }
    
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        CircuitObjects[i].Draw(ctx) ;
        for(var j = 0 ; j < CircuitObjects[i].Connection.length ; j++) {
            if(CircuitObjects[i].Connection[j].in) {
//                console.log("Drawing Connection") ;
                //draw
                ctx.moveTo(CircuitObjects[i].Connection[j].x , CircuitObjects[i].Connection[j].y) ;
                if(CircuitObjects[i].Connection[j].in.rect) // update this later to simplier version to avoid errors between rect and circle object
                    ctx.lineTo(CircuitObjects[i].Connection[j].in.rect.x , CircuitObjects[i].Connection[j].in.rect.y ) ;
                else
                    ctx.lineTo(CircuitObjects[i].Connection[j].in.x , CircuitObjects[i].Connection[j].in.y ) ;
                
                ctx.strokeStyle = "red";
                ctx.stroke() ;
            }
        }
    }
    for(var k = 0 ; k < CircuitObjects.length ; k++) { //bugged Draws more than one output lines
        for(var i = 0 ; i < OutputObjects.length ; i++) { // Output buttons
    //        console.log(OutputObjects[i]) ;
            if(OutputObjects[i].on) {
                ctx.fillStyle = "#ff1a1a" ;  
                // console.log("Sucuess on output value") ;
            }
            else {
                ctx.fillStyle = "#ffcccc" ;
            }
            OutputObjects[i].Draw(ctx) ;
            for(var j = 0 ; j < CircuitObjects[k].Connection.length ; j++) {
                if(CircuitObjects[k].Connection[j].out) {
    //                console.log("Drawing Connection") ;
                    //draw
                    ctx.moveTo(CircuitObjects[k].Connection[j].x , CircuitObjects[k].Connection[j].y) ;
                    ctx.lineTo(CircuitObjects[k].Connection[j].out.x , CircuitObjects[k].Connection[j].out.y ) ;
                    
                    ctx.strokeStyle = "red";
                    ctx.stroke() ;
                }
            }
        }
    }
}

var update_func = setInterval(Update , 1000/30) ;
function Update() {
//     for(var i = 0 ; i < CircuitObjects.length ; i++) {
//         for(var j = 0 ; j < CircuitObjects[i].Connection.length ; j++) {
//             for(var k = 0 ; k < CircuitObjects[i].data.table.length ; k++) { // loop through all inputs

//                 if(CircuitObjects[i].Connection[j].in) {
//                     if(CircuitObjects[i].data.table[k].input[0] ==  CircuitObjects[i].Connection[j].in.on) {

//                         if(CircuitObjects[i].Connection[j+1].out) {
//                             var OutputObjectRef = CircuitObjects[i].Connection[j+1].out ; 
//                             OutputObjectRef.on = CircuitObjects[i].data.table[k].output[0] ;
//                             console.log(OutputObjects) ;
// //                            console.log("Sucuess on output value") ;
//                         }
//                     }
//                     else {
// //                        if(CircuitObjects[i].Connection[j+1].out)
// //                            CircuitObjects[i].Connection[j+1].out.on = false ;
//                     }
//                 }
//             }
//         }
//     }

    for(var i = 0 ; i < CircuitObjects.length ; i++) { // For all basic gates similar to Not and And 

        var circuit = CircuitObjects[i] ;
        var data = circuit.data ;
        if(data) {
            var inputLength = data.table[0].input.length ;

            for(var j = 0 ; j < circuit.Connection.length ; j += inputLength+1 ) {
                var input = [] ;
                var table = data.table ;
                var op = false ;

                for(var k = 0 ; k < inputLength ; k++) {
                    if(circuit.Connection[j+k].in) {
                        var ip = circuit.Connection[j+k].in.on ;
                        input.push(ip) ;
                    }
                }
                
                if(input.length > 0) {
                    op = GetOutput(i , input) ;
                    if(circuit.Connection[j+inputLength].out)
                        circuit.Connection[j+inputLength].out.on = op ;
                    // if(circuit.Connection[j+inputLength].in)
                        // circuit.Connection[j+inputLength].in.on = op ;
                    // console.log(circuit.Connection[j+inputLength]) ;
                }
            }
        }
    }
    
    Draw() ;
}