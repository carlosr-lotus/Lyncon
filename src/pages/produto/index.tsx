import { useEffect, useState } from "react"

// Components //
import MenuBar from "../../components/MenuBar";
import ImageUser from "../../components/ImageUser";
import HeartIcon from "../../components/customIcons/HeartIcon";

import styles from '../../styles/pages/ProductPage.module.css';

interface ProductProps {
    id: number,
    name: string,
    pricing: number,
    image: string,
    desc: string
}

export default function ProductPage() {

    const [productData, setProductData] = useState<ProductProps>();

    useEffect(() => {
        setProductData(JSON.parse(localStorage.getItem('product') || '{}'));
    }, []);

    return (
        <>
            <MenuBar />

            {productData ?
                <div className={styles.productPageGlobalContainer}>

                    <div className={styles.productDetailsContainer}>
                        <div className={styles.productImgContainer}>
                            <img src={productData.image} alt="product-image" />
                        </div>

                        <div className={styles.productDetails}>
                            <div className={styles.pricingProduct}>
                                <h1>{productData.name}</h1>

                                <h2>R$ {productData.pricing.toString().replace('.', ',')}</h2>
                                <span>ou até 12x de R$ {(productData.pricing / 12).toFixed(2).replace('.', ',')}</span>
                            </div>

                            <div className={styles.colorOptions}>
                                <p>Cor: Branco</p>
                                <div className={styles.colorBall}></div>
                            </div>

                            <div className={styles.sizingOptionsContainer}>
                                <p>p</p>
                                <p>m</p>
                                <p>g</p>
                                <p>gg</p>
                            </div>

                            <p className={styles.productDesc}>{productData.desc}</p>

                            <div className={styles.btnContainer}>
                                <button className={styles.btn}>Adicionar ao carrinho</button>
                                <button className={styles.btn}>Favoritar</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reviewsContainer}>
                        <div className={styles.userReview}>
                            <div>
                                <ImageUser
                                    width="4.5rem"
                                    height="4.5rem"
                                    nome="Tiago Rafael"
                                    urlImagem="./images/global/usuario-1.jpg"
                                />
                                <div className={styles.userInfo}>
                                    <h1>Tiago Rafael</h1>
                                    <h2>São Paulo - SP</h2>
                                </div>
                            </div>
                            <p>“Como diz a descrição, camisa de qualidade e traz consigo muita praticidade no dia a dia! Nota 10”</p>
                            <div>
                                <HeartIcon />
                                <span>5</span>
                            </div>
                        </div>
                    </div>

                </div>
                :
                <div>Não foi possível carregar o produto.</div>
            }
        </>
    )
}