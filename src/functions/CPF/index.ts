// This file is used to export functions related to CPF which standards for a brazilian ID/social card
// Format: 000.000.000-00
type CPFFunctions = {
    isValid: (cpf: string) => boolean
}

function isValid(cpf: string): boolean {
    const pattern: RegExp = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;

    if (pattern.test(cpf))
        return true
    else return false;
}

const CPF: CPFFunctions = {
    isValid: isValid
}

export default CPF;