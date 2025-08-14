import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import {
  Code2, Database, Smartphone, Brain, Terminal, Layers,
  ArrowRight, BookOpen, Clock
} from 'lucide-react';

function HomepageHeader() {
  return (
    /*<header className={clsx('hero hero--primary', styles.heroContainer)}>
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
    </header>*/
    <header className="bg-[var(--ifm-header-background-color)]">
      {/* Hero */}
      <section className="relative bg-[var(--ifm-card-background-color)]">
        <div className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom right, 
            var(--color-hero-gradient-from), 
            var(--color-hero-gradient-via), 
            var(--color-hero-gradient-to))`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-lg">
              <Terminal className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold [color:var(--color-text-title)] mb-6">
              Dev<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tacora</span>
            </h1>
            <p className="text-xl [color:var(--color-text-description)] mb-8 leading-relaxed">
              Apuntes de los ciclos de Formación Profesional de Informática y Comunicaciones
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm [color:var(--color-text-description)]">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                3 módulos activos
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                2 módulos completados
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Actualizado regularmente
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );

}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Inicio`}
      description="Apuntes de los ciclos de FP de Informática y Comunicaciones">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}