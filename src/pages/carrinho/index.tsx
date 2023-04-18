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

interface ProdutoCarrinho {
    id: number,
    nameProduct: string,
    priceProduct: number,
    imageProduct: string
}

export default function CarrinhoPage() {

    const api = getApi();

    const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutoCarrinho[]>();
    const [totalAmountProduct, setTotalAmountProduct] = useState<number>(1);

    useEffect(() => {
        api.get(`/cart`)
            .then((res) => {
                console.log(res.data);
                setProdutosCarrinho(res.data);
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
                        produtosCarrinho ?
                            <>
                                {
                                    produtosCarrinho.map((data) => (
                                        <div className={styles.cartProduct}>
                                            <h2>{data.nameProduct}</h2>
                                            <h3>Tamanho M | Branco</h3>
                                            <div className={styles.cardProductImageContainer}>
                                                <img src={data.imageProduct} alt="foto produto" />
                                                <p>1</p>
                                            </div>
                                            <h4>R$ {(data.priceProduct).toFixed(2).replace('.', ',')}</h4>
                                            <div
                                                className={styles.addSameProductContainer}
                                            >
                                                <p>-</p>
                                                <p>1</p>
                                                <p>+</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                            :
                            <div>Loading...</div>
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