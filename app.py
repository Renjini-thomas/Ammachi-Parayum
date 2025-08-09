import os
from flask import Flask, render_template, request, jsonify
from utils.gemini_api import generate_ammachi_response

app = Flask(__name__)

@app.route('/')
def home():
    """Renders the homepage."""
    return render_template('home.html')

@app.route('/advice')
def advice():
    """Renders the advice page where the conversation takes place."""
    return render_template('advice.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handles the real-time chat requests."""
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        ammachi_response = generate_ammachi_response(user_message)
        return jsonify({'response': ammachi_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)