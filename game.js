// creo l'interfaccia del gioco
var posizionati= new Array();     // controllo se tutte le navi sono già state posizionate
var currShip;   // nave da posizionare
var currLength; //lunghezza della nave corrente
var posizioniOccupate = new Array();        //posizioni occupate dalle navi
var posizioniNonDisp = new Array();         // posizioni non vlaide 

function begin(){

    localStorage.clear();
    
    var display = document.getElementById('user-matrix');

    for (var j=0; j<11; j++){

        var row = document.createElement('div');
        row.setAttribute('id','row'+j);
        row.setAttribute('class','row');
        display.appendChild(row);

        if (j==0){
                // scrivi le lettere dell'alfabeto (ricorda di lasciare prima uno spazio bianco)
                for (var k=0; k<11; k++){

                    var tile = document.createElement('div');
                    tile.setAttribute('id','letter'+k);
                    tile.setAttribute('class','letter');
                    if (k!=0) tile.textContent = String.fromCharCode(64+k);
                    row.appendChild(tile);
                }
        }
        else{
                for (var k=0; k<11; k++){
                    
                    var tile = document.createElement('div');
                    if (k==0){
                        tile.setAttribute('id', 'number'+j);
                        tile.setAttribute('class','number');
                        tile.textContent = j;
                    }
                    else{
                        var name = String.fromCharCode(64+k) + j;
                        tile.setAttribute('id', name);
                        tile.setAttribute('class','tile');
                        tile.textContent=' ';
                    }
                    row.appendChild(tile);
                }
        }
    }
}


function position(ship){

    var location = document.getElementById("coord");
    var direction = document.getElementById("direction");

    currShip = ship.id;

    var assente = true;
    for (var n=0; n<posizionati.length; n++){
        if (currShip == posizionati[n]){
            alert('Nave già posizionata!');
            assente=false;
            disablebuttons();
        }
    }

    if (assente==true){
        
        var ships = document.getElementsByTagName('img');
        for (var i=0; i<ships.length; i++){
            ships[i].style.border="none";
        }

        location.disabled=false;
        direction.disabled=false;
        document.getElementById('pos-but').disabled=false;

        ship.style.border="1px solid black";

        var model = ship.id.split('-');

        switch(model[0]){
            case "corazzata": currLength = 4; break;
            case "sommergibile": currLength = 3; break;
            case "corvette": currLength = 2; break;
            case "lancia": currLength = 1; 
        }
        console.log('lunghezza: '+currLength);
    }
}


