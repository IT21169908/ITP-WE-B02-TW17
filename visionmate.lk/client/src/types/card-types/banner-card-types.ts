
export interface IBannerCard {
    id: number;
    type: string;
    icon: string;
    bgImage: string;
    title: string;
    content: string;
    authorName: string;
    authorImg: string;
}

export interface BannerCardProps {
    item: IBannerCard;
}

