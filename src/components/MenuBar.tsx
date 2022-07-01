import { useState } from 'react';
import Popup from 'reactjs-popup';

// Icones //
import { BiMenu } from 'react-icons/bi';
import { VscChromeClose } from 'react-icons/vsc';
import { BiUser, BiCart } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { FaRedhat, FaTshirt, FaShoePrints } from 'react-icons/fa';

import styles from '../styles/components/MenuBar.module.css';

export default function MenuBar() {

    const [menuStateOpen, setMenuStateOpen] = useState<boolean>(false);

    return (
        <>
            {/* Mobile Header */}
            <header
                className={menuStateOpen ? styles.homeHeaderContainerMobile : styles.homeHeader}
            >
                <h1>Lyncon</h1>
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
                                <li><a href="#">Pour Moi</a></li>
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
                <h1>Lyncon</h1>

                <nav className={styles.menuNav}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <Popup
                            trigger={<li>
                                <a href="#">
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
                                transition: '.2s ease-in'
                            }}
                        >
                            <div className={styles.subMenuContainer}>

                                <div className={styles.subMenuLink}>
                                    <div className={styles.ballImg} style={{ backgroundColor: 'var(--Menu-Head-Link)' }}>
                                        <FaRedhat size={18} style={{ fill: 'white' }} />
                                    </div>
                                    <p>Cabeça</p>
                                </div>

                                <div className={styles.subMenuLink}>
                                    <div className={styles.ballImg} style={{ backgroundColor: 'var(--Menu-Torso-Link)' }}>
                                        <FaTshirt size={18} style={{ fill: 'white' }} />
                                    </div>
                                    <p>Torso</p>
                                </div>

                                <div className={styles.subMenuLink}>
                                    <div className={styles.ballImg} style={{ backgroundColor: 'var(--Menu-Shoes-Link)' }}>
                                        <FaShoePrints size={18} style={{ fill: 'white' }} />
                                    </div>
                                    <p>Inferiores</p>
                                </div>

                            </div>
                        </Popup>
                        <li><a href="#">Relógios</a></li>
                        <li><a href="#">Inverno</a></li>
                        <li><a href="#">Pour Moi</a></li>
                    </ul>
                </nav>

                <nav className={styles.menuNavBtns}>
                    <ul>
                        <li><BiUser size={25} /></li>
                        <li><BiCart size={25} /></li>
                    </ul>
                </nav>
            </header>
        </>

    )
}