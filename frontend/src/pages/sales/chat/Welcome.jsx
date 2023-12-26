// Welcome.jsx
import React from "react";
import styled from "styled-components";

export default function Welcome({ userName }) {
  return (
    <Container>
      <h1>
        Bienvenido, <span>{userName}!</span>
      </h1>
      <h3>Selecciona un contacto para iniciar un chat.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  span {
    color: #4e0eff;
  }

  h3 {
    color: white;
    font-size: 1rem;
  }
`;
