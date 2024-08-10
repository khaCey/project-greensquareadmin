import styled, { keyframes } from 'styled-components';

// Keyframes for sliding text
const slide = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const BannerWrapper = styled.div`
  overflow: hidden; 
  width: 100%; 
  white-space: nowrap;
  box-sizing: border-box;
  background-color: #fc6f03;
  padding: 10px; 
  position: fixed;
  top: 0;   
`;

const BannerText = styled.div`
  display: inline-block;
  animation: ${slide} 10s linear infinite;
  color: white;
`;

const Banner = ({ children }) => {
  return (
    <BannerWrapper>
      <BannerText>{children}</BannerText>
    </BannerWrapper>
  );
};

export default Banner;
