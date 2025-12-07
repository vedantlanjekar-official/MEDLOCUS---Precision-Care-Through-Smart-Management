"""
Medical Storage Management System - Flask Backend
REST API endpoints for CRUD operations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from datetime import datetime
import os
from config import DB_CONFIG, FLASK_CONFIG

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


def get_db_connection():
    """Establish database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None


def serialize_date(date_obj):
    """Convert date objects to string format"""
    if date_obj is None:
        return None
    if isinstance(date_obj, datetime):
        return date_obj.strftime('%Y-%m-%d')
    if isinstance(date_obj, str):
        return date_obj
    return str(date_obj)


def serialize_datetime(datetime_obj):
    """Convert datetime objects to string format"""
    if datetime_obj is None:
        return None
    if isinstance(datetime_obj, datetime):
        return datetime_obj.strftime('%Y-%m-%d %H:%M:%S')
    return str(datetime_obj)


# ==================== SUPPLIER ENDPOINTS ====================

@app.route('/api/suppliers', methods=['GET'])
def get_suppliers():
    """Get all suppliers"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM suppliers ORDER BY supplier_name")
        suppliers = cursor.fetchall()
        
        # Serialize datetime objects
        for supplier in suppliers:
            supplier['created_at'] = serialize_datetime(supplier.get('created_at'))
            supplier['updated_at'] = serialize_datetime(supplier.get('updated_at'))
        
        return jsonify(suppliers), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/suppliers', methods=['POST'])
def add_supplier():
    """Add a new supplier"""
    data = request.json
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        # Validate required fields
        if 'supplier_name' not in data or 'contact_no' not in data:
            return jsonify({'error': 'Missing required fields: supplier_name, contact_no'}), 400
        
        cursor = connection.cursor()
        query = "INSERT INTO suppliers (supplier_name, contact_no) VALUES (%s, %s)"
        values = (data['supplier_name'], data['contact_no'])
        cursor.execute(query, values)
        connection.commit()
        return jsonify({'message': 'Supplier added successfully', 'id': cursor.lastrowid}), 201
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


# ==================== MEDICINE ENDPOINTS ====================

@app.route('/api/medicines', methods=['GET'])
def get_medicines():
    """Get all medicines with supplier information"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT m.*, s.supplier_name, s.contact_no
            FROM medicines m
            JOIN suppliers s ON m.supplier_id = s.supplier_id
            ORDER BY m.name
        """
        cursor.execute(query)
        medicines = cursor.fetchall()
        
        # Serialize date and datetime objects
        for medicine in medicines:
            medicine['mfg_date'] = serialize_date(medicine.get('mfg_date'))
            medicine['exp_date'] = serialize_date(medicine.get('exp_date'))
            medicine['created_at'] = serialize_datetime(medicine.get('created_at'))
            medicine['updated_at'] = serialize_datetime(medicine.get('updated_at'))
        
        return jsonify(medicines), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/medicines/<int:medicine_id>', methods=['GET'])
def get_medicine(medicine_id):
    """Get a specific medicine by ID"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT m.*, s.supplier_name, s.contact_no
            FROM medicines m
            JOIN suppliers s ON m.supplier_id = s.supplier_id
            WHERE m.medicine_id = %s
        """
        cursor.execute(query, (medicine_id,))
        medicine = cursor.fetchone()
        
        if medicine:
            medicine['mfg_date'] = serialize_date(medicine.get('mfg_date'))
            medicine['exp_date'] = serialize_date(medicine.get('exp_date'))
            medicine['created_at'] = serialize_datetime(medicine.get('created_at'))
            medicine['updated_at'] = serialize_datetime(medicine.get('updated_at'))
            return jsonify(medicine), 200
        else:
            return jsonify({'error': 'Medicine not found'}), 404
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/medicines/search', methods=['GET'])
def search_medicines():
    """Search medicines by name, company, or supplier"""
    search_term = request.args.get('q', '')
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT m.*, s.supplier_name, s.contact_no
            FROM medicines m
            JOIN suppliers s ON m.supplier_id = s.supplier_id
            WHERE m.name LIKE %s OR m.company LIKE %s OR s.supplier_name LIKE %s
            ORDER BY m.name
        """
        search_pattern = f'%{search_term}%'
        cursor.execute(query, (search_pattern, search_pattern, search_pattern))
        medicines = cursor.fetchall()
        
        # Serialize date objects
        for medicine in medicines:
            medicine['mfg_date'] = serialize_date(medicine.get('mfg_date'))
            medicine['exp_date'] = serialize_date(medicine.get('exp_date'))
            medicine['created_at'] = serialize_datetime(medicine.get('created_at'))
            medicine['updated_at'] = serialize_datetime(medicine.get('updated_at'))
        
        return jsonify(medicines), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/medicines/expiring', methods=['GET'])
