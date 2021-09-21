<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="utf-8">
        <title>Battaglia Navale</title>
        <link rel="stylesheet" href="styling.css">
    </head>

    <body>
        <h1 id="index-title">BATTAGLIA NAVALE</h1>
        <div class="mainCont">
            <h3>Benvenuto!</h3>
            <h4>Accedi per salvare il tuo punteggio:</h4>
            <form method="POST" action="login.php">
                <?php
                    if ( isset($_GET['email'])){
                        $email = $_GET['email'];
                        echo ' <input id="email" name="email" type="email" placeholder="email" value="'.$email.'" required>';
                    }
                    else {
                        echo '<input id="email" name="email" type="email" placeholder="email" required>';
                    }
                ?>  
                
                <input id="psw" name="psw" type="password" placeholder="password" required>
                <?php

                    if ( isset($_GET['error']) )
                    {
                        $error = $_GET['error'];
                        
                        if ( $error=="wrongemail"){
                            echo "<p class='error'>L'email non risulta registrata!</p>";
                        }
                        elseif ( $error=="wrongpsw"){
                            echo "<p class='error'>Password errata!</p>";
                        }
                    }
                ?>
                <input type="submit" name="submit" class="btn" value="Accedi">
            </form>
            <p class="inside">Non sei ancora registrato? <a href="registration.php">Registrati</a> ora.</p>
            <h5 class="istruzioni"><a href="documentazione.html" target="_blank">Istruzioni</a></h5><h5 class="istruzioni"><a href="home.php">Salta</a></h5>
        </div>
        <footer>
            <p>© Copyright 2021 Sisa R.M.</p>
          </footer> 
    </body>
</html>