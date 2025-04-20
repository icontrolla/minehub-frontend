import React from 'react';
import './About.css'; // Optional for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About MineHub</h1>
      <p>We connect miners and suppliers through a seamless marketplace experience.</p>
      <div className="equipment-gallery">
        <div className="equipment-card">
          <img src="/images/excavator.jpg" alt="Excavator" />
          <h3>Excavator</h3>
        </div>
        <div className="equipment-card">
          <img src="/images/drill.jpg" alt="Drill Machine" />
          <h3>Drill Machine</h3>
        </div>
      </div>
    </div>
  );
};

export default About;
