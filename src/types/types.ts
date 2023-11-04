// vestimentas - index.tsx //
export interface CategoriesType {
    id: number,
    category: string,
    selected: boolean
}

export interface ProductList {
    id: number,
    name: string,
    pricing: number,
    image: string
}

// produto - index.tsx //
export interface ProductProps {
    id: number,
    name: string,
    pricing: number,
    image: string,
    colors: ColorType[],
    sizes: SizeType[],
    desc?: string
}

export interface ColorType {
    id: number,
    colorHex: string,
    colorName: string
}

export interface SizeType {
    id: number,
    size: string,
    isAvailable: boolean
}

// carrinho - index.tsx //
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

export type ProductSelected = Pick<ProductCart, 'nameProduct' | 'imageProduct'>;

export interface PricingData {
    id: number,
    standardPriceProduct: number
}