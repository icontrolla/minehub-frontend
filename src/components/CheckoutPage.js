// CheckoutPage.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #0d0d0d;
  color: #f0f0f0;
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(90deg, #ffc107, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
`;

const SummaryCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #333;
`;

const Label = styled.span`
  font-weight: 500;
`;

const Value = styled.span`
  color: #ffc107;
  font-weight: 600;
`;

const PayButton = styled.button`
  background: #28a745;
  color: white;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #218838;
  }
`;

const CheckoutPage = ({ cart }) => {
  const totalPrice = cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <Container>
      <Title>Order Summary</Title>

      <SummaryCard>
        {cart && cart.map((item) => (
          <SummaryItem key={item.id}>
            <Label>{item.name}</Label>
            <Value>${item.price}</Value>
          </SummaryItem>
        ))}
        <SummaryItem>
          <Label>Total</Label>
          <Value>${totalPrice}</Value>
        </SummaryItem>
      </SummaryCard>

      <PayButton onClick={() => alert('Redirecting to payment gateway...')}>
        Pay Now
      </PayButton>
    </Container>
  );
};

export default CheckoutPage;
