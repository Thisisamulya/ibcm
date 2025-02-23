# IBCM: Image Based Construction Monitoring

## Probelm Statement Details
**Problem Statement ID:** 1725

**Problem Statement Title:** Utilization of images for monitoring of progress of construction activities for building construction projects.

**Description:**
- **Background:** The monitoring of physical progress of construction activities requires a technical expert to visit and observe the site. Due to the large number of projects in Indian cities, field visits by technical experts for weekly/daily monitoring become non-feasible. A machine learning-based solution, which can identify the status of construction activities based on images, can allow the ULBs, state agencies, and central agencies to monitor physical progress daily, or even in real time.
- **Description:** The problem requires a machine learning-based software solution in which images from sites of ongoing building construction projects can be processed to identify the stage of construction. As the construction activities include multiple components, stages in construction, and interior works; the software can take inputs regarding (number of buildings in image, type of progress in construction activities to be assessed (foundation, super-structure, facade, interiors, etc.)), to identify the type of algorithms to be used to analyze the images. For different components of construction activities, different machine learning algorithms will need to be developed with training using images from construction sites. If the selected category of construction activity and uploaded images have different activities/components, the software should raise an error and ask for the selection of the appropriate category. While similar monitoring solutions are required for all types of projects, the current problem statement only includes "building construction projects" to keep the scope of the problem statement limited and assess the feasibility of similar solutions in the future.
- **Expected Solution:** A software solution utilizing machine learning algorithms to identify the stage of construction/progress of construction activities from uploaded site images. The solution should be able to:
    - Allow users to upload images and provide information regarding the type of activity to be assessed (foundation, super-structure, furnishing, interiors, etc.)
    - Analyze the images and describe the construction activity and stage of construction.
    - Compare the status of construction with previous site images and provide data regarding the progress of work.
    - Raise an error in case of incorrect image/details have been uploaded and ask the user for necessary corrections.

**Organization:** Ministry of Housing and Urban Affairs

**Department:** Smart Cities Mission

**Category:** Software

**Theme:** Smart Automation


## Introduction
IBCM is a tool for monitoring construction progress using images. It is a web application that allows users to upload images of a construction site and track the progress of the construction. The application uses image processing techniques to analyze the images and provide insights on the progress of the construction.

## Features
- Upload images of a construction site
- Analyze images to track progress
- View progress reports
- Compare progress with schedule

## Technologies
- Python
- Flask
- OpenCV
- TensorFlow
- HTML
- CSS
- JavaScript

## Installation
1. Clone the repository

### Backend
2. Install the required dependencies
    ```cmd
    pip install -r requirements.txt
    ```
3. Run the application
    ```cmd
    cd backend
    python app.py
    ```
### Frontend
4. Open a new terminal and navigate to the frontend directory
    ```cmd
    cd frontend
    npm install
    ```

5. Run the application
    ```cmd
    npm run dev
    ```