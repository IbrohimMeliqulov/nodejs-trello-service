-- Active: 1759236939102@@127.0.0.1@5432@my_db
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR(120) NOT NULL,
    user_id UUID REFERENCES users (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS columns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR(120) NOT NULL,
    order_index INT,
    board_id UUID REFERENCES boards (id) ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR(120) NOT NULL,
    order_index INT,
    description TEXT,
    user_id UUID REFERENCES users (id) ON DELETE SET NULL,
    board_id UUID REFERENCES boards (id) ON DELETE CASCADE,
    column_id UUID REFERENCES columns (id) ON DELETE CASCADE
);