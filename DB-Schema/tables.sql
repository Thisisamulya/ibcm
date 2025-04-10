-- -----------------------------------------------------
-- Schema ibcm
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ibcm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ibcm` ;


-- Users table using ENUM for role (no separate roles table)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role ENUM('admin', 'engineer', 'auditor', 'ulb_official', 'agency_official') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location INT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('planned', 'in_progress', 'completed', 'on_hold') DEFAULT 'planned',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Location table
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address_line1 VARCHAR(150),
    address_line2 VARCHAR(150),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

-- Images table
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    uploaded_by INT NOT NULL,
    image_url TEXT NOT NULL,
    activity_type ENUM('foundation', 'super_structure', 'facade', 'interiors', 'finishing') NOT NULL,
    stage_detected ENUM('foundation', 'super_structure', 'facade', 'interiors', 'finishing') DEFAULT NULL,
    remarks TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Progress Logs table (for SSIM comparisons)
CREATE TABLE progress_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    previous_image_id INT,
    current_image_id INT,
    ssim_score DECIMAL(5,4),
    detected_change TEXT,
    log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (previous_image_id) REFERENCES images(id),
    FOREIGN KEY (current_image_id) REFERENCES images(id)
);

-- Audit Logs table
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
