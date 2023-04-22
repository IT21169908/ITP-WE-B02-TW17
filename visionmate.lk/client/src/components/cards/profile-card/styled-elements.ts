import Styled from "styled-components";

const ProfileCardWrapper = Styled.figure`
  ${({ theme }) => `
    width: 100%;
    min-height: 360px;
    background-color: ${theme[theme.mainContent]['white-background']};        
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 5px 20px ${theme['extra-light-color']}05;
    position: relative;
    @media only screen and (max-width: 991px){
        min-height: auto;
        margin-bottom: 25px;
    }

    figcaption {
        .ninjadash-profile-top-img {
            position: static;
            width: 100%;
        }
    }

    .ninjadash-profile-content{
        padding: 0 0 45px;
        margin-top: -75px;
        .ninjadash-profile-content__img{
            margin-bottom: 10px;
            img{
                padding: 5px;
                border-radius: 50%;
                max-width: 110px;
                background-color: ${theme[theme.mainContent]['white-background']};
            }
        }
        .ninjadash-profile-name{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 2px;
            color: ${theme[theme.mainContent]['dark-text']};
        }
        .ninjadash-profile-text{
            margin-bottom: 18px;
            color: ${theme[theme.mainContent]['gray-light-text']};
        }
    }
    .ninjadash-profile-socials{
        display: flex;
        align-items: center;
        justify-content: center !important;
        margin: -5px;
        li{
            margin: 5px;
            span.fa{
                color: #fff;
                fill: #fff;
            }
            &.ninjadash-facebook{
                a{
                    background-color: ${theme['primary-color']};
                }
            }
            &.ninjadash-twitter{
                a{
                    background-color: ${theme['secondary-color']};
                }
            }
            &.ninjadash-dribble{
                a{
                    background-color: ${theme['info-color']};
                }
            }
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                border-radius: 6px;
                line-height: 1;
            }
        }
    }
  `}
`;

export { ProfileCardWrapper };
