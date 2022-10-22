<?php
    session_start();

    if (isset($_POST['submit'])){

        $nomeHost = "localhost";
        $nomeUtente = "id19749266_root";
        $password = "fiz/Z6D)f!T+{^\=";
        $nomeDB = "id19749266_battaglianavale";

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $mysqli= new mysqli($nomeHost, $nomeUtente, $password, $nomeDB);

        if ($mysqli->connect_error){
            die('Connessione fallita: ' .$mysqli->connect_error);
        }
        else {
            echo 'Connessione riuscita' . $mysqli->host_info . "\n";	
        }
        
        $email = $_POST['email'];

        if ($stmt = $mysqli->prepare('SELECT utenteID, username, password, email FROM utente WHERE email = ?')) {

            $stmt->bind_param('s', $_POST['email']);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
                $stmt->bind_result($utenteID, $username, $password, $remail);
                $stmt->fetch();
             
                    if (password_verify($_POST['psw'], $password)) {
                        session_regenerate_id();
                        $_SESSION['loggedin'] = TRUE;
                        $_SESSION['name'] = $username;
                        $_SESSION['id'] = $utenteID;
                        header("Location: home.php");
                        exit();
                    } 
                    else {
                        // password sbagliata
                        header("Location: index.php?error=wrongpsw&email=$email");
                        exit();
                }
            } else {
                    // email non presente
                    header("Location: index.php?error=wrongemail");
                    exit();
                }

            $stmt->close();
        }
    }   

?>
