-- Create the database
CREATE DATABASE IF NOT EXISTS skilltrack;

-- Use the database
USE skilltrack;

-- Create the roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default roles
INSERT IGNORE INTO roles (role_name) VALUES ('admin'), ('user');

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create the courses table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    instructor VARCHAR(100) NOT NULL
);

-- Create the enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Create progress tracking table
CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    updated_course_id INT NOT NULL,
    courses_completed INT DEFAULT 0,
    total_courses INT DEFAULT 0,
    progress_percentage DECIMAL(5, 2) AS (courses_completed / total_courses * 100) STORED,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Create quiz_answers table
CREATE TABLE IF NOT EXISTS quiz_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    selected_answer TEXT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Create table to manage courses completion
CREATE TABLE IF NOT EXISTS course_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    quiz_score INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE (course_id)
);

-- Table to store course study materials
CREATE TABLE IF NOT EXISTS course_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    material_type ENUM('pdf', 'video', 'link') NOT NULL,
    material_url TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

DELIMITER $$
DROP TRIGGER IF EXISTS `progress_tracking`$$
CREATE TRIGGER `progress_tracking` AFTER INSERT
ON enrollments FOR EACH ROW
BEGIN
    INSERT IGNORE INTO progress(user_id, updated_course_id)
    VALUES(NEW.user_id, NEW.course_id);
    UPDATE progress SET total_courses = total_courses + 1
    WHERE user_id = NEW.user_id;
END$$

DROP TRIGGER IF EXISTS `update_course_progress`$$
CREATE TRIGGER `update_course_progress` AFTER UPDATE
ON progress FOR EACH ROW
BEGIN
    DECLARE score INT;
    IF NEW.courses_completed != OLD.courses_completed THEN
        SELECT COUNT(is_correct) INTO score
        FROM quiz_answers
        WHERE user_id=userId and course_id=courseId and is_correct=TRUE;
        
        INSERT INTO course_progress (user_id, course_id, is_completed, quiz_score)
        VALUES (NEW.user_id, NEW.updated_course_id, TRUE, score);
    END IF;
END$$

DELIMITER ;
