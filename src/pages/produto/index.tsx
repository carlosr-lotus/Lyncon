import { useEffect, useState, useRef, LegacyRef, createRef } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';

// Packages //
import { useForm } from "react-hook-form";

// Context //
import { getApi } from "../../utils/api";

// Components //
import MenuBar from "../../components/MenuBar";
import ImageUser from "../../components/ImageUser";
import Button from "../../components/material/Button";
import InputField from "../../components/material/InputField";
import HeartIcon from "../../components/customIcons/HeartIcon";

// Types //
import { ProductProps, ColorType, SizeType } from "../../types/pages/produto";

import styles from '../../styles/pages/ProductPage.module.css';

interface FormCep {
    cep: string
}

export default function ProductPage(): JSX.Element {
    const router = useRouter();
    const api = getApi();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormCep>();

    const [productData, setProductData] = useState<ProductProps>();
    const [shippingValue, setShippingValue] = useState<number | undefined>();
    const [addedProduct, setAddedProduct] = useState<boolean>(false);
    const [sizeSelected, setSizeSelected] = useState<SizeType>();
    const [colorSelected, setColorSelected] = useState<ColorType>();
    const [validBrazilZip, setValidBrazilZip] = useState<'valid' | 'invalid' | 'waiting'>('waiting');
    const [checkupProduct, setCheckupProduct] = useState<'colorMissing' | 'sizeMissing' | 'shippingMissing' | undefined>(undefined);

    useEffect(() => {
        setProductData(JSON.parse(localStorage.getItem('product') || '{}'));

        let product: ProductProps = JSON.parse(localStorage.getItem('product') || '{}');
        api.get(`/cart/${product.id}`)
            .then((res) => {
                if (res.data) {
                    setAddedProduct(true);
                };
            }).catch((res) => {
                console.log(res);
            });
    }, []);

    function onClickAddToCart(productData: ProductProps): void {
        setCheckupProduct(undefined);

        if (addedProduct)
            router.push('/carrinho');
        else
            addToCart(productData);
    };

    function checkProductOptions(productData: ProductProps): void {
        if (!colorSelected)
            setCheckupProduct('colorMissing');
        else if (!sizeSelected)
            setCheckupProduct('sizeMissing');
        else
            onClickAddToCart(productData);
    };

    function addToCart(productData: ProductProps): void {
        setAddedProduct(true);

        api.post('/cart/', {
            id: productData.id,
            nameProduct: productData.name,
            priceProduct: productData.pricing,
            colorName: colorSelected?.colorName,
            sizeProduct: sizeSelected?.size,
            shippingRate: shippingValue,
            imageProduct: productData.image,
            totalAmount: 1
        }).then((res) => {
            console.log(res);
        });
    };

    function isValidBrazilZip({ cep }: FormCep): void {
        const pattern: RegExp = /^[0-9]{5}-[0-9]{3}$/;

        if (pattern.test(cep)) {
            setValidBrazilZip('valid');
            setShippingValue(5.0);
        } else {
            setValidBrazilZip('invalid');
            setShippingValue(undefined);
        };
    };

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

                                <h2>
                                    {
                                        productData.pricing
                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                    }
                                </h2>
                                <span>
                                    ou até 12x de {
                                        (productData.pricing / 12)
                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                    }
                                </span>
                            </div>

                            <div className={styles.colorOptions}>
                                <p>
                                    {
                                        colorSelected ?
                                            `Cor: 
                                                ${colorSelected.colorName
                                                .charAt(0)
                                                .toUpperCase()
                                            +
                                            colorSelected.colorName
                                                .slice(1)
                                            }`
                                            :
                                            'Selecione uma cor...'
                                    }
                                </p>
                                <div className={styles.colorBallContainer}>
                                    {
                                        productData.colors.map((data) => (
                                            <div
                                                className={styles.colorBall}
                                                key={data.id}
                                                style={{
                                                    backgroundColor: data.colorHex,
                                                    border: colorSelected?.id === data.id ? '2px solid var(--Outline-Color)' : '1px solid var(--Outline-Color)'
                                                }}
                                                onClick={() => setColorSelected(data)}
                                            ></div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className={styles.sizingOptionsContainer}>
                                {
                                    productData.sizes.map((data) => (
                                        <p
                                            key={data.id}
                                            className={data.isAvailable ? styles.sizeOption : styles.sizeOptionNotAvailable}
                                            style={{
                                                backgroundColor: data.id === sizeSelected?.id ? 'var(--Main-Black)' : 'inherit',
                                                color: data.id === sizeSelected?.id ? 'var(--Main-White)' : 'inherit'
                                            }}
                                            onClick={() => data.isAvailable && setSizeSelected(data)}
                                        >
                                            {data.size}
                                        </p>
                                    ))
                                }
                            </div>

                            <p className={styles.productDesc}>{productData?.desc}</p>

                            <form className={styles.shippingContainer} onSubmit={handleSubmit(isValidBrazilZip)}>
                                <label>Calcule o frete:</label>
                                <InputField
                                    name='cep'
                                    register={register}
                                    type='text'
                                    placeholder='00000-000'
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
                                    type='submit'
                                    style={{
                                        width: '30%',
                                        height: '4.7rem',
                                        position: 'absolute',
                                        top: '24px',
                                        right: '0'
                                    }}
                                />

                                {
                                    shippingValue ?
                                        <div>
                                            <p className={styles.shippingRate}>
                                                Entrega Padrão:
                                                <i>
                                                    {
                                                        shippingValue
                                                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                    }
                                                </i>
                                            </p>
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

                            </form>
                            {
                                checkupProduct === 'colorMissing' ?
                                    <p style={{
                                        color: 'red',
                                        fontSize: '1.5rem'
                                    }}>Por favor, selecione uma cor primeiro.</p>
                                    :
                                    checkupProduct === 'sizeMissing' ?
                                        <p style={{
                                            color: 'red',
                                            fontSize: '1.5rem'
                                        }}>Por favor, selecione um tamanho primeiro.</p>
                                        :
                                        checkupProduct === 'shippingMissing' &&
                                        <p style={{
                                            color: 'red',
                                            fontSize: '1.5rem'
                                        }}>Por favor, insira um CEP válido para podermos calcular o valor do frete.</p>
                            }

                            <div className={styles.btnContainer}>

                                <Button
                                    name={addedProduct ? 'Adicionado' : 'Adicionar ao carrinho'}
                                    type='button'
                                    onClick={() => {
                                        addedProduct ?
                                            router.push('/carrinho')
                                            :
                                            checkProductOptions(productData)
                                    }}
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
                            <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum qui modi sed aut neque harum ducimus ab vel cumque aliquam, dolorem recusandae.”</p>
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
                            <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum qui modi sed aut neque harum ducimus ab vel cumque aliquam, dolorem recusandae. Corrupti doloribus ratione culpa explicabo maxime aliquid obcaecati!"</p>
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
                            <p>"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta veniam illum ad magni, inventore sapiente deleniti iste soluta amet perferendis odit architecto temporibus officia commodi quasi nulla minima pariatur mollitia.
                                Obcaecati nulla, voluptas nam recusandae accusantium provident nihil quisquam. Inventore quis dolores non aperiam error iure ab omnis dolorem? Explicabo corrupti modi, error amet voluptatem commodi atque eum accusantium laborum!"</p>
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