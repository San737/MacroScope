from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  
from pyzbar.pyzbar import decode
from PIL import Image
import requests
import os

app = Flask(_name_)
CORS(app)  

@app.route("/upload", methods=["POST"])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image part"}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filepath = os.path.join("temp_image.jpg")
    image_file.save(filepath)

    img = Image.open(filepath)
    decoded_objects = decode(img)

    if not decoded_objects:
        return jsonify({"error": "No barcode found"}), 400

    barcode_data = decoded_objects[0].data.decode("utf-8")

    api_url = f"https://world.openfoodfacts.org/api/v3/product/{barcode_data}.json"
    response = requests.get(api_url)
    print(response.json())

    if response.status_code == 200 and response.json().get("status") == 'success':
        product = response.json()["product"]
        return jsonify({
            "product_name": product.get("product_name", "N/A"),
            "barcode": barcode_data
        })

    return jsonify({"error": "Product not found in Open Food Facts"}), 404

if _name_ == "_main_":
    app.run(debug=True)