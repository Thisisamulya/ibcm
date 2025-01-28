"use client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import styles from '../../styles/GeoMaps.module.css';

const locations = [
  {
    name: "World Trade Center, Bangalore",
    position: { lat: 12.9345333, lng: 77.6101163 },
    type: "Commercial",
    progress: 95,
    status: "green",
    stage: "Interior Finishing",
    issue:"None,Work going on smoothly"
  },
  {
    name: "Infosys Pune Campus",
    position: { lat: 18.5521033, lng: 73.9345836 },
    type: "Commercial",
    progress: 75,
    status: "green",
    stage: "Super-structure",
    issue:"None,Work going on smoothly"
  },
  {
    name: "Phoenix Palassio Mall, Lucknow",
    position: { lat: 26.8541, lng: 80.9462 },
    type: "Commercial",
    progress: 55,
    status: "yellow-orange",
    stage: "Façade work",
    issue:"Minor issues, work is delayed by 2 weeks due to labour union strike"
  },
  {
    name: "World One Tower, Mumbai",
    position: { lat: 19.0760, lng: 72.8777 },
    type: "Residential",
    progress: 90,
    status: "yellow-orange",
    stage: "Final touches",
    issue:"Minor issues, work is delayed by few days due to heavy rains "
  },
  {
    name: "Phoenix Market City, Chennai",
    position: { lat: 12.9901134, lng: 80.2162332 },
    type: "Commercial",
    progress: 40,
    status: "red",
    stage: "Foundation",
    issue:"Major issues, frequent delays due to some irregularity in the budget "
  },
  {
    name: "Diamond Bourse, Ahmedabad",
    position: { lat: 23.0225, lng: 72.5714 },
    type: "Commercial",
    progress: 80,
    status: "green",
    stage: "Interior work",
    issue:"None,Work going on smoothly"
  },
  {
    name: "East Riverfront Development, Kolkata",
    position: { lat: 22.5726, lng: 88.3639 },
    type: "Mixed-use",
    progress: 30,
    status: "red",
    stage: "Foundation work",
    issue:"Major issues, work has been delayed by 2 months"

  },
  {
    name: "Cyber Tower, Hyderabad",
    position: { lat: 17.3850, lng: 78.4867 },
    type: "Commercial",
    progress: 60,
    status: "green",
    stage: "Exterior cladding",
    issue:"None,Work going on smoothly"
  },
  {
    name: "Chennai Crest Towers",
    position: { lat: 13.0827, lng: 80.2707 },
    type: "Residential",
    progress: 50,
    status: "yellow-orange",
    stage: "MEP installation",
    issue:"Minor issues, work delayed by few days due to the weak quality of material used"
  },
  {
    name: "Emaar Emerald Hills, Gurgaon",
    position: { lat: 28.4185103, lng: 77.0414393 },
    type: "Residential",
    progress: 30,
    status: "red",
    stage: "Foundation",
    issue:"Major issues, work has been stopped from last 3 months"
  }
];

export default function GeoTagged() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.profile}>
          <img src="icons/profile.png" alt="Profile Picture" />
          <div className={styles.info}>
            <h2>Rahul Kumar</h2>
            <p>Location: Bengaluru, Karnataka</p>
            <p>Company: Brigade Group</p>
            <p>Designation: Project Manager</p>
          </div>
        </div>
        <div className={styles.projectList}>
          <h3>Ongoing Projects</h3>
          <ul>
            {locations.filter(loc => loc.progress < 100).map((loc, index) => (
              <li key={index} className={styles.projectItem}>
                <span>{loc.name}</span>
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div style={{ width: `${loc.progress}%` }}></div>
                  </div>
                  <span className={styles.progressText}>{loc.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
          <h3>Completed Projects</h3>
          <ul>
            {locations.filter(loc => loc.progress === 100).map((loc, index) => (
              <li key={index} className={styles.projectItem}>
                <span>{loc.name}</span>
              </li>
            ))}
            {/* Hardcoded Completed Projects */}
            <li className={styles.projectItem}>
              <span>Velpula Orchid, Bengaluru</span>
            </li>
            <li className={styles.projectItem}>
              <span>Brigade Citadel, Hyderabad</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.mapContainer}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: 20.5937, lng: 78.9629 }} // India center
            zoom={5}
          >
            {locations.map((location) => (
              <Marker
                key={location.name}
                position={location.position}
                onClick={() => setSelectedLocation(location)}
                icon={{
                  url: `/icons/${location.status}.png`,
                }}
              />
            ))}

            {selectedLocation && (
              <InfoWindow
                position={selectedLocation.position}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div>
                  <h2>{selectedLocation.name}</h2>
                  <p>Type: {selectedLocation.type}</p>
                  <p>Stage: {selectedLocation.stage}</p>
                  <p>Progress: {selectedLocation.progress}%</p>
                  <p>Issue:{selectedLocation.issue}</p>
                  <div className={styles.progressBar}>
                    <div style={{ width: `${selectedLocation.progress}%` }}></div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
