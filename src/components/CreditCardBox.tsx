import { useEffect, useState } from "react";

// Packages
import { useForm } from "react-hook-form";

// Components
import InputField from "./material/InputField";
import Button from "./material/Button";
import Select from "./material/Select";

// Functions
import Payment from "../functions/Payment";
import Day from "../functions/Date/day";

// Utils
import { getApi } from "../utils/api";

// Icons
import { FaCreditCard } from "react-icons/fa";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";

import styles from '../styles/components/CreditCardBox.module.css';

type CardData = {
    clientName: string,
    cardNumber: string,
    expirationDate: string,
    code: number
}

type FormCardDataT = {
    cardExpireDate: string,
    cardName: string,
    cardNumber: string,
    securityCode: string
}

type FormUserDataT = {
    firstName: string,
    lastName: string,
    email: string,
    birthday: string,
    cep: string,
    address: string,
    complement?: string,
    password: string,
    confirmPassword: string
}

type FormDataT = FormCardDataT & FormUserDataT;

export default function CreditCardBox(): JSX.Element {

    const api = getApi();
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
    const [cardData, setCardData] = useState<CardData | undefined>();

    useEffect(() => {
        const controller = new AbortController();

        api.get(`/paymentData?id=${'cartao'}`, {
            signal: controller.signal
        }).then((res) => {
            if (res.data[0].info) {
                const formatTemp = res.data.map(data => {
                    data.info.cardNumber = Payment.card.formatCardNumber(data.info.cardNumber);
                    return data;
                });
                console.log(formatTemp[0].info);
                setCardData(formatTemp[0].info);
            }
        }).catch((err) => {
            console.log(err);
        });

        return () => {
            controller.abort();
        };
    }, []);

    function finishPurchase(data: FormDataT): void {
        console.log(data); 
    }
    
    function returnCardIdentifierIcon(identifier: string) {
        console.log(identifier);
    }

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
                    <div className={styles.inputFieldContainer}>
                        <label htmlFor="cardNumber">Número do cartão*:</label>
                        <InputField
                            name="cardNumber"
                            type="text"
                            defaultValue={cardData?.cardNumber}
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            pattern="[0-9\s]{13,19}"
                            onInput={(e) => returnCardIdentifierIcon(Payment.card.getIdentifier(Number(e.currentTarget.value)))}
                            register={register}
                        />
                    </div>

                    <div className={styles.inputFieldContainer}>
                        <label htmlFor="cardName">Nome no cartão*:</label>
                        <InputField
                            name="cardName"
                            type="text"
                            defaultValue={cardData?.clientName}
                            placeholder="Nome do titular"
                            register={register}
                        />
                    </div>

                    <div className={styles.inputFieldContainer}>
                        <label htmlFor="cardExpireDate">Data de expiração*:</label>
                        <InputField
                            name="cardExpireDate"
                            type="text"
                            defaultValue={cardData?.expirationDate}
                            placeholder="mm/aaaa"
                            register={register}
                        />
                    </div>

                    <div className={styles.inputFieldContainer}>
                        <label htmlFor="securityCode">Código de segurança &#40;CVV&#41;*:</label>
                        <InputField
                            name="securityCode"
                            type="text"
                            defaultValue={cardData?.code.toString()}
                            placeholder="xxx"
                            register={register}
                        />
                    </div>
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
