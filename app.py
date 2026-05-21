from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/predict', methods=['POST'])
def predict():

    # Check image
    if 'image' not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded"
        }), 400

    image = request.files['image']

    # Print image name in terminal
    print("IMAGE RECEIVED:", image.filename)

    # Fake AI response (test)
    return jsonify({
        "success": True,
        "results": [
            {
                "food": "Salad",
                "calories": 150
            },
            {
                "food": "Chicken",
                "calories": 300
            }
        ],
        "total_calories": 450
    })

# Run server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)