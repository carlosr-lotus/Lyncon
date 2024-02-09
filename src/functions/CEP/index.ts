// This file is used to valid CEP format code which is a brazilian zip code
// Example format: 12345-123
type CepFunctions = {
    isValid: (cep: string) => boolean // Check if cep string is valid
}

function isValid(cep: string): boolean {
    const pattern: RegExp = /^[0-9]{5}-[0-9]{3}$/;

    if (pattern.test(cep)) 
        return true; 
    else return false;
};

const CEP: CepFunctions = {
    isValid: isValid
}

export default CEP;