import cv2
import numpy as np
from skimage.metrics import structural_similarity as ssim

# Function to resize an image while maintaining the aspect ratio
def resize_with_aspect_ratio(image, width=None, height=None, inter=cv2.INTER_AREA):
    (h, w) = image.shape[:2]
    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))
    return cv2.resize(image, dim, interpolation=inter)

# Function to calculate the similarity between two images
def calculate_ssim(img1, img2):
    img1_gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    
    # Compute SSIM between two images
    score, diff = ssim(img1_gray, img2_gray, full=True)
    diff = (diff * 255).astype("uint8")
    
    # Calculate percentage of difference
    percentage_diff = (1 - score) * 100
    return score, percentage_diff

# Main function to analyze progress based on previous and current images
def analyze_images(previous_image_path, current_image_path, category):
    # Load images
    img1 = cv2.imread(previous_image_path)
    img2 = cv2.imread(current_image_path)

    # Resize images to the same dimensions
    img1 = resize_with_aspect_ratio(img1, width=500)
    img2 = resize_with_aspect_ratio(img2, width=500)

    # Calculate the similarity between the images
    similarity_score, percentage_difference = calculate_ssim(img1, img2)

    # Return analysis results
    return {
        "category": category,
        "similarity_score": f"{similarity_score:.2f}",
        "work_done_percentage": f"{percentage_difference:.2f}%",
        "status": "success",
        "message": f"Analysis complete for {category}."
    }