function place(){

    var position = document.getElementById('coord').value;
    var casella0 = document.getElementById(position);
    var direction = document.getElementById("direction").value;
    console.log('direzione: '+direction);

    var p = position.split("");
    var x = p[0];     
    var xNum = position.charCodeAt(0)-64;
    if (p.length==3){       //coordinata '10'
        var y = p[1]+p[2];
    }
    else var y = p[1];

    var name = currShip.split('-');
    var model = name[0];

    if (direction=="hor"){  //caso orizzontale

        if (xNum+currLength>11)     //se la posizione è sul margine destro
            alert('Posizione non valida!');
                
        else{                    
            var flag = false;
            var k=-1;

            while (k<(currLength+1) && flag==false){    //controllo se tutte le posizioni che andrò ad occupare sono libere e di non toccare nessuna altra nave

                if ( (xNum+k)>0 && (xNum+k)<11 ){         //controllo di rimanere all'interno della matrice
                    var xCoord = String.fromCharCode(x.charCodeAt(0)+k);
                    for (var m=-1; m<2; m++){
                        if ( (m==-1 && y==1) || (m==1 && y==10) )       //se mi trovo sull prima e ultima riga non controllo rispettivamente la riga superiore e quella inferiore
                            continue;
                        if (y=='10' && m==-1) var currCoor = xCoord +'9';
                        else if (y=='10' && m==0) var currCoor = xCoord + y;
                        else if (y=='9' && m==1) var currCoor = xCoord + '10';
                        else
                            var currCoor = xCoord+(String.fromCharCode(y.charCodeAt(0)+m));

                        console.log('coordinata controllata: '+currCoor);
                        if (posizioniNonDisp.length!=0){
                            if (m==0 && (k!=-1) && (k!=currLength) ){                                
                                for (var j=0; j<posizioniNonDisp.length; j++){     
                                    if( currCoor==posizioniNonDisp[j] ){
                                        flag=true;      // una delle posizione che deve occupare è già occupata o non è disponibile
                                        console.log('coordinata NON valida: '+currCoor);
                                        break;              
                                    }
                                }
                            }
                            else{
                                for (var j=0; j<posizioniOccupate.length; j++){
                                    if( currCoor==posizioniOccupate[j] ){
                                        flag=true;
                                        console.log('coordinata NON valida: '+currCoor);
                                        break;
                                    }
                                }
                            }                            
                        }                        
                    }
                }
                k++;
            }

            if (flag==true) alert('Posizione non valida!');       
                
            else{               //inserisco
        
                var coordinate = 'O-';
                for(var i=-1; i<currLength+1; i++){

                    if ( (xNum+i)>0 && (xNum+i)<11 ){

                        var xcoor = String.fromCharCode(x.charCodeAt(0)+i);
                        for (var n=-1; n<2; n++){
                            console.log('n:'+ n);
                            console.log('y(numero): '+y);

                            if ( (n==-1 && y==1) || (n==1 && y==10) ) //se mi trovo sull prima e ultima riga non controllo rispettivamente la riga superiore e quella inferiore
                                continue;
                            if (y=='10' && n==-1) var currCoor = xcoor +'9';
                            else if (y=='10' && n==0) var currCoor = xcoor + y;
                            else if (y=='9' && n==1) var currCoor = xcoor + '10';
                            else{
                                var currCoor = xcoor+(String.fromCharCode(y.charCodeAt(0)+n));
                            }
                            console.log('coordinata esaminata: '+currCoor);                               

                            if ( n==0 && i!=-1 && i!=currLength ){    //sistemo le caselle che verranno effettivamente occupate
                                var casella = document.getElementById(currCoor);
                                casella.style.backgroundImage="url('img/"+model+"O"+(i+1)+".jpg')";
                                casella.style.backgroundPosition= "0px 0px"; 
                                casella.style.backgroundSize= "45px 45px";
                                posizioniOccupate.push(currCoor);
                                if (i==(currLength-1) ) coordinate += currCoor;
                                else coordinate += currCoor+'-';  
                                console.log('casella occupata: '+currCoor);                              
                            }
                            posizioniNonDisp.push(currCoor);
                        }
                    }
                }                                                    
                posizionati.push(currShip);
                localStorage.setItem(currShip,coordinate);
                console.log(localStorage);
                console.log('posizioniOccupate: '+posizioniOccupate);
                console.log('posizioniNonDisp: '+posizioniNonDisp);
                disablebuttons();
                document.getElementById(currShip).style.opacity="0.2";
                document.getElementById('reset-but').disabled= false;
                if (posizionati.length==9)
                    document.getElementById("start-but").disabled=false;   
            }
        }        
    }
    else{       // caso verticale
            
        if (parseInt(y)-currLength<0){    //se la posizione va oltre il bordo superiore
            alert('Posizione non valida!');
            console.log('diff: '+(parseInt(y)-currLength));
        }                              
        else{                    
                var flag = false;
                var k=-1;

                while(k<(currLength+1) && flag==false){         //controllo se tutte le posizioni che andrò ad occupare sono libere

                    if( (parseInt(y)-k)>0 && (parseInt(y)-k)<11 ){
                
                        if (parseInt(y)-k==10){
                            var yCoord = '10';
                        }
                        else{
                            var yCoord = String.fromCharCode(48+(parseInt(y)-k));
                        }
                        
                        for (var m=-1; m<2; m++){
                            if( (m==-1 && xNum==1) || (m==1 && xNum==10) )
                                continue;
                            var currCoor = String.fromCharCode(x.charCodeAt(0)+m) + yCoord;
                            console.log('coordinata controllata: '+currCoor);
                            if (posizioniNonDisp.length!=0){
                                if (m==0 && (k!=-1) && (k!=currLength) ){
                                    for (var j=0; j<posizioniNonDisp.length; j++){     
                                        if( currCoor==posizioniNonDisp[j] ){
                                            flag=true;      // una delle posizione che deve occupare è già occupata o non è disponibile
                                            break;              
                                        }
                                    }
                                }
                                else{
                                    for (var j=0; j<posizioniOccupate.length; j++){
                                        if( currCoor==posizioniOccupate[j] ){
                                            flag=true;
                                            console.log('coordinata NON valida: '+currCoor);
                                            console.log(flag);
                                            break;
                                        }
                                    }
                                }
                            }                            
                        }
                    }
                    k++;
                }

                if (flag==true)   alert('Posizione non valida!');       

                else{           // inserisco

                    var coordinate = 'V-';    
                    for(var i=-1; i<currLength+1; i++){

                        if ( parseInt(y)-i>0 && parseInt(y)-i<11 ){

                            if (parseInt(y)-i==10){
                                var ycoor = '10';
                            }
                            else{
                                var ycoor = String.fromCharCode(48+(parseInt(y)-i));
                                console.log('ycoor: '+ycoor);
                            }

                            for(var n=-1; n<2; n++){
                                console.log('n: '+n);
                                console.log('x(lettera): '+x);

                                if( (n==-1 && xNum==1) || (n==1 && xNum==10) ) continue;
                                var currCoor = String.fromCharCode(x.charCodeAt(0)+n) + ycoor;
                                console.log('coordinata esaminata: '+currCoor);
                                if ( n==0 && i!=-1 && i!=currLength ){
                                    console.log( 'n==0 e i è diverso da -1 e currLength');
                                    var casella = document.getElementById(currCoor);
                                    casella.style.backgroundImage="url('img/"+model+"V"+(i+1)+".jpg')";
                                    casella.style.backgroundPosition= "0px 0px"; 
                                    casella.style.backgroundSize= "45px 45px";
                                    posizioniOccupate.push(currCoor);
                                    if (i==(currLength-1)) coordinate += currCoor;
                                    else coordinate += currCoor+'-';
                                    console.log('casella occupata: '+currCoor);
                                }
                                posizioniNonDisp.push(currCoor);
                            }
                        }                                               
                    }
                    posizionati.push(currShip);  
                    localStorage.setItem(currShip, coordinate);
                    console.log(localStorage);
                    console.log('posizioniOccupate: '+posizioniOccupate);
                    console.log('posizioniNonDisp: '+posizioniNonDisp); 
                    disablebuttons();
                    document.getElementById(currShip).style.opacity="0.2";
                    document.getElementById('reset-but').disabled= false;
                    if (posizionati.length==9)
                        document.getElementById("start-but").disabled=false;
            }           
        }        
    }
}


