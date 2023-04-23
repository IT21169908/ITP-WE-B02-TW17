import Styled from 'styled-components';

const SettingDropdown = Styled.div`
    .setting-dropdown{
        max-width: 700px;
        padding: 4px 0;
        .setting-dropdown__single{
            align-items: flex-start;
            padding: 16px 20px;
            margin-bottom: 0;
            position: relative;
            &:after{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                box-shadow: 0 5px 20px ${({theme}) => theme[theme.mainContent]['gray-text']}15;
                z-index: 1;
                content: '';
                opacity: 0;
                visibility: hidden;
            }
            &:hover{
                &:after{
                    opacity: 1;
                    visibility: visible;
                }
            }
            h1{
                font-size: 15px;
                font-weight: 500;
                margin: -4px 0 2px;
                color: ${({theme}) => theme[theme.mainContent]['dark-text']};
            }
            p{
                margin-bottom: 0;
                color: ${({theme}) => theme[theme.mainContent]['gray-text']};
            }
            img{
                ${({theme}) => (theme.rtl ? 'margin-left' : 'margin-right')}: 16px;
                transform: ${({theme}) => (theme.rtl ? 'rotateY(180deg)' : 'rotateY(0deg)')};
            }
            figcaption{
                text-align: ${({theme}) => (!theme.rtl ? 'left' : 'right')}
            }
        }
    }
`;

const NestedDropdown = Styled.div`
    .support-dropdown{
        padding: 10px 15px;
        text-align: ${({theme}) => (!theme.rtl ? 'left' : 'right')};
        ul{
            &:not(:last-child){
                margin-bottom: 16px;
            }
            h1{
                font-size: 14px;
                font-weight: 400;
                color: ${({theme}) => theme[theme.mainContent]['light-text']};
            }
            li{
                a{
                    font-weight: 500;
                    padding: 4px 16px;
                    color: ${({theme}) => theme[theme.mainContent]['dark-text']};
                    &:hover{
                        background: #fff;
                        color: ${({theme}) => theme['primary-color']};
                    }
                }
            }
        }
    }
`;

const UserActionDropDown = Styled.div`
    .ninjadash-top-dropdown__title .title-text {        
        ${({theme}) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
    }
    .ninjadash-top-dropdown__content {
        figcaption{
            .ninjadash-top-dropdownText{
                min-width: 216px;
                ${({theme}) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
            }
            span{
                ${({theme}) => (theme.rtl ? 'padding-right' : 'padding-left')}: 0;
            }
        }
        .notification-icon{
            width: 39.2px;
            height: 32px;
            ${({theme}) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            &.bg-primary{
                background: ${({theme}) => theme['primary-color']}15;
                color: ${({theme}) => theme['primary-color']};
            }
            &.bg-secondary{
                background: ${({theme}) => theme[theme.mainContent].secondary}15;
                color: ${({theme}) => theme[theme.mainContent].secondary};
            }
            svg{
                width: 18px;
                height: 18px; 
            }
        }
        .notification-content{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .notification-text h1 {
        font-size: 14px;
        font-weight: 400;
        color: #5A5F7D;
        margin-bottom: 4px;
    }

    .notification-text h1 span {
        color: #5F63F2;
        font-weight: 500;
        ${({theme}) => (theme.rtl ? 'padding-right' : 'padding-left')}: 0;
    }

    .notification-text p {
        font-size: 12px;
        color: #ADB4D2;
        margin-bottom: 0;
        text-align: ${({theme}) => (!theme.rtl ? 'left' : 'right')}
    }
`;


export { SettingDropdown, NestedDropdown, UserActionDropDown };
