var clock;      //handler per il timer
var PCposizioniOccupate = new Array();
var PCposizioniND = new Array();
var coordColpite = new Array();
var coordVuote = new Array();
var PCcoordColpite = new Array();
var PCcoordVuote = new Array();
var posizioniOccupate = new Array();
var lunghezzaColpite =0;   //longest strike
var tempCC = new Array();
var lunRimaste = [4,3,3,3,2,2,2,1,1];
var _windowResult;

var controllaNext='';    // nuova coordinata da controllare
var orientamentoNext=-1;     //0->N, 1->E, 2->S, 3->O
var coordinataPrec = ''; //nel caso il primo ciclo andasse male
var timeScore="";

console.log(localStorage);


function begin(){

    //avvio il timer
    document.getElementById('clock').value="00:00:00";
    clock=setInterval("setTime()",1000);

    var matrix = document.getElementsByClassName('square-container');
    for (var i=0; i<2; i++){

        for (var j=0; j<11; j++){

            var row = document.createElement('div');
            row.setAttribute('id','row'+j);
            row.setAttribute('class','row');
            matrix[i].appendChild(row);
    
            if (j==0){
                    // scrivi le lettere dell'alfabeto (ricorda di lasciare prima uno spazio bianco)
                    for (var k=0; k<11; k++){
    
                        var square = document.createElement('div');
                        square.setAttribute('id','letter'+k);
                        square.setAttribute('class','letter');
                        if (k!=0) square.textContent = String.fromCharCode(64+k);
                        row.appendChild(square);
                    }
            }
            else{
                    for (var k=0; k<11; k++){
                        
                        var square = document.createElement('div');
                        if (k==0){
                            square.setAttribute('id', 'number'+j);
                            square.setAttribute('class','number');
                            square.textContent = j;
                        }
                        else{
                            var name = String.fromCharCode(64+k) + j;
                            square.setAttribute('id', i+'-'+name);
                            square.setAttribute('class','tile'+i);
                            square.textContent=' ';
                        }
                        row.appendChild(square);
                    }
            }
        }   
    }
    riempiUser();  
    avviaPC(); 

}


function setTime(){
            
    var time = document.getElementById("clock");    
    var parts = time.value.split(':');
    var hour = parseInt(parts[0].split('')[1]);
    var min = parseInt(parts[1]);
    var sec = parseInt(parts[2]);
    sec++;

    if (sec==60){
        sec=0;
        min++;
    }
    if (min==60){
        min=0;
        hour++;
    }
    if (time.value=="03:00:00"){
        clearInterval(clock);
    }

    time.value= '0'+hour+':'+( (min<10)?('0'+min):min )+':'+( (sec<10)?('0'+sec):sec );
}


function riempiUser(){

//    var squares = document.getElementsByClassName('tile0');

    for(var i=0; i<localStorage.length; i++){       //per ogni nave

        var nave = localStorage.key(i);    //ottengo il nome
        var modello = nave.split('-')[0];
        console.log('naveID: '+nave);      

        var coordinate = localStorage.getItem(nave).split('-');
        console.log('coordinate: '+coordinate);
        //mi segno le coordinate occupate dallo user
        for (var l=1; l<coordinate.length; l++){
            posizioniOccupate.push(coordinate[l]);
        }     

        var direzione = coordinate[0];
        if (direzione=='O'){            //direzione orizzontale
            for (var j=1; j<coordinate.length; j++){

                var casella = document.getElementById('0-'+coordinate[j]);
                console.log('coordinate[j]: '+coordinate[j]);
                casella.style.backgroundImage="url('img/"+modello+"O"+j+".jpg')";
                casella.style.backgroundPosition= "0px 0px"; 
                casella.style.backgroundSize= "45px 45px";          
            }
        }
        else{       //direzione verticale
            for (var j=1; j<coordinate.length; j++){
                console.log('j: '+j);
                console.log('coordinate.length: '+coordinate.length);
                var casella = document.getElementById('0-'+coordinate[j]);
                console.log('casella: '+casella.id);
                casella.style.backgroundImage="url('img/"+modello+"V"+j+".jpg')";
                casella.style.backgroundPosition= "0px 0px"; 
                casella.style.backgroundSize= "45px 45px";              
            }
        }
    }        
}


