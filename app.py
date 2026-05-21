from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import os

app = Flask(__name__)

# Enable CORS
CORS(app)

# Load YOLO model
model = YOLO("best.pt")

# Print model classes
print("MODEL CLASSES:")
print(model.names)

# Calories database
# Calories database
calories_db = {

    "carrot": 41,

    "steak": 271,

    "chicken duck": 250,

    "rice": 130,

    "french beans": 35,

    "apple": 95,

    "banana": 105,

    "pizza": 285,

    "burger": 354,

    "salad": 150,

    "chicken": 300
}

@app.route('/predict', methods=['POST'])
def predict():

    try:

        print("REQUEST RECEIVED")

        # Check image
        if 'image' not in request.files:

            print("NO IMAGE FOUND")

            return jsonify({
                "success": False,
                "message": "No image uploaded"
            }), 400

        image = request.files['image']

        print("IMAGE RECEIVED:", image.filename)

        # Save temp image
        image_path = "temp.jpg"

        image.save(image_path)

        print("IMAGE SAVED")

        # YOLO prediction
        results = model(image_path)

        print("YOLO PREDICTION DONE")

        detected_foods = []

        total_calories = 0

        # Read detections
        for result in results:

            boxes = result.boxes

            print("BOXES:", boxes)

            for box in boxes:

                class_id = int(box.cls[0])

                food_name = model.names[class_id]

                print("DETECTED:", food_name)

                calories = calories_db.get(
                    food_name.lower(),
                    0
                )

                total_calories += calories

                detected_foods.append({
                    "food": food_name,
                    "calories": calories
                })

        # Delete temp image
        if os.path.exists(image_path):

            os.remove(image_path)

        return jsonify({

            "success": True,

            "results": detected_foods,

            "total_calories": total_calories

        })

    except Exception as e:

        print("ERROR:")
        print(str(e))

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# Run server
if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=5001,
        debug=True
    )