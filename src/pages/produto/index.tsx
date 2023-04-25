import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';

// Context //
import { getApi } from "../../utils/api";

// Components //
import MenuBar from "../../components/MenuBar";
import ImageUser from "../../components/ImageUser";
import Button from "../../components/material/Button";
import InputField from "../../components/material/InputField";
import HeartIcon from "../../components/customIcons/HeartIcon";

import styles from '../../styles/pages/ProductPage.module.css';

interface ProductProps {
    id: number,
    name: string,
    pricing: number,
    image: string,
    desc?: string
}

export default function ProductPage(): JSX.Element {
    const router = useRouter();
    const api = getApi();
    const zipCodeRef = useRef<string>('');

    const [productData, setProductData] = useState<ProductProps>();
    const [freteValue, setFreteValue] = useState<number>(2);
    const [addedProduct, setAddedProduct] = useState<boolean>(false);
    const [validBrazilZip, setValidBrazilZip] = useState<'valid' | 'invalid' | 'waiting'>('waiting');

    useEffect(() => {
        setProductData(JSON.parse(localStorage.getItem('product') || '{}'));

        let product: ProductProps = JSON.parse(localStorage.getItem('product') || '{}');
        api.get(`/cart/${product.id}`)
            .then((res) => {
                if (res.data) {
                    setAddedProduct(true);
                }
            }).catch((res) => {
                console.log(res)
            })
    }, []);

    function onClickAddToCart(productData: ProductProps): void {
        if (addedProduct)
            router.push('/carrinho');
        else
            addToCart(productData);
    }

    function addToCart(productData: ProductProps): void {
        setAddedProduct(true);
        let listProductsArray = [];
        listProductsArray.push(productData);
        api.post('/cart/', {
            id: productData.id,
            nameProduct: productData.name,
            priceProduct: productData.pricing,
            imageProduct: productData.image
        }).then((res) => {
            console.log(res);
        });
    }

    function isValidBrazilZip(zip: string): void {
        const pattern: RegExp = /^[0-9]{5}-[0-9]{3}$/;

        if (pattern.test(zip))
            setValidBrazilZip('valid')
        else
            setValidBrazilZip('invalid')
    }

    return (
        <>
            <Head>
                <title>Lyncon | {productData?.name}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Lyncon | Nome do Produto" key="title" />
            </Head>

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
                                <div className={styles.colorBallContainer}>
                                    <div className={styles.colorBall}></div>
                                    <div className={styles.colorBall}></div>
                                </div>
                            </div>

                            <div className={styles.sizingOptionsContainer}>
                                <p>p</p>
                                <p>m</p>
                                <p>g</p>
                                <p>gg</p>
                            </div>

                            <p className={styles.productDesc}>{productData?.desc}</p>

                            <div className={styles.freteContainer}>
                                <label>Calcule o frete:</label>
                                <InputField
                                    name='frete'
                                    type='text'
                                    placeholder='00000-000'
                                    onChange={(e) => e.target.value.length >= 9 && isValidBrazilZip(e.target.value)}
                                    onInput={(e) => zipCodeRef.current = (e.target as HTMLInputElement).value}
                                    style={{
                                        padding: '1.3rem',
                                        fontSize: '1.5rem',
                                        borderRadius: '4px',
                                        border: validBrazilZip === 'valid' || validBrazilZip === 'waiting' ? '1px solid #707070' : '1px solid #ff3333',
                                        color: validBrazilZip === 'valid' || validBrazilZip === 'waiting' ? 'inherit' : '#ff3333'
                                    }}
                                />

                                <Button
                                    name='Calcular'
                                    type='button'
                                    onClick={() => isValidBrazilZip(zipCodeRef.current)}
                                    style={{
                                        width: '30%',
                                        height: '4.7rem',
                                        position: 'absolute',
                                        top: '24px',
                                        right: '0'
                                    }}
                                />

                                {
                                    freteValue ?
                                        <div>
                                            <p className={styles.fretePreco}>Entrega Padrão: <i>R$ 0,00</i></p>
                                        </div>
                                        :
                                        <a
                                            href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i>Não sei meu CEP</i>
                                        </a>
                                }

                            </div>

                            <div className={styles.btnContainer}>

                                <Button
                                    name={addedProduct ? 'Adicionado' : 'Adicionar ao carrinho'}
                                    type='button'
                                    onClick={() => onClickAddToCart(productData)}
                                />

                                <Button
                                    name='Favoritar'
                                    type='button'
                                    style={{
                                        backgroundColor: 'var(--Button-Light)',
                                        color: 'var(--Main-Black)'
                                    }}
                                />
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
                            <div className={styles.numberOfLikesContainer}>
                                <HeartIcon />
                                <span className={styles.numberOfLikes}>5</span>
                            </div>
                        </div>
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
                            <div className={styles.numberOfLikesContainer}>
                                <HeartIcon />
                                <span className={styles.numberOfLikes}>5</span>
                            </div>
                        </div>
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
                            <div className={styles.numberOfLikesContainer}>
                                <HeartIcon />
                                <span className={styles.numberOfLikes}>5</span>
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