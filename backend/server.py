import os
import sqlite3
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_groq import ChatGroq

# ---------------------------------
# Load Environment Variables
# ---------------------------------
load_dotenv()

# ---------------------------------
# Flask Setup
# ---------------------------------
app = Flask(__name__)
CORS(app)

# ---------------------------------
# Database Setup
# ---------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "creamery.db")

# ---------------------------------
# Database Helper Functions
# ---------------------------------

def run_select(query, params=()):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query, params)
    result = cursor.fetchall()
    conn.close()
    return result


def run_modify(query, params=()):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    conn.close()

def run_modify(query, params=()):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    conn.close()

# ---------------------------------
# Groq Setup
# ---------------------------------
groq_key = os.getenv("GROQ_API_KEY")

if not groq_key:
    raise ValueError("Please set GROQ_API_KEY in .env file")

llm = ChatGroq(
    groq_api_key=groq_key,
    model_name="llama-3.1-8b-instant",
    temperature=0.3
)

# ---------------------------------
# HOME
# ---------------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "Dairy Daily AI Intelligence Running 🚀"
    })


# ---------------------------------
# GET PRODUCTS
# ---------------------------------
@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        rows = run_select("SELECT id, name, price, stock, image, category FROM product"
)

        products = [
    {
        "id": row[0],
        "name": row[1],
        "price": row[2],
        "stock": row[3],
        "image": row[4],
        "category": row[5]
    }
    for row in rows
]


        return jsonify(products)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# ADD PRODUCT (ADMIN)
# ---------------------------------
@app.route("/api/admin/add-product", methods=["POST"])
def add_product():
    try:
        data = request.json

        run_modify("""
            INSERT INTO product (name, price, stock, image, category)
            VALUES (?, ?, ?, ?, ?)
        """, (
            data.get("name"),
            float(data.get("price")),
            int(data.get("stock", 0)),
            data.get("image"),
            data.get("category")
        ))

        return jsonify({"message": "Product added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # ---------------------------------
# UPDATE PRODUCT (ADMIN)
# ---------------------------------
@app.route("/api/admin/update-product/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    try:
        data = request.json

        run_modify("""
            UPDATE product
            SET name = ?, price = ?, stock = ?, image = ?, category = ?
            WHERE id = ?
        """, (
            data.get("name"),
            float(data.get("price")),
            int(data.get("stock")),
            data.get("image"),
            data.get("category"),
            product_id
        ))

        return jsonify({"message": "Product updated successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    # ---------------------------------
# DELETE PRODUCT (ADMIN)
# ---------------------------------
@app.route("/api/admin/delete-product/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    try:
        run_modify("DELETE FROM product WHERE id = ?", (product_id,))
        return jsonify({"message": "Product deleted successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------------------
# PLACE ORDER (CUSTOMER)
# ---------------------------------
@app.route("/api/customer/place-order", methods=["POST"])
def place_order():
    try:
        data = request.json
        items = data.get("items", [])
        total = data.get("total", 0)
        customer_name = data.get("customer")

        if not items:
            return jsonify({"error": "No items provided"}), 400

        # Check stock & reduce
        for item in items:
            product_id = item["id"]
            qty = item["qty"]

            stock_row = run_select(
                "SELECT stock FROM product WHERE id=?",
                (product_id,)
            )

            if not stock_row:
                return jsonify({"error": "Product not found"}), 400

            current_stock = stock_row[0][0]

            if current_stock < qty:
                return jsonify({
                    "error": f"Not enough stock for product ID {product_id}"
                }), 400

            # Reduce stock
            run_modify(
                "UPDATE product SET stock = stock - ? WHERE id=?",
                (qty, product_id)
            )

        # Save order in DB
        run_modify("""
            INSERT INTO 'order' (customer_id, total_amount, status, date)
            VALUES (?, ?, ?, DATE('now'))
        """, (1, total, "Pending"))  # TEMP: customer_id = 1

        return jsonify({"message": "Order placed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------------------
# CLEAR PRODUCTS (ADMIN)
# ---------------------------------
@app.route("/api/admin/clear-products", methods=["DELETE"])
def clear_products():
    try:
        run_modify("DELETE FROM product")
        return jsonify({"message": "All products cleared successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------
# CHAT – Dairy Daily AI Brain
# ---------------------------------
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        if not data or "query" not in data:
            return jsonify({"success": False, "error": "Query is required"}), 400

        user_query = data["query"].strip()
        lower_query = user_query.lower()

        # ---------------------------------
        # BASIC CONVERSATION
        # ---------------------------------

        if lower_query in ["hi", "hello", "hey"]:
            return jsonify({
                "success": True,
                "answer": "Hello 👋 Welcome to Dairy Daily AI! How can I assist you today?"
            })

        if lower_query in ["bye", "goodbye"]:
            return jsonify({
                "success": True,
                "answer": "Thank you for choosing Dairy Daily 🥛 Have a great day!"
            })

        if "about company" in lower_query or "about dairy daily" in lower_query:
            return jsonify({
                "success": True,
                "answer": """
Dairy Daily is a smart dairy management platform connecting Farmers, Lab Staff, Admins, Delivery Teams, and Customers.

We ensure:
• Quality milk collection
• Transparent product management
• Smart order processing
• AI-powered business insights
"""
            })

        # ---------------------------------
        # DATABASE INTELLIGENCE
        # ---------------------------------

        if "how many products" in lower_query:
            count = run_select("SELECT COUNT(*) FROM product")[0][0]
            return jsonify({
                "success": True,
                "answer": f"Dairy Daily currently has {count} products available."
            })

        if "how many users" in lower_query:
            count = run_select("SELECT COUNT(*) FROM user")[0][0]
            return jsonify({
                "success": True,
                "answer": f"There are {count} registered users in Dairy Daily."
            })

        if "how many orders" in lower_query:
            count = run_select("SELECT COUNT(*) FROM 'order'")[0][0]
            return jsonify({
                "success": True,
                "answer": f"There are {count} total orders processed."
            })

        if "total revenue" in lower_query:
            revenue = run_select("SELECT SUM(total_amount) FROM 'order'")[0][0]
            revenue = revenue if revenue else 0
            return jsonify({
                "success": True,
                "answer": f"Total revenue generated is ₹{revenue}."
            })

        if "business summary" in lower_query:
            products = run_select("SELECT COUNT(*) FROM product")[0][0]
            users = run_select("SELECT COUNT(*) FROM user")[0][0]
            orders = run_select("SELECT COUNT(*) FROM 'order'")[0][0]
            revenue = run_select("SELECT SUM(total_amount) FROM 'order'")[0][0]
            revenue = revenue if revenue else 0

            return jsonify({
                "success": True,
                "answer": f"""
📊 Dairy Daily Executive Summary:

• Products: {products}
• Users: {users}
• Orders: {orders}
• Revenue: ₹{revenue}

Status: Stable & Growing 🚀
"""
            })

        # ---------------------------------
        # FALLBACK TO GROQ AI
        # ---------------------------------

        ai_response = llm.invoke(
            f"You are Dairy Daily AI assistant. Answer professionally.\nUser: {user_query}"
        )

        return jsonify({
            "success": True,
            "answer": ai_response.content
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ---------------------------------
# RUN SERVER
# ---------------------------------
if __name__ == "__main__":
    app.run(debug=True)
