

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
        
        for(var i = 0 ; i < CircuitObjects.length ; i++) {
            // var circ = CircuitObjects[i] ;
            for(var j = 0 ; j < CircuitObjects[i].Connection.length ; j++) {
                var conn = CircuitObjects[i].Connection[j] ;
                if(conn.isInside(lastMouseLocation)) {
                    // draggingObject.out = conn ;
                    // conn.in = draggingObject ;
                    if(!conn.out)
                        conn.out = new Circle(conn.x,conn.y,0) ;
                    draggingObject.in = conn.out ;
                    // console.log(conn) ;
                }
            }
        }
        console.log(draggingObject); 
    }
    draggingObject = null ;
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
        }
    }
    
    Draw() ;
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

function XORGATE(event) {
    ICDrag(event , "7486") ;
}
document.getElementById("XOR").addEventListener("dragend" , XORGATE) ;