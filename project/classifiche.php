<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <title>Battaglia Navale</title>
        <link rel="stylesheet" href="styling.css">
        <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
    </head>
    <body>
        <h1>Battaglia Navale</h1>
        <nav>
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
                            echo '</p><a id="log-elem" href="logout.php">LOG OUT</a>';
                        }
                        else {
                            echo '<a id="log-elem" href="index.php">LOG IN</a>';
                        }
                    ?>
                </div>
        </nav>
        <div id="game-display">
            <?php
                include 'php/getScores.php';
            ?>
        </div>
        <footer>
                <p>© Copyright 2021 Sisa R.M.</p>
        </footer> 
    </body> 
</html>
