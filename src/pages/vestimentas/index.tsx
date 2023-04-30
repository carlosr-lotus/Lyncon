import { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';

// Packages | Utils //
import { AxiosInstance } from 'axios';
import { getApi } from '../../utils/api';

// Components //
import MenuBar from "../../components/MenuBar"

// Icons //
import { FiFilter, FiSearch } from 'react-icons/fi';
import { BsArrowUpRight } from 'react-icons/bs';
import HeartIcon from '../../components/customIcons/HeartIcon';

import styles from '../../styles/pages/Vestimentas.module.css';

export default function VestimentasPage(): JSX.Element {

    const router: NextRouter = useRouter();
    const api: AxiosInstance = getApi();

    const { tipo } = router.query;

    const [productsList, setProductsList] = useState<any[]>();
    const [categories, setCategories] = useState<any[]>([
        { id: 1, category: 'Acessórios', selected: false },
        { id: 2, category: 'Camisas', selected: false },
        { id: 3, category: 'Camisetas', selected: true },
        { id: 4, category: 'Casacos', selected: false },
        { id: 5, category: 'Polo', selected: false },
        { id: 6, category: 'Calças', selected: false },
        { id: 7, category: 'Sapatos', selected: false }
    ]);

    useEffect(() => {
        console.log(`Query: ${tipo}`)
        switch (tipo) {
            case 'cabeça':
                getProducts('gorros');
                break;
            case 'torso':
                getProducts('camisetas');
                break;
            case 'inferiores':
                getProducts('sapatos');
                break;
            default:
                getProducts('camisetas');
                break;
        }
    }, []);

    function getProducts(category: string): void {
        api.get(`/products/${category.toLowerCase()}`)
            .then((res) => {
                setProductsList(res.data.options);
            }).catch((res) => {
                setProductsList([]);
            })
    }

    function onClickCategory(categoryParam: string): void {

        let categoriesTemp: any[] = [...categories];

        const position: number = categoriesTemp.findIndex(item => item.category === categoryParam);

        categoriesTemp.forEach((data) => {
            if (data.id === position + 1) {
                data.selected = !data.selected
            } else {
                data.selected = false;
            }
        })

        setCategories(categoriesTemp);
        getProducts(categoryParam)
    }

    function onClickProduct(product: object): void {
        // setProductDetails(product);
        localStorage.setItem('product', JSON.stringify(product));

        router.push('/produto');
    };

    return (
        <>
            <Head>
                <title>Lyncon | Vestimentas</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Lyncon | Vestimentas" key="title" />
            </Head>

            <MenuBar />

            <>
                <div className={styles.filterBarContainer}>
                    <div>
                        <FiFilter size={23} />
                    </div>
                    <div className={styles.filterOptions}>
                        {categories &&
                            categories.map((data) => (
                                <div key={data.id}>
                                    <p
                                        style={{
                                            opacity: data.selected ? 1 : 0.3
                                        }}
                                        onClick={() => onClickCategory(data.category)}
                                    >{data.category}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <FiSearch size={23} />
                    </div>

                </div>

                <div className={styles.globalContainerListProducts}>

                    {
                        productsList && productsList.length >= 1 ?
                            <>
                                <div className={styles.amountProductsFound}>
                                    <span>{productsList.length} itens encontrados</span>
                                    <BsArrowUpRight />
                                </div>

                                <div className={styles.containerListProducts}>
                                    {productsList.map((product) => (

                                        <div key={product.id} className={styles.productContainer}>
                                            <img
                                                src={product.image}
                                                onClick={() => onClickProduct(product)}
                                            />
                                            <h2>{product.name}</h2>
                                            <h3>R$ {product.pricing.toString().replace('.', ',')}</h3>
                                            <HeartIcon />
                                        </div>

                                    ))}
                                </div>

                            </>
                            :
                            <h1 style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>Não foram encontrados produtos na categoria escolhida.</h1>
                    }

                </div>
            </>
        </>
    )
}