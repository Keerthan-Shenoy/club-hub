CREATE DATABASE IF NOT EXISTS club_hub;

USE club_hub; 

CREATE TABLE IF NOT EXISTS admin (
	admin_id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
);

INSERT INTO admin (admin_id, first_name, last_name, email, password)
VALUES 
(1, 'Keerthan', 'Shenoy', 'shenoyk2003@gmail.com', 'admin'),
(2, 'Kiran', 'M', 'kirankirankiran189@gmail.com', 'admin');

CREATE TABLE IF NOT EXISTS users (
	id INT PRIMARY KEY,
	srn CHAR(13) NOT NULL UNIQUE,
	username VARCHAR(30) NOT NULL UNIQUE,
    about VARCHAR(200),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    gender ENUM('Male', 'Female', 'Other'),
    contact CHAR(10) NOT NULL,
    campus ENUM('RR', 'EC') NOT NULL,
    year_of_graduation YEAR NOT NULL,
    specialization ENUM('CS', 'AM', 'EC', 'EE', 'ME', 'BT') NOT NULL,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    CONSTRAINT chk_contact CHECK (contact REGEXP '^[0-9]{10}$'),
    CONSTRAINT chk_srn CHECK (srn REGEXP '^PES[12](UG|PG)(21|22|23|24)(CS|AM|EC|EE|ME|BT)[0-9]{3}$'),
    CONSTRAINT chk_year CHECK (year_of_graduation BETWEEN 2025 AND 2028)
);

INSERT INTO users (id, srn, username, about, first_name, last_name, gender, contact, campus, year_of_graduation, specialization, email, password)
VALUES 
(1, 'PES1UG23CS101', 'jdoe123', 'A computer science enthusiast.', 'John', 'Doe', 'Male', '9876543210', 'RR', 2025, 'CS', 'jdoe123@example.com', 'password123'),
(2, 'PES2PG22AM102', 'asmith456', 'Loves applied mathematics and data science.', 'Alice', 'Smith', 'Female', '9123456789', 'EC', 2026, 'AM', 'asmith456@example.com', 'securepass456'),
(3, 'PES1UG24ME103', 'bryan789', 'Mechanical engineering student with a passion for design.', 'Bryan', 'Green', 'Male', '9871234567', 'RR', 2028, 'ME', 'bryan789@example.com', 'mechpass789'),
(4, 'PES1UG23EC104', 'carlie25', 'Exploring the world of electronics and communications.', 'Carlie', 'Brown', 'Other', '9123654780', 'EC', 2025, 'EC', 'carlie25@example.com', 'ecomm25'),
(5, 'PES2UG22BT105', 'dharper12', 'Biotechnology major focused on environmental sustainability.', 'Diana', 'Harper', 'Female', '9812345670', 'RR', 2026, 'BT', 'dharper12@example.com', 'biotech123');

CREATE TABLE IF NOT EXISTS club (
	clubId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
	campus ENUM('RR', 'EC') NOT NULL,
    type ENUM('Technical', 'Cultural', 'Community Service', 'Sports', 'Other') NOT NULL,
    founded_date DATE NOT NULL,
    viewed INT DEFAULT 0,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
);

INSERT INTO club(clubId, name, description, campus, type, founded_date, email, password)
VALUES 
(1, 'Kannada Koota', 'Karnataka Culture Language Technical', 'RR', 'Cultural', '2022-09-18', 'kannadakoota@pes.edu', 'kannadakoota'),
(2, 'Pitch Please', 'The club brings together students interested in participating in AtmaTrisha, Freshers’ day', 'RR', 'Cultural', '2019-09-10', 'pitchplease@pes.edu', 'pitchplease'),
(3, 'Sanskriti', 'The club brings together students interested in classical and contemporary dances.', 'RR', 'Cultural', '2019-09-10', 'sanskriti@pes.edu', 'sanskriti');

CREATE TABLE IF NOT EXISTS events (
    event_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    club_id INT NOT NULL,
    event_name VARCHAR(40) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    description_small VARCHAR(100) NOT NULL,
    description_large VARCHAR(1000) NOT NULL,
    venue VARCHAR(30) NOT NULL,
	FOREIGN KEY (club_id) REFERENCES club(clubId)
);

CREATE TABLE IF NOT EXISTS members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    position ENUM('Club Head', 'Technical Head', 'Operations Head') NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (club_id) REFERENCES club(clubId)
);

INSERT INTO members (member_id, user_id, club_id, position) VALUES
(1, 1, 1, 'Club Head'),
(2, 2, 1, 'Technical Head'),
(3, 3, 1, 'Operations Head'),
(4, 2, 2, 'Club Head'),
(5, 3, 2, 'Technical Head'),
(6, 1, 2, 'Operations Head'),
(7, 1, 3, 'Club Head'),
(8, 2, 3, 'Technical Head'),
(9, 3, 3, 'Operations Head');

