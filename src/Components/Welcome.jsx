import React, { Component } from "react";
import styled from "styled-components";
import Robot from "../assests/robot.gif";
function Welcome({ currentUser }) {
  return (
    <>
      <Container className="border border-[stroke-lime-300d]">
        <img src={Robot} alt="Robot" />
        <h1>
          Welcome , <span className="text-[blue]">{currentUser}</span>{" "}
        </h1>
        <h3>Please select the Chat to start Message </h3>
      </Container>
    </>
  );
}
export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: blue;
  }
`;
