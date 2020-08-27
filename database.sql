CREATE DATABASE dashboard_data;

-- Create uuid fuction
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users database
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Notes database
CREATE TABLE notesbook(
    notes_id SERIAL,
    user_id UUID,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    edit_time VARCHAR(255),
    PRIMARY KEY (notes_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
--sample user
INSERT INTO users (name, email, password) VALUES ('admin',
'admin@example.com', 'Respons!asd1');