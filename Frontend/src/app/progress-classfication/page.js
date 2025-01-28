"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { LineChart, Line, XAxis as LineXAxis, YAxis as LineYAxis, Tooltip as LineTooltip, Legend as LineLegend, ResponsiveContainer as LineContainer } from 'recharts';
import styles from '../../styles/ImageUpload.module.css'; // Import your CSS module

const COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];

const ImageUpload = () => {
  const [previousImage, setPreviousImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [category, setCategory] = useState('foundation');
  const [progressData, setProgressData] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.name === 'previousImage') {
      setPreviousImage(e.target.files[0]);
    } else if (e.target.name === 'currentImage') {
      setCurrentImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!previousImage || !currentImage) {
      setError('Please upload both images.');
      return;
    }

    const formData = new FormData();
    formData.append('previous_image', previousImage);
    formData.append('current_image', currentImage);

    try {
      const response = await axios.post(`http://localhost:5000/upload/${category}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProgressData(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

  // Prepare data for bar chart and line chart
  const barData = progressData ? [
    { name: 'Work Done', value: progressData.work_done_percentage },
    { name: 'Remaining', value: 100 - progressData.work_done_percentage },
  ] : [];

  const lineData = progressData ? [
    { date: 'Now', score: progressData.similarity_score }
  ] : [];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Image Upload</h1>
        <div className={styles.uploadContainer}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Previous Image:</label>
            <input type="file" name="previousImage" onChange={handleImageChange} className={styles.input} />
            {previousImage && (
              <img src={URL.createObjectURL(previousImage)} alt="Previous" className={styles.imagePreview} />
            )}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Image:</label>
            <input type="file" name="currentImage" onChange={handleImageChange} className={styles.input} />
            {currentImage && (
              <img src={URL.createObjectURL(currentImage)} alt="Current" className={styles.imagePreview} />
            )}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
            <option value="foundation">Foundation</option>
            <option value="superstructure">Super Structure</option>
            <option value="furnishing">furnishing</option>
            <option value="interiors">Interiors</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>

      {progressData && (
        <div className={styles.result}>
          <h2 className={styles.resultTitle}>Progress Result:</h2>
          <p><strong>Category:</strong> {progressData.category}</p>
          <p><strong>Work Done Percentage:</strong> {progressData.work_done_percentage}%</p>
          <p><strong>Similarity Score:</strong> {progressData.similarity_score}</p>

          {/* Bar chart for work done */}
          <div className={styles.chartContainer}>
            <h3>Work Done Percentage</h3>
            {barData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value">
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Line chart for similarity score */}
          <div className={styles.chartContainer}>
            <h3>Similarity Score</h3>
            {lineData.length > 0 && (
              <LineContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <LineXAxis dataKey="date" />
                  <LineYAxis />
                  <LineTooltip />
                  <LineLegend />
                  <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                </LineChart>
              </LineContainer>
            )}
          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
