

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
  PRIMARY KEY (`idPacjenta`))
ENGINE = InnoDB;

INSERT INTO `pacjent` VALUES
(10,'AgataSkiba'),
(11,'GrzegorzZielinski'),
(12,'PatrycjaMachera'),
(13,'KrzysztofKmera'),
(14,'PawelKrasnicki');


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
  PRIMARY KEY (`idSkierowania`),
    FOREIGN KEY (`idPacjenta`)
    REFERENCES `clinicDB`.`pacjent` (`idPacjenta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`idLekarza`)
    REFERENCES `clinicDB`.`lekarz` (`idLekarza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `skierowanie` VALUES
(1234, 10, 1),
(1245, 12, 2),
(1256, 14, 3),
(1267, 11, 4),
(1278, 13, 5);


-- -----------------------------------------------------
-- Table `clinicDB`.`recepta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clinicDB`.`recepta` (
  `idRecepty` INT NOT NULL AUTO_INCREMENT,
  `idChoroby` INT NOT NULL,
  `Refundacja` INT NOT NULL,
  `idPacjenta` INT NOT NULL,
  `idLekarza` INT NOT NULL,
  PRIMARY KEY (`idRecepty`),
    FOREIGN KEY (`idPacjenta`)
    REFERENCES `clinicDB`.`pacjent` (`idPacjenta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`idLekarza`)
    REFERENCES `clinicDB`.`lekarz` (`idLekarza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


INSERT INTO `recepta` VALUES
(1001, 987, 100, 10, 1),
(1002, 986, 50, 12, 2),
(1003, 985, 30, 14, 3),
(1004, 984, 0, 11, 4),
(1005, 983, 100, 13, 5);

