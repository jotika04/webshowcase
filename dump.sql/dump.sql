-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: showcasedb
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `claim`
--

DROP TABLE IF EXISTS `claim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claim` (
  `claimID` int NOT NULL AUTO_INCREMENT,
  `issuer` varchar(255) DEFAULT NULL,
  `expiresAt` int DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `issuedAt` int DEFAULT NULL,
  PRIMARY KEY (`claimID`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claim`
--

LOCK TABLES `claim` WRITE;
/*!40000 ALTER TABLE `claim` DISABLE KEYS */;
INSERT INTO `claim` VALUES (18,'testuser',1625658342,'refresh_token',1623066342),(19,'John_Doe',1625658912,'refresh_token',1623066912),(20,'0',1625659082,'refresh_token',1623067082),(56,'38',1627044924,'refresh_token',1624452924),(57,'39',1627044988,'refresh_token',1624452988),(59,'38',1627126112,'refresh_token',1624534112),(60,'38',1627463411,'refresh_token',1624871411),(61,'38',1627463589,'refresh_token',1624871589),(65,'37',1625480356,'refresh_token',1624875556),(67,'34',1626349499,'refresh_token',1625744699),(68,'34',1626349509,'refresh_token',1625744709),(69,'34',1626350153,'refresh_token',1625745353),(70,'37',1626350226,'refresh_token',1625745426);
/*!40000 ALTER TABLE `claim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `courseID` int NOT NULL AUTO_INCREMENT,
  `courseName` varchar(255) NOT NULL,
  PRIMARY KEY (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notificationID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `notif_text` varchar(255) DEFAULT '',
  PRIMARY KEY (`notificationID`),
  KEY `fk_userID` (`userID`),
  CONSTRAINT `fk_userID_notif` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,33,'testing'),(2,33,'testingagain'),(9,34,'Project Successfully Submitted'),(10,33,'webdeb project Successfully Submitted'),(11,34,'test project 2 Successfully Submitted'),(12,34,'test project 2 Successfully Submitted'),(13,33,'test project 2 Successfully Submitted'),(14,37,'test project 2 Successfully Submitted'),(15,37,'test project 2 Successfully Submitted'),(16,34,'test project 2 Successfully Submitted'),(17,37,' Verified'),(18,37,'test project 2 Verified');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `projectID` int NOT NULL AUTO_INCREMENT,
  `projectName` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `verified` tinyint(1) DEFAULT '0',
  `course` varchar(255) NOT NULL DEFAULT '',
  `projectImage` varchar(255) DEFAULT '',
  `projectVideo` varchar(255) DEFAULT '',
  `projectThumbnail` varchar(255) DEFAULT '',
  `userID` int NOT NULL,
  PRIMARY KEY (`projectID`),
  KEY `fk_userID` (`userID`),
  CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (6,'newproject','this is my project',0,'test','path','path','path',33),(22,'newproject2','this is my project',0,'test','path','path','path',34),(23,'webdeb project','this is my project',1,'test','path','path','path',33),(24,'test project 2','this is my new project',0,'test','path','path','path',34),(25,'test project 2','this is my new project',0,'test','path','path','path',34),(26,'test project 2','this is my new project',0,'test','path','path','path',33),(27,'test project 2','this is my new project',1,'test','path','path','path',37),(28,'test project 2','this is my new project',0,'test','path','path','path',37),(29,'test project 2','this is my new project',0,'test','path','path','path',34),(30,'test project 2','this is my new project',0,'test','path','path','path',37);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'validator'),(3,'submitter'),(4,'guest');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userFirstName` varchar(255) NOT NULL,
  `userLastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `batchYear` int DEFAULT '0',
  `address` varchar(255) DEFAULT '',
  `binusianID` int DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `phoneNum` varchar(255) DEFAULT '',
  `roleID` int DEFAULT '4',
  PRIMARY KEY (`userID`),
  KEY `fk_roleID` (`roleID`),
  CONSTRAINT `fk_roleID` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (33,'hello','world','$2a$10$vUIU0.LAFs6s2HoFT1CsyuWyc5Wmbprv2oFg9mKDY5O85iF9uh8n.',2020,'jakarta',0,'abc@mail.com','aaa','081234567890',4),(34,'Jane','Doe','$2a$10$QJ60Y/KKjimcC8nhaEvL.u.AJk8.m8f8j8iVr54NXykKg.Z2wqyEC',2022,'sydney',0,'testing@mail.com','testuser','081255555555',4),(35,'test','user','$2a$10$HJd3/XB25rAtgBluGGkNvONKT1Y8aSXLZqMaDRnbm0koWb.xgd.fe',0,'',0,'testuser@mail.com','testuser','',4),(37,'John','Doe','$2a$10$sCdOiHmGOguHxnnyuhnLxufOJU9K2oVzZy9mEGXPt5ixGGfKY8Wxi',0,'',0,'johndoe@mail.com','John_Doe','',2),(38,'test','admin','$2a$10$GsKdhhD56DsYN5qKNyAQWeFoQa7nT.X.j5tBWbB9TlvgOKi0xE7SO',0,'',0,'admin@mail.com','admin','',1),(39,'test','user','$2a$10$Lpoq9hv9mVK6dWrSxDVaduqtXWWIVEJeK/htEQ.hAvkbUOpCTH29y',0,'',0,'hello@mail.com','testinggg','',3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-11 10:10:55
