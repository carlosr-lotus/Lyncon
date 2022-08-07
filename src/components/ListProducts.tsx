import { useEffect, useState } from 'react';

// Packages //
import update from 'immutability-helper';
import axios from 'axios';

// Icons //
import { FiDatabase, FiFilter, FiSearch } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { BsArrowUpRight } from 'react-icons/bs';
import HeartIcon from './customIcons/HeartIcon';

import styles from '../styles/components/ListProducts.module.css';

export default function ListProducts() {

    const [productsList, setProductsList] = useState<any[]>();
    const [categories, setCategories] = useState<any[]>([
        { codigo: 1, category: 'Gorros', selecionado: false },
        { codigo: 2, category: 'Camisas', selecionado: false },
        { codigo: 3, category: 'Camisetas', selecionado: true },
        { codigo: 4, category: 'Casacos', selecionado: false },
        { codigo: 5, category: 'Polo', selecionado: false },
        { codigo: 6, category: 'Calças', selecionado: false },
        { codigo: 7, category: 'Sapatos', selecionado: false }
    ])

    useEffect(() => {
        getProducts('camisetas');
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

        let categoriesTemp = [...categories];

        const posicao = categoriesTemp.findIndex(item => item.category === categoryParam);

        categoriesTemp.forEach((data) => {
            if (data.codigo === posicao + 1) {
                data.selecionado = !data.selecionado
            } else {
                data.selecionado = false;
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
                            <div key={data.codigo}>
                                <p
                                    style={{
                                        opacity: data.selecionado ? 1 : 0.3
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
                                        <img src={product.image} />
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