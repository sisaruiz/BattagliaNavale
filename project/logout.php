<?php
session_start();

if ($_SESSION['loggedin']==true){
    $_SESSION = array();
    session_destroy();
    header("Location:index.php");
}

?>
