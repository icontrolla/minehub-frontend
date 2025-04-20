// CartPage.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #0d0d0d;
  color: #f0f0f0;
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ffc107, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  background: #1a1a1a;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
`;

const ItemPrice = styled.p`
  color: #ffc107;
  font-weight: 500;
`;

const Total = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const CheckoutButton = styled.button`
  background: #28a745;
  color: white;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #1e7e34;
  }
`;

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    try {
      const parsed = JSON.parse(storedCart);
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <Title>Your Cart</Title>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.price}</ItemPrice>
              </ItemDetails>
            </CartItem>
          ))}
          <Total>Total: <strong>${totalPrice}</strong></Total>
          <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
        </>
      )}
    </Container>
  );
};

export default CartPage;