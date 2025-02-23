from flask import Flask, request, jsonify,send_from_directory
import os
from werkzeug.utils import secure_filename
from ml_model import analyze_images
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image
app = Flask(__name__)
CORS(app)
yolo_model = YOLO('static/upload/ppe.pt')

# Configure upload folder and allowed extensions
UPLOAD_FOLDER = './static/uploads/'
RESULT_FOLDER = './static/results/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Helper function to check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Generic route to handle image uploads for analysis
def process_images_for_category(category):

    if 'previous_image' not in request.files or 'current_image' not in request.files:
        return jsonify({"error": "Please provide both previous and current images"}), 400

    previous_image = request.files['previous_image']
    current_image = request.files['current_image']

    if previous_image and allowed_file(previous_image.filename) and current_image and allowed_file(current_image.filename):
        prev_filename = secure_filename(previous_image.filename)
        curr_filename = secure_filename(current_image.filename)

        previous_image_path = os.path.join(app.config['UPLOAD_FOLDER'], prev_filename)
        current_image_path = os.path.join(app.config['UPLOAD_FOLDER'], curr_filename)

        # Save images
        previous_image.save(previous_image_path)
        current_image.save(current_image_path)

        # Analyze images with the ML model
        progress_data = analyze_images(previous_image_path, current_image_path, category)

        return jsonify(progress_data), 200
    else:
        return jsonify({"error": "Invalid file types"}), 400

# API route for foundation analysis
@app.route('/upload/foundation', methods=['POST'])
def foundation_analysis():
    return process_images_for_category('foundation')

# API route for super structure analysis
@app.route('/upload/superstructure', methods=['POST'])
def superstructure_analysis():
    return process_images_for_category('superstructure')

# API route for interiors analysis
@app.route('/upload/interiors', methods=['POST'])
def interiors_analysis():
    return process_images_for_category('interiors')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty file name"}), 400

    if file and allowed_file(file.filename):
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(image_path)

        # Perform YOLOv8 inference
        results = yolo_model.predict(image_path)

        # Save the results image (with bounding boxes)
        results_img = results[0].plot()  # Visualize the detection
        results_img_path = os.path.join(RESULT_FOLDER, secure_filename(file.filename))
        Image.fromarray(results_img).save(results_img_path)

        # Prepare JSON response with detection information
        detected_objects = results[0].boxes.data.tolist()  # List of detected objects

        return jsonify({
            "message": "Detection successful",
            "uploaded_image_path": f'static/uploads/{secure_filename(file.filename)}',
            "result_image_path": f'static/results/{secure_filename(file.filename)}',
            "detected_objects": detected_objects  # List of objects with details (class, confidence, etc.)
        }), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400

# Serve images from the static/uploads and static/results folder

@app.route('/static/uploads/<filename>')
def serve_uploaded_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/static/results/<filename>')
def serve_result_image(filename):
    return send_from_directory(RESULT_FOLDER, filename)



if __name__ == '__main__':
    # Create upload folder if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    app.run(debug=True)
