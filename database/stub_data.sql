-- Use e-commerce DB
USE e_commerce;

-- Insert dummy data into customers table
INSERT INTO customers (first_name, last_name, email, phone_number, address, city, state, zip_code, country)
VALUES
    ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Main St', 'Cityville', 'Stateville', '12345', 'Countryland'),
    ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Oak St', 'Townsville', 'Stateville', '54321', 'Countryland');

-- Insert dummy data into users table
INSERT INTO users (full_name, email, password, username, role)
VALUES
    ('Admin User', 'admin@example.com', 'hashed_password', 'admin_user', 'admin'),
    ('Employee User', 'employee@example.com', 'hashed_password', 'employee_user', 'employee');

-- Insert dummy data into brands table
INSERT INTO brands (brand_name, brand_description)
VALUES
    ('BrandA', 'Description for BrandA'),
    ('BrandB', 'Description for BrandB');

-- Insert dummy data into categories table
INSERT INTO categories (category_name)
VALUES
    ('CategoryA'),
    ('CategoryB');

-- Insert dummy data into products table
INSERT INTO products (product_name, description, price, product_quantity, brand_id, category_id)
VALUES
    ('ProductA', 'Description for ProductA', 19.99, 100, 1, 1),
    ('ProductB', 'Description for ProductB', 29.99, 50, 2, 1);

-- Insert dummy data into carts table
INSERT INTO carts (product_id, customer_id, quantity)
VALUES
    (1, 1, 2),
    (2, 2, 1);

-- Insert dummy data into orders table
INSERT INTO orders (product_id, customer_id, quantity, total_amount, order_status)
VALUES
    (1, 1, 2, 39.98, 'pending'),
    (2, 2, 1, 29.99, 'shipped');

-- Insert dummy data into reviews table
INSERT INTO reviews (review, product_id, customer_id)
VALUES
    ('Great product!', 1, 1),
    ('Not satisfied with the quality.', 2, 2);
