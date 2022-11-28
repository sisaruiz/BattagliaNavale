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
        <script src="game1.js"></script>
    </head>
    <body onload="begin()">
        <h1>Battaglia Navale</h1>
            <nav>
                <div id="clock-wrapper"><label for="clock">Timer:</label><input name="clock" id="clock" type="text" readonly></div>
                <ul>
                    <li><a class="nav-elem" href="home.php">Gioca</a></li>
                    <li><a class="nav-elem" href="classifiche.php">Classifica</a></li>                
                    <li><a class="nav-elem" href="documentazione.html" target="_blank">Come si gioca?</a></li>
                </ul>
                <div id="logCont">
                        <?php 

                            session_start();

                            if ( isset($_SESSION['id']) && isset($_SESSION['name']) ) {
                                echo'<script src="js/checkLoggedIn.js"></script>';
                                echo'<p>Benvenuto</p><p id="userName">';
                                echo $_SESSION['name']; 
                                echo '</p><a id="log-elem" onclick="deleteStatus()" href="logout.php">LOG OUT</a>';
                            }
                            else {
                                echo '<a id="log-elem" href="index.php">LOG IN</a>';
                            }
                        ?>
                    </div>
            </nav>

        <div id="game-display">
            <div id="choose-cont">
                <p>Scegli una posizione:</p><input id="choosenCoord" maxlength="3" placeholder="ex. A1" type="text"><button id="control-but" class="gameBut" onclick="verifica(this)">CONTROLLA</button>
            </div>
            <div id="matrixes">
                <div id="us-matrix" class="square-container">
                    <h3>La tua flotta</h3>
                </div>
                <div id="pc-matrix" class="square-container">
                    <h3>Il nemico</h3>
                </div>
            </div>   
        </div>
        <footer>
                <p>© Copyright 2021 Sisa R.M.</p>
        </footer> 
    </body>
</html>
