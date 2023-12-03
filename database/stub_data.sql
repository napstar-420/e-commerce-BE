-- Insert dummy data into customers table
INSERT INTO customers (first_name, last_name, email, phone_number, address, city, state, zip_code, country)
VALUES
    ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Main St', 'Anytown', 'CA', '12345', 'USA'),
    ('Alice', 'Smith', 'alice.smith@example.com', '987-654-3210', '456 Oak St', 'Sometown', 'NY', '54321', 'USA');

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
INSERT INTO products (product_name, description, price, brand_id, category_id)
VALUES
    ('ProductA1', 'Description for ProductA1', 19.99, 1, 1),
    ('ProductA2', 'Description for ProductA2', 29.99, 1, 2),
    ('ProductB1', 'Description for ProductB1', 24.99, 2, 1),
    ('ProductB2', 'Description for ProductB2', 34.99, 2, 2);

-- Insert dummy data into carts table
INSERT INTO carts (product_id, customer_id, quantity)
VALUES
    (1, 1, 2), -- John added 2 ProductA1 to his cart
    (3, 2, 1); -- Alice added 1 ProductB1 to her cart

-- Insert dummy data into orders table
INSERT INTO orders (product_id, customer_id, quantity, total_amount, order_status)
VALUES
    (1, 1, 2, 39.98, 'shipped'), -- John ordered 2 ProductA1
    (3, 2, 1, 24.99, 'delivered'); -- Alice ordered 1 ProductB1

-- Insert dummy data into reviews table
INSERT INTO reviews (review, product_id, customer_id)
VALUES
    ('Great product!', 1, 1),
    ('Excellent service!', 3, 2);
