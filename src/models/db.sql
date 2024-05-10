CREATE DATABASE taskassigner;

--users-->
CREATE TABLE users (
    id varchar NOT NULL PRIMARY KEY,
    username varchar(50) UNIQUE,
    password varchar(8),
    isAdmin boolean DEFAULT false
);

INSERT INTO users(
	id, username, password, isadmin)
	VALUES (?, ?, ?, ?);

SELECT username, password, isadmin
        FROM users

--tasks-->
CREATE TABLE tasks (
    id varchar NOT NULL PRIMARY KEY,
    title varchar(50),
    responsable varchar(50),
    status varchar(25) DEFAULT 'ongoing',
    description varchar(250),
    creationDate timestamp NOT NULL
);

SELECT id, title, responsable, status, description, creationdate
	FROM tasks;

INSERT INTO tasks(
	id, title, responsable, description, creationdate)
	VALUES (?, ?, ?, ?, ?, ?);
