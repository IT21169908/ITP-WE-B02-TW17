
interface IBlog {
    _id: string,
    title: string;
    titleDescription: string;
    description: string;
    tags: string;
    reference:string;
    status: string;
    publishedDate: string;

    [key: string]: string | number
}

export default IBlog
