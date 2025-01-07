-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR,
    hashed_password VARCHAR,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    auth_provider VARCHAR DEFAULT 'email'
);

-- Create Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR REFERENCES users(id),
    plan VARCHAR DEFAULT 'FREE',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    status VARCHAR DEFAULT 'ACTIVE'
);

-- Create Projects table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    user_id VARCHAR REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content JSONB,
    video_url VARCHAR
);