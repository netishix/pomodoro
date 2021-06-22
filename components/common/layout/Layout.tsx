import React from 'react';
import Head from "next/head";
import styles from './Layout.module.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';

interface LayoutProps {
  children: {}
}

export default function Layout(props: LayoutProps) {
  const children = props.children;
  return (
    <div id={styles.mainWrapper}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <div id={styles.header}>
        <Header />
      </div>
      <div id={styles.content}>
        {children}
      </div>
      <div id={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