function check(){

    const pattern = /^([A-J])([1-9]|10)$/;

    var e = document.getElementById('coord');
    if(currShip == null) alert('Nessuna nave selezionata!');

    else if (e.value=='') {
        alert('Inserisci le coordinate!');
    }
    else if( !(pattern.test(e.value)) ){
        alert('Coordinate non valide!');
    }
    else{
        place();
    }
}

function disablebuttons(){

    var location = document.getElementById("coord");
    var direction = document.getElementById("direction");
    var button = document.getElementById('pos-but');

    location.value="";
    location.disabled=true;
    direction.disabled=true;   
    button.disabled=true;

}

function reset(but){
    
    console.log('funzione RESET:');
    localStorage.clear();
    posizionati.length=0;
    posizioniOccupate.length=0;
    posizioniNonDisp.length=0;

    console.log('posizionati: '+posizionati);
    console.log('posizioniOccupate: '+posizioniOccupate);
    console.log('posizioniNonDisp: '+posizioniNonDisp);
    if (currShip!= null){
        document.getElementById(currShip).style.border="none";
        currShip = null;
        currLength = null;
    }

    var squares = document.getElementsByClassName('tile');
    for (var i=0; i<squares.length; i++){
        squares[i].style.backgroundImage="url('img/wave-right.jpg')";
        squares[i].style.backgroundSize="45px 45px";
    }

    var navi = document.getElementsByTagName('img');
    for (var j=0; j<navi.length; j++){
        navi[j].style.opacity=1;
    }
    document.getElementById('coord').value="";
    document.getElementById('coord').placeholder="ex. A1";
    disablebuttons();
    document.getElementById('start-but').disabled=true;
}