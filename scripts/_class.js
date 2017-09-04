
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

function Pulsor() {
    
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