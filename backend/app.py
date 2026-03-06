from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import uuid

app = Flask(__name__)
CORS(app)

DATA_FILE = "products.json"

# ===============================
# UTIL FUNCTIONS
# ===============================
def read_products():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def write_products(products):
    with open(DATA_FILE, "w") as f:
        json.dump(products, f, indent=2)

# ===============================
# HOME
# ===============================
@app.route("/")
def home():
    return "Backend is running (JSON DB)"

# ===============================
# GET PRODUCTS (CUSTOMER)
# ===============================
@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(read_products())

# ===============================
# ADD PRODUCT (ADMIN)
# ===============================
@app.route("/api/admin/add-product", methods=["POST"])
def add_product():
    data = request.json

    product = {
        "id": str(uuid.uuid4()),
        "name": data.get("name"),
        "price": int(data.get("price")),          # ✅ force number
        "image": data.get("image"),
        "category": data.get("category"),
        "stock": int(data.get("stock", 0))        # ✅ force number
    }

    products = read_products()
    products.append(product)
    write_products(products)

    return jsonify({"message": "Product added"}), 201

# ===============================
# UPDATE PRODUCT (ADMIN)
# ===============================
@app.route("/api/admin/update-product/<id>", methods=["PUT"])
def update_product(id):
    data = request.json
    products = read_products()

    for p in products:
        if p["id"] == id:
            p["name"] = data.get("name", p["name"])
            p["price"] = int(data.get("price", p["price"]))
            p["image"] = data.get("image", p["image"])
            p["category"] = data.get("category", p["category"])
            p["stock"] = int(data.get("stock", p["stock"]))
            break

    write_products(products)
    return jsonify({"message": "Product updated"})

# ===============================
# DELETE PRODUCT (ADMIN)
# ===============================
@app.route("/api/admin/delete-product/<id>", methods=["DELETE"])
def delete_product(id):
    products = read_products()
    products = [p for p in products if p["id"] != id]
    write_products(products)
    return jsonify({"message": "Product deleted"})

# ===============================
# RUN SERVER
# ===============================
if __name__ == "__main__":
    app.run(debug=True)
