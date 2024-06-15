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
-- Table structure for table `bill_data`
--

DROP TABLE IF EXISTS `bill_data`;
CREATE TABLE IF NOT EXISTS `bill_data` (
  `bill_no` int(255) NOT NULL AUTO_INCREMENT,
  `consumer_id` varchar(50) NOT NULL,
  `current_reading` int(50) NOT NULL,
  `previous_reading` int(50) NOT NULL,
  `units` int(50) NOT NULL,
  `energy_charge` int(50) NOT NULL,
  `fixed_price` int(5) NOT NULL,
  `electricity_duty` int(5) NOT NULL,
  `total_bill` int(100) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL,
  `otp` varchar(10) NOT NULL,
  PRIMARY KEY (`bill_no`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill_data`
--

INSERT INTO `bill_data` (`bill_no`, `consumer_id`, `current_reading`, `previous_reading`, `units`, `energy_charge`, `fixed_price`, `electricity_duty`, `total_bill`, `date`, `status`, `otp`) VALUES
(28, '145286', 90, 50, 40, 180, 80, 2, 261, '2024-05-11 14:38:28', 1, '393270'),
(29, '145286', 100, 90, 10, 45, 80, 2, 126, '2024-05-11 14:39:11', 1, '999326'),
(27, '145286', 50, 0, 50, 225, 80, 2, 306, '2024-05-11 14:37:56', 0, ''),
(30, '145286', 120, 100, 20, 90, 80, 2, 171, '2024-05-11 14:44:17', 0, ''),
(31, '145286', 150, 120, 30, 135, 80, 2, 216, '2024-05-11 15:52:19', 0, ''),
(32, '12345', 50, 0, 50, 225, 80, 2, 306, '2024-05-11 16:07:42', 1, '408391'),
(33, '12345', 90, 50, 40, 180, 80, 2, 261, '2024-05-11 16:07:58', 0, '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
