-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 11, 2024 at 04:12 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mecl`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consumer_id` varchar(20) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(5) NOT NULL DEFAULT '0',
  `uuid` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `consumer_id`, `mobile_number`, `password`, `created_at`, `status`, `uuid`, `email`, `name`) VALUES
(6, '145286', '8473003186', '12345678', '2024-03-14 15:11:41', 1, '639951', 'ud@gmail.com', 'utpal das'),
(7, '145281', '8473003181', '12345678', '2024-03-16 09:15:48', 1, '322999', 'sagar@gmail.com', 'Sagar Dady'),
(8, '12345', '8473003186', '12345678', '2024-03-16 17:15:51', 1, '914122', 'mimi@gmail.com', 'mimi'),
(10, '123', '08473003186', '12345678', '2024-04-03 17:23:08', 1, '339611', 'ud78766@gmail.com', 'utpal das'),
(11, '123', '8473003186', '12345678', '2024-04-03 17:34:36', 1, '489818', 'ud787@gmail.com', 'utpal das');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
