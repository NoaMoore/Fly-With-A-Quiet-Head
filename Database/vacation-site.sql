CREATE DATABASE  IF NOT EXISTS `vacation-site` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacation-site`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: vacation-site
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `RelationUsers_idx` (`userId`),
  KEY `RelationVacations_idx` (`vacationId`),
  CONSTRAINT `RelationUsers` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RelationVacations` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (12,16),(12,21),(12,22),(12,25),(12,26),(12,27),(15,11),(15,15),(15,16),(15,23),(16,3),(16,20),(16,23),(16,24),(16,27),(17,3),(17,11),(19,11),(19,16);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UsersRoles_idx` (`roleId`),
  CONSTRAINT `UsersRoles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Moshe','Ros','mr0527138008@gmail.com','4321',2),(3,'Shaked','Viner','sv0504147119@gmail.com','6789',1),(4,'Noa','Moore','noapixel1@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',1),(5,'noa','moore','noapixel5@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(6,'noa','moore','noapixel6@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(7,'noa','moore','noapixel7@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',1),(8,'user','user','noapixel8@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(9,'admin','admin','noapixel9@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',1),(10,'user1','user1','noapixel10@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(11,'user','11','noapixel11@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(12,'user','12','noapixel12@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(15,'user','15','noapixel15@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(16,'user','16','noapixel16@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(17,'Assaf','Fink','assaf@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(18,'Moishe','Ufnik','assaf2@gmail.com','8f3486705d16acaeebc8e899db60d924cdb643d719890254eebdde597a5834d4dc2f767f8a394d8d7284b71fc720933be83ab4c224267c75995b21b822764b7f',2),(19,'נעה','מור','noapixel17@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (3,'Warsaw','Warsaw is a mixture of  historic sites and vivid modernity. charming Old Town, Wilanów Palace and Lazienki Park. Warsaw Uprising Museum, the Museum of the History of Polish Jews.','2024-04-09','2024-04-14',650.00,''),(11,'Athens','Athens (Greek: Αθήνα, Αθεινα; listen (info • help)) is the capital city of Greece, the capital of the Prefecture of Athens (Νομαρχίας Αθηνών) Prefecture of Athens (Νομαρχίας Αθηνών)','2024-03-06','2024-03-10',950.00,''),(15,'Budapest','With big cities, iconic small towns, picturesque mountains and a prime spot along the Atlantic Ocean, Georgia is one of the most diverse vacation destinations in the South.','2024-04-18','2024-04-22',580.00,''),(16,'Dubai','with skylines that shine like beacons against barren desert backdrops. world\'s tallest tower one of the world\'s largest shopping malls, and one of the world\'s largest marinas.','2024-07-07','2024-07-11',759.00,''),(20,'Bercelona','Barcelona contains both the authentically historic and the wildly bizarre. From the scenic trails of the Park Güell to the narrow alleys of the Barri Gòtic,cafes and nightclubs.','2024-03-03','2024-03-07',890.00,''),(21,'Prague','A prosperous and bustling city, now attracts more tourists than ever.  top attractions including the famous Charles Bridge and the historic Prague Castle - offer free admission','2024-04-28','2024-05-01',580.00,''),(22,'Holland','The Netherlands is considered one of the best countries for a family holiday. It has big amusement parks, water parks, zoos, museums, fishing villages, boating, biking, and more.','2024-04-28','2024-05-02',840.00,''),(23,'Georgia','With big cities, iconic small towns, picturesque mountains and a prime spot along the Atlantic Ocean, Georgia is one of the most diverse vacation destinations in the South.','2024-04-22','2024-04-25',850.00,''),(24,'France','France is home to some of the most lively cities, bucolic villages and renowned wine regions.  sightseeing adventure or a relaxing wine retreat, you\'ll find a fun vacation here.','2024-04-10','2024-04-14',960.00,''),(25,'venice','breathtaking Grand Canal will soon greet you. Romantic gondolas carrying smitten couples glide through the web of the waterways. On land narrow passageways twist past Old storefron','2024-04-07','2024-04-11',650.00,''),(26,'United-States','New York is one of the most visited cities in the world and perhaps among the most popular attractions in the USA. This huge city offers its visitors huge buildings, museums and an','2024-06-30','2024-07-03',750.00,''),(27,'rumania','breathtaking Grand Canal will soon greet you. Romantic gondolas carrying smitten couples glide through the web of the waterways. On land narrow passageways \n\n','2024-06-23','2024-06-27',450.00,'9ec53337-83c4-4116-82c5-8fbd37f2b546.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 15:30:54
