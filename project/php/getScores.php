<?php

    $nomeHost = "localhost";
    $nomeUtente = "id19749266_root";
    $password = "fiz/Z6D)f!T+{^\=";
    $nomeDB = "id19749266_battaglianavale";

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $mysqli= new mysqli($nomeHost, $nomeUtente, $password, $nomeDB);

    if ($mysqli->connect_error){
        die('Connessione fallita: ' .$mysqli->connect_error);
    }
    
    //classifica generale
    echo '<div id="generalTable" class="tableCont"><h2>CLASSIFICA GENERALE</h2><table>'; 
    echo '<tr id="header"><th>Posizione</th><th>Utente</th><th>Tempo</th></tr>';
    $query = "SELECT utente, tempo FROM punteggio ORDER BY tempo ASC LIMIT 10"; 
    $result = mysqli_query($mysqli,$query);
    
    $i=1;
    while($row = mysqli_fetch_array($result)){ 
        echo "<tr><td>" . $i . "</td><td>" . $row['utente'] . "</td><td>" . $row['tempo'] . "</td></tr>";
        $i++;
    }

    echo '</table></div>'; 

    //classifica dello user
    if ( isset($_SESSION['id']) && isset($_SESSION['name']) ) {

        $user = $_SESSION['name'];

        echo'<div id="userTable" class="tableCont"><h2>CLASSIFICA DI '.$user.'</h2><table>';
        echo '<tr id="header"><th>Numero</th><th>Tempo</th><th>Quando</th></tr>';

        $query1 = "SELECT punteggioID, tempo, timeStamp
                    FROM punteggio
                    WHERE utente = '{$user}'
                    ORDER BY tempo ASC
                    LIMIT 10";

        $result1 = mysqli_query($mysqli,$query1);
        
        $j=1;
        while($row1 = mysqli_fetch_array($result1)){ 
            echo "<tr><td>" . $j . "</td><td>" . $row1['tempo'] . "</td><td>" . $row1['timeStamp'] . "</td></tr>";
            $j++;
        }
        echo '</table></div>'; 
    }


    $mysqli->close();

?>
