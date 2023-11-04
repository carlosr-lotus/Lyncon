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