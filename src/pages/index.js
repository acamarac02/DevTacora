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
    <header className="bg-gray-50">
      {/* Hero */}
      <section className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-lg">
              <Terminal className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Dev<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tacora</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tu biblioteca personal de apuntes de desarrollo. Conocimiento organizado, accesible y siempre actualizado para tu crecimiento profesional.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
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
      <HomepageFooter />
    </Layout>
  );
}


function HomepageFooter() {
  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Construyendo conocimiento, línea por línea
        </h3>
        <p className="text-gray-600 leading-relaxed">
          © {new Date().getFullYear()} Alicia Cámara Casares - Contenido bajo licencia{' '}
              <a 
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                CC BY-NC-SA 4.0
              </a>.
        </p>
      </div>
    </section>
  )
}