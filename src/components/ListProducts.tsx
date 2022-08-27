import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

// Context //
import { AppContext } from '../contexts/Provider';

// Packages //
import axios from 'axios';

// Icons //
import { FiDatabase, FiFilter, FiSearch } from 'react-icons/fi';
// import { IoIosArrowForward } from 'react-icons/io';
import { BsArrowUpRight } from 'react-icons/bs';
import HeartIcon from './customIcons/HeartIcon';

import styles from '../styles/components/ListProducts.module.css';

export default function ListProducts() {

    const context = useContext(AppContext);
    const router = useRouter();

    let {
        onClickProduct
    } = context;

    const { tipo } = router.query;

    const [productsList, setProductsList] = useState<any[]>();
    const [categories, setCategories] = useState<any[]>([
        { id: 1, category: 'Gorros', selected: false },
        { id: 2, category: 'Camisas', selected: false },
        { id: 3, category: 'Camisetas', selected: true },
        { id: 4, category: 'Casacos', selected: false },
        { id: 5, category: 'Polo', selected: false },
        { id: 6, category: 'Calças', selected: false },
        { id: 7, category: 'Sapatos', selected: false }
    ])

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

    function getProducts(category: string) {
        axios.get(`http://localhost:4500/products/${category.toLowerCase()}`)
            .then((res) => {
                setProductsList(res.data.options);
            }).catch((res) => {
                setProductsList([]);
                console.log(`Error: ${res}`);
            })
    }

    function onClickCategory(categoryParam: string) {

        let categoriesTemp: any[] = [...categories];

        const posicao: number = categoriesTemp.findIndex(item => item.category === categoryParam);

        categoriesTemp.forEach((data) => {
            if (data.id === posicao + 1) {
                data.selected = !data.selected
            } else {
                data.selected = false;
            }
        })

        setCategories(categoriesTemp);
        getProducts(categoryParam)
    }

    return (
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
                    {/* <IoIosArrowForward size={13} /> */}
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
                                        <img src={product.image} onClick={() => onClickProduct(product)} />
                                        <h2>{product.name}</h2>
                                        <h3>R$ {product.pricing.toString().replace('.', ',')}</h3>
                                        <HeartIcon />
                                    </div>

                                ))}
                            </div>

                        </>
                        :
                        <h1>Não foram encontrados produtos na categoria escolhida.</h1>
                }

            </div>
        </>
    )
}