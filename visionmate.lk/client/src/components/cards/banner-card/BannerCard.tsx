import propTypes from "prop-types";
import React from 'react';
import { ThreeDots, Eye, Heart } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { BannerCardProps } from "../../../types/card-types/banner-card-types";
import { Dropdown } from "../../dropdown/Dropdown";
import { CardWrapper, ImageUrl } from "./styled-elements";

function BannerCard({ item }: BannerCardProps) {
  const { content, icon, title, authorName, authorImg, type, bgImage } = item;
  return (
      <CardWrapper>
        <ImageUrl className={`banner-card banner-card-${type}`} bgUrl={bgImage}>
          <div className="banner-card__top align-center-v justify-content-between">
            <h4 className="banner-card__title">
              <img src={require(`../../static/img/icon/${icon}`)} alt="StrikingDash Banner" />
              <span>{title}</span>
            </h4>
            <div className="banner-card__action">
              <div className="more">
                <Dropdown
                    action={['click']}
                    className="wide-dropdwon"
                    content={{
                        items: [
                          { label: <Link to="#">Edit</Link>, key: '0', },
                          { label: <Link to="#">Delete</Link>, key: '1', },
                          { label: <Link to="#">View</Link>, key: '2', },
                        ],
                    }}
                >
                  <Link to="#">
                    <ThreeDots />
                  </Link>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="banner-card__body">
            <p>{content}</p>
          </div>
          <div className="banner-card__bottom  align-center-v justify-content-between">
            <div className="card-author">
              <img src={require(`../../static/img/users/${authorImg}`)} alt="" />
              <span className="author-name">{authorName}</span>
            </div>
            <div className="card-meta">
              <ul>
                <li>
                  <Eye />
                  <span className="view-count">70</span>
                </li>
                <li>
                  <Heart />
                  <span className="view-count">70</span>
                </li>
              </ul>
            </div>
          </div>
        </ImageUrl>
      </CardWrapper>
  );
}

BannerCard.propTypes = {
  item: propTypes.object,
};

BannerCard.defaultProps = {
  item: {
    id: 1,
    type: 'primary',
    icon: 'water-fall.svg',
    bgImage: '',
    title: 'Primary Color',
    content:
        'Lorem Ipsum is simply dummy text of the printing printer took a galley of type and scrambled and typesetting industry.',
    authorName: 'Chris Doe',
    authorImg: '10.png',
  },
};

export default BannerCard;
