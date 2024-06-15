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
-- Table structure for table `info`
--

DROP TABLE IF EXISTS `info`;
CREATE TABLE IF NOT EXISTS `info` (
  `consumer_id` varchar(25) NOT NULL,
  `category` varchar(25) NOT NULL,
  `address` text NOT NULL,
  `house_no` int(25) NOT NULL,
  `meter_no` int(25) NOT NULL,
  `loadKW` varchar(10) NOT NULL,
  `units` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`consumer_id`, `category`, `address`, `house_no`, `meter_no`, `loadKW`, `units`) VALUES
('145286', 'Domestic', '10th Mile GS Road', 356, 4567, '2', 76),
('145287', 'Domestic', '10th Mile GS Road', 357, 4568, '1.6', 69),
('145281', 'Domestic', '10th Mile GS Road', 357, 4569, '2', 77);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
