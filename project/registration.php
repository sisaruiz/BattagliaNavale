<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <title>Registrati - Battaglia Navale</title>
    <link rel="stylesheet" href="styling.css">
</head>
<body>
    <h1 id="index-title">BATTAGLIA NAVALE</h1>
        <div class="mainCont">
            <h3>Registrati</h3>
            <?php
                if ( isset($_GET['signup']) && $_GET['signup']=="success" ){
                    echo '<h4 id="successalert">Ti sei registrato con successo!</h4>
                        <h5><a href="index.php">Accedi<a></h5></div>
                        <footer><p>© Copyright 2021 Sisa R.M.</p></footer> 
                        </body></html>';
                    exit();
                }
            ?>
            <form method="POST" action="signup.php">
                <div id="emailCont" class="container">
                    <label for="email">Email</label>
                    <?php
                        if ( isset($_GET['email'])){
                            $email = $_GET['email'];
                            echo ' <input class="signup" id="email" name="email" type="email" placeholder="" value="'.$email.'" required>';
                        }
                        else {
                            echo '<input class="signup" id="email" name="email" type="email" placeholder="inserisci la tua email" required>';
                        }

                        if ( isset($_GET['error']) && $_GET['error']=="invalidemail"){

                            echo "<p class='error'>Email già in uso!</p>";
                        }
                    ?> 
                </div>
                <div id="userCont" class="container">
                    <label for="username">Username</label>
                    <input class="signup" id="username" name="username" type="text" placeholder="scegli il tuo username" required>
                    <?php
                        if ( isset($_GET['error']) && $_GET['error']=="invalidusername"){

                            echo "<p class='error'>Username già in uso!</p>";
                        }
                    ?>                     
                </div>
                <div id="pswCont" class="container">
                    <label for="password">Password</label>
                    <input class="signup" id="password" name="password" type="password" placeholder="scegli una password" required>
                </div>
            
            <input type="submit" name="signup" class="btn" value="Iscrivimi">
            <h5><a href="index.php">Torna indietro</a></h5>
            </form>
        </div>
        <footer>
            <p>© Copyright 2021 Sisa R.M.</p>
          </footer> 
</body>

</html>
