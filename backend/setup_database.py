import sqlite3

conn = sqlite3.connect("creamery.db")
cursor = conn.cursor()

# Drop old tables (safe reset)
cursor.execute("DROP TABLE IF EXISTS user")
cursor.execute("DROP TABLE IF EXISTS product")
cursor.execute("DROP TABLE IF EXISTS 'order'")

# Create user table
cursor.execute("""
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    role TEXT
)
""")

# Create product table
cursor.execute("""
CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    stock INTEGER
)
""")

# Create order table
cursor.execute("""
CREATE TABLE 'order' (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    total_amount REAL,
    status TEXT,
    date TEXT,
    FOREIGN KEY(customer_id) REFERENCES user(id)
)
""")

# Seed Users
users = [
    ("Vinay", "vinay@gmail.com", "admin"),
    ("Farmer John", "farmer@gmail.com", "farmer"),
    ("Rahul", "rahul@gmail.com", "customer"),
    ("Anita", "anita@gmail.com", "customer"),
    ("Suresh", "suresh@gmail.com", "customer")
]

cursor.executemany("INSERT INTO user (name, email, role) VALUES (?, ?, ?)", users)

# Seed Products
products = [
    ("Fresh Milk (1L)", 45.0, 200),
    ("Curd (500g)", 30.0, 150),
    ("Ghee (250ml)", 250.0, 50),
    ("Paneer (200g)", 90.0, 100),
    ("Butter (100g)", 60.0, 120)
]

cursor.executemany("INSERT INTO product (name, price, stock) VALUES (?, ?, ?)", products)

# Seed Orders
orders = [
    (3, 500.0, "Delivered", "2026-02-14"),
    (4, 250.0, "Pending", "2026-02-15"),
    (5, 700.0, "Delivered", "2026-02-16"),
    (3, 300.0, "Delivered", "2026-02-16"),
    (4, 1000.0, "Pending", "2026-02-17")
]

cursor.executemany(
    "INSERT INTO 'order' (customer_id, total_amount, status, date) VALUES (?, ?, ?, ?)",
    orders
)

conn.commit()
conn.close()

print("Database setup complete!")
