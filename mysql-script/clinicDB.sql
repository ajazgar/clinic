-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema clinicDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clinicDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clinicDB` DEFAULT CHARACTER SET utf8;
USE `clinicDB`;

-- -----------------------------------------------------
-- Table `clinicDB`.`lekarz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinicDB`.`lekarz` (
  `idLekarza` INT NOT NULL auto_increment,
  `login` VARCHAR(100) NOT NULL,
  `Haslo` VARCHAR(45) NOT NULL,
  `Specjalizacja` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idLekarza`))
ENGINE = InnoDB;

INSERT INTO `lekarz` VALUES
(1,'JanKowalski','password','internista'),
(2,'MarekMalinowski', 'password', 'kardiolog'),
(3,'AndrzejTomczynski', 'password', 'laryngolog'),
(4,'AleksanderNowak', 'password','okulista'),
(5,'RafalPolak', 'password','neurolog'),
(99,'admin', 'password', 'admin');


-- -----------------------------------------------------
-- Table `clinicDB`.`pacjent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinicDB`.`pacjent` (
  `idPacjenta` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `nrUbezpieczenia` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPacjenta`))
ENGINE = InnoDB;

INSERT INTO `pacjent` VALUES
(10,'AgataSkiba', 0123),
(11,'GrzegorzZielinski',4567),
(12,'PatrycjaMachera', 8910),
(13,'KrzysztofKmera', 1112),
(14,'PawelKrasnicki',1314);


-- -----------------------------------------------------
-- Table `clinicDB`.`wizyta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinicDB`.`wizyta` (
  `idWizyty` INT NOT NULL AUTO_INCREMENT,
  `Data` DATE NOT NULL,
  `Domowa` VARCHAR(3) NOT NULL,
  `Platna` VARCHAR(3) NOT NULL,
  `idLekarza` INT NOT NULL,
  `idPacjenta` INT NOT NULL,
  PRIMARY KEY (`idWizyty`),
    FOREIGN KEY (`idLekarza`)
    REFERENCES `clinicDB`.`lekarz` (`idLekarza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`idPacjenta`)
    REFERENCES `clinicDB`.`pacjent` (`idPacjenta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `wizyta` VALUES
(123,'2018-01-02','nie', 'nie', 1, 10),
(124,'2018-01-15','tak', 'nie', 2, 12),
(125,'2018-01-27','nie', 'tak', 3, 14),
(126,'2018-01-13','nie', 'tak', 4, 11),
(127,'2018-01-16','tak', 'nie', 5, 13);


-- -----------------------------------------------------
-- Table `clinicDB`.`skierowanie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinicDB`.`skierowanie` (
  `idSkierowania` INT NOT NULL AUTO_INCREMENT,
  `idPacjenta` INT NOT NULL,
  `idLekarza` INT NOT NULL,
  `idWizyty` INT NOT NULL,
  PRIMARY KEY (`idSkierowania`),
    FOREIGN KEY (`idPacjenta`)
    REFERENCES `clinicDB`.`pacjent` (`idPacjenta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`idLekarza`)
    REFERENCES `clinicDB`.`lekarz` (`idLekarza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`idWizyty`)
    REFERENCES `clinicDB`.`wizyta` (`idWizyty`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `skierowanie` VALUES
(1234, 10, 1, 123),
(1245, 12, 2, 124),
(1256, 14, 3, 125),
(1267, 11, 4, 126),
(1278, 13, 5, 127);


-- -----------------------------------------------------
-- Table `clinicDB`.`recepta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinicDB`.`recepta` (
  `idRecepty` INT NOT NULL AUTO_INCREMENT,
  `idChoroby` INT NOT NULL,
  `Refundacja` INT NOT NULL,
  `idPacjenta` INT NOT NULL,
  `idLekarza` INT NOT NULL,
  `idWizyty` INT NOT NULL,
  PRIMARY KEY (`idRecepty`),
    FOREIGN KEY (`idPacjenta`)
    REFERENCES `clinicDB`.`pacjent` (`idPacjenta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`idLekarza`)
    REFERENCES `clinicDB`.`lekarz` (`idLekarza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`idWizyty`)
    REFERENCES `clinicDB`.`wizyta` (`idWizyty`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


INSERT INTO `recepta` VALUES
(1001, 987, 100, 10, 1, 123),
(1002, 986, 50, 12, 2, 124),
(1003, 985, 30, 14, 3, 125),
(1004, 984, 0, 11, 4, 126),
(1005, 983, 100, 13, 5, 127);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;