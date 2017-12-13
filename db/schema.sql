
CREATE DATABASE IF NOT EXISTS db_giftology;

USE db_giftology;

DROP PROCEDURE IF EXISTS PROC_DROP_FOREIGN_KEY;

    DELIMITER $$
    CREATE PROCEDURE PROC_DROP_FOREIGN_KEY(IN tableName VARCHAR(64), IN constraintName VARCHAR(64))
    BEGIN
        IF EXISTS(
            SELECT * FROM information_schema.table_constraints
            WHERE 
                table_schema    = DATABASE()     AND
                table_name      = tableName      AND
                constraint_name = constraintName AND
                constraint_type = 'FOREIGN KEY')
        THEN
            SET @query = CONCAT('ALTER TABLE ', tableName, ' DROP FOREIGN KEY ', constraintName, ';');
            PREPARE stmt FROM @query; 
            EXECUTE stmt; 
            DEALLOCATE PREPARE stmt; 
        END IF; 
    END$$
    DELIMITER ;

CALL PROC_DROP_FOREIGN_KEY('list_recipient','fk_list_recipient_user');
CALL PROC_DROP_FOREIGN_KEY('list_recipient','fk_list_recipient_relation');
CALL PROC_DROP_FOREIGN_KEY('relation','fk_relation_user');
CALL PROC_DROP_FOREIGN_KEY('gift','fk_gift_user');
CALL PROC_DROP_FOREIGN_KEY('gift','fk_gift_relation');

DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user(
	id INT auto_increment,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    photo_url varchar(200) NULL,
    primary key (id)
);



DROP TABLE IF EXISTS relation;

CREATE TABLE IF NOT EXISTS relation(
	id INT auto_increment,
    userID INT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NULL,
    relationhip VARCHAR(20) NULL,
    birthDate DATE NULL,
    address VARCHAR(200) NULL,
    photo_url varchar(200) NULL,
    primary key (id),
    CONSTRAINT `fk_relation_user` foreign key (userID)
		REFERENCES user(id)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS gift;

CREATE TABLE IF NOT EXISTS gift(
	id INT auto_increment,
    userID INT NOT NULL,
    relationID INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    image_url VARCHAR(200) NULL,
    primary key (id),
    CONSTRAINT `fk_gift_user` FOREIGN KEY (userID)
		REFERENCES user(id)
			ON DELETE CASCADE,
	CONSTRAINT `fk_gift_relation` foreign key (relationID)
		REFERENCES relation(id)
			ON DELETE CASCADE
);


DROP TABLE IF EXISTS list_recipient;


CREATE TABLE IF NOT EXISTS list_recipient(
	id INT auto_increment,
    userID INT NOT NULL,
    relationID INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    photo_url VARCHAR(200) NULL,
    haveSentEmail boolean NOT NULL,
    primary key (id),
    CONSTRAINT `fk_list_recipient_user` FOREIGN KEY (userID)
		REFERENCES user(id)
			ON DELETE CASCADE,
	CONSTRAINT `fk_list_recipient_relation` FOREIGN KEY (relationID)
		REFERENCES relation(id)
        ON DELETE CASCADE
);

