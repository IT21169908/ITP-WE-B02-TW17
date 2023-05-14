import Styled from "styled-components";

const CardStyleWrapper = Styled.div`
  .ant-card{
    background: ${({ theme }) => theme[theme.mainContent]['general-background']};
    &.ant-card-bordered{
      border-radius: 5px;
      overflow: hidden;
      background: ${({ theme }) => theme[theme.mainContent]['white-background']};
      border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']} !important;
      .ant-card-head{
        background: ${({ theme }) => theme[theme.mainContent]['white-background']};
      }
    }
  }
  .ant-card-head{
    border-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
    background: ${({ theme }) => theme[theme.mainContent]['general-background']};
    .ant-card-head-wrapper{
      .ant-card-head-title{
        padding: 12px 0;
      }
    }
    
    .ant-card-extra{
      display: block;
      padding: 12px 0;
      @media only screen and (max-width: 575px){
        margin-bottom: 4px;
      }
    }
  }
  .ant-card-head-wrapper .ant-card-extra a{
    color: ${({ theme }) => theme['primary-color']};
  }
  .ant-card-body{
    padding: 22px 25px 15px 25px !important;
    p{
      margin-bottom: 4px;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    }
  }
  .ant-card-small > .ant-card-head{
    font-size: 16px;
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
  .ant-card-small > .ant-card-body{
    padding: 12px 15px 8px 15px !important
  }
`;

const BlogCardStyleWrap = Styled.figure`
    .ninjadash-blog{
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(173,181,217,.05);
        margin-bottom: 25px;
        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        &:hover{
            .ninjadash-blog-thumb{
                &:after{
                    height: 100%;
                }
            }
        }
        .ninjadash-blog-thumb{
            position: relative;
            &:after{
                position:  absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 0%;
                content: '';
                border-radius: 10px;
                transition: .35s;
                background-color: ${({ theme }) => theme['dark-color']}15;
            }
        }
        &.ninjadash-blog-style-3,
        &.ninjadash-blog-style-2{
            padding: 0px;
            .ninjadash-blog__title{
                margin: 15px 0 12px;
            }
            figcaption{
                padding: 0 25px 25px;
            }
            .ninjadash-blog-thumb{
                &:after{
                    border-radius: 10px 10px 0 0;
                }
            }
            .ninjadash-blog__image{
                border-radius: 10px 10px 0 0;
            }
        }
        .ninjadash-blog__image{
            width: 100%;
            border-radius: 10px;
        }
        .ninjadash-blog-meta{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            &.ninjadash-blog-meta-theme-3{
                justify-content: flex-start;
                margin: 7px -3px -3px;
                .ninjadash-blog-meta__single{
                    position: relative;
                    margin: 3px;
                    &:before{
                        position: absolute;
                        left: 0;
                        top: calc(50% - 4px);
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background-color: ${({ theme }) => theme[theme.mainContent]['light-text']};
                    }
                    &:not(:first-child){
                        padding-left: 10px;
                        &:before{
                            content: '';
                        }
                    }
                }
            }
        }
        .ninjadash-blog-meta__single{
            display: inline-block;
            font-size: 15px;
            color: ${({ theme }) => theme[theme.mainContent]['light-text']};
        }
        .ninjadash-blog__title{
            font-size: 20px;
            font-weight: 600;
            margin: 10px 0 5px;
            a{
                color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                &:hover{
                    color: ${({ theme }) => theme['primary-color']};
                }
            }
        }
        .ninjadash-blog__text{
            font-size: 16px;
            margin-bottom: 15px;
            color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        }
        .ninjadash-blog__bottom{
            display: flex;
            justify-content: space-between;
        }
        .ninjadash-blog__author{
            .ninjadash-blog__author-img{
                max-width: 32px;
                border-radius: 50%;
            }
            .ninjadash-blog__author-name{
                font-size: 15px;
                ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
                color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
            }
        }
        .ninjadash-blog__meta{
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            margin: -9px;
            .ninjadash-blog__meta--item{
                margin: 9px;
                span{
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    line-height: 1;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
                    svg{
                        width: 12px;
                        height: 12px;
                        ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 4px;
                        color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
                    }
                }
            }
        }
    }
`;



export { CardStyleWrapper, BlogCardStyleWrap };
