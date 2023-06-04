import { useEffect, useState, useRef } from "react";
import Head from 'next/head';

// Packages //
import { getApi } from "../../utils/api";

// Components //
import MenuBar from "../../components/MenuBar";
import Button from "../../components/material/Button";

// Types //
import { ProductCart, PricingData } from "../../types/types";

// Icons //
import { BsFillCreditCardFill } from "react-icons/bs";

import styles from '../../styles/pages/CarrinhoPage.module.css';

export default function CarrinhoPage() {

    const api = getApi();

    const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
    const [listTotalAmount, setListTotalAmount] = useState<PricingData[]>([]);
    const [subtotalPrice, setSubtotalPrice] = useState<number>(0.0);

    useEffect(() => {
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
    }, []);

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
                            <>
                                {
                                    productsCart.map((data) => (
                                        <div className={styles.cartProduct} key={data.id}>
                                            <h2>{data.nameProduct}</h2>
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
                                            <div className={styles.cardProductImageContainer}>
                                                <img src={data.imageProduct} alt="foto produto" />
                                                <p>{data.totalAmount}</p>
                                            </div>
                                            <h4>
                                                R$ {
                                                    (data.priceProduct)
                                                        .toFixed(2)
                                                        .replace('.', ',')
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
                                            R$ {
                                                (subtotalPrice)
                                                    .toFixed(2)
                                                    .toString()
                                                    .replace('.', ',')
                                            }
                                        </strong>
                                    </p>
                                    <p>
                                        <span>Frete</span>
                                        <strong>R$ 2,99</strong>
                                    </p>
                                    <p>Alterar endereço</p>
                                </div>
                                <hr />

                                <div className={styles.paymentTotalContainer}>
                                    <p>
                                        <span>Total</span>
                                        <strong>R$ {
                                            (subtotalPrice + 2.99)
                                                .toFixed(2)
                                                .toString()
                                                .replace('.', ',')
                                        }</strong>
                                    </p>
                                </div>
                            </>
                            :
                            <div>Carregando...</div>
                    }
                </div>

                <div className={styles.paymentOptionsGlobalContainer}>
                    <p>Escolha a forma de pagamento:</p>

                    <div className={styles.paymentOptionsContainer}>
                        <div className={styles.paymentOption}>
                            <BsFillCreditCardFill />
                            <p>Crédito/Débito</p>
                        </div>

                        <div className={styles.paymentOption}>
                            <BsFillCreditCardFill />
                            <p>Boleto</p>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}