function avviaPC(){

    for(var i=0; i<9; i++){      
        console.log('nave i: '+i);
        var lunghezza;      //determino la lunghezza della nave
        switch(i){
            case 0: lunghezza=4; break;
            case 1: 
            case 2:
            case 3: lunghezza=3; break;
            case 4:
            case 5:
            case 6: lunghezza=2; break;
            case 7:
            case 8: lunghezza=1; break;
        }

        var flag;
        var xNum;
        var y;
        var direzione;
        do{
            xNum = Math.floor(Math.random()*10+1);  //scelgo un numero a caso tra 1 e 10
            console.log('xNum: '+xNum);
            y = Math.floor(Math.random()*10+1);     //scelgo un numero a caso tra 1 e 10 che rappresenta una lettera
            console.log('y: '+y);
            direzione = Math.floor(Math.random()*2);    //se 0->Orizzontale, se 1->Verticale
            console.log('direzione: '+direzione);
            flag= check(xNum,y,direzione,lunghezza);        //controllo se la coordinata è già stata usata
        } while(flag==true);

        for (var j=0; j<lunghezza; j++){
            if(direzione==0)
                var coordinata = String.fromCharCode(64+xNum+j)+( (y==10)?'10':String.fromCharCode(48+y));                
            else{
                var coordinata = String.fromCharCode(64+xNum)+( (y+j==10)?'10':String.fromCharCode(48+y+j));
            }
            PCposizioniOccupate.push(coordinata);
            console.log('PCposizioniOccupate: '+PCposizioniOccupate);
        }            
    }
}


function check(x,y,dir,lun){

    var invalid = false;
    var tempStrND = new Array();

    if (dir==0){   //caso orizzontale

        if ( x+(lun-1)<=10 ){

            if (x==1) var j=0;
            else var j=-1;
            if (x+(lun-1)==10) var length=lun;
            else var length = lun+1;

            for (j; j<length; j++){

                if(y==1) var m=0;
                else var m=-1;
                if (y==10) var limit=0;
                else var limit=1;

                for (m; m<=limit; m++){
                    if (y+m==10){                                         // ottengo l'attuale coordinata
                        coordinata = String.fromCharCode(64+x+j)+'10';
                    }
                    else coordinata = String.fromCharCode(64+x+j)+String.fromCharCode(48+y+m);
                    if(m==-1 || m==1 || (m==0 && j==-1) || (m==0 && j==lun) ){
                        for (var k=0; k<PCposizioniOccupate.length; k++){
                            if( coordinata==PCposizioniOccupate[k] ){
                                invalid = true;
                                console.log('trovato: '+coordinata+'->INVALID');
                                return invalid;
                            }
                        }
                    }
                    else{
                        for (var k=0; k<PCposizioniND.length; k++){
                            if( coordinata==PCposizioniND[k] ){
                                invalid = true;
                                console.log('trovato->INVALID');
                                return invalid;
                            }
                        }
                    }
                    tempStrND.push(coordinata);
                }                      
            }   
        }
        else{
            invalid=true;
            console.log('sfora il bordo!');
            return invalid;
        }
    }
    else{   //caso verticale
        if ( y+(lun-1)<=10 ){    

            if (y==1) var j=0;
            else var j=-1;
            if (y+(lun-1)==10) var length=lun;
            else var length = lun+1;

            for (j; j<length; j++){

                if(x==1) var m=0;
                else var m=-1;
                if (x==10) var limit=0;
                else var limit=1;

                for (m; m<=limit; m++){
                    if (y+j==10){                                         // ottengo l'attuale coordinata
                        coordinata = String.fromCharCode(64+x+m)+'10';
                    }
                    else coordinata = String.fromCharCode(64+x+m)+String.fromCharCode(48+y+j);          //!!!
                    
                    if(m==-1 || m==1 || (m==0 && j==-1) || (m==0 && j==lun) ){
                        for (var k=0; k<PCposizioniOccupate.length; k++){
                            if( coordinata==PCposizioniOccupate[k] ){
                                invalid = true;
                                console.log('trovato->INVALID');
                                return invalid;
                            }
                        }
                    }
                    else{
                        for (var k=0; k<PCposizioniND.length; k++){
                            if( coordinata==PCposizioniND[k] ){
                                invalid = true;
                                console.log('trovato->INVALID');
                                return invalid;
                            }
                        }
                    }
                    tempStrND.push(coordinata);
                }                      
            }     
        }
        else{
            invalid=true;
            console.log('sfora il bordo!');
            return invalid;
        }
    }
    console.log('tempStrdND: '+tempStrND);
    for (var s=0; s<tempStrND.length; s++){
        PCposizioniND.push(tempStrND[s]);
    }
    console.log(PCposizioniND);
    return invalid;
}


