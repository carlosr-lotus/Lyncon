import { useState } from 'react';

// Icones //
import { BiMenu } from 'react-icons/bi';
import { VscChromeClose } from 'react-icons/vsc';
import { BiUser, BiCart } from 'react-icons/bi';

import styles from '../styles/components/MenuBar.module.css';

export default function MenuBar() {

    const [menuStateOpen, setMenuStateOpen] = useState<boolean>(false);

    return (
        <>
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
        </>

    )
}