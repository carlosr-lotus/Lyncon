// import type { NextPage } from 'next';
// import Image from 'next/image';

// Native
import Head from 'next/head';

// Components //
import MenuBar from '../components/MenuBar';

// Icons //
import { BsSnow } from 'react-icons/bs';

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

        <section className={styles.aboutUsSection}>
          <h2>Empresa com origem no Rio de Janeiro</h2>
          <i>"Padrão de qualidade em tudo que fazemos" - José Lyncon <br /> (Fundador da Lyncon)</i>
        </section>

      </main>
    </>
  )
}
