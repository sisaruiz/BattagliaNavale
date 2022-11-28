<?php
session_start();
?>
<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <title>Battaglia Navale</title>
        <link rel="stylesheet" href="styling.css">
        <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
        <script src="game.js"></script>
    </head>
    <body onload="begin()">
        <h1>Battaglia Navale</h1>
        <nav>
            <ul>
                <li><a class="nav-elem" href="home.php">Gioca</a></li>
                <li><a class="nav-elem" href="classifiche.php">Classifica</a></li>                
                <li><a class="nav-elem" href="documentazione.html" target="_blank">Come si gioca?</a></li>
            </ul>
            <div id="logCont">
                    <?php

                        if ( isset($_SESSION['id']) && isset($_SESSION['name']) ) {
                            echo'<script src="js/checkLoggedIn.js"></script>';
                            echo'<p>Benvenuto</p><p id="userName">';
                            echo $_SESSION['name']; 
                            echo '</p><a id="log-elem" href="logout.php">LOG OUT</a>';
                        }
                        else {
                            echo '<a id="log-elem" href="index.php">LOG IN</a>';
                        }
                    ?>
                </div>
        </nav>
        <div id="game-display">
            <div id="user-matrix" class="square-container">
                <h3 id="custom-desc">Posiziona la tua flotta</h3>
            </div>
            <div id="custom-display" class="square-container">
                <p>Seleziona la nave e indica la posizione:</p>
                <input id="coord" type="text" maxlength="3" placeholder="ex. A1" disabled>
                <select name="direction" id="direction" disabled>
                    <option value="hor">Orizzontale</option>
                    <option value="ver">Verticale</option>
                </select>   
                <button id="pos-but" class="gameBut" onclick="check()">POSIZIONA</button>
                <h5 class="desc">Corazzata</h5>
                <img alt="corazzata" id="corazzata-0" src="img/corazzata.jpg" onclick="position(this)">
                <h5 class="desc">Sommergibili</h5>
                <img alt="sommergibile" id="sommergibile-1" class="sommergibile" src="img/sommergibile.jpg" onclick="position(this)">
                <img alt="sommergibile" id="sommergibile-2" class="sommergibile" src="img/sommergibile.jpg" onclick="position(this)">
                <img alt="sommergibile" id="sommergibile-3" class="sommergibile" src="img/sommergibile.jpg" onclick="position(this)">
                <h5 class="desc">Corvette</h5>
                <img alt="corvette" id="corvette-1" class="corvette" src="img/corvette.jpg" onclick="position(this)">
                <img alt="corvette" id="corvette-2" class="corvette" src="img/corvette.jpg" onclick="position(this)">
                <img alt="corvette" id="corvette-3" class="corvette" src="img/corvette.jpg" onclick="position(this)">
                <h5 class="desc">Lance</h5>
                <img alt="lancia" id="lancia-1" class="lancia" src="img/lanciaO1.jpg" onclick="position(this)">
                <img alt="lancia" id="lancia-2" class="lancia" src="img/lanciaO1.jpg" onclick="position(this)">  
                <div>
                    <button id="reset-but" class="gameBut" onclick="reset(this)" disabled>RESET</button><a class="butt" href="./game.php"><button id="start-but" class="gameBut" disabled>INIZIA</button></a>
                </div>
            </div>
        </div>
        <footer>
                <p>© Copyright 2021 Sisa R.M.</p>
        </footer> 
    </body> 
</html>
