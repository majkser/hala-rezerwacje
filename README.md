# Sports Hall Reservation System

Web application for managing sports hall reservations with user authentication and real-time booking system.

## Stack

- Backend: Node.js, Express
- Database: MySQL
- Frontend: EJS, Tailwind CSS
- Auth: Express-session

## Features

- User authentication (login/register)
- Role-based access (admin/user)
- Real-time hall availability
- Interactive booking calendar
- Responsive design

## Installation

1. Clone and install:
```bash
git clone https://github.com/majkser/hala-rezerwacje.git
cd hala-rezerwacje
npm install
```
2. Configure mysql
```
CREATE DATABASE hala_rezerwacje;
USE hala_rezerwacje;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE halls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255)
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hall_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time_start TIME NOT NULL,
    reservation_time_end TIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hall_id) REFERENCES halls(id)
);
```

3. create .env file
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hala_rezerwacje
```

4. Start server
```
npm run dev
```
