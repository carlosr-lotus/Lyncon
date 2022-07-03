// import type { NextPage } from 'next';
// import Image from 'next/image';

// Native
import Head from 'next/head';

// Components //
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

// Icons //
import { BsSnow } from 'react-icons/bs';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

import styles from '../styles/Home.module.css';

export default function Home() {

  return (
    <>
      <Head>
        <title>Lyncon | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Lyncon | Home" key="title" />
      </Head>

      <MenuBar />

      <main>

        <div className={styles.sectionContainerGlobal}>

          <section className={styles.sectionContainer}>
            <div className={styles.sectionTitleBtn}>
              <div className={styles.sectionTitle}>
                <h1>Temporada Inverno</h1>
                <BsSnow size={25} />
              </div>
              <button>Saiba mais</button>
            </div>

            <img className={styles.imgSection} src='/images/index/promocao-inverno.jpg' />
          </section>

          <section className={styles.sectionContainer}>
            <img className={styles.imgSection} src='/images/index/vestimentas-photo.jpg' />

            <div className={styles.sectionTitleBtn}>
              <h1>Chique e confortável</h1>
              <p>Clique abaixo para conhecer as vestimentas Lyncon.</p>
              <button>Explorar</button>
            </div>
          </section>

          <section className={styles.sectionContainer}>
            <div className={styles.sectionTitleBtn}>
              <h1>Relógios Lyncon</h1>
              <p>Para os corajosos exploradores e amantes do chique.</p>
              <button>Explorar</button>
            </div>

            <img className={styles.imgSection} src='/images/index/relogios-photo.jpg' loading='lazy' />
          </section>

        </div>

        <div className={styles.aboutUsContainer}>
          <h2>Empresa com origem no Rio de Janeiro</h2>
          <i>"Padrão de qualidade em tudo que fazemos" - José Lyncon <br /> &#40;Fundador da Lyncon&#41;</i>

          <div className={styles.aboutUsPhotos}>
            <img src='/images/index/worker-1.jpg' />
            <img src='/images/index/worker-2.jpg' />
            <img src='/images/index/worker-3.jpg' />
          </div>
        </div>

        <div className={styles.websiteAuthorContainer}>
          <div>
            <p>Criado por</p>
            <h1>Carlos Lotus</h1>
          </div>

          <div className={styles.authorSocialMediaContainer}>
            <a
              href="https://github.com/carlosr-lotus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub size={28} />
            </a>

            <a
              href="https://www.linkedin.com/in/carlos-roberto-santos-filho-3995821b9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin size={28} />
            </a>
          </div>
        </div>


      </main>

      <Footer />
    </>
  )
}
