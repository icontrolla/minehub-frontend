import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #0d0d0d;
  color: #f0f0f0;
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  background: rgba(26, 26, 26, 0.8);
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #f0f0f0;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #ffc107;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, #ffc107, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #bbbbbb;
`;

const Section = styled.section`
  animation: ${fadeIn} 1s ease forwards;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background-color: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

const CardPrice = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #ffc107;
  margin-bottom: 1rem;
`;

const EnrollButton = styled.button`
  background: #ffc107;
  color: #0d0d0d;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background: #ffda3c;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 4rem;
  font-size: 0.9rem;
  color: #777;
`;

const TrainingPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/training-courses/`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const stripePromise = loadStripe("pk_live_51RCyMUG04LCsz46THqWL7QT4haihJes9b4KxQOof2R7BL4fANzu3ReoglhiMA2T9d0aqxPf7NEt7smGVNATBFOAh00DQI9f6tK");

    const handleEnroll = async (course) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/create-checkout-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ course_id: course.id })
    });

    const session = await response.json();

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (error) {
    console.error("Enrollment error:", error);
  }
};


  return (
    <Container>
      <NavBar>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
        <NavLink to="/training">Training</NavLink>
      </NavBar>

      <Header>
        <Title>Training Programs</Title>
        <Subtitle>Upgrade your skills with specialized mining courses.</Subtitle>
      </Header>

      <Section>
        <CourseGrid>
          {courses.length > 0 ? (
            courses.map(course => (
              <Card key={course.id}>
                <CardBody>
                  <CardTitle>{course.title || "Untitled Course"}</CardTitle>
                  <CardText>{course.content || "No description provided."}</CardText>
                  <CardPrice>${course.price || "0.00"}</CardPrice>
                  <EnrollButton onClick={() => handleEnroll(course)}>
                    Enroll
                  </EnrollButton>
                </CardBody>
              </Card>
            ))
          ) : (
            <p>Loading courses...</p>
          )}
        </CourseGrid>
      </Section>

      <Footer>
        &copy; 2025 MineHub. Crafted by Controlled Motives.
      </Footer>
    </Container>
  );
};

export default TrainingPage;
