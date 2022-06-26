// import type { NextPage } from 'next';
// import Image from 'next/image';

// Native
import Head from 'next/head';

// Components //
import MenuBar from '../components/MenuBar';

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

      </main>
    </>
  )
}
