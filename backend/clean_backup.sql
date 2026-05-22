-- MariaDB dump 10.19  Distrib 10.6.20-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: wash_world_exam
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
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_perks`
--

DROP TABLE IF EXISTS `subscription_perks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

LOCK TABLES `subscription_perks` WRITE;
/*!40000 ALTER TABLE `subscription_perks` DISABLE KEYS */;
INSERT INTO `subscription_perks` VALUES ('1e2dcc704eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Skumforvask'),('1e2dce304eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Aktiv Shampoo'),('1e2dcf584eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Hjulvask'),('1e2dcfaf4eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','H├©jtryksvask'),('1e2dcfd44eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','B├©rstevask'),('1e2dcff74eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Voks'),('1e2dd0144eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','T├©rring'),('8c8115ad4eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','H├©jglans'),('8c81184e4eab11f1af5c5a77b80ea721','065b51134eab11f1af5c5a77b80ea721','Undervognsvask'),('d180ff2f4eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Skumforvask'),('d18108f14eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Aktiv shampoo'),('d181095b4eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Hjulvask'),('d1810b904eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','H├©jtryksvask'),('d1810bf74eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','B├©rstevask'),('d1810c374eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Voks'),('d1810c684eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','T├©rring'),('d1810c8e4eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','H├©jglans'),('d1810cb64eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Undervognsvask'),('d1810ce84eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Skumvask'),('d1810d124eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','Affedtning'),('d1810d344eab11f1af5c5a77b80ea721','5cf8be284eab11f1af5c5a77b80ea721','S├ªsonrens'),('f8498cd54eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Skumforvask'),('f8498ffb4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Aktiv shampoo'),('f84990404eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Hjulvask'),('f849906e4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','H├©jtryksvask'),('f849918b4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','B├©rstevask'),('f84991f04eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','Voks'),('f849921c4eab11f1af5c5a77b80ea721','5cf8b9874eab11f1af5c5a77b80ea721','T├©rring');
/*!40000 ALTER TABLE `subscription_perks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_types`
--

DROP TABLE IF EXISTS `subscription_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

LOCK TABLES `subscription_types` WRITE;
/*!40000 ALTER TABLE `subscription_types` DISABLE KEYS */;
INSERT INTO `subscription_types` VALUES ('065b51134eab11f1af5c5a77b80ea721','Premium',169),('5cf8b9874eab11f1af5c5a77b80ea721','Guld',139),('5cf8be284eab11f1af5c5a77b80ea721','Brilliant',199);
/*!40000 ALTER TABLE `subscription_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_dashboard`
--

DROP TABLE IF EXISTS `user_dashboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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

LOCK TABLES `user_dashboard` WRITE;
/*!40000 ALTER TABLE `user_dashboard` DISABLE KEYS */;
INSERT INTO `user_dashboard` VALUES ('224a4c8a8ba1446fb8dfb9b78e6fc5ae','2026-05-20 20:06:10','2026-05-20 22:06:10',NULL),('286b05add11f43e6a8f007d3b101564a','2026-05-21 06:44:30','2026-05-21 08:44:30',NULL),('a2d168e949504e6391cd8ca2fd9f547c','2026-05-21 07:04:19','2026-05-21 09:04:19',NULL),('a59f9c406f22403795c23bd12a7aa1aa','2026-05-21 07:25:00','2026-05-21 09:25:00',NULL),('aaa4f5c802e84e3ebf549b8689d5b834','2026-05-21 06:29:59','2026-05-21 08:29:59',NULL),('ea4d493a0adf4edd93a0c5f3fa67a57f','2026-05-21 06:22:09','2026-05-21 08:22:09',NULL),('fbbf52f8bcd941c79578d4b0331815d2','2026-05-20 19:37:52','2026-05-20 21:37:52',NULL);
/*!40000 ALTER TABLE `user_dashboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` char(32) NOT NULL,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_hashed_password` varchar(255) DEFAULT NULL,
  `user_verification_key` varchar(255) DEFAULT NULL,
  `user_verified_at` bigint(20) unsigned DEFAULT NULL,
  `reset_token` char(32) DEFAULT NULL,
  `reset_token_expires_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('224a4c8a8ba1446fb8dfb9b78e6fc5ae','as','asdasd','b@gmail.com','scrypt:32768:8:1$saPfn3er2APmQzy8$f634fb8e8507558dc970931c6eb94f1b191480222abd56765b0edb38306c784b1340f110ebd1c34923e6c8e13515424320ea139d8e037c600db8c642710bd027','1cbfa8c4fc33429db50a9704c11d0896',1779307570,NULL,NULL),('286b05add11f43e6a8f007d3b101564a','wefwe','wefwef','a@gmail.com','scrypt:32768:8:1$To7YE3uGXhpkvJU7$2d2c116443bebea3be6e6c7a7c68e539a0ebf3284ef7e5c1bdb40fcce45893f40f6def36ae378aeacbcb7b6076d6197ff095e17a360b901a5c8fa57d7da6e830',NULL,NULL,NULL,NULL),('a2d168e949504e6391cd8ca2fd9f547c','wefwe','wefwef','a@gmail.com','scrypt:32768:8:1$dDvlFsFK1MP5HvGw$08199c93c34702decdc4f775d73d305daf3398a7d2478e8a99ce6539a871e5d4490e53866714ef13b15800500a04cc1e599f1acf45fc885ef169aa7e91d5e23d',NULL,NULL,NULL,NULL),('a59f9c406f22403795c23bd12a7aa1aa','vv','ss','viggovs1303@gmail.com','scrypt:32768:8:1$Y3Ong8ZlxsQ55liQ$f419829a32e3d2dbb2499227ba7fcf346f8aade7d3f8fffa59e2185863c833ef7c4f5bb7b80e9c9c9cbaf7dff7a309f478608d6978a40a2a2f240e93af96a910',NULL,NULL,'37f7d4faa3964c2e8940faa12d0fbb82',1779349775),('aaa4f5c802e84e3ebf549b8689d5b834','ww','ff','f@gmail.com','scrypt:32768:8:1$kwwAte2Bd08Y4wCc$f6ea3002bfd7a2b3807195e2793ee77e866b4c829e84f59c953aff1f4f11bf21489ff9341fb03fcc7b0bfbe5a799db4ba8919fd4518f4394f3c3d9f83de7a297',NULL,NULL,NULL,NULL),('ea4d493a0adf4edd93a0c5f3fa67a57f','wefwefwef','wefwefwefweef','a@gmail.com','scrypt:32768:8:1$6FeJry2rijP98xqD$e4eca97a4334f4b258b45a7f1247057c405c6ffed94c2b9ae085f06c221889a42dc3222b361486c36fe0523facbee385180712fc27251b259763a245ea3728a5',NULL,NULL,NULL,NULL),('fbbf52f8bcd941c79578d4b0331815d2','as','bb','b@gmail.com','scrypt:32768:8:1$ptdWgCHHxJb5za8I$1a6c18463b463f3fb9da54ec4d6e9bfd13a616cd12fe2cdde38e70f75407a52acc74c418fa0b9d9e7590af833919429b1b0697b0c5af270dbccb74f508ee0ccb','8087fb82483f4d0bb9809f4b27379c47',1779305872,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-21 13:09:36
