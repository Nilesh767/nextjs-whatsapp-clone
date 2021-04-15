import styled from "styled-components";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loading = () => {
  return (
    <Container>
      <LoadingContainer>
        <Logo src="/whatsappLogo.svg" alt="whatsapp logo" />
        <Loader type="Circles" color="#075E54" height={80} width={80} />
      </LoadingContainer>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  justify-content: center;
  background-color: whitesmoke;
`;

const LoadingContainer = styled.div`
  padding: 100px;
  display: flex;
  border-radius: 5px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
  @media only screen and (max-width: 600px) {
    padding: 50px;
  }
`;

const Logo = styled.img`
  height: 250px;
  margin-bottom: 20px;
  @media only screen and (max-width: 600px) {
    height: 150px;
  }
`;
