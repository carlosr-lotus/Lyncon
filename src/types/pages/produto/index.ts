export type ProductProps = {
    id: number,
    name: string,
    pricing: number,
    image: string,
    colors: ColorType[],
    sizes: SizeType[],
    desc?: string
}

export type ColorType = {
    id: number,
    colorHex: string,
    colorName: string
}

export type SizeType = {
    id: number,
    size: string,
    isAvailable: boolean
}