
//----------------------------------------- Class

function Vector (paraX , paraY){
    this.x = paraX ;
    this.y = paraY ;
}

function Rectangle( paraX , paraY , paraWidth, paraHeight ){
    this.x = paraX ;
    this.y = paraY ;
    this.w = paraWidth ;
    this.h = paraHeight ;
}

function Circle ( paraX , paraY , radius) {
    this.x = paraX ;
    this.y = paraY ;
    this.radius = radius ;
    
    this.in = null ;
    this.out = null ;
    
    this.on = false ;
}

Circle.prototype.Draw = function(ctx) {
    ctx.beginPath() 
    ctx.moveTo(this.x  , this.y );
    ctx.arc(this.x, this.y , this.radius , 0 , 2*Math.PI);
    ctx.closePath() ;
    ctx.fill() ;
}
Circle.prototype.isInside = function(vec2) {
    var dx = vec2.x-this.x ;
    var dy = this.y-vec2.y ;
    
    dx *= dx ;
    dy *= dy ;
    
    var dis = Math.sqrt( dx+dy );

    if(dis > this.radius)
        return false ;
    else    
        return true ;
}

function Button( paraX , paraY , paraWidth, paraHeight ) {
    this.rect = new Rectangle(paraX , paraY , paraWidth, paraHeight) ;
    
    this.high = "#FF0000" ;    // pure red color
    this.low = "#FF9980" ;  // faint red
    
    this.on = false ;
}

Button.prototype.Draw = function(ctx) { 
    if(this.on)
        ctx.fillStyle = this.high ;
    else    
        ctx.fillStyle = this.low ;
    
    ctx.fillRect( this.rect.x ,this.rect.y ,this.rect.w ,this.rect.h );
}

function Circuit(paraX , paraY , paraWidth, paraHeight) {
    this.rect = new Rectangle(paraX , paraY , paraWidth, paraHeight) ;
    
    this.gate = "" ;
    this.data = "" ;
    this.Connection = [] ;
    
}

Circuit.prototype.Draw = function(ctx) {
    ctx.fillStyle = "#e6e6ff" ;
    ctx.fillRect( this.rect.x ,this.rect.y ,this.rect.w ,this.rect.h );
    
    ctx.fillStyle = "black" ;
    ctx.font = "30px Arial" ;
    
    if(this.data.name) {
        ctx.fillText(this.data.name , this.rect.x + 20 , this.rect.y + 30 ) ;
            
        var y = 0 , radius = 5  , xUnit = 15 ; yUnit = 50;
            
        for(var i = 0 ; i< this.Connection.length ;i++) {
//            console.log(i) ;
            this.Connection[i].Draw(ctx) ;
        }
//            ctx.fillStyle = "cyan" ;
//            for(var i = 0 ; i < this.data.iportLeft.length ; i++) {
//                if(this.data.iportLeft[i] == "GND" || this.data.iportLeft[i] == "VCC") {
//                    ctx.fillStyle = "red" ;
//                }
//                else {
//                    ctx.fillStyle = "cyan" ;
//                }
//                ctx.beginPath() 
//                ctx.moveTo(this.rect.x + radius + xUnit , this.rect.y + y + radius + yUnit);
//                ctx.arc(this.rect.x + xUnit , this.rect.y +  radius + y + yUnit, radius , 0 , 2*Math.PI);
//                ctx.closePath() ;
//                ctx.fill() ;
//                
//                y += 30 ;
//            }   
//            y = 0 ;
//            xUnit = 135 ;
//            for(var i = 0 ; i < this.data.iportRight.length ; i++) {
//                if(this.data.iportRight[i] == "GND" || this.data.iportRight[i] == "VCC") {
//                    ctx.fillStyle = "red" ;
//                }
//                else {
//                    ctx.fillStyle = "cyan" ;
//                }
//                ctx.beginPath() ;
//                ctx.moveTo(this.rect.x + radius + xUnit , this.rect.y + y + radius + yUnit);
//                ctx.arc(this.rect.x + xUnit , this.rect.y +  radius + y + yUnit, radius , 0 , 2*Math.PI);
//                ctx.closePath() ;
//                
//                ctx.fill() ;
//                
//                y += 30 ;
//            }   
    }
    else
         ctx.fillText( "none" , this.rect.x + 20 , this.rect.y + 30 ) ;
}

//----------------------------------------- Variables , Objects

var c = document.getElementById("toolkit"); // toolkit is id of canvas element from html
var ctx = c.getContext("2d");
//var mouseData = new CustomMouse(1,2) ;

var ButtonObjects = [] ;
var CircuitObjects = [] ;
var OutputObjects = [] ; 

//----------------------------------------- Main Functions

window.onload = function() { // This functions whenever the page is loaded
    Start() ;
    Draw() ;
}

