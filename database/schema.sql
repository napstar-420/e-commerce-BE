-- Drop the database if it exists
DROP DATABASE IF EXISTS e_commerce;

-- Create a new database
CREATE DATABASE e_commerce;

-- Use the newly created database
USE e_commerce;

-- Customers table for storing customer information
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    total_orders INT DEFAULT 0,
    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_first_name_last_name (first_name, last_name) -- Index for frequently queried fields
);

-- Users table for storing user credentials and roles
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed and salted password for security
    username VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'employee') NOT NULL DEFAULT 'employee',
    INDEX idx_email (email), -- Index for email for quicker lookups
    INDEX idx_username (username) -- Index for username for quicker lookups
);

-- Brands table for product branding information
CREATE TABLE brands (
    brand_id INT AUTO_INCREMENT PRIMARY KEY,
    brand_name VARCHAR(100) NOT NULL UNIQUE,
    brand_description VARCHAR(255),
    INDEX idx_brand_name (brand_name) -- Index for brand_name for quicker lookups
);

-- Categories table for product categorization
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- Products table for storing product details
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_description VARCHAR(255),
    product_price DECIMAL(10, 2) NOT NULL,
    product_quantity INT NOT NULL DEFAULT 0,
    in_stock INT NOT NULL DEFAULT 0,
    brand_id INT,
    category_id INT,
    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    INDEX idx_product_name (product_name) -- Index for product_name for quicker lookups
);

CREATE TABLE products_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    mimetype VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    thumb_url VARCHAR(255) NOT NULL,
    medium_url VARCHAR(255) NOT NULL,
    image_size VARCHAR(100),
    delete_url VARCHAR(255),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Trigger for updating in_stock when quantity changes
DELIMITER $$

CREATE TRIGGER before_update_in_quantity
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.product_quantity = 0 THEN
        SET NEW.in_stock = 0;
    ELSE
        SET NEW.in_stock = 1;
    END IF;
END $$

DELIMITER ;

-- Cart table for storing customer's shopping cart items
CREATE TABLE carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    INDEX idx_customer_id (customer_id) -- Index for customer_id for quicker lookups
);

-- Orders table for storing customer orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status ENUM('pending', 'shipped', 'delivered') DEFAULT 'pending',
    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_updated DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    INDEX idx_customer_id (customer_id), -- Index for customer_id for quicker lookups
    INDEX idx_order_status (order_status) -- Index for order_status for quicker lookups
);

-- Trigger for calculating total_amount and quantity before inserting into orders
DELIMITER $$

CREATE TRIGGER before_insert_in_orders
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    SET NEW.quantity = (SELECT quantity FROM carts WHERE customer_id = NEW.customer_id AND product_id = NEW.product_id);
    SET NEW.total_amount = (SELECT product_price * NEW.quantity FROM products WHERE product_id = NEW.product_id);
    -- update product_quantity in products
    UPDATE products
        SET product_quantity = product_quantity - NEW.quantity
    WHERE product_id = NEW.product_id;
END $$

-- Trigger for updating total_orders in customers after an order is inserted
CREATE TRIGGER after_insert_in_orders
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE customers
    SET total_orders = total_orders + 1
    WHERE customer_id = NEW.customer_id;
END $$

DELIMITER ;

-- Reviews table for storing product reviews
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    review VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
