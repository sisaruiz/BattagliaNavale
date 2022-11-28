<?php

    session_start();

    if (isset($_POST['signup'])){

        $nomeHost = "localhost";
        $nomeUtente = "id19749266_root";
        $password = "fiz/Z6D)f!T+{^\=";
        $nomeDB = "id19749266_battaglianavale";

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $mysqli= new mysqli($nomeHost, $nomeUtente, $password, $nomeDB);

        if ($mysqli->connect_error){
            die('Connessione fallita: ' .$mysqli->connect_error);
        }

        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        if ($query = $mysqli->prepare('SELECT * FROM utente WHERE email = ?')) {

            $query->bind_param('s', $email);
            $query->execute();
            $result = $query->get_result();
            
            if ($result->num_rows > 0) {            //Controllo se la email è già stata utilizzata

                $mysqli->close();
                header("Location: registration.php?error=invalidemail");
                exit();
            } 
            else{  //Controllo se lo username è gia in uso
                    if ($query1 = $mysqli->prepare('SELECT * FROM utente WHERE username = ?')) {

                        $query1->bind_param('s', $username);
                        $query1->execute();
                        $results = $query1->get_result();

                        if ($results->num_rows > 0) {

                            $mysqli->close();
                            header("Location: registration.php?error=invalidusername&email=$email");
                            exit();
                        }
                        else{//Altrimenti inserisco nel database

                            $query2 = $mysqli->prepare('INSERT INTO utente (username,password,email)
                                        VALUES (?,?,?)');
                            $query2->bind_param('sss',$username,$hashed_password,$email);
                            
                            $query2->execute();

                            $mysqli->close();

                            //e reindirizzo alla login page
                            header("Location: registration.php?signup=success");
                            exit();
                        }
                    }
            }
        }
    }
?>