function verifica(but){

    if(PCcoordVuote.length!=0){
        console.log('PCcoordVuote: '+PCcoordVuote);
    }
    if(PCcoordColpite.length!=0){
        console.log('PCcoordColpite: '+PCcoordColpite);
    }
    
    const pattern = /^([A-J])([1-9]|10)$/;

    var e = document.getElementById('choosenCoord');

    if (e.value == null || e.value=='') {
        alert('Inserisci le coordinate!');
        return;
    }
    else if( !(pattern.test(e.value)) ){
        alert('Coordinate non valide!');
        return;
    }

    var already = false;
    for (var i=0; i<PCcoordColpite.length; i++){
        if (e.value==PCcoordColpite[i]){
            already = true;
            break;
        }
    }
    if(already==false){
        for(var j=0; j<PCcoordVuote.length; j++){
            if(e.value==PCcoordVuote[j]){
                already = true;
                break;
            }
        }
    }
    if(already==true){
        alert('Posizione già controllata!');
    }
    else colpisci(e.value);
}


function colpisci(val){

    var occupato = false;
    //individuo la casella nella matrice di PC
    var casella = document.getElementById('1-'+val);

    //controllo se ha colpito una delle navi di PC
    for (var i=0; i<PCposizioniOccupate.length; i++){
        if(val==PCposizioniOccupate[i]){
            occupato=true;
            casella.style.backgroundImage="url('img/fire.jpg')";
            casella.style.backgroundPosition="0px 0px";
            casella.style.backgroundSize="45px 45px";
            PCcoordColpite.push(val);
            break;                                  //sistemare il caso in cui le navi sono state TUTTE colpite
        }
    }

    if (occupato==false){
        casella.style.backgroundImage="url('img/waveX.jpg')";
        casella.style.backgroundPosition="0px 0px";
        casella.style.backgroundSize="45px 45px";
        PCcoordVuote.push(val);
    }

    inputDisable();
    //controllo se ho affondato tutte le navi di PC
    if (PCcoordColpite.length==21){
        clearInterval(clock);
        timeScore = document.getElementById("clock").value;

        if (sessionStorage.getItem('status') != null){

            console.log("sono dentro if con sessionStorage");
            var userName = document.getElementById("userName").textContent;
            $.post( 'http://localhost/project/php/manageScore.php', { user: userName, time: timeScore } )          //sistemare log out   
                .done((data) => console.log(data));  
        }
        openWindow();                         
        showResult('US');    
        window.location.replace("classifiche.php");  
        setTimeout("stopWindow()", 5000);
    }
    else{
    setTimeout(PCcolpisci,1200);
    }
}


