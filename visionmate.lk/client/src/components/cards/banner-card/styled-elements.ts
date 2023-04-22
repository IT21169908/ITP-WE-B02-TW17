import styled from "styled-components";

const CardWrapper = styled.figure`
  margin-bottom: 0;
  .banner-card {
    padding: 20px 25px 25px 25px;
    border-radius: 10px;
    &.banner-card-primary {
      background-color: ${({ theme }) => theme['primary-color']};
    }
    &.banner-card-dark {
      background-color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
    }
    &.banner-card-border {
      border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
      .banner-card__title {
        color: ${({ theme }) => theme[theme.mainContent]['dark-text']} !important;
      }
      .banner-card__body {
        p {
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        }
      }
      .banner-card__bottom {
        .author-name {
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        }
        .card-meta {
          li {
            span {
              color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
            }
          }
        }
      }
    }
    .banner-card__top {
      .banner-card__title {
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        color: #fff;
        margin-bottom: 14px;
        img,
        svg,
        i {
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
        }
      }
      .banner-card__action {
        .ant-dropdown-trigger {
          svg,
          i {
            color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
          }
        }
      }
    }
  }
  .banner-card__body {
    p {
      margin-bottom: 20px;
      line-height: 1.786;
      color: #ffffff90;
    }
  }
  .banner-card__bottom {
    .card-author {
      img {
        max-width: 30px;
        border-radius: 50%;
      }
      .author-name {
        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
        font-weight: 500;
        color: #ffffff90;
      }
    }
    .card-meta {
      ul {
        display: flex;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          &:not(:last-child) {
            margin-right: 10px;
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
          }
          svg,
          img {
            color: ${({ theme }) => theme['extra-light-color']};
            margin-right: 6px;
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
            width: 16px;
          }
          span {
            font-size: 13px;
            color: #fff;
          }
        }
      }
    }
  }
`;

const ImageUrl = styled.div`
  ${({ bgUrl }: {bgUrl: string}) => bgUrl && `background-image: url(${require(`../../static/img/sampleCards/${bgUrl}`)})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export { CardWrapper, ImageUrl };