function Start() { 
    var buttonStartX = 40 ;
    
    for(var i = 0 ; i < 5 ; i++) {  // Initiating our buttons
        var tempButton = new Button(buttonStartX , 100 , 30 , 30) ;
        ButtonObjects.push(tempButton) ;
        
        buttonStartX += 45 ;
    }
    
    var circuitStartX = 40 ;
    for(var i = 0 ; i < 4 ; i++) {
        var tempCircuit = new Circuit(circuitStartX , 200 , 150 , 250) ;
        CircuitObjects.push(tempCircuit) ;
        
        circuitStartX += 180 ;
    }
    
    var outputStartX = 300 ;
    for(var i= 0 ; i < 4 ; i++) {
        var tempOutput = new Circle(outputStartX , 115 , 12) ;
        OutputObjects.push(tempOutput) ;
        
        outputStartX += 45 ;
    }
}


function Draw() { // A normal function which inclues complete draw method
    
    ctx.clearRect(0, 0 , 800 , 600) ;
    
    for(var i = 0 ; i< 5 ; i++) {
        ButtonObjects[i].Draw(ctx) ;
    }
    
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        CircuitObjects[i].Draw(ctx) ;
        for(var j = 0 ; j < CircuitObjects[i].Connection.length ; j++) {
            if(CircuitObjects[i].Connection[j].in) {
//                console.log("Drawing Connection") ;
                //draw
                ctx.moveTo(CircuitObjects[i].Connection[j].x , CircuitObjects[i].Connection[j].y) ;
                ctx.lineTo(CircuitObjects[i].Connection[j].in.rect.x , CircuitObjects[i].Connection[j].in.rect.y ) ;
                
                ctx.strokeStyle = "red";
                ctx.stroke() ;
            }
        }
    }
    
    for(var i = 0 ; i < OutputObjects.length ; i++) {
//        console.log(OutputObjects[i]) ;
        if(OutputObjects[i].on) {
            ctx.fillStyle = "#ff1a1a" ;  
            console.log("Sucuess on output value") ;
        }
        else {
            ctx.fillStyle = "#ffcccc" ;
        }
        OutputObjects[i].Draw(ctx) ;
        for(var j = 0 ; j < CircuitObjects[i].Connection.length ; j++) {
            if(CircuitObjects[i].Connection[j].out) {
//                console.log("Drawing Connection") ;
                //draw
                ctx.moveTo(CircuitObjects[i].Connection[j].x , CircuitObjects[i].Connection[j].y) ;
                ctx.lineTo(CircuitObjects[i].Connection[j].out.x , CircuitObjects[i].Connection[j].out.y ) ;
                
                ctx.strokeStyle = "red";
                ctx.stroke() ;
            }
        }
    }
    
//    ctx.beginPath();
//    var x , y , radius ;
//    x = 40 ;
//    y = 20 ;
//    radius = 20 ;
//    
//    for(var i = 0 ; i < 10 ; i++) {   
//        ctx.moveTo(x+radius , y+radius);
//        ctx.arc(x  , y+radius , radius , 0 , 2*Math.PI);
//        ctx.stroke();
//        x += 45;
//    }
//    //to draw a line in canvas
//    ctx.moveTo(0,80);
//    ctx.lineTo(407,80);
//    ctx.stroke();
//    x=40,y=100;
//    
//    for(var i=0 ; i<5 ; i++){  //for rectangles
//        ctx.rect(x,y,30,30);
//        ctx.stroke();
//        x+=45;
//    }    
//    
//    ctx.moveTo(0,160);
//    ctx.lineTo(407,160);
//    ctx.stroke();
//    ctx.rect(10,y+100,190,310);
//    ctx.rect(x-50,200,190,310);
//    ctx.stroke();
    
}
    
    
//----------------------------------------- Basic Functions
 