function PCcolpisci(){
    console.log("sono PCcolpisci e sono stato chiamato!");

    var posizione;

    if (orientamentoNext==-1){     //se scelgo una casella random (quindi ricomincio il ciclo di orientamento)
            var presente=false;
            //scelgo una nuova coordinata random non ancora scelta
            do{
                var x = Math.floor(Math.random()*10+1);  //scelgo un numero a caso tra 1 e 10 che rappresenta una lettera
                var y = Math.floor(Math.random()*10+1);  //scelgo un numero a caso tra 1 e 10
                if (y==10)
                    posizione = String.fromCharCode(64+x)+'10';
                else 
                    posizione = String.fromCharCode(64+x)+String.fromCharCode(48+y);

                presente = checkalready(posizione);
            } while(presente==true)
    }
    else posizione = controllaNext;

    //individuo la casella corrispondente sulla matrice dello user
    console.log(posizione);
    var tile = document.getElementById('0-'+posizione);

    //controllo se PC colpisce una nave avversaria
    var switchFlag = false;
    var colpito=false;
    for(var j=0; j<posizioniOccupate.length;j++){

        if(posizione==posizioniOccupate[j]){

            colpito = true;
            tile.style.backgroundImage="url('img/fire.jpg')";
            tile.style.backgroundPosition="0px 0px";
            tile.style.backgroundSize="45px 45px";
            tempCC.push(posizione);
            lunghezzaColpite++;
            var x = posizione.split('')[0];
            var y = (posizione.split('').length==3)?'10':posizione.split('')[1];

            if(lunghezzaColpite==lunRimaste[0]){
                orientamentoNext=-1;
            }
            else if (lunghezzaColpite==1){
                orientamentoNext=0;        //inizio a cercare intorno partendo da NORD
                coordinataPrec=posizione;
            }
            else {
                if( (orientamentoNext==0 && y=='1') || (orientamentoNext==1 && x=='J') || (orientamentoNext==2 && y=='10') || (orientamentoNext==3 && x=='A')){
                    switchFlag=true;
                }
            }             
            // altrimenti lascio che l'orientamento resti lo stesso
            break;
        }
    }            
    console.log('orientamentoNext prima di switch1 e switch2: '+orientamentoNext);
    if (colpito==false){        // PC ha colpito una posizione vuota
        tile.style.backgroundImage="url('img/waveX.jpg')";
        tile.style.backgroundPosition="0px 0px";
        tile.style.backgroundSize="45px 45px";
        coordVuote.push(posizione);

        if(lunghezzaColpite==1 && orientamentoNext==3){
            orientamentoNext=-1;
        }
        else if(lunghezzaColpite==1 && orientamentoNext!=-1){
            orientamentoNext++;
        }
        
        else if(lunghezzaColpite==1 && orientamentoNext==-1){
            orientamentoNext=0;
        }
        else if(lunghezzaColpite==0){
            orientamentoNext=-1;        //dovrebbe essere di default
        }
        else if(lunghezzaColpite>1){
            switchFlag=true;           
        }
    }
    
    if (switchFlag==true){
        console.log('sono entrato nel primo switch');
        switch(orientamentoNext){
            case 0: 
                if (colpito==false) var tempLC = lunghezzaColpite;
                else var tempLC = lunghezzaColpite-1;
                if(parseInt(posizione.split('')[1])+lunghezzaColpite==10) var tempY = '10';
                else var tempY = String.fromCharCode(posizione.split('')[1].charCodeAt(0)+tempLC);
                coordinataPrec = posizione.split('')[0]+tempY;
                console.log('coordinata dorigine: '+coordinataPrec);
                orientamentoNext=2;
                break;

            case 1:
                if( posizione.length==3 ) var tempY = '10';
                else var tempY = posizione[1];
                if (colpito==false) var tempLC = lunghezzaColpite;
                else var tempLC = lunghezzaColpite-1;
                coordinataPrec = String.fromCharCode(posizione.charCodeAt(0)-tempLC)+tempY;
                console.log('coordinata precedente/d origine: '+coordinataPrec);
                orientamentoNext=3;
                break;

            case 2:
                if (colpito==false) var tempLC = lunghezzaColpite;
                else var tempLC = lunghezzaColpite-1;
                if(posizione.split('').length==3) var tempY = String.fromCharCode(48+(10-tempLC));
                else var tempY = String.fromCharCode(posizione.split('')[1].charCodeAt(0)-tempLC);
                coordinataPrec = posizione.split('')[0]+tempY;
                console.log('coordinata precedente/d origine: '+coordinataPrec);
                orientamentoNext=0;
                break;

            case 3:
                if (colpito==false) var tempLC = lunghezzaColpite;
                else var tempLC = lunghezzaColpite-1;
                if( posizione.length==3 ) var tempY = '10';
                else var tempY = posizione.split('')[1];
                coordinataPrec = String.fromCharCode(posizione.split('')[0].charCodeAt(0)+tempLC)+tempY;
                console.log('coordinata d origine: '+coordinataPrec);
                orientamentoNext=1;
                break;
        }
    }

    console.log('orientamentoNext dopo primo switch: '+orientamentoNext);

out:
    //sistemo la coordinata successiva da controllare
    if (orientamentoNext!=-1){

        var k = orientamentoNext;            
        for(k; k<4; k++){
            switch(k){
                case 0:         //nord
                    if(colpito==true && switchFlag==false) var tempPos = posizione;
                    else var tempPos = coordinataPrec;
                    var xN = String.fromCharCode( tempPos.split('')[0].charCodeAt(0) );
                    var yN = (tempPos.split('').length==3)?'9':String.fromCharCode( tempPos.split('')[1].charCodeAt(0)-1);
                    var tempNext = xN+yN;
                    console.log(tempNext+'->already?:'+checkalready(tempNext));
     
                    if( (checkalready(tempNext) && lunghezzaColpite>1) || (yN=='0' && lunghezzaColpite>1)){      // se è già stata cercata scelgo una nuova coordinata
                        orientamentoNext=-1;
                        console.log(tempNext+'->already?:'+checkalready(tempNext));
                        break out;
                    }
                    else if ( checkalready(tempNext) || yN=='0') break;
                    else
                    {   //se la coordinata risulta valida
                        controllaNext = tempNext;
                        orientamentoNext=0;         //mantengo la direzione (0->nord)
                        break out;
                    }

                case 1:         //est
                    if(colpito==true && switchFlag==false) var tempPos = posizione;
                    else var tempPos = coordinataPrec;
                    var xN = String.fromCharCode( tempPos.split('')[0].charCodeAt(0)+1 );
                    var yN = (tempPos.split('').length==3)?'10':String.fromCharCode( tempPos.split('')[1].charCodeAt(0) );
                    var tempNext = xN+yN;
                    console.log(tempNext+'->already?:'+checkalready(tempNext));

                    if ( (checkalready(tempNext) && lunghezzaColpite>1) || (xN=='K' && lunghezzaColpite>1) ){
                        orientamentoNext=-1;
                        console.log(tempNext+'->already?:'+checkalready(tempNext));
                        break out;
                    }
                    else if ( xN=='K' || ( checkalready(tempNext) && lunghezzaColpite==1)) break;
                    else{
                        controllaNext = tempNext;
                        orientamentoNext=1;     //mantengo la direzione (0->est)
                        break out;
                    }
                                        
                case 2:          //sud
                    if(colpito==true && switchFlag==false) var tempPos = posizione;
                    else var tempPos = coordinataPrec;
                    var xN = tempPos[0];
                    if (tempPos.length==3) var yN = ':';
                    else if(tempPos[1]=='9') var yN ='10';
                    else {
                        var yN = String.fromCharCode( tempPos.split('')[1].charCodeAt(0)+1);
                    }
                    var tempNext = xN+yN;
                    console.log(tempNext+'->already?:'+checkalready(tempNext));
                    
                    if( (checkalready(tempNext) && lunghezzaColpite>1) || (yN==':' && lunghezzaColpite>1)){
                        console.log(tempNext+'->already?:'+checkalready(tempNext));
                        orientamentoNext=-1;
                        break out;
                    }
                    else if ( yN==':' || ( checkalready(tempNext) && lunghezzaColpite==1)) break;
                    else{
                        controllaNext = tempNext;
                        orientamentoNext=2;     //mantengo la direzione (2->sud)
                        break out;
                    }
        
                case 3:         //ovest
                    if(colpito==true && switchFlag==false) var tempPos = posizione;
                    else var tempPos = coordinataPrec;
                    var xN = String.fromCharCode( tempPos.split('')[0].charCodeAt(0)-1 );
                    var yN = (tempPos.length==3)?'10':String.fromCharCode( tempPos.split('')[1].charCodeAt(0) );
                    var tempNext = xN+yN;
                    console.log(tempNext+'->already?:'+checkalready(tempNext));
                    if (xN=='@' || checkalready(tempNext) ){
                        console.log(tempNext+'->already?:'+checkalready(tempNext));
                        orientamentoNext=-1;
                    }
                    else{
                        controllaNext=tempNext;
                        orientamentoNext=3;
                    }
            }
        }
    }
    if(lunghezzaColpite>=1 && orientamentoNext==-1){

        for (var g=0; g<tempCC.length; g++){
            coordColpite.push(tempCC[g]);
        }
        tempCC.length=0;

        for (var h=0; h<lunRimaste.length; h++){
            if (lunghezzaColpite==lunRimaste[h]){
                lunRimaste.splice(h,1);
                break;
            }
        }
        lunghezzaColpite=0;
        console.log("caso in cui ho terminato una nave");
    }

    console.log('coordinata precedente: '+coordinataPrec);
    console.log('orientamentoNext dopo switch2: '+orientamentoNext);
    console.log('controllaNext: '+controllaNext);
    

    inputDisable();
    //controllo se ha vinto PC
    if (coordColpite.length==21){
        clearInterval(clock);
        openWindow();                    
        showResult('PC'); 
        window.location.replace("classifiche.php");      
        setTimeout("stopWindow()", 5000);
    }     
    console.log("sono arrivato alla fine di PCcolpisce");   

}


