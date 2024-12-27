from flask import Flask, render_template, request, jsonify
import util
import os
from flask_cors import CORS

app = Flask(__name__, template_folder=r'C:\Users\ANANYA\OneDrive\Desktop\BHP\client\templates', 
            static_folder=r'C:\Users\ANANYA\OneDrive\Desktop\BHP\client\static')

CORS(app)

@app.route('/')
def index():
    return render_template('app.html') 

@app.route('/test', methods=['GET'])
def test():
    return "Flask is working!"

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    print("Inside the predict_home_price function")
    data = request.get_json()
    print(f"Received data: {data}")  # Log the incoming data

    try:
        total_sqft = float(data['total_sqft'])
        bhk = int(data['bhk'])
        bath = int(data['bath'])
        location = data['location']
        # Further processing...
        return jsonify({'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)})  # Modify accordingly
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True,port=5001)
