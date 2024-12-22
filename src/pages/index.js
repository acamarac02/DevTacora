import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const Properties = {
    authorName: 'ALICIA CÁMARA CASARES',
    Svg: require('@site/static/img/proud_coder_icon.svg').default
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroContainer)}>
      <div className={styles.heroText}>
        <h1 className={styles.titleText}>
          <span className={styles.highlight}>Apuntes</span> de los ciclos
          <br /> de <span className={styles.highlight}>Informática y Comunicaciones</span>
        </h1>
        <h2 className={`hero__subtitle ${styles.subtitleConfig}`}>{Properties.authorName}</h2>
      </div>
      <div className="codeImage">
        <Properties.Svg className={styles.featureSvg} role="img" />
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
