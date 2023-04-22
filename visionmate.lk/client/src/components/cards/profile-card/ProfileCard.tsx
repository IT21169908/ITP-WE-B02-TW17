import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDribbble, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import propTypes from "prop-types";
import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileCardProps } from "../../../types/card-types";
import { ProfileCardWrapper } from './styled-elements';

function ProfileCard({ image, bgImage, title, tag }: ProfileCardProps) {
    return (
        <ProfileCardWrapper>
            <figcaption>
                <img className="ninjadash-profile-top-img" src={require(`../../${bgImage}`)} alt="banner" />
                <div className="ninjadash-profile-content">
                    <div className="ninjadash-profile-content__img">
                        <img className="profile" src={require(`../../${image}`)} alt="profile" />
                    </div>
                    <h4 className="ninjadash-profile-name">{title}</h4>
                    <p className="ninjadash-profile-text">{tag}</p>
                    <ul className="ninjadash-profile-socials">
                        <li className="ninjadash-facebook">
                            <Link to="#">
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                        </li>
                        <li className="ninjadash-twitter">
                            <Link to="#">
                                <FontAwesomeIcon icon={faTwitter} />
                            </Link>
                        </li>
                        <li className="ninjadash-dribble">
                            <Link to="#">
                                <FontAwesomeIcon icon={faDribbble} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </figcaption>
        </ProfileCardWrapper>
    );
}

ProfileCard.propTypes = {
    image: propTypes.string,
    bgImage: propTypes.string,
    title: propTypes.string,
    tag: propTypes.string,
};

ProfileCard.defaultProps = {
    image: 'static/img/users/1.png',
    bgImage: 'static/img/banner/BG.png',
    title: 'Robert Clinton',
    tag: 'Best Seller of the last month',
};

export default ProfileCard;
