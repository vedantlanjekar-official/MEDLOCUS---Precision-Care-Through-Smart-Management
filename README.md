# 🏥 Medical Storage Management System (MEDLOCUS)

<img width="1024" height="1024" alt="Logo" src="https://github.com/user-attachments/assets/34149f0a-5bfd-4acb-8fc5-4ebdbfcef1b2" />

A comprehensive, full-stack web application designed to help pharmacies efficiently manage their medicine inventory with complete CRUD operations, advanced search functionality, expiry date tracking, and an intuitive user interface.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)
- [Future Enhancements](#future-enhancements)
- [Documentation](#documentation)
- [Contributors](#contributors)
- [License](#license)

---

## 🎯 Project Overview

The **Medical Storage Management System (MEDLOCUS)** is a complete digital solution for pharmacy inventory management. It replaces traditional manual record-keeping with a modern, web-based system that provides:

- **Digital Inventory Management**: Store and manage all medicine records in a centralized database
- **Real-time Updates**: Instant reflection of changes across the system
- **Expiry Tracking**: Automated alerts for medicines approaching their expiry dates
- **Efficient Search**: Quick search across multiple criteria (name, company, supplier)
- **Data Integrity**: Database constraints ensure accurate and consistent data
- **User-Friendly Interface**: Modern, responsive design that works on all devices

### Problem Statement

Traditional pharmacy inventory management faces several challenges:
- ❌ **Time-consuming**: Manual entry and updates take significant time
- ❌ **Error-prone**: Human errors in data entry and calculations
- ❌ **Inefficient**: Difficulty in searching and retrieving information quickly
- ❌ **No Expiry Tracking**: Manual tracking of expiry dates is prone to oversight
- ❌ **Limited Search**: Finding specific medicines requires scanning through physical records

### Solution

MEDLOCUS addresses these challenges by providing:
1. ✅ Digital record management in a centralized database
2. ✅ Instant search across multiple criteria
3. ✅ Automated expiry alerts for proactive management
4. ✅ Database constraints ensuring data integrity
5. ✅ Intuitive design reducing learning curve
6. ✅ Real-time updates across the system

---

## ✨ Features

### Core Features

#### 1. Medicine Management
- ➕ **Add Medicine**: Complete form with validation for all medicine details
- 👁️ **View Medicines**: Comprehensive table view with all medicine information
- ✏️ **Update Medicine**: Easy editing of existing medicine records
- 🗑️ **Delete Medicine**: Safe deletion with confirmation prompts
- 🔍 **Search Medicines**: Search by medicine name, company, or supplier name
- ⏰ **Expiry Tracking**: Automatic identification of expiring medicines

#### 2. Supplier Management
- 📋 **View Suppliers**: List all suppliers with contact information
- ➕ **Add Supplier**: Add new suppliers to the system
- 🔗 **Supplier Linking**: Link medicines to their suppliers

#### 3. Dashboard
- 📊 **Statistics**: View total medicines, quantity, inventory value, and low stock items
- ⚠️ **Expiry Alerts**: Prominent display of medicines expiring within 30 days
- 🚀 **Quick Access**: Easy navigation to all features

#### 4. Advanced Features
- 🎨 **Color-coded Expiry Dates**: Visual indicators (red for expired, yellow for expiring soon)
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Form Validation**: Client-side and server-side validation for data integrity
- 💾 **Auto-save Timestamps**: Automatic tracking of created and updated dates

---

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with responsive design, animations, and gradients
- **JavaScript (ES6+)**: Dynamic functionality, API communication, and DOM manipulation

### Backend
- **Python 3.8+**: Programming language
- **Flask 3.0.0**: Lightweight web framework for REST API
- **Flask-CORS 4.0.0**: Cross-Origin Resource Sharing support
- **mysql-connector-python 8.2.0**: MySQL database connectivity
- **python-dotenv 1.0.0**: Environment variable management

### Database
- **MySQL 5.7+ / MySQL 8.0+**: Relational database management system
- **Normalization**: 3NF (Third Normal Form) compliant design

### Architecture
- **Three-Tier Architecture**:
  - **Presentation Layer**: HTML/CSS/JavaScript frontend
  - **Application Layer**: Python Flask REST API
  - **Data Layer**: MySQL relational database

---

## 📁 Project Structure

```
MEDLOCUS/
│
├── Prototype/
│   └── Prototype 1/
│       │
│       ├── backend/
│       │   ├── __pycache__/          # Python cache files
│       │   ├── app.py                 # Main Flask application (REST API)
│       │   ├── config.py              # Database and Flask configuration
│       │   ├── requirements.txt       # Python dependencies
│       │   └── venv/                  # Virtual environment (optional)
│       │
│       ├── frontend/
│       │   ├── index.html             # Dashboard/landing page
│       │   ├── add_medicine.html      # Add medicine form page
│       │   ├── update_medicine.html   # Update medicine form page
│       │   ├── view_medicines.html    # View all medicines page
│       │   ├── search_medicine.html   # Search medicine page
│       │   ├── css/
│       │   │   └── style.css          # Main stylesheet (modern design)
│       │   └── js/
│       │       └── app.js             # JavaScript for API calls and UI logic
│       │
│       ├── static/
│       │   ├── css/
│       │   │   └── style.css          # Alternative stylesheet
│       │   └── js/
│       │       └── main.js            # Additional JavaScript (for templates)
│       │
│       ├── templates/
│       │   └── index.html             # Flask template (alternative frontend)
│       │
│       ├── database/
│       │   ├── schema.sql             # MySQL database schema with sample data
│       │   └── sample_data.sql        # Additional sample data (optional)
│       │
│       ├── documentation/
│       │   ├── Introduction.md        # Project introduction and abstract
│       │   ├── SRS.md                 # Software Requirements Specification
│       │   ├── ER_Diagram.md          # Entity Relationship Diagram and Relational Model
│       │   ├── Testing.md             # Complete testing documentation (23 test cases)
│       │   ├── Conclusion.md          # Project conclusion and summary
│       │   └── ER_Diagram.txt         # Text-based ER diagram
│       │
│       ├── setup_database.py          # Automated database setup script
│       ├── run_setup.py               # Quick database setup wrapper
│       ├── test_connection.py         # Database connection testing script
│       │
│       ├── README.md                  # This file (main documentation)
│       ├── PROJECT_SUMMARY.md         # Quick project summary
│       ├── START_HERE.md              # Quick start guide
│       ├── SETUP_GUIDE.md             # Detailed setup instructions
│       └── RUN_PROJECT.md             # Running instructions
│
└── Documentation/                     # Additional project documentation
    ├── Abstract.pdf
    ├── Problem Statement.pdf
    ├── Solution.pdf
    ├── System Architecture.pdf
    └── Tech Stack.pdf
```

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.7 or higher**
   - Download from: https://www.python.org/downloads/
   - Verify installation: `python --version`

2. **MySQL 5.7 or higher** (Recommended: MySQL 8.0+)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or install XAMPP which includes MySQL: https://www.apachefriends.org/

3. **pip** (Python package manager)
   - Usually comes with Python installation
   - Verify: `pip --version`

4. **Web Browser**
   - Google Chrome (recommended)
   - Mozilla Firefox
   - Microsoft Edge
   - Safari

5. **Git** (optional, for cloning repositories)
   - Download from: https://git-scm.com/downloads

---

### Step-by-Step Installation

#### Step 1: Clone or Download the Project

**Option A: Download ZIP**
1. Download the project ZIP file
2. Extract to your desired location (e.g., `C:\Users\YourName\Desktop\Projects\`)

**Option B: Clone Repository** (if using Git)
```bash
git clone <repository-url>
cd MEDLOCUS/Prototype/Prototype\ 1
```

#### Step 2: Database Setup

**Method 1: Automated Setup (Recommended)**

1. Navigate to project directory:
   ```bash
   cd "Prototype\Prototype 1"
   ```

2. Run the automated setup script:
   ```bash
   python setup_database.py
   ```
   
   If MySQL has a password, you can pass it as an argument:
   ```bash
   python setup_database.py YOUR_MYSQL_PASSWORD
   ```

   The script will:
   - ✅ Create the database `medvault_db`
   - ✅ Create `suppliers` and `medicines` tables
   - ✅ Insert sample data (5 suppliers, 8 medicines)
   - ✅ Set up all necessary indexes and constraints

**Method 2: Manual Setup via MySQL Command Line**

1. Open MySQL command line or MySQL Workbench:
   ```bash
   mysql -u root -p
   ```

2. Run the schema script:
   ```bash
   source database/schema.sql;
   ```
   
   Or from command line:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

**Method 3: Using MySQL Workbench (Easiest)**

1. Open **MySQL Workbench**
2. Connect to your MySQL server
3. Click **File** → **Open SQL Script**
4. Navigate to: `database/schema.sql`
5. Click **Execute** button (⚡ lightning bolt icon)

**Verify Database Setup**

Run the test script:
```bash
python test_connection.py
```

Expected output:
```
✓ Database 'medvault_db' exists!
✓ Found 2 table(s): ['medicines', 'suppliers']
✓ Suppliers: 5 records
✓ Medicines: 8 records
```

#### Step 3: Backend Setup

1. **Navigate to project directory:**
   ```bash
   cd "Prototype\Prototype 1"
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r backend/requirements.txt
   ```
   
   This installs:
   - Flask 3.0.0
   - mysql-connector-python 8.2.0
   - flask-cors 4.0.0
   - python-dotenv 1.0.0

3. **Configure Database Connection**

   **Option A: Using Environment Variables (Recommended)**
   
   Create a `.env` file in the `backend` directory:
   ```env
   DB_HOST=localhost
   DB_NAME=medvault_db
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   FLASK_DEBUG=True
   FLASK_PORT=5000
   FLASK_HOST=0.0.0.0
   ```
   
   **Option B: Modify config.py Directly**
   
   Edit `backend/config.py` and update the `DB_CONFIG` dictionary:
   ```python
   DB_CONFIG = {
       'host': 'localhost',
       'database': 'medvault_db',
       'user': 'root',
       'password': 'your_mysql_password_here',
       'charset': 'utf8mb4',
       'autocommit': False
   }
   ```

#### Step 4: Start Flask Backend Server

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Start Flask server:**
   ```bash
   python app.py
   ```

   Expected output:
   ```
   * Running on http://0.0.0.0:5000
   * Debug mode: on
   ```

   The server will run on: **http://localhost:5000**

3. **Verify Server is Running:**
   
   Open your browser and navigate to:
   ```
   http://localhost:5000/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "healthy",
     "message": "Medical Storage Management System API is running"
   }
   ```

#### Step 5: Open Frontend in Browser

**Option 1: Direct File Opening (Simplest)**

1. Navigate to `frontend` folder
2. Double-click `index.html`
3. The dashboard will open in your default browser

**Option 2: Using Python HTTP Server (Recommended for Development)**

1. Open a new terminal/command prompt
2. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

3. Start HTTP server:
   ```bash
   python -m http.server 8000
   ```

4. Open browser and navigate to:
   ```
   http://localhost:8000
   ```

**Option 3: Using VS Code Live Server**

1. Install "Live Server" extension in VS Code
2. Right-click on `frontend/index.html`
3. Select "Open with Live Server"

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `DB_HOST` | MySQL server hostname | `localhost` | `localhost` |
| `DB_NAME` | Database name | `medvault_db` | `medvault_db` |
| `DB_USER` | MySQL username | `root` | `root` |
| `DB_PASSWORD` | MySQL password | `` (empty) | `mypassword123` |
| `FLASK_DEBUG` | Enable debug mode | `True` | `True` / `False` |
| `FLASK_PORT` | Flask server port | `5000` | `5000` |
| `FLASK_HOST` | Flask server host | `0.0.0.0` | `0.0.0.0` |

### API Configuration

The frontend JavaScript (`frontend/js/app.js`) is configured to connect to:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

If your Flask server runs on a different port or host, update this URL accordingly.

---

## ▶️ Running the Project

### Quick Start (All-in-One)

```bash
# 1. Navigate to project directory
cd "Prototype\Prototype 1"

# 2. Setup database (if not already done)
python setup_database.py

# 3. Start Flask server (in one terminal)
cd backend
python app.py

# 4. Open frontend (in another terminal or browser)
# Option A: Double-click frontend/index.html
# Option B: python -m http.server 8000 (from frontend directory)
# Option C: Open with Live Server in VS Code
```

### Running on Windows

1. **Open PowerShell or Command Prompt**

2. **Setup Database:**
   ```powershell
   cd "C:\Users\YourName\Desktop\Projects\MEDLOCUS\Prototype\Prototype 1"
   python setup_database.py YOUR_MYSQL_PASSWORD
   ```

3. **Start Flask Server:**
   ```powershell
   cd backend
   python app.py
   ```

4. **Open Frontend:**
   - Navigate to `frontend` folder in File Explorer
   - Double-click `index.html`
   - Or open Chrome and go to: `file:///C:/path/to/frontend/index.html`

### Running on Linux/Mac

1. **Open Terminal**

2. **Setup Database:**
   ```bash
   cd ~/Projects/MEDLOCUS/Prototype/Prototype\ 1
   python3 setup_database.py
   ```

3. **Start Flask Server:**
   ```bash
   cd backend
   python3 app.py
   ```

4. **Open Frontend:**
   ```bash
   cd ../frontend
   python3 -m http.server 8000
   # Then open http://localhost:8000 in browser
   ```

---

## 📖 Usage Guide

### Accessing the Application

1. **Ensure Flask Server is Running**
   - Backend should be running on `http://localhost:5000`
   - Check by visiting: `http://localhost:5000/api/health`

2. **Open Frontend**
   - Open `frontend/index.html` in your browser
   - Or navigate to `http://localhost:8000` if using HTTP server

### Dashboard Features

The dashboard provides:
- **Statistics Cards**: Total medicines, total quantity, inventory value, low stock items
- **Expiry Alerts**: List of medicines expiring within 30 days
- **Quick Navigation**: Links to all major features

### Adding a Medicine

1. Click **"➕ Add Medicine"** in the navigation menu
2. Fill in all required fields:
   - **Medicine Name**: e.g., "Paracetamol 500mg"
   - **Company**: e.g., "PharmaCorp"
   - **Manufacture Date**: Select from date picker
   - **Expiry Date**: Must be after manufacture date
   - **Quantity**: Number of units (must be ≥ 0)
   - **Price**: Price per unit (must be ≥ 0)
   - **Supplier**: Select from dropdown
3. Click **"✅ Add Medicine"**
4. Success message will appear, and you'll be redirected to view medicines

### Viewing Medicines

1. Click **"📋 View Medicines"** in navigation
2. View all medicines in a comprehensive table:
   - **Expired Medicines**: Displayed in red border section at top
   - **Good Medicines**: Displayed in green border section below
   - **Color Coding**: 
     - 🔴 Red background = Expired
     - 🟡 Yellow background = Expiring within 30 days
     - ✅ Green = Valid
3. Use **"🔄 Refresh"** button to reload data

### Searching

1. Click **"🔍 Search Medicine"** in navigation
2. Enter search term in the search box
3. Search automatically performs as you type (with 500ms delay)
4. Results show medicines matching:
   - Medicine name
   - Company name
   - Supplier name

### Updating a Medicine

1. Go to **"📋 View Medicines"**
2. Click **"✏️ Edit"** button on the desired medicine
3. Form will be pre-filled with current data
4. Modify any fields as needed
5. Click **"💾 Update Medicine"**
6. Changes are saved and you'll be redirected

### Deleting a Medicine

1. Go to **"📋 View Medicines"**
2. Click **"🗑️ Delete"** button on the desired medicine
3. Confirm deletion by typing **"DELETE"** in the prompt
4. Medicine will be removed from database
5. Table will automatically refresh

### Expiry Tracking

- **Dashboard**: Shows medicines expiring within 30 days
- **View Medicines**: Color-coded expiry status
  - Red = Already expired
  - Yellow = Expiring within 30 days
  - Green = Valid (more than 30 days remaining)

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Medicine Endpoints

#### 1. Get All Medicines
```http
GET /api/medicines
```

**Response:**
```json
[
  {
    "medicine_id": 1,
    "name": "Paracetamol 500mg",
    "company": "PharmaCorp",
    "mfg_date": "2024-01-15",
    "exp_date": "2026-01-15",
    "quantity": 500,
    "price": 25.50,
    "supplier_id": 1,
    "supplier_name": "MedSupply Co.",
    "contact_no": "123-456-7890",
    "created_at": "2024-01-15 10:30:00",
    "updated_at": "2024-01-15 10:30:00"
  }
]
```

#### 2. Get Medicine by ID
```http
GET /api/medicines/<id>
```

**Response:** Single medicine object (same structure as above)

**Error:** `404 Not Found` if medicine doesn't exist

#### 3. Add New Medicine
```http
POST /api/medicines
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Amoxicillin 250mg",
  "company": "MediCare Labs",
  "mfg_date": "2024-02-20",
  "exp_date": "2025-08-20",
  "quantity": 300,
  "price": 45.75,
  "supplier_id": 2
}
```

**Response:**
```json
{
  "message": "Medicine added successfully",
  "id": 9
}
```

#### 4. Update Medicine
```http
PUT /api/medicines/<id>
Content-Type: application/json
```

**Request Body:** Same as POST (all fields required)

**Response:**
```json
{
  "message": "Medicine updated successfully"
}
```

#### 5. Delete Medicine
```http
DELETE /api/medicines/<id>
```

**Response:**
```json
{
  "message": "Medicine deleted successfully"
}
```

#### 6. Search Medicines
```http
GET /api/medicines/search?q=<search_term>
```

**Example:**
```http
GET /api/medicines/search?q=Paracetamol
```

**Response:** Array of matching medicines

#### 7. Get Expiring Medicines
```http
GET /api/medicines/expiring?days=<number_of_days>
```

**Example:**
```http
GET /api/medicines/expiring?days=30
```

**Response:** Array of medicines expiring within specified days, includes `days_until_expiry` field

### Supplier Endpoints

#### 1. Get All Suppliers
```http
GET /api/suppliers
```

**Response:**
```json
[
  {
    "supplier_id": 1,
    "supplier_name": "MedSupply Co.",
    "contact_no": "123-456-7890",
    "created_at": "2024-01-01 10:00:00",
    "updated_at": "2024-01-01 10:00:00"
  }
]
```

#### 2. Add New Supplier
```http
POST /api/suppliers
Content-Type: application/json
```

**Request Body:**
```json
{
  "supplier_name": "New Pharma Co.",
  "contact_no": "555-1234"
}
```

**Response:**
```json
{
  "message": "Supplier added successfully",
  "id": 6
}
```

### Health Check

#### Check API Status
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "message": "Medical Storage Management System API is running"
}
```

---

## 📊 Database Schema

### Database: `medvault_db`

### Table: `suppliers`

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| `supplier_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `supplier_name` | VARCHAR(100) | NOT NULL | Supplier company name |
| `contact_no` | VARCHAR(20) | NOT NULL | Contact number |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Indexes:**
- `idx_supplier_name` on `supplier_name`

### Table: `medicines`

| Column | Data Type | Constraints | Description |
|--------|-----------|-------------|-------------|
| `medicine_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| `name` | VARCHAR(100) | NOT NULL | Medicine name |
| `company` | VARCHAR(100) | NOT NULL | Manufacturing company |
| `mfg_date` | DATE | NOT NULL | Manufacture date |
| `exp_date` | DATE | NOT NULL | Expiry date |
| `quantity` | INT | NOT NULL, CHECK (quantity >= 0) | Stock quantity |
| `price` | DECIMAL(10,2) | NOT NULL, CHECK (price >= 0) | Price per unit |
| `supplier_id` | INT | NOT NULL, FOREIGN KEY | Reference to suppliers table |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update time |

**Foreign Keys:**
- `supplier_id` → `suppliers.supplier_id` (ON DELETE RESTRICT)

**Indexes:**
- `idx_name` on `name`
- `idx_company` on `company`
- `idx_exp_date` on `exp_date`
- `idx_supplier` on `supplier_id`

### Entity Relationship

```
SUPPLIERS (1) ────< Supplies >─── (N) MEDICINES
```

- **One-to-Many Relationship**: One supplier can supply many medicines
- **Participation**: 
  - Suppliers: Partial (supplier can exist without medicines)
  - Medicines: Total (medicine must have a supplier)

### Normalization

The database is normalized to **Third Normal Form (3NF)**:

✅ **1NF (First Normal Form)**: All attributes contain atomic values, no repeating groups

✅ **2NF (Second Normal Form)**: All non-key attributes are fully functionally dependent on the primary key

✅ **3NF (Third Normal Form)**: No transitive dependencies. All non-key attributes depend only on the primary key.

### Sample Data

The database includes sample data:
- **5 Suppliers**: Pre-loaded with contact information
- **8 Medicines**: Sample medicines with various expiry dates for testing

---

## 🧪 Testing

### Test Coverage

The project includes comprehensive testing with **23 test cases**, all passing:

| Category | Tests | Status |
|----------|-------|--------|
| Database Testing | 4 | ✅ 100% Pass |
| API Testing | 7 | ✅ 100% Pass |
| Frontend Testing | 10 | ✅ 100% Pass |
| Integration Testing | 2 | ✅ 100% Pass |
| **TOTAL** | **23** | **✅ 100% Pass** |

### Manual Testing Checklist

1. ✅ **Database Connection**: Verify MySQL connection works
2. ✅ **Add Medicine**: Test form validation and submission
3. ✅ **View Medicines**: Verify all medicines display correctly
4. ✅ **Search**: Test search by name, company, and supplier
5. ✅ **Update**: Modify existing records and verify changes
6. ✅ **Delete**: Remove records with confirmation
7. ✅ **Expiry Tracking**: Verify color-coding and alerts work
8. ✅ **Responsive Design**: Test on different screen sizes
9. ✅ **API Endpoints**: Test all endpoints with Postman or browser
10. ✅ **Error Handling**: Test with invalid data and edge cases

### Testing Documentation

Complete testing documentation available in: `documentation/Testing.md`

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Database Connection Error

**Symptoms:**
- Error: `Error connecting to MySQL: Access denied`
- Error: `Can't connect to MySQL server`

**Solutions:**
- ✅ Verify MySQL server is running:
  ```bash
  # Windows: Check Services
  services.msc
  
  # Linux/Mac
  sudo systemctl status mysql
  ```
- ✅ Check credentials in `backend/config.py` or `.env` file
- ✅ Verify database `medvault_db` exists:
  ```bash
  python test_connection.py
  ```
- ✅ If password is incorrect, update it in config file

#### 2. Flask Server Won't Start

**Symptoms:**
- `Address already in use` error
- Port 5000 is already taken

**Solutions:**
- ✅ Kill process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:5000 | xargs kill
  ```
- ✅ Change port in `backend/config.py`:
  ```python
  FLASK_CONFIG = {
      'PORT': 5001  # Change to different port
  }
  ```
- ✅ Update `API_BASE_URL` in `frontend/js/app.js` to match

#### 3. CORS Errors

**Symptoms:**
- `Access to fetch blocked by CORS policy`
- API calls fail from frontend

**Solutions:**
- ✅ Verify `flask-cors` is installed:
  ```bash
  pip install flask-cors
  ```
- ✅ Check that `CORS(app)` is in `backend/app.py`
- ✅ Ensure Flask server is running on port 5000
- ✅ Verify `API_BASE_URL` in frontend matches backend URL

#### 4. Frontend Not Loading Data

**Symptoms:**
- Blank table
- "Loading..." message persists
- Console shows network errors

**Solutions:**
- ✅ Verify Flask server is running: `http://localhost:5000/api/health`
- ✅ Check browser console for errors (F12)
- ✅ Verify database has data: `python test_connection.py`
- ✅ Check `API_BASE_URL` in `frontend/js/app.js`
- ✅ Try opening frontend with HTTP server instead of file://

#### 5. Page Not Loading CSS/JS

**Symptoms:**
- Page loads but no styling
- JavaScript functions don't work

**Solutions:**
- ✅ Verify file paths are correct
- ✅ Check browser console for 404 errors
- ✅ Ensure CSS and JS files exist in correct directories
- ✅ Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

#### 6. Form Validation Errors

**Symptoms:**
- Cannot submit form
- Dates not validating correctly

**Solutions:**
- ✅ Ensure all required fields are filled
- ✅ Verify expiry date is after manufacture date
- ✅ Check that quantity and price are non-negative numbers
- ✅ Verify supplier is selected from dropdown

#### 7. Database Setup Fails

**Symptoms:**
- `setup_database.py` script fails
- Tables not created

**Solutions:**
- ✅ Verify MySQL server is running
- ✅ Check MySQL user has CREATE DATABASE permission
- ✅ Try running SQL script manually in MySQL Workbench
- ✅ Check MySQL error logs for detailed error messages

### Getting Help

If you encounter issues not covered here:

1. Check the `documentation/` folder for detailed guides
2. Review error messages in browser console (F12)
3. Check Flask server terminal for backend errors
4. Verify all prerequisites are installed correctly

---

## 🔒 Security Considerations

### Implemented Security Measures

1. **SQL Injection Prevention**
   - ✅ Parameterized queries using `mysql.connector`
   - ✅ No string concatenation in SQL queries

2. **XSS (Cross-Site Scripting) Prevention**
   - ✅ HTML escaping in JavaScript (`escapeHtml()` function)
   - ✅ Input sanitization

3. **Input Validation**
   - ✅ Client-side validation (HTML5 form validation)
   - ✅ Server-side validation (Flask endpoints)
   - ✅ Data type checking
   - ✅ Range validation (quantity >= 0, price >= 0)

4. **CORS Configuration**
   - ✅ Configured with Flask-CORS
   - ✅ Can be restricted to specific origins in production

### Recommendations for Production

Before deploying to production, consider:

1. **Authentication & Authorization**
   - Implement user login system
   - Role-based access control (admin, staff, viewer)
   - Session management

2. **HTTPS/SSL**
   - Use HTTPS for all communications
   - Secure API endpoints

3. **Environment Variables**
   - Never commit `.env` files to version control
   - Use secure secret management

4. **Rate Limiting**
   - Implement API rate limiting
   - Prevent brute force attacks

5. **Error Handling**
   - Don't expose sensitive error messages to clients
   - Log errors securely

6. **Backup & Recovery**
   - Regular database backups
   - Disaster recovery plan

---

## 🚧 Future Enhancements

### Planned Features

1. **User Authentication**
   - Login system with JWT tokens
   - Role-based permissions
   - Password hashing

2. **Advanced Search & Filtering**
   - Filter by expiry date range
   - Filter by quantity range
   - Filter by price range
   - Advanced search with multiple criteria

3. **Reporting & Analytics**
   - Generate inventory reports (PDF/Excel)
   - Sales analytics
   - Expiry trend analysis
   - Low stock alerts

4. **Notifications**
   - Email alerts for expiring medicines
   - SMS notifications
   - In-app notification system

5. **Barcode Support**
   - Barcode scanning for quick entry
   - QR code generation for medicines

6. **Multi-location Support**
   - Manage inventory across multiple pharmacy locations
   - Transfer medicines between locations

7. **Purchase & Sales Management**
   - Track purchases from suppliers
   - Record sales transactions
   - Sales history and reports

8. **Advanced Features**
   - Batch operations (bulk update/delete)
   - Medicine images
   - History/audit log of all changes
   - Export to CSV/Excel formats

---

## 📚 Documentation

### Available Documentation

1. **README.md** (This file)
   - Complete project overview and setup guide

2. **documentation/Introduction.md**
   - Project abstract and problem statement
   - Objectives and scope
   - Technology overview

3. **documentation/SRS.md**
   - Software Requirements Specification
   - Functional and non-functional requirements
   - System features detailed

4. **documentation/ER_Diagram.md**
   - Entity Relationship Diagram
   - Relational model
   - Database normalization details

5. **documentation/Testing.md**
   - Complete testing documentation
   - 23 test cases with results
   - Testing strategies

6. **documentation/Conclusion.md**
   - Project summary
   - Objectives achieved
   - Future enhancements

### Additional Resources

- **PROJECT_SUMMARY.md**: Quick project overview
- **START_HERE.md**: Quick start guide
- **SETUP_GUIDE.md**: Detailed setup instructions
- **RUN_PROJECT.md**: Running instructions

---

## 👥 Contributors

**Development Team**

This project was developed as a comprehensive DBMS Mini Project demonstrating:
- Full-stack web development
- Database design and normalization
- RESTful API development
- Software Development Life Cycle (SDLC)

---

## 📝 License

This project is developed for **educational purposes** as part of a Database Management Systems (DBMS) mini project.

**Note**: This software is provided "as is" without warranty of any kind. It is intended for learning and demonstration purposes.

---

## 📧 Support

For issues, questions, or contributions:

1. **Check Documentation**: Review all documentation files in the `documentation/` folder
2. **Troubleshooting**: See the [Troubleshooting](#troubleshooting) section above
3. **Test Connection**: Run `python test_connection.py` to verify setup
4. **Check Logs**: Review Flask server terminal output for errors

---

## 📊 Project Statistics

- **Total Files**: 30+
- **Lines of Code**: 3000+
- **API Endpoints**: 9
- **Database Tables**: 2
- **Test Cases**: 23 (100% pass rate)
- **Documentation Pages**: 6

---

## ✅ Quick Verification Checklist

After setup, verify everything works:

- [ ] Database connection test passes: `python test_connection.py`
- [ ] Flask server starts without errors: `python backend/app.py`
- [ ] Health check returns success: `http://localhost:5000/api/health`
- [ ] Frontend loads in browser: `frontend/index.html`
- [ ] Medicines display in table
- [ ] Can add new medicine
- [ ] Can search medicines
- [ ] Can update medicine
- [ ] Can delete medicine
- [ ] Expiry alerts display correctly

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: ✅ Production Ready

<img width="2549" height="4527" alt="localhost_3000_" src="https://github.com/user-attachments/assets/dfbeea00-e8b8-4216-b8ab-39d60bc30955" />

<img width="2561" height="1418" alt="localhost_3000_ (1)" src="https://github.com/user-attachments/assets/46eee517-34a9-42ce-b9ae-9876c3f7c889" />

<img width="2549" height="2025" alt="localhost_3000_ (2)" src="https://github.com/user-attachments/assets/d945c134-5a82-49df-8b25-86c33215004d" />

<img width="2561" height="1418" alt="localhost_3000_ (3)" src="https://github.com/user-attachments/assets/d39aac93-fce2-4db1-a180-967e866c51ee" />

<img width="2561" height="1418" alt="localhost_3000_ (4)" src="https://github.com/user-attachments/assets/04a60439-b012-4911-9334-ab40234cdec9" />

<img width="2561" height="1418" alt="localhost_3000_ (5)" src="https://github.com/user-attachments/assets/3d62b4f9-695e-44bd-b8ba-2f543a755b62" />

<img width="2561" height="1418" alt="localhost_3000_ (6)" src="https://github.com/user-attachments/assets/2ed6adaf-4e7e-4ec6-94de-aab24b4e798f" />

---

*Thank you for using Medical Storage Management System (MEDLOCUS)! For detailed technical documentation, please refer to the files in the `documentation/` directory.*
