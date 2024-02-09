type CardsFunctions = {
    getIdentifier: (cardNumber: number) => string
}

function getIdentifier(cardNumber: number): 
    'american express' |
    'mastercard'       | 
    'visa'             |
    'none'
{
    const cardFirstNumber: number = Number(cardNumber.toString().charAt(0));

    if (cardFirstNumber === 3)
        return 'american express';

    if (cardFirstNumber === 4)
        return 'visa';

    if (cardFirstNumber === 5)
        return 'mastercard';

    return 'none';
}

const Card: CardsFunctions = {
    getIdentifier: getIdentifier
}

export default Card;