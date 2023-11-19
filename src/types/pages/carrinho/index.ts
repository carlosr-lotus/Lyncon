export type ProductCart = {
    id: number,
    nameProduct: string,
    priceProduct: number,
    colorName: string,
    sizeProduct: string,
    shippingRate: number,
    imageProduct: string,
    totalAmount: number
}

export type PricingData = {
    id: number,
    standardPriceProduct: number
}

export type AddressInputs = {
    cep: string,
    address: string,
    city: string,
    complement: string
}