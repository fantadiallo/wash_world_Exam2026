-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mariadb:3306
-- Generation Time: May 26, 2026 at 09:08 AM
-- Server version: 10.6.20-MariaDB-ubu2004
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wash_world_exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `location_id` char(32) NOT NULL,
  `city_name` varchar(100) DEFAULT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `distance` float DEFAULT NULL,
  `location_lat` float DEFAULT NULL,
  `location_lng` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscription_id` char(32) NOT NULL,
  `user_id` char(32) NOT NULL,
  `subscription_type_id` char(32) NOT NULL,
  `subscription_status` varchar(50) DEFAULT 'active',
  `subscription_created_at` datetime DEFAULT current_timestamp(),
  `subscription_start_date` datetime DEFAULT current_timestamp(),
  `subscription_renewal_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_perks`
--

CREATE TABLE `subscription_perks` (
  `subscription_perk_id` char(32) NOT NULL,
  `subscription_type_id` char(32) DEFAULT NULL,
  `perk_text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_perks`
--

INSERT INTO `subscription_perks` (`subscription_perk_id`, `subscription_type_id`, `perk_text`) VALUES
('1e2dcc704eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'Skumforvask'),
('1e2dce304eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'Aktiv Shampoo'),
('1e2dcf584eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'Hjulvask'),
('1e2dcfaf4eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'H├©jtryksvask'),
('1e2dcfd44eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'B├©rstevask'),
('1e2dcff74eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'Voks'),
('1e2dd0144eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'T├©rring'),
('8c8115ad4eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'H├©jglans'),
('8c81184e4eab11f1af5c5a77b80ea721', '065b51134eab11f1af5c5a77b80ea721', 'Undervognsvask'),
('d180ff2f4eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'Skumforvask'),
('d18108f14eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'Aktiv shampoo'),
('d181095b4eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'Hjulvask'),
('d1810b904eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'H├©jtryksvask'),
('d1810bf74eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'B├©rstevask'),
('d1810c374eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'Voks'),
('d1810c684eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'T├©rring'),
('d1810c8e4eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'H├©jglans'),
('d1810cb64eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'Undervognsvask'),
('d1810ce84eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'Skumvask'),
('d1810d124eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'Affedtning'),
('d1810d344eab11f1af5c5a77b80ea721', '5cf8be284eab11f1af5c5a77b80ea721', 'S├ªsonrens'),
('f8498cd54eab11f1af5c5a77b80ea721', '5cf8b9874eab11f1af5c5a77b80ea721', 'Skumforvask'),
('f8498ffb4eab11f1af5c5a77b80ea721', '5cf8b9874eab11f1af5c5a77b80ea721', 'Aktiv shampoo'),
('f84990404eab11f1af5c5a77b80ea721', '5cf8b9874eab11f1af5c5a77b80ea721', 'Hjulvask'),
('f849906e4eab11f1af5c5a77b80ea721', '5cf8b9874eab11f1af5c5a77b80ea721', 'H├©jtryksvask'),
('f849918b4eab11f1af5c5a77b80ea721', '5cf8b9874eab11f1af5c5a77b80ea721', 'B├©rstevask'),
('f84991f04eab11f1af5c5a77b80ea721', '5cf8b9874eab11f1af5c5a77b80ea721', 'Voks'),
('f849921c4eab11f1af5c5a77b80ea721', '5cf8b9874eab11f1af5c5a77b80ea721', 'T├©rring');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_types`
--

CREATE TABLE `subscription_types` (
  `subscription_type_id` char(32) NOT NULL,
  `subscription_name` varchar(100) DEFAULT NULL,
  `subscription_price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription_types`
--

INSERT INTO `subscription_types` (`subscription_type_id`, `subscription_name`, `subscription_price`) VALUES
('065b51134eab11f1af5c5a77b80ea721', 'Premium', 169),
('5cf8b9874eab11f1af5c5a77b80ea721', 'Guld', 139),
('5cf8be284eab11f1af5c5a77b80ea721', 'Brilliant', 199);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(32) NOT NULL,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_hashed_password` varchar(255) DEFAULT NULL,
  `user_verification_key` varchar(255) DEFAULT NULL,
  `user_verified_at` bigint(20) UNSIGNED DEFAULT NULL,
  `reset_token` char(32) DEFAULT NULL,
  `reset_token_expires_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_first_name`, `user_last_name`, `user_email`, `user_hashed_password`, `user_verification_key`, `user_verified_at`, `reset_token`, `reset_token_expires_at`) VALUES
('a59f9c406f22403795c23bd12a7aa1aa', 'vv', 'ss', 'viggovs1303@gmail.com', 'scrypt:32768:8:1$Y3Ong8ZlxsQ55liQ$f419829a32e3d2dbb2499227ba7fcf346f8aade7d3f8fffa59e2185863c833ef7c4f5bb7b80e9c9c9cbaf7dff7a309f478608d6978a40a2a2f240e93af96a910', NULL, NULL, '37f7d4faa3964c2e8940faa12d0fbb82', 1779349775);

-- --------------------------------------------------------

--
-- Table structure for table `user_dashboard`
--

CREATE TABLE `user_dashboard` (
  `user_id` char(32) NOT NULL,
  `user_latest_wash_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_latest_wash_date` datetime DEFAULT current_timestamp(),
  `subscription_type_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_dashboard`
--

INSERT INTO `user_dashboard` (`user_id`, `user_latest_wash_time`, `user_latest_wash_date`, `subscription_type_id`) VALUES
('a59f9c406f22403795c23bd12a7aa1aa', '2026-05-21 07:25:00', '2026-05-21 09:25:00', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subscription_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `subscription_type_id` (`subscription_type_id`);

--
-- Indexes for table `subscription_perks`
--
ALTER TABLE `subscription_perks`
  ADD PRIMARY KEY (`subscription_perk_id`),
  ADD KEY `subscription_type_id` (`subscription_type_id`);

--
-- Indexes for table `subscription_types`
--
ALTER TABLE `subscription_types`
  ADD PRIMARY KEY (`subscription_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `user_dashboard`
--
ALTER TABLE `user_dashboard`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `subscription_type_id` (`subscription_type_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_type_fk` FOREIGN KEY (`subscription_type_id`) REFERENCES `subscription_types` (`subscription_type_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subscriptions_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `subscription_perks`
--
ALTER TABLE `subscription_perks`
  ADD CONSTRAINT `subscription_perks_ibfk_1` FOREIGN KEY (`subscription_type_id`) REFERENCES `subscription_types` (`subscription_type_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_dashboard`
--
ALTER TABLE `user_dashboard`
  ADD CONSTRAINT `user_dashboard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_dashboard_ibfk_2` FOREIGN KEY (`subscription_type_id`) REFERENCES `subscription_types` (`subscription_type_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
