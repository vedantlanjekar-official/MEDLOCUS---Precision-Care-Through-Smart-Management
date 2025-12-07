-- Extended Schema for MEDLOCUS - Customers and Sales
-- Run this after the base schema

USE medvault_db;

-- Table: customers
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: sales (transactions)
CREATE TABLE IF NOT EXISTS sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    sale_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status ENUM('completed', 'pending', 'cancelled') DEFAULT 'completed',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL,
    INDEX idx_sale_date (sale_date),
    INDEX idx_customer (customer_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: sale_items (many-to-many relationship between sales and medicines)
CREATE TABLE IF NOT EXISTS sale_items (
    sale_item_id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT NOT NULL,
    medicine_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    FOREIGN KEY (sale_id) REFERENCES sales(sale_id) ON DELETE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicines(medicine_id) ON DELETE RESTRICT,
    INDEX idx_sale (sale_id),
    INDEX idx_medicine (medicine_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample customers
INSERT INTO customers (name, email, phone, address) VALUES
('Rajesh Sharma', 'rajesh.sharma@email.com', '9876543210', '123 Main St, Mumbai'),
('Anita Patel', 'anita.patel@email.com', '9876543211', '456 Park Ave, Delhi'),
('Suresh Kumar', 'suresh.kumar@email.com', '9876543212', '789 Market Rd, Bangalore'),
('Meera Singh', 'meera.singh@email.com', '9876543213', '321 Garden St, Pune'),
('Kiran Reddy', 'kiran.reddy@email.com', '9876543214', '654 Lake View, Hyderabad');

-- Sample sales
INSERT INTO sales (customer_id, sale_date, total_amount, status) VALUES
(1, CURDATE(), 250.50, 'completed'),
(2, CURDATE(), 180.25, 'completed'),
(3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 420.00, 'completed'),
(4, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 95.00, 'completed'),
(5, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 320.75, 'completed');

-- Sample sale items
INSERT INTO sale_items (sale_id, medicine_id, quantity, unit_price, subtotal) VALUES
(1, 1, 5, 25.50, 127.50),
(1, 3, 3, 30.00, 90.00),
(1, 5, 2, 20.50, 41.00),
(2, 2, 2, 45.75, 91.50),
(2, 4, 4, 15.25, 61.00),
(3, 6, 2, 55.00, 110.00),
(3, 7, 2, 80.75, 161.50),
(3, 8, 3, 35.25, 105.75),
(4, 1, 2, 25.50, 51.00),
(4, 3, 1, 30.00, 30.00),
(5, 2, 3, 45.75, 137.25),
(5, 5, 4, 20.50, 82.00),
(5, 8, 2, 35.25, 70.50);


