import React from 'react';
import { Button } from "../buttons/Button";
import { Cards } from '../cards/frame/CardFrame';
import { BannerWrapper, PageHeader } from "./styled-elements";
// import { Button, Cards, PageHeader } from '@codedrops/react-ui';
// import { BannerWrapper } from './PageHeaderBanner.styles';

interface PageHeaderBannerProps {
    type: 'default' | 'corporate';
    title: string;
    subtitle: string;
}

function PageHeaderBanner({ type, title, subtitle }: PageHeaderBannerProps) {
    return (
        <BannerWrapper
            className={type === 'corporate' ? 'ninjadash-top-banner ninjadash-top-banner-corporate' : 'ninjadash-top-banner'}
        >
            <Cards headless>
                <PageHeader className="theme-wide">

                    <img src={require('../../static/img/corporate.png')} alt="HexaDash Admin Template" />

                    <figcaption>
                        <h2 className="ninjadash-top-banner__title">{title}</h2>
                        <p className="ninjadash-top-banner__text">{subtitle}</p>
                        <Button className="ninjadash-top-banner__action" size="large" type="primary">
                            Learn More
                        </Button>
                    </figcaption>
                </PageHeader>
            </Cards>
        </BannerWrapper>
    );
}

export default PageHeaderBanner;