function checkalready(pos){
    console.log('coordinata candidata per PC: '+pos);
    var already=false;
    if (coordColpite.length!=0 ){
        for (var i=0; i<coordColpite.length; i++){

            if(pos==coordColpite[i]){ //la nuova coordinata coincide con una delle coordinate già scoperte essere occupate
                already=true;
                break;
            }

            console.log('controllo i vicini');
            //controllo se è adiacente ad una di quelle già scoperte essere occupate _____controllo nord e nord-est
            if(coordColpite[i].length==3 || (coordColpite[i].length==2 && coordColpite[i][1]!='1')){
                var yCheck;
                if( coordColpite[i].length==3) yCheck ='9'; 
                    else yCheck = String.fromCharCode(coordColpite[i].charCodeAt(1)-1);
                    if( pos == coordColpite[i][0]+yCheck ){
                        already=true;
                        console.log('nord occupato');
                        break;
                    }
                    if (coordColpite[i][0]!='J' ){                        
                        if (pos == String.fromCharCode(coordColpite[i].charCodeAt(0)+1)+yCheck){
                            already=true;
                            console.log('nord-est occupato');
                            break;
                        }
                    }
                }
                if( coordColpite[i][0]!='J'){  
                    var yCheck;         // controllo a est e sud-est
                    if (coordColpite[i].length==3) yCheck = '10';
                    else yCheck = coordColpite[i][1];
                    if ( pos == String.fromCharCode(coordColpite[i].charCodeAt(0)+1)+yCheck ){
                        already=true;
                        console.log('est occupato');
                        break;
                    }
                    if(coordColpite[i].length==2){
                        if(coordColpite[i][1]=='9') yCheck = '10';
                        else yCheck = String.fromCharCode(coordColpite[i].charCodeAt(1)+1);
                        if ( pos == String.fromCharCode(coordColpite[i].charCodeAt(0)+1)+yCheck ){
                            already=true;
                            console.log('sud-est occupato');
                            break;
                        }
                    }
                }
                if(coordColpite[i].length==2){      //controllo a sud e sud-ovest
                    if(coordColpite[i][1]=='9') var yCheck = '10';
                    else var yCheck = String.fromCharCode(coordColpite[i].charCodeAt(1)+1);
                    if ( pos == coordColpite[i][0]+yCheck ){
                        already=true;
                        console.log('sud occupato');
                        break;
                    }
                    if (coordColpite[i][0]!='A'){
                        if( pos == String.fromCharCode(coordColpite[i].charCodeAt(0)-1)+yCheck ){
                            already=true;
                            console.log('sud-ovest occupato');
                            break;
                        }
                    }
                }
                if (coordColpite[i][0]!='A'){        //controllo a ovest  e nord-ovest
                    var yCheck;
                    if (coordColpite[i].length==3) yCheck = '10';
                    else yCheck = coordColpite[i][1];
                    if (pos == String.fromCharCode(coordColpite[i].charCodeAt(0)-1)+yCheck ){
                        already=true;
                        console.log('ovest occupato');
                        break;
                    }
                    if(coordColpite[i].length==3 || (coordColpite[i].length==2 && coordColpite[i][1]!='1')){
                        if( coordColpite[i].length==3)  yCheck ='9';
                        else yCheck = String.fromCharCode(coordColpite[i].charCodeAt(1)-1);
                        if (pos == String.fromCharCode(coordColpite[i].charCodeAt(0)-1)+yCheck){
                            already=true;
                            console.log('nord-ovest occupato');
                            break;
                        }

                    }
                }                      
        }
    }
    if (already==false && coordVuote.length!=0){
            for (var j=0; j<coordVuote.length; j++){
                if(pos==coordVuote[j]){
                already=true;                                  //la nuova coordinata coincide con una delle coordinate già scoperte essere vuote
                break;
                }
            }
    }
    return already;
}

