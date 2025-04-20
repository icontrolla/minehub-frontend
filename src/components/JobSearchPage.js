import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

// Animation
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

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ffc107, #fdfdfd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  display: block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: #f0f0f0;
  box-shadow: 0 0 0 2px #333;
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #ffc107;
  }
`;

const JobList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 1s ease forwards;
`;

const JobCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const JobCompany = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.5rem;
`;

const JobLocation = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin-bottom: 1rem;
`;

const ApplyLink = styled.a`
  color: #ffc107;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 4rem;
  font-size: 0.9rem;
  color: #777;
`;

const JobSearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
  let isMounted = true;

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/jobs/`);
      if (isMounted) {
        setJobs(response.data);
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error fetching jobs:", error);
      }
    }
  };

  fetchJobs();

  return () => {
    isMounted = false;
  };
}, []);


  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(query.toLowerCase()) ||
    job.company.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>Mining Jobs</Title>
      </Header>

      <SearchInput
        type="text"
        placeholder="Search for a position or company..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <JobList>
        {filteredJobs.map(job => (
          <JobCard key={job.id}>
            <JobTitle>{job.title}</JobTitle>
            <JobCompany>{job.company}</JobCompany>
            <JobLocation>{job.location}</JobLocation>
            <ApplyLink href={job.apply_link} target="_blank" rel="noopener noreferrer">
              Apply Now →
            </ApplyLink>
          </JobCard>
        ))}
      </JobList>

      <Footer>
        <p>&copy; 2025 MineHub. Powered by Controlled Motives.</p>
      </Footer>
    </Container>
  );
};

export default JobSearchPage;
