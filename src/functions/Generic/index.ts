function getFirstElement<ArrayType>(array: ArrayType[]): ArrayType {
    return array[0];
}

export const generic = {
    getFirstElement: getFirstElement
}