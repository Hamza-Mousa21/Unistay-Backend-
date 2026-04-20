CREATE DATABASE IF NOT EXISTS unistay_db;
USE unistay_db;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'owner', 'student') NOT NULL
);

CREATE TABLE Admin (
    user_id INT PRIMARY KEY,
    permissions JSON,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Owner (
    user_id INT PRIMARY KEY,
    phone_num VARCHAR(20),
    verification BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Student (
    user_id INT PRIMARY KEY,
    major VARCHAR(100),
    year_of_study INT,
    gender ENUM('male', 'female', 'other'),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Residence (
    res_id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    floor_num INT,
    address VARCHAR(255) NOT NULL,
    rent_price DECIMAL(10,2) NOT NULL,
    building_num VARCHAR(50),
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Owner(user_id) ON DELETE CASCADE
);

CREATE TABLE Residence_Image (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL,
    res_id INT NOT NULL,
    FOREIGN KEY (res_id) REFERENCES Residence(res_id) ON DELETE CASCADE
);

CREATE TABLE Wish (
    wish_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    res_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Student(user_id) ON DELETE CASCADE,
    FOREIGN KEY (res_id) REFERENCES Residence(res_id) ON DELETE CASCADE,
    UNIQUE (user_id, res_id)
);

CREATE TABLE Rating (
    rate_id INT PRIMARY KEY AUTO_INCREMENT,
    res_id INT NOT NULL,
    user_id INT NOT NULL,
    rate_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    star_count TINYINT NOT NULL CHECK (star_count BETWEEN 1 AND 5),
    comment TEXT,
    issues TEXT,
    FOREIGN KEY (res_id) REFERENCES Residence(res_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Student(user_id) ON DELETE CASCADE,
    UNIQUE (user_id, res_id)
);