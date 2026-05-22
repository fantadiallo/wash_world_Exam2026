/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: mariadb    Database: wash_world_exam
-- ------------------------------------------------------
-- Server version	10.6.20-MariaDB-ubu2004

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `location_id` char(32) NOT NULL,
  `city_name` varchar(100) DEFAULT NULL,
  `street_name` varchar(255) DEFAULT NULL,
  `distance` float DEFAULT NULL,
  `location_lat` float DEFAULT NULL,
  `location_lng` float DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `subscription_perks`
--

DROP TABLE IF EXISTS `subscription_perks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_perks` (
  `subscription_perk_id` char(32) NOT NULL,
  `subscription_type_id` char(32) DEFAULT NULL,
  `perk_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`subscription_perk_id`),
  KEY `subscription_type_id` (`subscription_type_id`),
  CONSTRAINT `subscription_perks_ibfk_1` FOREIGN KEY (`subscription_type_id`) REFERENCES `subscription_types` (`subscription_type_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_perks`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `subscription_perks` WRITE;
/*!40000 ALTER TABLE `subscription_perks` DISABLE KEYS */;
INSERT INTO `subscription_perks` VALUES
('1e2dcc704eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Skumforvask'),
('1e2dce304eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Aktiv Shampoo'),
('1e2dcf584eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Hjulvask'),
('1e2dcfaf4eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Højtryksvask'),
('1e2dcfd44eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Børstevask'),
('1e2dcff74eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Voks'),
('1e2dd0144eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Tørring'),
('8c8115ad4eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Højglans'),
('8c81184e4eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Undervognsvask'),
('d180ff2f4eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Skumforvask'),
('d18108f14eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Aktiv shampoo'),
('d181095b4eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Hjulvask'),
('d1810b904eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Højtryksvask'),
('d1810bf74eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Børstevask'),
('d1810c374eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Voks'),
('d1810c684eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Tørring'),
('d1810c8e4eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Højglans'),
('d1810cb64eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Undervognsvask'),
('d1810ce84eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Skumvask'),
('d1810d124eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Affedtning'),
('d1810d344eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Sæsonrens'),
('f8498cd54eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Skumforvask'),
('f8498ffb4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Aktiv shampoo'),
('f84990404eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Hjulvask'),
('f849906e4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Højtryksvask'),
('f849918b4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Børstevask'),
('f84991f04eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Voks'),
('f849921c4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Tørring');
/*!40000 ALTER TABLE `subscription_perks` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `subscription_types`
--

DROP TABLE IF EXISTS `subscription_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_types` (
  `subscription_type_id` char(32) NOT NULL,
  `subscription_name` varchar(100) DEFAULT NULL,
  `subscription_price` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`subscription_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_types`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `subscription_types` WRITE;
/*!40000 ALTER TABLE `subscription_types` DISABLE KEYS */;
INSERT INTO `subscription_types` VALUES
('065b51134eab11f1af5c5a77b80ea721','Premium',169),
('5cf8b9874eab11f1af5c5a77b80ea721','Guld',139),
('5cf8be284eab11f1af5c5a77b80ea721','Brilliant',199);
/*!40000 ALTER TABLE `subscription_types` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `user_dashboard`
--

DROP TABLE IF EXISTS `user_dashboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_dashboard` (
  `user_id` char(32) NOT NULL,
  `user_latest_wash_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_latest_wash_date` datetime DEFAULT current_timestamp(),
  `subscription_type_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `subscription_type_id` (`subscription_type_id`),
  CONSTRAINT `user_dashboard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_dashboard_ibfk_2` FOREIGN KEY (`subscription_type_id`) REFERENCES `subscription_types` (`subscription_type_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_dashboard`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `user_dashboard` WRITE;
/*!40000 ALTER TABLE `user_dashboard` DISABLE KEYS */;
INSERT INTO `user_dashboard` VALUES
('49c44b7478b74498ad47699d5592c5e5','2026-05-14 07:45:36','2026-05-14 09:45:36',NULL),
('58e7f52ea5ae466a9dbb22f29404b653','2026-05-13 19:43:11','2026-05-13 21:43:11',NULL),
('ca97c10b307d455981c8f654d7df42c5','2026-05-13 08:59:13','2026-05-13 10:59:13',NULL);
/*!40000 ALTER TABLE `user_dashboard` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` char(32) NOT NULL,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_hashed_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('49c44b7478b74498ad47699d5592c5e5','ss','ss','ss@gmail.com','scrypt:32768:8:1$UuOUXnEASZWmlbJu$f366f8146fcb7d084601e3deeacc4f4e3618d1849b7c448156ccafa43f8c9c51153f416fc3df5122fb377724ade7661ad4172c74bb754519e896c1af13796845'),
('58e7f52ea5ae466a9dbb22f29404b653','as','bb','b@gmail.com','scrypt:32768:8:1$nobHi9hrVrK9FpWY$88cc32b28959314c7bad6279c85fbe7356bbf29f27cd9b9491d3d9520105f4d71b53699453e9a114fd33047b42e284d09014c7496019cc6d852fb650c8e26a90'),
('ca97c10b307d455981c8f654d7df42c5','as','bb','b@gmail.com','scrypt:32768:8:1$EDU6OKwo88aewUss$c095e0f5f922c44f52b9a27e15634c4e9de81840b6b952bb162a8d33453f22f2421a7a888d0b33f2e68b1528a16e9be98c4f6720ad91b1a54ebb23edfc74de25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-05-18  7:44:03