CREATE TABLE IF NOT EXISTS participants (
	participant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    UNIQUE(user_id, event_id)	
);

CREATE TABLE IF NOT EXISTS club_applications (
	application_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
	campus ENUM('RR', 'EC') NOT NULL,
    type ENUM('Technical', 'Cultural', 'Community Service', 'Sports', 'Other') NOT NULL
);
INSERT INTO events (event_id, club_id, event_name, start_date, end_date, start_time, end_time, description_small, description_large, venue)
VALUES 
(1, 1, 'Kannada Rajyotsava', '2024-11-01', '2024-11-01', '10:00', '14:00', 'Karnataka state formation day celebration.', 'Celebration of Karnataka state formation day with cultural performances and traditional food.', 'Main Auditorium'),
(2, 2, 'Pitch Perfect', '2024-12-15', '2024-12-15', '18:00', '21:00', 'Singing competition.', 'A singing competition featuring solo and group performances from students.', 'Music Hall'),
(3, 3, 'Dance Extravaganza', '2024-10-10', '2024-10-10', '16:00', '19:00', 'Dance performances showcase.', 'A showcase of classical and contemporary dance performances by club members.', 'Dance Studio'),
(4, 1, 'Kannada Literature Fest', '2024-09-20', '2024-09-20', '09:00', '17:00', 'Kannada literature event.', 'A day-long event featuring talks, readings, and discussions on Kannada literature.', 'Library Hall'),
(5, 2, 'Beatbox Battle', '2024-11-25', '2024-11-25', '15:00', '18:00', 'Beatboxing competition.', 'A beatboxing competition open to all students, with prizes for the best performances.', 'Open Stage'),
(6, 3, 'Fusion Dance Night', '2024-12-05', '2024-12-05', '19:00', '22:00', 'Fusion dance performances.', 'An evening of fusion dance performances blending classical and modern styles.', 'Main Auditorium');

INSERT IGNORE INTO participants (user_id, event_id) 
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(1, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 1);

--Query to delete an event
DELETE FROM events WHERE event_id = ?;

--Trigger to delete participants when an event is deleted
DELIMITER //

CREATE TRIGGER delete_event
AFTER DELETE ON events
FOR EACH ROW
BEGIN
    DELETE FROM participants WHERE event_id = OLD.event_id;
END;
//

DELIMITER ;

--Query to insert new club
INSERT INTO club_applications(user_id, name, description, campus, type) 
    VALUES(?, ?, ?, ?, ?);

--Query to insert new event
INSERT INTO events(club_id, event_name, description_small, description_large, venue, start_date, end_date, start_time, end_time) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);

--Query to fetch all club applications with user details
SELECT club_applications.name as club_name, club_applications.description, club_applications.campus, club_applications.type,
users.first_name, users.last_name, users.srn, users.email, users.contact, users.campus, users.year_of_graduation, users.specialization
FROM club_applications
JOIN users 
ON club_applications.user_id = users.id;

--Query to fetch all events
SELECT event_id, name, event_name, start_date, events.description_small, events.description_large FROM events JOIN club ON events.club_id = club.clubId;

--Query to register new user
INSERT INTO users(srn, username, about, first_name, last_name, gender, contact, campus, year_of_graduation, specialization, email, password) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

--Query to fetch all clubs
SELECT * FROM club;

--Nested query to fetch all members of a club
SELECT member_id, first_name, last_name, position
FROM (
    SELECT members.member_id, users.first_name, users.last_name, members.position, members.club_id
    FROM members
    JOIN users ON members.user_id = users.id
) AS subquery
WHERE club_id = ?;

--Query to update number of views of a club page
UPDATE club SET viewed = viewed + 1 WHERE clubId = ?;

--Query to insert into participants table when a user joins an event
INSERT INTO participants(user_id,event_id) VALUES(?,?);

--Query to fetch all participants of an event
SELECT event_id FROM participants WHERE user_id = ?;

--Query to show user profile
SELECT srn,gender,contact,campus,year_of_graduation,specialization,about FROM users WHERE id=?;

--Query to fetch all event details
SELECT * FROM events WHERE event_id = ?;

--Aggregate function to count the number of participants in an event
SELECT COUNT(event_id) FROM participants WHERE event_id = ?;

--Procedure to fetch all participants of an event
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetEventParticipants`(IN p_event_id INT)
BEGIN
    SELECT * 
    FROM participants 
    JOIN users ON participants.user_id = users.id 
    WHERE event_id = p_event_id;
END