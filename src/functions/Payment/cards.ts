// Functions related to credit/debit cards.
type CardsFunctions = {
    getIdentifier:      (cardNumber: number) => string,
    formatCardNumber:   (cardNumber: number) => string,
    isValid:            (cardNumber: number) => boolean
}

function getIdentifier(cardNumber: number): 
    'american express' |
    'mastercard'       | 
    'visa'             |
    'none'
{
    const cardFirstNumber = Number(cardNumber.toString().charAt(0));

    if (cardFirstNumber === 3)
        return 'american express';

    if (cardFirstNumber === 4)
        return 'visa';

    if (cardFirstNumber === 5)
        return 'mastercard';

    return 'none';
}

function isValid(cardNumber: number): boolean {
    const pattern: RegExp = /^[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}$/;

    console.log(cardNumber.toString());

    if (pattern.test(cardNumber.toString()) && getIdentifier(cardNumber) !== 'none')
        return true;
    else return false;
}

function formatCardNumber(cardNumber: number): string {
    const pattern: RegExp = /(\d{4})(?=\d)/g;

    if (isValid(cardNumber)) {
        console.log(cardNumber.toString().replace(pattern, '$1.'));
        return cardNumber.toString().replace(pattern, '$1.');
    } else {
        return 'invalid';
    }
}

const Card: CardsFunctions = {
    getIdentifier: getIdentifier,
    formatCardNumber: formatCardNumber,
    isValid: isValid
}

export default Card;