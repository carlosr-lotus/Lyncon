// This file is used to valid CEP format code which is a brazilian zip code
// Example format: 12345-123

type CepFunctions = {
    isCepValid: (cep: string) => boolean // Check if cep string is valid
}

function isCepValid(cep: string): boolean {
    const pattern: RegExp = /^[0-9]{5}-[0-9]{3}$/;

    if (pattern.test(cep)) 
        return true 
    else return false;
};

export const CEP: CepFunctions = {
    isCepValid: isCepValid
}