import HeartIcon from './customIcons/HeartIcon';

import { AiOutlineHeart } from 'react-icons/ai';
import { BsArrowUpRight } from 'react-icons/bs';

import styles from '../styles/components/ListProducts.module.css';

export default function ListProducts() {
    return (
        <div className={styles.globalContainerListProducts}>

            <div className={styles.amountProductsFound}>
                <span>2 itens encontrados</span>
                <BsArrowUpRight />
            </div>

            <div className={styles.containerListProducts}>
                <div className={styles.productContainer}>
                    <img src='/images/vestimentas/camiseta-lyncon-gola-v.jpg' />
                    <h2>Camiseta Lyncon Gola V</h2>
                    <h3>R$ 79,99</h3>
                    {/* <AiOutlineHeart size={20} /> */}
                    <HeartIcon />
                </div>

                <div className={styles.productContainer}>
                    <img src='/images/vestimentas/camiseta-lyncon-sport.jpg' />
                    <h2>Camiseta Lyncon Sport</h2>
                    <h3>R$ 89,99</h3>
                    <HeartIcon />
                </div>
            </div>
        </div>
    )
}