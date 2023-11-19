// Packages
import { useForm } from "react-hook-form";

// Components
import Button from "./material/Button";

// Icons
import { FaCreditCard } from "react-icons/fa";
import InputField from "./material/InputField";

import styles from '../styles/components/CreditCardBox.module.css';

type CardDataT = {
    cardNumber: string,
    cardName: string,
    cardExpireDate: string,
    securityCode: number
}

export default function CreditCardBox(): JSX.Element {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CardDataT>();


    function finishPurchase(data: CardDataT): void {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(finishPurchase)}>
            <div>
                <div>
                    <FaCreditCard />
                    <h1>Dados do Cartão</h1>
                </div>

                <div>
                    <label htmlFor="cardNumber">Número do cartão:</label>
                    <InputField
                        name="cardNumber"
                        type="text"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        register={register}
                    />

                    <label htmlFor="cardName">Nome no cartão:</label>
                    <InputField
                        name="cardName"
                        type="text"
                        placeholder="Nome do titular"
                        register={register}
                    />

                    <label htmlFor="cardExpireDate">Data de expiração:</label>
                    <InputField
                        name="cardExpireDate"
                        type="text"
                        placeholder="mm/aaaa"
                        register={register}
                    />

                    <label htmlFor="securityCode">Código de segurança&#40;CVV&#41;:</label>
                    <InputField
                        name="securityCode"
                        type="text"
                        placeholder="xxx"
                        register={register}
                    />
                </div>
            </div>

            <div>
                <div>
                    <FaCreditCard />
                    <h1>Dados do usuário</h1>
                </div>

                <div>
                    <label htmlFor="firstName">Nome:</label>
                    <InputField
                        name="firstName"
                        type="text"
                        placeholder=""
                        register={register}
                    />

                    <label htmlFor="lastName">Sobrenome:</label>
                    <InputField
                        name="lastName"
                        type="text"
                        placeholder=""
                        register={register}
                    />

                    <label htmlFor="email">Email:</label>
                    <InputField
                        name="email"
                        type="text"
                        placeholder=""
                        register={register}
                    />

                    <label htmlFor="birthday">Data de nascimento:</label>
                    <InputField
                        name="birthday"
                        type="text"
                        placeholder=""
                        register={register}
                    />

                    <label htmlFor="country">País de nascimento:</label>
                    <InputField
                        name="country"
                        type="text"
                        placeholder=""
                        register={register}
                    />

                    <label htmlFor="password">Senha:</label>
                    <InputField
                        name="password"
                        type="password"
                        placeholder=""
                        register={register}
                    />

                    <label htmlFor="confirmPassword">Confirmar senha:</label>
                    <InputField
                        name="confirmPassword"
                        type="password"
                        placeholder=""
                        register={register}
                    />
                </div>
            </div>

            <Button
                name="Submit"
                type="submit"
            />
        </form>
    )
}