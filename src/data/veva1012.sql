CREATE DATABASE  IF NOT EXISTS `veva1012` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `veva1012`;
-- MySQL dump 10.13  Distrib 5.7.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: veva1012
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` int(11) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `descripcion` int(11) DEFAULT NULL,
  `unidades_requeridas` int(11) DEFAULT NULL,
  `descuento` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `imagen` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `marca_producto_idx` (`marca_id`),
  KEY `tipo_id_idx` (`tipo_id`),
  KEY `nombre_producto_idx` (`nombre`),
  KEY `precio_producto_idx` (`precio`),
  KEY `descripción_producto_idx` (`descripcion`),
  KEY `descuento_producto_idx` (`descuento`),
  KEY `imagen_producto_idx` (`imagen`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `descripción_producto` FOREIGN KEY (`descripcion`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `descuento_producto` FOREIGN KEY (`descuento`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `imagen_producto` FOREIGN KEY (`imagen`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `marca_producto` FOREIGN KEY (`marca_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `nombre_producto` FOREIGN KEY (`nombre`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `precio_producto` FOREIGN KEY (`precio`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tipo_producto` FOREIGN KEY (`tipo_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `deleted-_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Absolut',NULL),(2,'Belvedere',NULL),(3,'Andes',NULL),(4,'Corona',NULL),(5,'Heineken',NULL),(6,'Patagonia',NULL),(7,'Branca',NULL),(8,'1882',NULL),(9,'Ruca Malen',NULL),(10,'Terrazas',NULL),(11,'Trumpeter',NULL),(12,'Bombay',NULL),(13,'Beefeater',NULL),(14,'Palido Montero',NULL),(15,'Cacique',NULL),(16,'Havana Club',NULL),(17,'Jose Cuervo',NULL),(18,'Gran Patron',NULL),(19,'Moet & Chandon',NULL),(20,'Salentein',NULL),(21,'Baileys',NULL),(22,'Cointreau',NULL),(23,'Jameson',NULL),(24,'Johnnie Walker',NULL),(25,'Jagermeister',NULL);
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT NULL,
  `precio` varchar(45) DEFAULT NULL,
  `descuento` int(11) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `unidades_disponibles` bigint(100) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_marcas_products_idx` (`marca_id`),
  KEY `fk_tipos_products_idx` (`tipo_id`),
  KEY `fk_user_products_idx` (`user_id`),
  CONSTRAINT `fk_marcas_products` FOREIGN KEY (`marca_id`) REFERENCES `marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tipos_products` FOREIGN KEY (`tipo_id`) REFERENCES `tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_products` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Vino',10,6,'350',35,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',30,'vinodb.jpg',NULL,NULL),(2,'Vodka',2,NULL,'1230',35,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',50,'vodka2.jpg',NULL,NULL),(3,'Cerveza',3,3,'120',30,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',85,'cervezadb.jpg',NULL,NULL),(4,'Fernet',7,9,'750',40,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',105,'fernet.jpg',NULL,NULL),(5,'Tequila',17,NULL,'1110',10,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',20,'tequila.jpg',NULL,NULL),(7,'Gin',12,NULL,'1250',30,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',74,'gin.jpg',NULL,NULL),(8,'Ron',14,NULL,'870',20,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',25,'ron.jpg',NULL,NULL),(9,'Champagne',20,5,'750',20,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',86,'champagne.jpg',NULL,NULL),(10,'Licor',22,NULL,'1730',20,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',97,'cognac.jpg',NULL,NULL),(11,'Whisky',24,10,'1570',40,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',15,'whisky.jpg',NULL,NULL),(12,'Jagermeister',25,NULL,'1630',25,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, consequuntur',25,'Jagermeister.jpg',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos`
--

DROP TABLE IF EXISTS `tipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos`
--

LOCK TABLES `tipos` WRITE;
/*!40000 ALTER TABLE `tipos` DISABLE KEYS */;
INSERT INTO `tipos` VALUES (1,'Roja','0000-00-00 00:00:00.000000'),(2,'Negra',NULL),(3,'Rubia',NULL),(4,'Brut',NULL),(5,'Extra Brut',NULL),(6,'Malbec',NULL),(7,'Rosee',NULL),(8,'Con Miel',NULL),(9,'Tradicional',NULL),(10,'Azul',NULL);
/*!40000 ALTER TABLE `tipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tragos`
--

DROP TABLE IF EXISTS `tragos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tragos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `ingredientes` varchar(500) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `preparacion` varchar(1000) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tragos`
--

LOCK TABLES `tragos` WRITE;
/*!40000 ALTER TABLE `tragos` DISABLE KEYS */;
INSERT INTO `tragos` VALUES (1,'Margarita','50 ml de tequila 25 ml de cointreau, 25 ml de jugo de lima, recien exprimido, sal o azucar, hieo','margarita.jpg','Empieza con la decoración de sal de las copas, lo que se conoce como escarchar. Pasa un trocito de lima por el borde para que se moje, mejor si es sobre todo por la parte exterior y finito para que después no quede una capa gruesa de sal. Pon abundante sal o el azucar en un plato y en forma de círculo, haciéndolo coincidir más o menos con el diámetro de la copa. Pasa las copas por encima de la sal o el azucar para que quede pegada. Echa en la coctelera unos hielos hasta la mitad y vierte el zumo de lima junto con el tequila y el triple seco. Ciérrala y agita muy bien hasta que la coctelera o el recipiente estén bien fríos.',NULL),(2,'Aperol Spritz','60 ml de espumante o champagne, 40 ml de Aperol, 20 ml de soda o agua tonica y hielo ','aperol.jpg','Llenamos con hielo un copon de vino, la llenamos en este orden: aperol, espumante y por último la soda. Removemos con cuchara y agregamos 1 rodaja de naranja.',NULL),(3,'Gin Tonic','80 ml de gin, 100 ml de agua tonica y hielo','gin-tonic.jpg','Verter el gin en el vaso con hielo, luego inclinarlo y verter la tonica para que no pierda burbujas. Opcional, rodaja de limon, pepino, albahaca y limon o frutos rojos troceados.',NULL),(4,'Negroni','30 ml de ginebra, 30 ml de campari, 30 ml de vermu rojo, Cascara de naranja, Hielo','negroni.jpg','Añadir todo los ingredientes menos la corteza de naranja a una coctelera. Cerrar y agitar. Añadir hielos a un vaso o copa y verter el cóctel. Servir acompañado de un trocito de piel de naranja.',NULL),(5,'Pisco Sour','50 ml de pisco, 50 ml de jugo de limon exprimido, 50 ml de jarabe de azucar (50 gr de azucar disueltos en 50 ml de agua), 1 clara de huevo y hielo.','pisco-sour.jpg','Para hacer el jarabe (horas antes) en una olla pequeña mezclar el agua y el azúcar granulada y calentar hasta que el azúcar se disueva totalmente. Revolver ocasionalmente. No es necesario hacerlo hervir. Dejar enfriar y refrigerar. Dura 1 semana. Colocar todo junto en la juguera o licuadora. Mezclar hasta juntar todo.',NULL),(6,'Martini','30 ml de vermu blanco seco, 60 ml de gin, 2 aceitunas descarozadas y un pedacito de cascara de limon.','martini.jpg','El Dry Martini perfecto se prepara directamente en la copa, por ello recomendamos que la copa esté bien fría. De esta forma el hielo no se derretirá mientras lo preparamos directamente en la copa. Serviremos primero la ginebra. Acto seguido añadiremos el Vermú Blanco Seco, con mucho cuidado para que aún no se mezclen. Añadimos las aceitunas –pinchadas en palillos– y con la cuchara coctelera removemos durante 15 segundos. Apretamos la corteza de limón sobre la copa como si la exprimiéramos. La corteza puedes añadirla luego al cóctel o no. ¡A gusto del consumidor!',NULL);
/*!40000 ALTER TABLE `tragos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(50) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Josephine','Denzilow','jdenzilow0@bbb.org','Pfe1NwtjJ','https://robohash.org/eaquedolorevoluptas.jpg?size=',0,NULL),(2,'Augustine','Frost','afrost1@g.co','Hi7fxrjxfd6','https://robohash.org/doloresveniamatque.jpg?size=5',0,NULL),(3,'Elijah','Blatherwick','eblatherwick2@gizmodo.com','StRB92lfCB','https://robohash.org/velnonvelit.jpg?size=50x50&se',0,NULL),(4,'Eduardo','Flewitt','eflewitt3@hostgator.com','5O7ntjnd1Pb','https://robohash.org/ipsaquiset.jpg?size=50x50&set',0,NULL),(5,'Kenn','Normaville','knormaville4@tinyurl.com','TAvUtr3','https://robohash.org/etidut.jpg?size=50x50&set=set',0,NULL),(6,'Guillermo','Toland','gtoland5@ox.ac.uk','BYiNR8co','https://robohash.org/omniseaqueest.jpg?size=50x50&',0,NULL),(7,'Mile','Conradsen','mconradsen6@jalbum.net','tIh5774gSH','https://robohash.org/possimuslaboriosamnesciunt.jp',0,NULL),(8,'Carolann','Baswall','cbaswall7@china.com.cn','urvKYzwpr','https://robohash.org/impeditvoluptatumcorporis.jpg',0,NULL),(9,'Joe','Tristram','jtristram8@4shared.com','Pnu26D6GXTs1','https://robohash.org/doloremquequiaut.jpg?size=50x',0,NULL),(10,'Rosabel','Synke','rsynke9@army.mil','g41R7PsKc8','https://robohash.org/nesciuntrerumconsequatur.jpg?',0,NULL),(11,'Cord','Dyble','cdyblea@usa.gov','MPS3mGEHcIO','https://robohash.org/odiocorporisid.jpg?size=50x50',0,NULL),(12,'Flore','Findlay','ffindlayb@dropbox.com','vity4SUQQ','https://robohash.org/quiadoloribusquasi.jpg?size=5',0,NULL),(13,'Neala','Degg','ndeggc@google.cn','FqHbR1XzzNB','https://robohash.org/accusamusetest.jpg?size=50x50',0,NULL),(14,'Callie','Nisby','cnisbyd@oracle.com','09By8xVFltN','https://robohash.org/voluptatesquidemvoluptatem.jp',0,NULL),(15,'Shawn','Moutray Read','smoutrayreade@skyrock.com','AddYJ1B9iE','https://robohash.org/debitisundeeum.jpg?size=50x50',0,NULL),(16,'Claire','Briscam','cbriscamf@yahoo.co.jp','j7pOJI2kyvgv','https://robohash.org/nihilquomolestiae.jpg?size=50',0,NULL),(17,'Pennie','Siveyer','psiveyerg@mysql.com','VZjvwHpmXD','https://robohash.org/undeautaccusamus.jpg?size=50x',0,NULL),(18,'Angelico','Flewan','aflewanh@theatlantic.com','8jnv3K9K','https://robohash.org/doloremnisiin.jpg?size=50x50&',0,NULL),(19,'Teresita','Kimm','tkimmi@elegantthemes.com','63cb5xkd','https://robohash.org/necessitatibusutea.jpg?size=5',0,NULL),(20,'Marnia','Ripsher','mripsherj@reuters.com','XE4UAfahQ','https://robohash.org/etexpeditareiciendis.jpg?size',0,NULL),(21,'Lind','Cumbers','lcumbersk@army.mil','EfIBv65MqwR','https://robohash.org/quidolorumsed.jpg?size=50x50&',0,NULL),(22,'Cesare','Cooksley','ccooksleyl@instagram.com','JVTv8u65','https://robohash.org/dolorestemporedignissimos.jpg',0,NULL),(23,'Audie','Bortolutti','abortoluttim@java.com','D2VXgKT','https://robohash.org/accusamusetdebitis.jpg?size=5',0,NULL),(24,'Willy','Hodcroft','whodcroftn@home.pl','j7dcsj6D','https://robohash.org/delectusnullaeligendi.jpg?siz',0,NULL),(25,'Sophey','Kegg','skeggo@businesswire.com','tailt04DTK51','https://robohash.org/suscipitquiavel.jpg?size=50x5',0,NULL),(27,'sofia','Dura','sofia.dv@gmail.com','$2a$10$QB3vkbDwX3svIho8rdtDkeJiGsIX3G55XU749m.6wydGDCePItaSy','avatar-1595434893517.jpg',1,NULL);
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

-- Dump completed on 2021-06-26 14:52:08
