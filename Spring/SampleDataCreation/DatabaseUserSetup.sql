-- Run this as MySQL root (or another admin user) before using the app.
-- Creates the SIGNORA database and user so the app can connect from any host
-- (e.g. from Docker at 172.18.0.1).

CREATE DATABASE IF NOT EXISTS SIGNORA;

CREATE USER IF NOT EXISTS 'SIGNORA'@'%' IDENTIFIED BY 'signora';

GRANT ALL PRIVILEGES ON SIGNORA.* TO 'SIGNORA'@'%';

FLUSH PRIVILEGES;
