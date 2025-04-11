from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from inference_sdk import InferenceHTTPClient
import os

app = Flask(__name__)
CORS(app) 

app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


CLIENT = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key="QsQI7bVRFwg707v9MsQJ"
)


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)

    try:
        result = CLIENT.infer(image_path, model_id="indianfoodnet/1")
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
