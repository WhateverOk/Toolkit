function SelectTable(table , input , inputIndex) {
    var selection = [] ;
  
    for(var i = 0 ; i < table.length ; i++) { 
        if(table[i].input[inputIndex] == input[inputIndex] )
            selection.push(table[i]) ;
    }
        
    if(inputIndex == input.length)
        return table ;
    else
        return SelectTable(selection , input , inputIndex+1 ) ;
}
function GetOutput(circuitIndex , input) { //input is a array
    var inputLength , table ;

    inputLength = CircuitObjects[circuitIndex].data.table[0].input.length ;
    table = CircuitObjects[circuitIndex].data.table ;

    if(inputLength != input.length)
        return 0 ;

    table = SelectTable(table , input , 0) ;

    if(table.length != 1)
        return 0 ;
    else
        return table[0].output[0] ;
}