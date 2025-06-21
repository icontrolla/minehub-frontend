import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';

const B2_IMAGE_BASE = process.env.REACT_APP_B2_IMAGE_BASE || "https://f005.backblazeb2.com/file/minehub/";
const API_BASE_URL = "https://minehub-backend-uvob.onrender.com";


// Animation
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled components
const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #0d0d0d;
  color: #f0f0f0;
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, #ffc107, #fdfdfd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    gap: 2rem;
    margin-top: 0;
  }

  a {
    text-decoration: none;
    color: #bbbbbb;
    font-size: 0.95rem;
    position: relative;
    transition: color 0.3s ease;

    &:hover {
      color: #ffc107;
    }

    &::after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      background: #ffc107;
      left: 0;
      bottom: -4px;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: #bbbbbb;
  width: 100%;
  text-align: left;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    text-align: right;
  }
`;

const Main = styled.main`
  flex: 1;
`;

const Section = styled.section`
  margin-bottom: 4rem;
  animation: ${fadeIn} 1s ease forwards;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
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

const CardImage = styled.img`
  width: 100%;
  height: 180px;

  @media (min-width: 768px) {
    height: 200px;
  }

  object-fit: cover;
  filter: brightness(0.95);
  transition: filter 0.3s ease;

  ${Card}:hover & {
    filter: brightness(1);
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
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SmallButton = styled.button`
  flex: 1;
  background: ${({ buy }) => (buy ? '#28a745' : '#ffc107')};
  color: #0d0d0d;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ buy }) => (buy ? '#3dd06a' : '#ffda3c')};
  }
`;

const CartIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: #dc3545;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50%;
  font-weight: bold;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    margin-top: 4rem;
    font-size: 0.9rem;
  }

  color: #777;
`;

// Helper to build image URL
function getB2ImageUrl(filename) {
  return filename
    ? B2_IMAGE_BASE + encodeURIComponent(filename)
    : "https://via.placeholder.com/400x200?text=No+Image";
}

// Component
const HomePage = () => {
  const [drillingMachines, setDrillingMachines] = useState([]);
  const [excavators, setExcavators] = useState([]);
  const [loaders, setLoaders] = useState([]);
  const [transportTrucks, setTransportTrucks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const [drRes, exRes, loRes, ttRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/drilling-machines/`),
          axios.get(`${API_BASE_URL}/api/excavators/`),
          axios.get(`${API_BASE_URL}/api/loaders/`),
          axios.get(`${API_BASE_URL}/api/transport-trucks/`),
        ]);
        setDrillingMachines(drRes.data);
        setExcavators(exRes.data);
        setLoaders(loRes.data);
        setTransportTrucks(ttRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (machine) => {
    setCart((prevCart) => [...prevCart, machine]);
  };

  const handleBuyNow = (machine) => {
    const singleItemCart = [machine];
    setCart(singleItemCart);
    localStorage.setItem('cart', JSON.stringify(singleItemCart));
    window.location.href = "/cart";
  };

  const renderMachineCards = (machines) =>
    machines.map((machine) => (
      <Card key={machine.id}>
        <CardImage src={getB2ImageUrl(machine.image)} alt={machine.name} />
        <CardBody>
          <CardTitle>{machine.name}</CardTitle>
          <CardText>{machine.description}</CardText>
          <CardPrice>${machine.price}</CardPrice>
          <ButtonGroup>
            <SmallButton onClick={() => handleAddToCart(machine)}>Add to Cart</SmallButton>
            <SmallButton buy onClick={() => handleBuyNow(machine)}>Buy Now</SmallButton>
          </ButtonGroup>
        </CardBody>
      </Card>
    ));

  return (
    <Container>
      <Header>
        <Title>MineHub</Title>
        <Nav>
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>
          <a href="/training">Training</a>
          <a href="/equipment">Equipment</a>
          <CartIconWrapper title="View Cart" onClick={() => window.location.href = "/cart"}>
            <FaShoppingCart size={20} color="#ffc107" />
            {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
          </CartIconWrapper>
        </Nav>
        <Tagline>Precision-engineered mining equipment. Built to last.</Tagline>
      </Header>

      <Main>
        <Section>
          <SectionTitle>Drilling Machines</SectionTitle>
          <Grid>{renderMachineCards(drillingMachines)}</Grid>
        </Section>
        <Section>
          <SectionTitle>Excavators</SectionTitle>
          <Grid>{renderMachineCards(excavators)}</Grid>
        </Section>
        <Section>
          <SectionTitle>Loaders</SectionTitle>
          <Grid>{renderMachineCards(loaders)}</Grid>
        </Section>
        <Section>
          <SectionTitle>Transport Trucks</SectionTitle>
          <Grid>{renderMachineCards(transportTrucks)}</Grid>
        </Section>
      </Main>

      <Footer>
        <p>&copy; 2025 MineHub. Crafted by Controlled Motives.</p>
      </Footer>
    </Container>
  );
};

export default HomePage;