def get_expiring_medicines():
    """Get medicines expiring within specified days (default 30 days)"""
    days = request.args.get('days', 30, type=int)
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT m.*, s.supplier_name, s.contact_no,
                   DATEDIFF(m.exp_date, CURDATE()) as days_until_expiry
            FROM medicines m
            JOIN suppliers s ON m.supplier_id = s.supplier_id
            WHERE m.exp_date <= DATE_ADD(CURDATE(), INTERVAL %s DAY)
            AND m.exp_date >= CURDATE()
            ORDER BY m.exp_date
        """
        cursor.execute(query, (days,))
        medicines = cursor.fetchall()
        
        for medicine in medicines:
            medicine['mfg_date'] = serialize_date(medicine.get('mfg_date'))
            medicine['exp_date'] = serialize_date(medicine.get('exp_date'))
            medicine['created_at'] = serialize_datetime(medicine.get('created_at'))
            medicine['updated_at'] = serialize_datetime(medicine.get('updated_at'))
        
        return jsonify(medicines), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/medicines', methods=['POST'])
def add_medicine():
    """Add a new medicine"""
    data = request.json
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        # Validate required fields
        required_fields = ['name', 'company', 'mfg_date', 'exp_date', 'quantity', 'price', 'supplier_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate numeric fields
        try:
            quantity = int(data['quantity'])
            price = float(data['price'])
            supplier_id = int(data['supplier_id'])
            
            if quantity < 0:
                return jsonify({'error': 'Quantity must be non-negative'}), 400
            if price < 0:
                return jsonify({'error': 'Price must be non-negative'}), 400
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid numeric value'}), 400
        
        cursor = connection.cursor()
        query = """
            INSERT INTO medicines (name, company, mfg_date, exp_date, quantity, price, supplier_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['name'],
            data['company'],
            data['mfg_date'],
            data['exp_date'],
            quantity,
            price,
            supplier_id
        )
        cursor.execute(query, values)
        connection.commit()
        return jsonify({'message': 'Medicine added successfully', 'id': cursor.lastrowid}), 201
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/medicines/<int:medicine_id>', methods=['PUT'])
def update_medicine(medicine_id):
    """Update an existing medicine"""
    data = request.json
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        # Validate required fields
        required_fields = ['name', 'company', 'mfg_date', 'exp_date', 'quantity', 'price', 'supplier_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate numeric fields
        try:
            quantity = int(data['quantity'])
            price = float(data['price'])
            supplier_id = int(data['supplier_id'])
            
            if quantity < 0:
                return jsonify({'error': 'Quantity must be non-negative'}), 400
            if price < 0:
                return jsonify({'error': 'Price must be non-negative'}), 400
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid numeric value'}), 400
        
        cursor = connection.cursor()
        query = """
            UPDATE medicines
            SET name = %s, company = %s, mfg_date = %s, exp_date = %s,
                quantity = %s, price = %s, supplier_id = %s
            WHERE medicine_id = %s
        """
        values = (
            data['name'],
            data['company'],
            data['mfg_date'],
            data['exp_date'],
            quantity,
            price,
            supplier_id,
            medicine_id
        )
        cursor.execute(query, values)
        connection.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Medicine not found'}), 404
        
        return jsonify({'message': 'Medicine updated successfully'}), 200
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/medicines/<int:medicine_id>', methods=['DELETE'])
def delete_medicine(medicine_id):
    """Delete a medicine"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        query = "DELETE FROM medicines WHERE medicine_id = %s"
        cursor.execute(query, (medicine_id,))
        connection.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Medicine not found'}), 404
        
        return jsonify({'message': 'Medicine deleted successfully'}), 200
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Medical Storage Management System API is running'}), 200


# ==================== AUTH ENDPOINTS ====================

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Simple authentication endpoint (demo mode)"""
    data = request.json
    email = data.get('email', '')
    password = data.get('password', '')
    
    # Demo credentials - in production, verify against database
    if email == 'demo@medlocus.com' and password == 'demo123':
        return jsonify({
            'token': 'demo-jwt-token-' + str(int(datetime.now().timestamp())),
            'user': {
                'id': 'user-1',
                'name': 'Demo User',
                'email': email
            }
        }), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401


# ==================== KPI ENDPOINTS ====================

@app.route('/api/kpis', methods=['GET'])
def get_kpis():
    """Get dashboard KPIs"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # Today's Sales (sum of price * quantity for today's date - simplified)
        cursor.execute("""
            SELECT COALESCE(SUM(price * quantity), 0) as total_value
            FROM medicines
        """)
        total_value_result = cursor.fetchone()
        today_sales = float(total_value_result['total_value']) * 0.1  # Simplified: 10% of total
        
        # Pending Prescriptions (medicines with low stock)
        cursor.execute("""
            SELECT COUNT(*) as count
            FROM medicines
            WHERE quantity < 10
        """)
        pending_result = cursor.fetchone()
        pending_count = pending_result['count']
        
        # Low Stock Items
        cursor.execute("""
            SELECT COUNT(*) as count
            FROM medicines
            WHERE quantity < 5
        """)
        low_stock_result = cursor.fetchone()
        low_stock_count = low_stock_result['count']
        
        # Total Inventory Value
        cursor.execute("""
            SELECT COALESCE(SUM(price * quantity), 0) as total_value
            FROM medicines
        """)
        inventory_result = cursor.fetchone()
        inventory_value = float(inventory_result['total_value'])
        
        kpis = [
            {
                'id': 'k1',
                'label': "Today's Sales",
                'value': round(today_sales, 2),
                'delta': 4.3,
                'unit': 'USD'
            },
            {
                'id': 'k2',
                'label': 'Pending Prescriptions',
                'value': pending_count,
                'delta': -8.0
            },
            {
                'id': 'k3',
                'label': 'Low Stock Items',
                'value': low_stock_count,
                'delta': 1.5
            },
            {
                'id': 'k4',
                'label': 'Total Inventory Value',
                'value': round(inventory_value, 2),
                'delta': 2.1,
                'unit': 'USD'
            }
        ]
        
        return jsonify(kpis), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


# ==================== TRANSACTIONS ENDPOINTS ====================

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    """Get recent transactions (mocked from medicines data)"""
    limit = request.args.get('limit', 10, type=int)
    page = request.args.get('page', 1, type=int)
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # Get recent medicines as transactions (simplified)
        cursor.execute("""
            SELECT 
                medicine_id as id,
                updated_at as date,
                CONCAT('Customer-', medicine_id) as customer,
                1 as items,
                price as total,
                CASE 
                    WHEN quantity > 5 THEN 'completed'
                    WHEN quantity > 0 THEN 'pending'
                    ELSE 'refunded'
                END as status
            FROM medicines
            ORDER BY updated_at DESC
            LIMIT %s OFFSET %s
        """, (limit, (page - 1) * limit))
        
        transactions = cursor.fetchall()
        
        # Get total count
        cursor.execute("SELECT COUNT(*) as total FROM medicines")
        total_result = cursor.fetchone()
        total = total_result['total']
        
        # Serialize datetime
        for transaction in transactions:
            transaction['date'] = serialize_datetime(transaction.get('date'))
            transaction['total'] = float(transaction['total'])
        
        return jsonify({
            'items': transactions,
            'total': total
        }), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


# ==================== INVENTORY ALERTS ====================

@app.route('/api/inventory/alerts', methods=['GET'])
def get_inventory_alerts():
    """Get inventory alerts (low stock and expiring items)"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # Get low stock items (quantity < 5) or expiring soon (within 30 days)
        cursor.execute("""
            SELECT 
                medicine_id as id,
                name,
                CONCAT('MED-', medicine_id) as sku,
                quantity as stock,
                exp_date as expiryDate
            FROM medicines
            WHERE quantity < 5 OR exp_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
            ORDER BY quantity ASC, exp_date ASC
            LIMIT 10
        """)
        
        alerts = cursor.fetchall()
        
        # Serialize dates
        for alert in alerts:
            if alert.get('expiryDate'):
                alert['expiryDate'] = serialize_date(alert['expiryDate'])
        
        return jsonify(alerts), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


# ==================== CUSTOMER ENDPOINTS ====================

@app.route('/api/customers', methods=['GET'])
def get_customers():
    """Get all customers with optional search"""
    search = request.args.get('search', '')
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        if search:
            query = """
                SELECT * FROM customers
                WHERE name LIKE %s OR email LIKE %s OR phone LIKE %s
                ORDER BY name
            """
            search_pattern = f'%{search}%'
            cursor.execute(query, (search_pattern, search_pattern, search_pattern))
        else:
            cursor.execute("SELECT * FROM customers ORDER BY name")
        
        customers = cursor.fetchall()
        for customer in customers:
            customer['created_at'] = serialize_datetime(customer.get('created_at'))
            customer['updated_at'] = serialize_datetime(customer.get('updated_at'))
        
        return jsonify(customers), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """Get a specific customer"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM customers WHERE customer_id = %s", (customer_id,))
        customer = cursor.fetchone()
        
        if not customer:
            return jsonify({'error': 'Customer not found'}), 404
        
        customer['created_at'] = serialize_datetime(customer.get('created_at'))
        customer['updated_at'] = serialize_datetime(customer.get('updated_at'))
        
        return jsonify(customer), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/customers', methods=['POST'])
def add_customer():
    """Add a new customer"""
    data = request.json
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        query = """
            INSERT INTO customers (name, email, phone, address)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (
            data.get('name'),
            data.get('email'),
            data.get('phone'),
            data.get('address')
        ))
        connection.commit()
        customer_id = cursor.lastrowid
        
        cursor.close()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM customers WHERE customer_id = %s", (customer_id,))
        customer = cursor.fetchone()
        customer['created_at'] = serialize_datetime(customer.get('created_at'))
        customer['updated_at'] = serialize_datetime(customer.get('updated_at'))
        
        return jsonify(customer), 201
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    """Update a customer"""
    data = request.json
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        query = """
            UPDATE customers
            SET name = %s, email = %s, phone = %s, address = %s
            WHERE customer_id = %s
        """
        cursor.execute(query, (
            data.get('name'),
            data.get('email'),
            data.get('phone'),
            data.get('address'),
            customer_id
        ))
        connection.commit()
        
        cursor.close()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM customers WHERE customer_id = %s", (customer_id,))
        customer = cursor.fetchone()
        
        if not customer:
            return jsonify({'error': 'Customer not found'}), 404
        
        customer['created_at'] = serialize_datetime(customer.get('created_at'))
        customer['updated_at'] = serialize_datetime(customer.get('updated_at'))
        
        return jsonify(customer), 200
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    """Delete a customer"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM customers WHERE customer_id = %s", (customer_id,))
        connection.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Customer not found'}), 404
        
        return jsonify({'message': 'Customer deleted successfully'}), 200
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


# ==================== SALES ENDPOINTS ====================

@app.route('/api/sales', methods=['GET'])
def get_sales():
    """Get all sales with optional filters"""
    search = request.args.get('search', '')
    status = request.args.get('status', '')
    limit = request.args.get('limit', 50, type=int)
    page = request.args.get('page', 1, type=int)
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        offset = (page - 1) * limit
        
        where_clauses = []
        params = []
        
        if search:
            where_clauses.append("(c.name LIKE %s OR s.sale_id = %s)")
            search_pattern = f'%{search}%'
            params.extend([search_pattern, search if search.isdigit() else -1])
        
        if status:
            where_clauses.append("s.status = %s")
            params.append(status)
        
        where_sql = "WHERE " + " AND ".join(where_clauses) if where_clauses else ""
        
        query = f"""
            SELECT s.*, c.name as customer_name, c.email as customer_email,
                   (SELECT COUNT(*) FROM sale_items WHERE sale_id = s.sale_id) as item_count
            FROM sales s
            LEFT JOIN customers c ON s.customer_id = c.customer_id
            {where_sql}
            ORDER BY s.sale_date DESC, s.created_at DESC
            LIMIT %s OFFSET %s
        """
        params.extend([limit, offset])
        cursor.execute(query, params)
        sales = cursor.fetchall()
        
        # Get total count
        count_query = f"SELECT COUNT(*) as total FROM sales s LEFT JOIN customers c ON s.customer_id = c.customer_id {where_sql}"
        cursor.execute(count_query, params[:-2])
        total = cursor.fetchone()['total']
        
        for sale in sales:
            sale['sale_date'] = serialize_date(sale.get('sale_date'))
            sale['created_at'] = serialize_datetime(sale.get('created_at'))
            sale['updated_at'] = serialize_datetime(sale.get('updated_at'))
            sale['total_amount'] = float(sale['total_amount'])
        
        return jsonify({'items': sales, 'total': total}), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/sales/<int:sale_id>', methods=['GET'])
def get_sale(sale_id):
    """Get a specific sale with items"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT s.*, c.name as customer_name, c.email as customer_email
            FROM sales s
            LEFT JOIN customers c ON s.customer_id = c.customer_id
            WHERE s.sale_id = %s
        """, (sale_id,))
        sale = cursor.fetchone()
        
        if not sale:
            return jsonify({'error': 'Sale not found'}), 404
        
        # Get sale items
        cursor.execute("""
            SELECT si.*, m.name as medicine_name, m.company
            FROM sale_items si
            JOIN medicines m ON si.medicine_id = m.medicine_id
            WHERE si.sale_id = %s
        """, (sale_id,))
        items = cursor.fetchall()
        
        for item in items:
            item['unit_price'] = float(item['unit_price'])
            item['subtotal'] = float(item['subtotal'])
        
        sale['items'] = items
        sale['sale_date'] = serialize_date(sale.get('sale_date'))
        sale['created_at'] = serialize_datetime(sale.get('created_at'))
        sale['updated_at'] = serialize_datetime(sale.get('updated_at'))
        sale['total_amount'] = float(sale['total_amount'])
        
        return jsonify(sale), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/sales', methods=['POST'])
def add_sale():
    """Add a new sale with items"""
    data = request.json
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        
        # Insert sale
        sale_query = """
            INSERT INTO sales (customer_id, sale_date, total_amount, status, notes)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sale_query, (
            data.get('customer_id'),
            data.get('sale_date'),
            data.get('total_amount'),
            data.get('status', 'completed'),
            data.get('notes')
        ))
        sale_id = cursor.lastrowid
        
        # Insert sale items and update medicine quantities
        items = data.get('items', [])
        for item in items:
            # Insert sale item
            item_query = """
                INSERT INTO sale_items (sale_id, medicine_id, quantity, unit_price, subtotal)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(item_query, (
                sale_id,
                item['medicine_id'],
                item['quantity'],
                item['unit_price'],
                item['subtotal']
            ))
            
            # Update medicine quantity
            cursor.execute("""
                UPDATE medicines
                SET quantity = quantity - %s
                WHERE medicine_id = %s AND quantity >= %s
            """, (item['quantity'], item['medicine_id'], item['quantity']))
        
        connection.commit()
        
        # Return created sale
        cursor.close()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT s.*, c.name as customer_name
            FROM sales s
            LEFT JOIN customers c ON s.customer_id = c.customer_id
            WHERE s.sale_id = %s
        """, (sale_id,))
        sale = cursor.fetchone()
        sale['sale_date'] = serialize_date(sale.get('sale_date'))
        sale['total_amount'] = float(sale['total_amount'])
        
        return jsonify(sale), 201
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/sales/<int:sale_id>', methods=['PUT'])
def update_sale(sale_id):
    """Update a sale"""
    data = request.json
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        query = """
            UPDATE sales
            SET customer_id = %s, sale_date = %s, total_amount = %s, status = %s, notes = %s
            WHERE sale_id = %s
        """
        cursor.execute(query, (
            data.get('customer_id'),
            data.get('sale_date'),
            data.get('total_amount'),
            data.get('status'),
            data.get('notes'),
            sale_id
        ))
        connection.commit()
        
        cursor.close()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM sales WHERE sale_id = %s", (sale_id,))
        sale = cursor.fetchone()
        
        if not sale:
            return jsonify({'error': 'Sale not found'}), 404
        
        sale['sale_date'] = serialize_date(sale.get('sale_date'))
        sale['total_amount'] = float(sale['total_amount'])
        
        return jsonify(sale), 200
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/api/sales/<int:sale_id>', methods=['DELETE'])
def delete_sale(sale_id):
    """Delete a sale (and restore medicine quantities)"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor()
        
        # Get sale items to restore quantities
        cursor.execute("""
            SELECT medicine_id, quantity FROM sale_items WHERE sale_id = %s
        """, (sale_id,))
        items = cursor.fetchall()
        
        # Restore medicine quantities
        for item in items:
            cursor.execute("""
                UPDATE medicines SET quantity = quantity + %s WHERE medicine_id = %s
            """, (item[1], item[0]))
        
        # Delete sale (cascade will delete sale_items)
        cursor.execute("DELETE FROM sales WHERE sale_id = %s", (sale_id,))
        connection.commit()
        
        if cursor.rowcount == 0:
            return jsonify({'error': 'Sale not found'}), 404
        
        return jsonify({'message': 'Sale deleted successfully'}), 200
    except Error as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


# ==================== REPORTS ENDPOINTS ====================

@app.route('/api/reports/summary', methods=['GET'])
def get_report_summary():
    """Get dashboard summary report"""
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # Total sales today
        cursor.execute("""
            SELECT COALESCE(SUM(total_amount), 0) as total
            FROM sales
            WHERE DATE(sale_date) = CURDATE() AND status = 'completed'
        """)
        today_sales = float(cursor.fetchone()['total'])
        
        # Total sales this month
        cursor.execute("""
            SELECT COALESCE(SUM(total_amount), 0) as total
            FROM sales
            WHERE MONTH(sale_date) = MONTH(CURDATE())
            AND YEAR(sale_date) = YEAR(CURDATE())
            AND status = 'completed'
        """)
        month_sales = float(cursor.fetchone()['total'])
        
        # Total customers
        cursor.execute("SELECT COUNT(*) as total FROM customers")
        total_customers = cursor.fetchone()['total']
        
        # Total medicines
        cursor.execute("SELECT COUNT(*) as total FROM medicines")
        total_medicines = cursor.fetchone()['total']
        
        # Low stock count
        cursor.execute("SELECT COUNT(*) as total FROM medicines WHERE quantity < 5")
        low_stock = cursor.fetchone()['total']
        
        # Expiring soon count
        cursor.execute("""
            SELECT COUNT(*) as total FROM medicines
            WHERE exp_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
            AND exp_date >= CURDATE()
        """)
        expiring_soon = cursor.fetchone()['total']
        
        # Top selling medicines (last 30 days)
        cursor.execute("""
            SELECT m.name, m.company, SUM(si.quantity) as total_sold, SUM(si.subtotal) as revenue
            FROM sale_items si
            JOIN sales s ON si.sale_id = s.sale_id
            JOIN medicines m ON si.medicine_id = m.medicine_id
            WHERE s.sale_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            AND s.status = 'completed'
            GROUP BY m.medicine_id, m.name, m.company
            ORDER BY total_sold DESC
            LIMIT 10
        """)
        top_medicines = cursor.fetchall()
        for med in top_medicines:
            med['total_sold'] = int(med['total_sold'])
            med['revenue'] = float(med['revenue'])
        
        # Sales trend (last 7 days)
        cursor.execute("""
            SELECT DATE(sale_date) as date, SUM(total_amount) as total
            FROM sales
            WHERE sale_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            AND status = 'completed'
            GROUP BY DATE(sale_date)
            ORDER BY date
        """)
        sales_trend = cursor.fetchall()
        for trend in sales_trend:
            trend['date'] = serialize_date(trend['date'])
            trend['total'] = float(trend['total'])
        
        return jsonify({
            'today_sales': today_sales,
            'month_sales': month_sales,
            'total_customers': total_customers,
            'total_medicines': total_medicines,
            'low_stock': low_stock,
            'expiring_soon': expiring_soon,
            'top_medicines': top_medicines,
            'sales_trend': sales_trend
        }), 200
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()


if __name__ == '__main__':
    app.run(debug=FLASK_CONFIG['DEBUG'], port=FLASK_CONFIG['PORT'], host=FLASK_CONFIG['HOST'])

