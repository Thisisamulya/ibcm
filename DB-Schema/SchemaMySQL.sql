-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ibcm
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ibcm` ;

-- -----------------------------------------------------
-- Schema ibcm
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ibcm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ibcm` ;

-- -----------------------------------------------------
-- Table `ibcm`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibcm`.`users` ;

CREATE TABLE IF NOT EXISTS `ibcm`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` TEXT NOT NULL,
  `role` ENUM('admin', 'engineer', 'auditor', 'ulb_official', 'agency_official') NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `username` ON `ibcm`.`users` (`username` ASC) VISIBLE;

CREATE UNIQUE INDEX `email` ON `ibcm`.`users` (`email` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ibcm`.`audit_logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibcm`.`audit_logs` ;

CREATE TABLE IF NOT EXISTS `ibcm`.`audit_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `details` TEXT NULL DEFAULT NULL,
  `action_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `audit_logs_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ibcm`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `user_id` ON `ibcm`.`audit_logs` (`user_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ibcm`.`locations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibcm`.`locations` ;

CREATE TABLE IF NOT EXISTS `ibcm`.`locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_line1` VARCHAR(150) NULL DEFAULT NULL,
  `address_line2` VARCHAR(150) NULL DEFAULT NULL,
  `city` VARCHAR(100) NULL DEFAULT NULL,
  `state` VARCHAR(100) NULL DEFAULT NULL,
  `postal_code` VARCHAR(20) NULL DEFAULT NULL,
  `country` VARCHAR(100) NULL DEFAULT NULL,
  `latitude` DECIMAL(10,8) NULL DEFAULT NULL,
  `longitude` DECIMAL(11,8) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ibcm`.`projects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibcm`.`projects` ;

CREATE TABLE IF NOT EXISTS `ibcm`.`projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `location` INT NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `start_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `status` ENUM('planned', 'in_progress', 'completed', 'on_hold') NULL DEFAULT 'planned',
  `created_by` INT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `projects_ibfk_1`
    FOREIGN KEY (`created_by`)
    REFERENCES `ibcm`.`users` (`id`),
  CONSTRAINT `projects_lpfk_2`
    FOREIGN KEY (`location`)
    REFERENCES `ibcm`.`locations` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `created_by` ON `ibcm`.`projects` (`created_by` ASC) VISIBLE;

CREATE INDEX `projects_lpfk_2_idx` ON `ibcm`.`projects` (`location` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ibcm`.`images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibcm`.`images` ;

CREATE TABLE IF NOT EXISTS `ibcm`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `uploaded_by` INT NOT NULL,
  `image_url` TEXT NOT NULL,
  `activity_type` ENUM('foundation', 'super_structure', 'facade', 'interiors', 'finishing') NOT NULL,
  `stage_detected` ENUM('foundation', 'super_structure', 'facade', 'interiors', 'finishing') NULL DEFAULT NULL,
  `remarks` TEXT NULL DEFAULT NULL,
  `uploaded_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `images_ibfk_1`
    FOREIGN KEY (`project_id`)
    REFERENCES `ibcm`.`projects` (`id`),
  CONSTRAINT `images_ibfk_2`
    FOREIGN KEY (`uploaded_by`)
    REFERENCES `ibcm`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `project_id` ON `ibcm`.`images` (`project_id` ASC) VISIBLE;

CREATE INDEX `uploaded_by` ON `ibcm`.`images` (`uploaded_by` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `ibcm`.`progress_logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ibcm`.`progress_logs` ;

CREATE TABLE IF NOT EXISTS `ibcm`.`progress_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `previous_image_id` INT NULL DEFAULT NULL,
  `current_image_id` INT NULL DEFAULT NULL,
  `ssim_score` DECIMAL(5,4) NULL DEFAULT NULL,
  `detected_change` TEXT NULL DEFAULT NULL,
  `log_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `progress_logs_ibfk_1`
    FOREIGN KEY (`project_id`)
    REFERENCES `ibcm`.`projects` (`id`),
  CONSTRAINT `progress_logs_ibfk_2`
    FOREIGN KEY (`previous_image_id`)
    REFERENCES `ibcm`.`images` (`id`),
  CONSTRAINT `progress_logs_ibfk_3`
    FOREIGN KEY (`current_image_id`)
    REFERENCES `ibcm`.`images` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `project_id` ON `ibcm`.`progress_logs` (`project_id` ASC) VISIBLE;

CREATE INDEX `previous_image_id` ON `ibcm`.`progress_logs` (`previous_image_id` ASC) VISIBLE;

CREATE INDEX `current_image_id` ON `ibcm`.`progress_logs` (`current_image_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- begin attached script 'users'
INSERT INTO users (name, username, email, password_hash, role)
VALUES 
('Admin User', 'admin1', 'admin@example.com', 'hashed_pw_1', 'admin'),
('Engineer Rahul', 'rahul_eng', 'rahul@example.com', 'hashed_pw_2', 'engineer'),
('Auditor Priya', 'priya_audit', 'priya@example.com', 'hashed_pw_3', 'auditor'),
('ULB Officer Meena', 'meena_ulb', 'meena@example.com', 'hashed_pw_4', 'ulb_official'),
('Agency Head Raj', 'raj_agency', 'raj@example.com', 'hashed_pw_5', 'agency_official');

-- end attached script 'users'
-- begin attached script 'locations'
INSERT INTO locations (address_line1, address_line2, city, state, postal_code, country, latitude, longitude)
VALUES 
('Plot 101', 'Near Main Road', 'Hyderabad', 'Telangana', '500081', 'India', 17.4445, 78.3772),
('Sector 5', 'Tech Street', 'Bengaluru', 'Karnataka', '560100', 'India', 12.9352, 77.6111);

-- end attached script 'locations'
-- begin attached script 'projects'
INSERT INTO projects (name, location, description, start_date, end_date, status, created_by)
VALUES 
('IT Tower Project', 1, 'Construction of a 10-floor IT tower in Hyderabad', '2024-10-01', '2025-09-30', 'in_progress', 1),
('Affordable Housing', 2, 'Multi-building housing complex for low-income families', '2024-11-15', '2026-03-31', 'planned', 5);

-- end attached script 'projects'
-- begin attached script 'images'
INSERT INTO images (project_id, uploaded_by, image_url, activity_type, stage_detected, remarks)
VALUES 
(1, 2, 'https://yourcdn.com/images/img1.jpg', 'foundation', 'foundation', 'Initial excavation work'),
(1, 2, 'https://yourcdn.com/images/img2.jpg', 'super_structure', 'super_structure', 'Pillars and beams progress'),
(2, 5, 'https://yourcdn.com/images/img3.jpg', 'foundation', NULL, 'Pending classification');

-- end attached script 'images'
-- begin attached script 'progress_logs'
INSERT INTO progress_logs (project_id, previous_image_id, current_image_id, ssim_score, detected_change)
VALUES 
(1, 1, 2, 0.7432, 'Vertical progress from foundation to super structure');

-- end attached script 'progress_logs'
-- begin attached script 'audit_logs'
INSERT INTO audit_logs (user_id, action, details)
VALUES 
(1, 'CREATE_PROJECT', 'Created project IT Tower Project'),
(2, 'UPLOAD_IMAGE', 'Uploaded image of foundation stage for project 1'),
(5, 'UPLOAD_IMAGE', 'Uploaded initial image for Affordable Housing project');

-- end attached script 'audit_logs'
