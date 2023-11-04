import { useEffect, useState, useRef } from "react";
import Head from 'next/head';

// Packages //
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { getApi } from "../../utils/api";

// Components //
import MenuBar from "../../components/MenuBar";
import Button from "../../components/material/Button";
import CreditCardBox from "../../components/CreditCardBox";

// Types //
import { ProductCart, PricingData } from "../../types/types";

// Icons //
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";

import styles from '../../styles/pages/CarrinhoPage.module.css';
import InputField from "../../components/material/InputField";

interface ShippingData {
    address: string,
    city: string,
    shippingPrice: number
}

interface AddressInputs {
    cep: string,
    address: string,
    city: string,
    complement: string
}

export default function CarrinhoPage() {

    const api = getApi();

    const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
    const [listTotalAmount, setListTotalAmount] = useState<PricingData[]>([]);
    const [subtotalPrice, setSubtotalPrice] = useState<number>(0.0);
    const [userZipCode, setUserZipCode] = useState<AddressInputs>();
    const [shippingPrice, setShippingPrice] = useState<number>(0.0);
    const [isCepValid, setIsCepValid] = useState<boolean>(true);
    const [openControlledCepModal, setOpenControlledCepModal] = useState<boolean>(false);
    const closeModal = () => setOpenControlledCepModal(false);

    const [currentPaymentOption, setCurrentPaymentOption] = useState<'creditCard' | 'boleto' | ''>('');

    const { register, handleSubmit, formState: { errors } } = useForm<AddressInputs>();

    useEffect(() => {
        getCartProducts();
    }, []);

    function getCartProducts(): void {
        api.get(`/cart`)
            .then((res) => {
                setProductsCart(res.data);
                setListTotalAmount(res.data.map((data: ProductCart) => {
                    return { id: data.id, standardPriceProduct: data.priceProduct }
                }));
                setSubtotalPrice(res.data.reduce((prevValue: number, currentValue: ProductCart) => {
                    return prevValue + currentValue.priceProduct
                }, 0));
            })
    }

    function removeItemFromCart(productID: number): void {
        api.delete(`/cart/${productID}`)
            .then((res) => {
                console.log(res);
                getCartProducts();
            }).catch((err) => {
                console.log(err);
            });
    }

    function decreaseAmount({ id }: ProductCart): void {
        const productsCartTemp: ProductCart[] = [...productsCart];

        productsCartTemp.forEach((data) => {
            if (data.id === id) {
                const stdPricingData: number = listTotalAmount.find((dataPricing) =>
                    dataPricing.id === id)!.standardPriceProduct;

                data.totalAmount -= 1;
                data.priceProduct = data.priceProduct - stdPricingData;
                console.log(subtotalPrice + data.priceProduct);
                setSubtotalPrice(productsCartTemp.reduce((prevValue: number, currentValue: ProductCart) => {
                    return prevValue + currentValue.priceProduct
                }, 0));
            }
        });

        console.log(productsCartTemp);
        setProductsCart(productsCartTemp);
    }

    function increaseAmount({ id }: ProductCart): void {
        const productsCartTemp: ProductCart[] = [...productsCart];

        productsCartTemp.forEach((data) => {
            if (data.id === id) {
                const stdPricingData: number = listTotalAmount.find((dataPricing) =>
                    dataPricing.id === id)!.standardPriceProduct;

                data.totalAmount += 1;
                data.priceProduct = data.priceProduct + stdPricingData;
                setSubtotalPrice(productsCartTemp.reduce((prevValue: number, currentValue: ProductCart) => {
                    return prevValue + currentValue.priceProduct
                }, 0));
            }
        });

        console.log(productsCartTemp);
        setProductsCart(productsCartTemp);
    }

    function isCEPValid(data: AddressInputs): void {
        const pattern: RegExp = /^[0-9]{5}-[0-9]{3}$/;
        console.log(data)

        if (pattern.test(data.cep)) {
            console.log(data);
            setUserZipCode(data);
            setIsCepValid(true);
            setShippingPrice(5.9)
        } else {
            setIsCepValid(false);
        };
    };

    return (
        <>

            <Head>
                <title>Lyncon | Carrinho</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Lyncon | Nome do Produto" key="title" />
            </Head>

            <MenuBar />

            <main className={styles.globalCartPageContainer}>

                <div className={styles.cartDetailsContainer}>
                    {
                        productsCart ?
                            productsCart.length >= 1 ?
                                <>
                                    {
                                        productsCart.map((data) => (
                                            <div className={styles.cartProduct} key={data.id}>
                                                <div className={styles.productHeader}>
                                                    <h2>{data.nameProduct}</h2>
                                                    <BsFillTrashFill
                                                        size={15}
                                                        onClick={() => removeItemFromCart(data.id)}
                                                    />
                                                </div>
                                                <h3>
                                                    Tamanho {
                                                        data.sizeProduct
                                                            .toUpperCase()
                                                    } | {
                                                        data.colorName
                                                            .charAt(0)
                                                            .toUpperCase()
                                                        +
                                                        data.colorName
                                                            .slice(1)}
                                                </h3>
                                                <div
                                                    className={styles.cardProductImageContainer}
                                                >
                                                    <img
                                                        src={data.imageProduct}
                                                        alt="foto produto"
                                                    />
                                                    <p>{data.totalAmount}</p>
                                                </div>
                                                <h4>
                                                    {
                                                        (data.priceProduct)
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                    }
                                                </h4>
                                                <div
                                                    className={styles.addSameProductContainer}
                                                >
                                                    <button
                                                        onClick={
                                                            () => data.totalAmount >= 2 &&
                                                                decreaseAmount(data)}
                                                    >
                                                        -
                                                    </button>
                                                    <p>{data.totalAmount}</p>
                                                    <button
                                                        onClick={
                                                            () => data.totalAmount <= 98 &&
                                                                increaseAmount(data)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }

                                    <hr />
                                    <div className={styles.paymentDetailsContainer}>
                                        <p>
                                            <span>Subtotal</span>
                                            <strong>
                                                {
                                                    (subtotalPrice)
                                                        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                }
                                            </strong>
                                        </p>
                                        <p>
                                            <span>Frete</span>
                                            <strong>
                                                {
                                                    (shippingPrice)
                                                        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                }
                                            </strong>
                                        </p>
                                        <p className={styles.shippingAddressContainer}>
                                            {
                                                !userZipCode ?
                                                    <Popup
                                                        trigger={
                                                            <span>Escolher endereço de envio</span>
                                                        }
                                                        modal={true}
                                                        open={openControlledCepModal}
                                                        onClose={closeModal}
                                                        position="bottom center"
                                                        closeOnDocumentClick
                                                        contentStyle={{
                                                            width: '32rem',
                                                            maxHeight: '90vh',
                                                            padding: '2rem',
                                                            borderRadius: '.5rem',
                                                            boxShadow: '0px 2px 5px 0px var(--Box-Shadow-Default)',
                                                            transition: '.2s ease-in',
                                                            backgroundColor: '#fff',
                                                            overflowY: 'auto'
                                                        }}
                                                        overlayStyle={{
                                                            backgroundColor: 'rgba(0,0,0,0.4)',
                                                            padding: '1rem'
                                                        }}
                                                    >
                                                        <form
                                                            className={styles.addZipCodeModal}
                                                            onSubmit={handleSubmit(isCEPValid)}
                                                        >
                                                            <h3>Insira os dados do endereço de entrega:</h3>

                                                            <label htmlFor="cep">CEP*</label>
                                                            {!isCepValid &&
                                                                <span className={styles.errorInvalidCEP}>*Insira um CEP válido</span>
                                                            }
                                                            <InputField
                                                                name='cep'
                                                                type='text'
                                                                placeholder='xxxxx-xxx'
                                                                register={register}
                                                                required
                                                                style={{
                                                                    padding: '1.2rem',
                                                                    fontSize: '1.5rem'
                                                                }}
                                                            />

                                                            <label htmlFor="city">Cidade*</label>
                                                            <InputField
                                                                name='city'
                                                                type='text'
                                                                placeholder='Rio de Janeiro, RJ'
                                                                register={register}
                                                                required
                                                                style={{
                                                                    padding: '1.2rem',
                                                                    fontSize: '1.5rem'
                                                                }}
                                                            />

                                                            <label htmlFor="address">Endereço*</label>
                                                            <InputField
                                                                name='address'
                                                                type='text'
                                                                placeholder='Rua Cristo Redentor, 41'
                                                                register={register}
                                                                required
                                                                style={{
                                                                    padding: '1.2rem',
                                                                    fontSize: '1.5rem'
                                                                }}
                                                            />

                                                            <label htmlFor="complement">Complemento</label>
                                                            <InputField
                                                                name='complement'
                                                                type='text'
                                                                placeholder='Apto 41'
                                                                register={register}
                                                                style={{
                                                                    padding: '1.2rem',
                                                                    fontSize: '1.5rem'
                                                                }}
                                                            />

                                                            <Button
                                                                name='Salvar'
                                                                type='submit'
                                                            // onClick={() => isValidBrazilZip(zipCodeRef.current)}
                                                            />
                                                        </form>
                                                    </Popup>
                                                    :
                                                    <div className={styles.shippingAddressDetails}>
                                                        <p>
                                                            Enviar para:
                                                            <br />
                                                            {userZipCode.address}
                                                            {
                                                                userZipCode.complement &&
                                                                <>
                                                                    <br />
                                                                    {userZipCode.complement}
                                                                </>
                                                            }
                                                            <br />
                                                            {userZipCode.city}
                                                        </p>

                                                        <span onClick={() => {
                                                            setUserZipCode(undefined)
                                                            setOpenControlledCepModal(true)
                                                        }}>
                                                            Alterar endereço de envio
                                                        </span>

                                                    </div>
                                            }
                                        </p>
                                    </div>
                                    <hr />

                                    <div className={styles.paymentTotalContainer}>
                                        <p>
                                            <span>Total</span>
                                            <strong>{
                                                (subtotalPrice + shippingPrice)
                                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                            }</strong>
                                        </p>
                                    </div>
                                </>
                                :
                                <h2>Carrinho vazio</h2>
                            :
                            <div>Carregando...</div>
                    }
                </div>

                <div className={styles.paymentOptionsGlobalContainer}>
                    {
                        currentPaymentOption === '' ?
                            <>
                                <p>Escolha a forma de pagamento:</p>

                                <div className={styles.paymentOptionsContainer}>
                                    <div
                                        className={styles.paymentOption}
                                        onClick={() => setCurrentPaymentOption('creditCard')}
                                    >
                                        <BsFillCreditCardFill size={25} />
                                        <p>Crédito/Débito</p>
                                    </div>

                                    <hr />

                                    <div
                                        className={styles.paymentOption}
                                        onClick={() => setCurrentPaymentOption('boleto')}
                                    >
                                        <BsFillCreditCardFill size={25} />
                                        <p>Boleto</p>
                                    </div>
                                </div>
                            </>
                            :
                            currentPaymentOption === 'creditCard' ?
                                <>
                                    <div
                                        onClick={() => setCurrentPaymentOption('')}
                                    >
                                        Voltar
                                    </div>
                                    <CreditCardBox />
                                </>
                                :
                                currentPaymentOption === 'boleto' &&
                                <>
                                    <div
                                        onClick={() => setCurrentPaymentOption('')}
                                    >
                                        Voltar
                                    </div>
                                    BOLETO
                                </>
                    }
                </div>

            </main>
        </>
    )
}