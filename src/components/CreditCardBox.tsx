import { useEffect, useState } from "react";

// Packages
import { useForm } from "react-hook-form";

// Components
import InputField from "./material/InputField";
import Button from "./material/Button";
import Select from "./material/Select";

// Icons
import { FaCreditCard } from "react-icons/fa";

import styles from '../styles/components/CreditCardBox.module.css';

type FormCardDataT = {
    cardExpireDate: string,
    cardName: string,
    cardNumber: string,
    securityCode: string
}

type FormUserDataT = {
    firstName: string,
    lastName: string,
    birthday: string,
    country: string,
    email: string,
    password: string,
    confirmPassword: string
}

type FormDataT = FormCardDataT & FormUserDataT;

export default function CreditCardBox(): JSX.Element {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataT>();

    const options = [
        { value: 1, label: 'Rio de Janeiro' },
        { value: 2, label: 'São Paulo' },
        { value: 3, label: 'Belo Horizonte' },
        { value: 4, label: 'Vitória' }
    ];

    const [state, setState] = useState<typeof options[0] | undefined>(options[0]);

    function finishPurchase(data: FormDataT): void {
        console.log(data);
    };

    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    return (
        <form
            onSubmit={handleSubmit(finishPurchase)}
            className={styles.formContainer}
        >
            <div className={styles.formSectionContainer}>
                <div className={styles.formSectionHeader}>
                    <FaCreditCard />
                    <h1>Dados do Cartão</h1>
                </div>

                <div className={styles.formStructure}>
                    <label htmlFor="cardNumber">Número do cartão*:</label>
                    <InputField
                        name="cardNumber"
                        type="number"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        register={register}
                    />

                    <label htmlFor="cardName">Nome no cartão*:</label>
                    <InputField
                        name="cardName"
                        type="text"
                        placeholder="Nome do titular"
                        register={register}
                    />

                    <label htmlFor="cardExpireDate">Data de expiração*:</label>
                    <InputField
                        name="cardExpireDate"
                        type="text"
                        placeholder="mm/aaaa"
                        register={register}
                    />

                    <label htmlFor="securityCode">Código de segurança &#40;CVV&#41;*:</label>
                    <InputField
                        name="securityCode"
                        type="text"
                        placeholder="xxx"
                        register={register}
                    />
                </div>
            </div>

            <div className={styles.separateLine}></div>

            <div className={styles.formSectionContainer}>
                <div className={styles.formSectionHeader}>
                    <FaCreditCard />
                    <h1>Dados do usuário</h1>
                </div>

                <div className={styles.formStructure}>
                    <label htmlFor="firstName">Nome*:</label>
                    <InputField
                        name="firstName"
                        type="text"
                        placeholder="Seu nome"
                        register={register}
                    />

                    <label htmlFor="lastName">Sobrenome*:</label>
                    <InputField
                        name="lastName"
                        type="text"
                        placeholder="Seu sobrenome"
                        register={register}
                    />

                    <label htmlFor="email">Email*:</label>
                    <InputField
                        name="email"
                        type="text"
                        placeholder="exemplo@email.com"
                        register={register}
                    />

                    <label htmlFor="birthday">Data de nascimento*:</label>
                    <InputField
                        name="birthday"
                        type="text"
                        placeholder="dd/mm/aaaa"
                        register={register}
                    />

                    <label htmlFor="cep">CEP*:</label>
                    <InputField
                        name="cep"
                        type="text"
                        placeholder="xxxxx-xxx"
                        register={register}
                    />

                    <label htmlFor="state">Estado*:</label>
                    <Select
                        options={options}
                        value={state}
                        onChange={o => setState(o)}
                    />

                    <label htmlFor="address">Endereço*:</label>
                    <InputField
                        name="address"
                        type="text"
                        placeholder="Rua Exemplo, 51"
                        register={register}
                    />

                    <label htmlFor="complement">Complemento &#40;opcional&#41;:</label>
                    <InputField
                        name="complemento"
                        type="text"
                        placeholder="Apartamento 402"
                        register={register}
                    />

                    <label htmlFor="password">Senha*:</label>
                    <InputField
                        name="password"
                        type="password"
                        placeholder="********"
                        register={register}
                    />

                    <label htmlFor="confirmPassword">Confirmar senha*:</label>
                    <InputField
                        name="confirmPassword"
                        type="password"
                        placeholder="********"
                        register={register}
                    />
                </div>
            </div>

            <Button
                name="Confirmar dados"
                type="submit"
            />
        </form>
    )
}