function OnMouseClick(mouseData) { // when we click on canvas this functuion is called 
    var mouseLocation = new Vector(mouseData.clientX -  9, mouseData.clientY - 9) ;

    for(var i = 0 ; i < ButtonObjects.length ; i++) {
        if( isInside(mouseLocation , ButtonObjects[i].rect ) ){ // mouse location and button rect from each element of ButtonObjects array
            console.log("clicked on Button Object "+(1+i)); 
            if(ButtonObjects[i].on) {
                ButtonObjects[i].on = false ;
                console.log("false") ;
            }
            else {
                ButtonObjects[i].on = true ;
                console.log("true") ;
            }
            break ;
        }
    }

    Draw() ;
}
var draggingObject = null ;
var lastMouseLocation = new Vector(0 , 0 );
function OnMouseDragStart(mouseData) {
    var mouseLocation = new Vector(mouseData.clientX -  9, mouseData.clientY - 9) ;
    
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        if( isInside(mouseLocation , CircuitObjects[i].rect)) {
//            console.log("In Circuilt") ;
            
            for( var j = 0 ; j < CircuitObjects[i].Connection.length ; j++) {
//                ctx.moveTo(CircuitObjects[i].Connection[j].x , CircuitObjects[i].Connection[j].y) ;
//                ctx.lineTo(mouseLocation.x , mouseLocation.y ) ;
                if(CircuitObjects[i].Connection[j].isInside(mouseLocation)) {
                    
                    draggingObject = CircuitObjects[i].Connection[j] ;
//                    console.log(draggingObject) ;
                    break ;
                }
//                ctx.strokeStyle = "cyan";
//                ctx.stroke() ;
            }
        }
    }
    

}
function OnMouseDrag(mouseData) {
    var mouseLocation = new Vector(mouseData.clientX -  9, mouseData.clientY - 9) ;
//    console.log(mouseData);
    if(draggingObject) {
        Draw() ;
        ctx.moveTo(draggingObject.x , draggingObject.y ) ;
        ctx.lineTo(mouseLocation.x , mouseLocation.y) ;
        ctx.strokeStyle = "red";
        ctx.stroke() ;
    }
    if(mouseData.clientX != 0 || mouseData.clientY != 0)
        lastMouseLocation = mouseLocation ;
}
function OnMouseDragEnd(mouseData) {
//    console.log(mouseData);
//    var mouseLocation = new Vector(mouseData.clientX -  9, mouseData.clientY - 9) ;
//    console.log(lastMouseLocation);
//    console.log("DraggingEnd") ;
    
    if(draggingObject) {
//        console.log(CircuitObjects) ;
        for(var i = 0 ; i < ButtonObjects.length ; i++) {
//            console.log(mouseLocation );
//            console.log(ButtonObjects[i].rect) ;
            if(isInside(lastMouseLocation , ButtonObjects[i].rect)) {      
//                console.log(CircuitObjects) ;
                draggingObject.in = ButtonObjects[i] ;
                draggingObject.out = null ;
                
//                console.log(CircuitObjects) ;
            }
        }
        
        for(var i = 0 ; i < OutputObjects.length ; i++) {
            if(OutputObjects[i].isInside(lastMouseLocation)) {
                draggingObject.in = null ;
                draggingObject.out = OutputObjects[i] ;
            }
        }
    }
    draggingObject = null ;
    Draw() ;
}

var update_func = setInterval(Update , 1000/30) ;
function Update() {
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        for(var j = 0 ; j < CircuitObjects[i].Connection.length ; j++) {
            for(var k = 0 ; k < CircuitObjects[i].data.table.length ; k++) {
                if(CircuitObjects[i].Connection[j].in) {
                    if(CircuitObjects[i].data.table[k].input[0] ==  CircuitObjects[i].Connection[j].in.on) {

                        if(CircuitObjects[i].Connection[j+1].out) {
                            var OutputObjectRef = CircuitObjects[i].Connection[j+1].out ; 
                            OutputObjectRef.on = CircuitObjects[i].data.table[k].output[0] ;
                            console.log(OutputObjects) ;
//                            console.log("Sucuess on output value") ;
                        }
                    }
                    else {
//                        if(CircuitObjects[i].Connection[j+1].out)
//                            CircuitObjects[i].Connection[j+1].out.on = false ;
                    }
                }
            }
        }
    }
    
    Draw() ;
}

function ICDrag(event, ic) {
    var pos = new Vector(event.clientX -  9, event.clientY - 9) ;
    for(var i = 0 ; i < CircuitObjects.length ; i++) {
        if(isInside(pos , CircuitObjects[i].rect )) {
            
            CircuitObjects[i].data = data_JSON.gate[ic] ;            
            
            var y = 0 , radius = 7  , xUnit = 15 ; yUnit = 50;
            for(var k = 0 ; k < data_JSON.gate[ic].iportLeft.length ; k++) {
                var tempPoint = new Circle(CircuitObjects[i].rect.x + xUnit , CircuitObjects[i].rect.y +  radius + y + yUnit, radius ) ;
                CircuitObjects[i].Connection.push(tempPoint) ;
                y += 30 ;
            }
            
            y = 0 ;
            xUnit = 135 ;
            for(var k = 0 ; k < data_JSON.gate[ic].iportRight.length ; k++) {
                var tempPoint = new Circle(CircuitObjects[i].rect.x + xUnit , CircuitObjects[i].rect.y +  radius + y + yUnit, radius ) ;
                CircuitObjects[i].Connection.push(tempPoint) ;
                y += 30 ;
            }
            
//            console.log("Name : "+name+" i : "+(i+1)) ;
        }
    }
    
    Draw() ;
}


function isInside( pos, rect) { //to check mouse pos and rectangle pos
    if ((pos.x > rect.x) && (pos.x < (rect.x+rect.w)) ) {
        if(( pos.y < (rect.y+rect.h) && (pos.y > rect.y))) {
            return true;
        }
        else    
            return false ;
    }
    else
        return false ;
}

//----------------------------------------- Event Listeners

c.addEventListener("click" , OnMouseClick) ;
c.addEventListener("dragstart" , OnMouseDragStart) ;
c.addEventListener("drag" , OnMouseDrag) ;
c.addEventListener("dragend" , OnMouseDragEnd) ;


function NOTGATE(event) {
    ICDrag(event , "7404") ;
}
document.getElementById("NOT").addEventListener("dragend" , NOTGATE) ;

function ANDGATE(event) {
    ICDrag(event , "7408") ;
}
document.getElementById("AND").addEventListener("dragend" , ANDGATE) ;

function ORGATE(event) {
    ICDrag(event , "7432") ;
}
document.getElementById("OR").addEventListener("dragend" , ORGATE) ;
