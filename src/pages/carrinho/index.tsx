import { useEffect, useState, useRef } from "react";
import Head from 'next/head';

// Packages //
import { getApi } from "../../utils/api";

// Components //
import MenuBar from "../../components/MenuBar";
import Button from "../../components/material/Button";

// Icons //
import { BsFillCreditCardFill } from "react-icons/bs";

import styles from '../../styles/pages/CarrinhoPage.module.css';

interface ProductCart {
    id: number,
    nameProduct: string,
    priceProduct: number,
    colorName: string,
    sizeProduct: string,
    shippingRate: number,
    imageProduct: string
}

export default function CarrinhoPage() {

    const api = getApi();

    const [productsCart, setProductsCart] = useState<ProductCart[]>();
    const [totalAmountProduct, setTotalAmountProduct] = useState<number>(1);
    const [subtotalPrice, setSubtotalPrice] = useState<number>(0.0);

    useEffect(() => {
        api.get(`/cart`)
            .then((res) => {
                console.log(res.data);
                setProductsCart(res.data);
                setSubtotalPrice(res.data.reduce((prevValue: number, currentValue: ProductCart) => {
                    return prevValue + currentValue.priceProduct
                }, 0));
            })
    }, [])

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
                                            <h3>Tamanho {data.sizeProduct.toUpperCase()} | {data.colorName.charAt(0).toUpperCase() + data.colorName.slice(1)}</h3>
                                            <div className={styles.cardProductImageContainer}>
                                                <img src={data.imageProduct} alt="foto produto" />
                                                <p>{totalAmountProduct}</p>
                                            </div>
                                            <h4>R$ {(data.priceProduct).toFixed(2).replace('.', ',')}</h4>
                                            <div
                                                className={styles.addSameProductContainer}
                                            >
                                                <button
                                                    onClick={
                                                        () => totalAmountProduct >= 2 &&
                                                            setTotalAmountProduct(totalAmountProduct - 1)}
                                                >
                                                    -
                                                </button>
                                                <p>{totalAmountProduct}</p>
                                                <button
                                                    onClick={
                                                        () => totalAmountProduct <= 98 &&
                                                            setTotalAmountProduct(totalAmountProduct + 1)
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
                                            R$ {(subtotalPrice * totalAmountProduct).toFixed(2).toString().replace('.', ',')}
                                        </strong>
                                    </p>
                                    <p>
                                        <span>Frete</span>
                                        <strong>R$ 2,99</strong>
                                    </p>
                                </div>
                                <hr />

                                <div className={styles.paymentTotalContainer}>
                                    <p>
                                        <span>Total</span>
                                        <strong>R$ 79,99</strong>
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