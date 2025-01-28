"use client";
import React, { useState } from 'react';
import styles from '../../styles/WorkerSafety.module.css';

function SafetyCompliance() {
  const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [imageName, setImageName] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setImageName(file ? file.name : null);  // Set the image name for confirmation
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            setResult(data);  // Display the result images side by side

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <div className={styles.pageContainer}>
          <div className={styles.card}>
              <h1 className={styles.title}>AI Object Detection</h1>
              <p className={styles.subtitle}>Upload an image for safety gear detection</p>

              <form onSubmit={handleSubmit} className={styles.form}>
                  <label className={styles.fileInput}>
                      <input type="file" onChange={handleFileChange} accept="image/*" />
                      Choose an Image
                  </label>
                  <button type="submit" className={styles.uploadButton}>Upload</button>
              </form>

              {/* Show the image name after upload */}
              {imageName && <p className={styles.imageName}>Uploaded: {imageName}</p>}

              {result && (
                  <div className={styles.imagesContainer}>
                      <div className={styles.imageBox}>
                          <h3 className={styles.imageTitle}>Uploaded Image</h3>
                          <img src={`http://localhost:5000/${result.uploaded_image_path}`} alt="Uploaded" className={styles.image} />
                      </div>
                      <div className={styles.imageBox}>
                          <h3 className={styles.imageTitle}>Result Image</h3>
                          <img src={`http://localhost:5000/${result.result_image_path}`} alt="Result" className={styles.image} />
                      </div>
                  </div>
              )}
          </div>

         
      </div>
    );
  }
  

  
export default SafetyCompliance;
