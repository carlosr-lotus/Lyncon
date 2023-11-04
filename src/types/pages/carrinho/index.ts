export interface ProductCart {
    id: number,
    nameProduct: string,
    priceProduct: number,
    colorName: string,
    sizeProduct: string,
    shippingRate: number,
    imageProduct: string,
    totalAmount: number
}

export interface PricingData {
    id: number,
    standardPriceProduct: number
}

export interface AddressInputs {
    cep: string,
    address: string,
    city: string,
    complement: string
}