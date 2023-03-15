import { useEffect, useState } from "react";

// Packages //
import { getApi } from "../../utils/api";

// Components //
import MenuBar from "../../components/MenuBar";

// Icons //
import { BsFillCreditCardFill } from "react-icons/bs";

import styles from '../../styles/pages/CarrinhoPage.module.css';

interface ProdutoCarrinho {
    id: number,
    nameProduct: string,
    priceProduct: number
}

export default function CarrinhoPage() {

    const api = getApi();

    const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutoCarrinho>();

    useEffect(() => {
        api.get(`http://localhost:4500/cart`)
            .then((res) => {
                console.log(res.data);
                setProdutosCarrinho(res.data);
            })
    }, [])

    return (
        <>
            <MenuBar />

            <main className={styles.globalCartPageContainer}>

                <div className={styles.cartDetailsContainer}>
                    <h2>Camisa Lyncon Gola V</h2>
                    <h3>Tamanho M</h3>
                    <img src="/images/vestimentas/camiseta-lyncon-gola-v.jpg" alt="foto produto" />
                    <hr />
                    <p>Total: <strong>R$ 10,00</strong></p>
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