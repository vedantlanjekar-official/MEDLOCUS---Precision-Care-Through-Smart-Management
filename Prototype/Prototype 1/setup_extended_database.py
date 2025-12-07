"""
Extended Database Setup Script for MEDLOCUS
Adds customers and sales tables
"""

import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()
load_dotenv(dotenv_path='backend/.env')

DB_CONFIG = {
    'host': os.environ.get('DB_HOST') or os.getenv('DB_HOST', 'localhost'),
    'user': os.environ.get('DB_USER') or os.getenv('DB_USER', 'root'),
    'password': os.environ.get('DB_PASSWORD') or os.getenv('DB_PASSWORD', ''),
    'database': 'medvault_db',
    'charset': 'utf8mb4'
}

def setup_extended_database():
    """Create customers and sales tables"""
    connection = None
    
    try:
        print("Connecting to MySQL server...")
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()
        
        print("Creating customers table...")
        cursor.execute("""
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        """)
        print("[OK] Customers table created")
        
        print("Creating sales table...")
        cursor.execute("""
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        """)
        print("[OK] Sales table created")
        
        print("Creating sale_items table...")
        cursor.execute("""
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
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        """)
        print("[OK] Sale items table created")
        
        # Check if sample data exists
        cursor.execute("SELECT COUNT(*) as count FROM customers")
        customer_count = cursor.fetchone()[0]
        
        if customer_count == 0:
            print("Inserting sample customers...")
            customers = [
                ('Rajesh Sharma', 'rajesh.sharma@email.com', '9876543210', '123 Main St, Mumbai'),
                ('Anita Patel', 'anita.patel@email.com', '9876543211', '456 Park Ave, Delhi'),
                ('Suresh Kumar', 'suresh.kumar@email.com', '9876543212', '789 Market Rd, Bangalore'),
                ('Meera Singh', 'meera.singh@email.com', '9876543213', '321 Garden St, Pune'),
                ('Kiran Reddy', 'kiran.reddy@email.com', '9876543214', '654 Lake View, Hyderabad'),
            ]
            cursor.executemany(
                "INSERT INTO customers (name, email, phone, address) VALUES (%s, %s, %s, %s)",
                customers
            )
            print(f"[OK] Inserted {len(customers)} customers")
        
        connection.commit()
        print("\n" + "="*60)
        print("SUCCESS! Extended database setup completed!")
        print("="*60)
        print("\nTables: customers, sales, sale_items")
        print("You can now use the full CRUD operations.")
        
    except Error as e:
        print(f"\nERROR: {e}")
        if connection:
            connection.rollback()
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("\nMySQL connection closed.")

if __name__ == "__main__":
    print("="*60)
    print("MEDLOCUS - Extended Database Setup")
    print("="*60)
    print()
    setup_extended_database()


