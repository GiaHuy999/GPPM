from flask import Flask, jsonify, render_template
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return render_template('text.html')

@app.route('/api/data')
def get_data():
    return jsonify({"message": "Hello from Python!"})

if __name__ == '__main__':
    app.run(debug=True)