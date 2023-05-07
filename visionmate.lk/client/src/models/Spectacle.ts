interface ISpectacle {
    _id: string,
    name: string,
    frameStyle: string,
    frameMaterial: string,
    lensType: string,
    lensMaterial: string,
    lensCoating: string,
    color: string,
    size: string,
    price: number,

    [key: string]: string | number
}


export default ISpectacle