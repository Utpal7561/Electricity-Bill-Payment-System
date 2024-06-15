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
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
CREATE TABLE IF NOT EXISTS `bill` (
  `bill_no` int(50) NOT NULL AUTO_INCREMENT,
  `category` text NOT NULL,
  `address` text NOT NULL,
  `house_no` int(10) NOT NULL,
  `meter_no` varchar(50) NOT NULL,
  `loadKW` int(10) NOT NULL,
  `prev_reading` int(10) NOT NULL,
  `current_reading` int(10) NOT NULL,
  `bill_date` varchar(25) NOT NULL,
  `due_date` varchar(25) NOT NULL,
  `units` int(10) NOT NULL,
  `consumer_id` varchar(25) NOT NULL,
  `status` int(2) NOT NULL,
  `otp` int(11) DEFAULT NULL,
  PRIMARY KEY (`bill_no`)
) ENGINE=MyISAM AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`bill_no`, `category`, `address`, `house_no`, `meter_no`, `loadKW`, `prev_reading`, `current_reading`, `bill_date`, `due_date`, `units`, `consumer_id`, `status`, `otp`) VALUES
(101, 'Domestic', '10th Mile G.S Road', 356, '4567', 3, 40, 80, '2024-01-15', '2024-02-20', 76, '145286', 1, 84663),
(102, 'Domestic', '10th Mile G.S Road', 357, '4567', 3, 76, 83, '2024-03-16', '2024-03-20', 70, '145286', 1, 911408),
(103, 'Domestic', '10th Mile G.S Road', 357, '4567', 3, 32, 62, '2024-02-16', '2024-03-20', 60, '145286', 1, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
