import { useState } from 'react';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';

// Icones //
import { BiMenu } from 'react-icons/bi';
import { VscChromeClose } from 'react-icons/vsc';
import { BiUser, BiCart } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRedhat, FaTshirt, FaShoePrints } from 'react-icons/fa';

import styles from '../styles/components/MenuBar.module.css';

export default function MenuBar(): JSX.Element {

    const router = useRouter();
    const [menuStateOpen, setMenuStateOpen] = useState<boolean>(false);

    return (
        <>
            {/* Mobile Header */}
            <header
                className={menuStateOpen ? styles.homeHeaderContainerMobile : styles.homeHeader}
            >
                <a href="/"><h1>Lyncon</h1></a>
                {menuStateOpen ?
                    <>
                        <VscChromeClose
                            style={{ fill: 'var(--Main-White)' }}
                            size={30}
                            onClick={() => setMenuStateOpen(!menuStateOpen)}
                        />

                        <nav className={styles.menuNav}>
                            <ul>
                                <li><a href="#">Vestimentas</a></li>
                                <li><a href="#">Relógios</a></li>
                                <li><a href="#">Inverno</a></li>
                            </ul>
                        </nav>

                        <nav className={styles.menuNavBtns}>
                            <ul>
                                <li><BiUser size={25} /></li>
                                <li><BiCart size={25} /></li>
                            </ul>
                        </nav>
                    </>
                    :
                    <BiMenu
                        size={30}
                        onClick={() => setMenuStateOpen(!menuStateOpen)}
                    />
                }
            </header>

            {/* Default Header */}
            <header
                className={styles.homeHeaderContainer}
            >
                <a href="/"><h1>Lyncon</h1></a>

                <nav className={styles.menuNav}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <Popup
                            trigger={<li>
                                <a href="/vestimentas">
                                    Vestimentas
                                    <IoIosArrowDown size={14} />
                                </a>
                            </li>}
                            position="bottom center"
                            on="hover"
                            closeOnDocumentClick
                            contentStyle={{
                                width: '23rem',
                                padding: '1rem 1.2rem',
                                borderRadius: '.5rem',
                                boxShadow: '0px 2px 5px 0px var(--Box-Shadow-Default)',
                                transition: '.2s ease-in',
                                backgroundColor: '#fff'
                            }}
                        >
                            <div className={styles.subMenuContainer}>

                                <a href="https://google.com" className={styles.subMenuLink}>
                                    <div className={styles.ballImg} style={{ backgroundColor: 'var(--Menu-Head-Link)' }}>
                                        <FaRedhat size={18} style={{ fill: 'white' }} />
                                    </div>
                                    <p>Acessórios</p>
                                </a>

                                <a
                                    onClick={() =>
                                        router.push({
                                            pathname: '/vestimentas',
                                            query: { tipo: 'torso' }
                                        })}
                                    className={styles.subMenuLink}>
                                    <div
                                        className={styles.ballImg}
                                        style={{ backgroundColor: 'var(--Menu-Torso-Link)' }}>
                                        <FaTshirt size={18} style={{ fill: 'white' }} />
                                    </div>
                                    <p>Roupas</p>
                                </a>

                                <div className={styles.subMenuLink}>
                                    <div className={styles.ballImg} style={{ backgroundColor: 'var(--Menu-Shoes-Link)' }}>
                                        <FaShoePrints size={18} style={{ fill: 'white' }} />
                                    </div>
                                    <p>Sapatos</p>
                                </div>

                            </div>
                        </Popup>
                        <li><a href="#">Relógios</a></li>
                        <li><a href="#">Inverno</a></li>
                    </ul>
                </nav>

                <nav className={styles.menuNavBtns}>
                    <ul>
                        <li><BiUser size={25} /></li>
                        <li
                            onClick={() =>
                                router.push({
                                    pathname: '/carrinho'
                                })}
                        >
                            <span>1</span>
                            <BiCart size={25} />
                        </li>
                    </ul>
                </nav>
            </header>
        </>

    )
}