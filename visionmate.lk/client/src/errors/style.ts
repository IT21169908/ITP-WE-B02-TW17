import Styled from "styled-components";

const ErrorWrapper = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  img{
    margin-bottom: 100px;
    max-width: 400px;
    width: 100%;
    @media only screen and (max-width: 575px){
      margin-bottom: 40px;
    }
  }
  .error-text{
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 35px;
    color: ${({theme}) => theme[theme.mainContent]['extra-light-text']};
  }
  p{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 26px;
    color: ${({theme}) => theme[theme.mainContent]['gray-text']};
  }
  button{
    height: 44px;
  }
`;

export {ErrorWrapper}