<?php

    $nomeHost = "localhost";
    $nomeUtente = "root";
    $password = "";
    $nomeDB = "battaglianavale";

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $mysqli= new mysqli($nomeHost, $nomeUtente, $password, $nomeDB);

    if ($mysqli->connect_error){
        die('Connessione fallita: ' .$mysqli->connect_error);
    }
    else {
        echo 'Connessione riuscita' . $mysqli->host_info . "\n";	
    }
    
    $username = $_POST['user'];
    $timeScore = $_POST['time'];

    $query = $mysqli->prepare('INSERT INTO punteggio (utente,tempo)
                                        VALUES (?,?)');
    $query->bind_param('ss',$username,$timeScore);
                            
    $query->execute();

?>