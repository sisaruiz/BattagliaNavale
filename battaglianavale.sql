-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Set 20, 2021 alle 23:17
-- Versione del server: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `battaglianavale`
--
CREATE DATABASE IF NOT EXISTS `battaglianavale` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `battaglianavale`;

-- --------------------------------------------------------

--
-- Struttura della tabella `punteggio`
--

DROP TABLE IF EXISTS `punteggio`;
CREATE TABLE IF NOT EXISTS `punteggio` (
`punteggioID` int(11) NOT NULL,
  `utente` varchar(100) NOT NULL,
  `tempo` varchar(100) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dump dei dati per la tabella `punteggio`
--

INSERT INTO `punteggio` (`punteggioID`, `utente`, `tempo`, `timestamp`) VALUES
(1, 'sisa213', '00:05:22', '2021-09-20 13:42:48'),
(2, 'yoquese', '00:15:29', '2021-09-20 16:36:41'),
(3, 'sisa213', '00:09:16', '2021-09-20 19:01:55'),
(4, 'mario123', '00:02:46', '2021-09-20 20:53:53'),
(5, 'sisa213', '00:25:00', '2021-09-20 21:04:29'),
(6, 'mario123', '00:17:23', '2021-09-20 21:04:29'),
(7, 'mario123', '00:59:34', '2021-09-20 21:04:29'),
(8, 'yoquese', '00:28:43', '2021-09-20 21:04:29'),
(9, 'sisa213', '00:12:56', '2021-09-20 21:04:29'),
(10, 'sisa213', '00:18:21', '2021-09-20 21:09:30'),
(11, 'sisa213', '00:34:23', '2021-09-20 21:09:30');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

DROP TABLE IF EXISTS `utente`;
CREATE TABLE IF NOT EXISTS `utente` (
`utenteID` int(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`utenteID`, `username`, `password`, `email`) VALUES
(1, 'pikis', '$2y$10$DF0RWmY3mfhQ/DHm2P.JxODOCF4LVitA0JjqqgUO2KjfUM7jfnuse', 'pikis.themole@gmx.com'),
(2, 'sisa213', '$2y$10$qGw1TFFD3iEWh4KtYInSl.YyCEiqbReJu6DNtQlzFkHZhlYvZs6r2', 'sisa213ruiz@gmail.com'),
(3, 'mario', '$2y$10$j64OIwpXIDvPRjDHbqaax.p8ILS89wZ5ma2XqQoGP1kc3ne6ymN8y', 'mario@email.it'),
(4, 'yoquese', '$2y$10$QlELTIdUMzOYPjj3zjhpcu9dX4VtJ7OdSQozy0lwZy9oAoT.S3diC', 'nusta99ruiz@gmail.com'),
(5, 'mario123', '$2y$10$3x.1FKm4Kpz0Kl.5lqinXufJJ6HYqZCQ4y3469OKYmmLQ4sTuk8sy', 'mario.rossi@mail.it');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `punteggio`
--
ALTER TABLE `punteggio`
 ADD PRIMARY KEY (`punteggioID`);

--
-- Indexes for table `utente`
--
ALTER TABLE `utente`
 ADD PRIMARY KEY (`utenteID`), ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `punteggio`
--
ALTER TABLE `punteggio`
MODIFY `punteggioID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `utente`
--
ALTER TABLE `utente`
MODIFY `utenteID` int(100) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
