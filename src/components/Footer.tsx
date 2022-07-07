// Icons //
import { AiOutlineInstagram, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';

import styles from '../styles/components/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <h1>Lyncon <span>&copy; Copyright</span></h1>

            <p>Fale conosco</p>
            <p>
                Jacarépagua - RJ <br />
                CEP: 00110-00 <br />
                Brasil
            </p>

            <div className={styles.footerSocialMediaContainer}>
                <AiOutlineInstagram size={30} />
                <AiFillLinkedin size={30} />
                <AiOutlineTwitter size={30} />
            </div>
        </footer>
    )
}