function inputDisable(){

    document.getElementById('choosenCoord').disabled = !document.getElementById('choosenCoord').disabled;
    document.getElementById('control-but').disabled = !document.getElementById('control-but').disabled;
}

function openWindow(){
    if ( (_windowResult==null) || (_windowResult.closed) ){

        _windowResult = window.open("", "Risultato", "width=400,height=400,resizable=yes,location=no,menubar=no,toolbar=no,titlebar=no");
        _windowResult.document.open();                                                          
        _windowResult.document.writeln('<!DOCTYPE html>'); 
        _windowResult.document.writeln('<html><head><meta charset="utf-8"><title>Risultato</title><link rel="stylesheet" href="styling.css"></head>');
    }
}

function showResult(winner){

    _windowResult.focus();
    _windowResult.document.writeln('<body><div id="result-display"><h2>');
    if (winner=='US'){
        _windowResult.document.writeln('Hai vinto!</h2>');
        _windowResult.document.writeln('<h3>Tempo: '+timeScore+'</h3>');
    }
    else{
        _windowResult.document.writeln('Hai perso!</h2>');
    }

    _windowResult.document.writeln('</div></body></html>');
}

function stopWindow(){

    _windowResult.close(); 
    
}

function deleteStatus(){

    sessionStorage.removeItem('status');
}
