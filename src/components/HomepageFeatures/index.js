import clsx from 'clsx';
import JavaLogo from '@site/static/img/java-logo.png';
import AndroidLogo from '@site/static/img/android-logo.png';
import styles from './styles.module.css';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { 
  Code2, Database, Smartphone, Brain, Layers, ArrowRight, BookOpen,
} from 'lucide-react';

// ===== Componente de tarjeta de asignatura =====
const SubjectCard = ({ subject }) => {
  const handleCardClick = () => {
    window.location.href = subject.link;
  };

  return (
    <div onClick={handleCardClick} className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${subject.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className="flex items-start justify-between mb-6">
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${subject.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
          {subject.icon}
        </div>
        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
          {subject.code}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
        {subject.name}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {subject.description}
      </p>
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
          <BookOpen className="w-4 h-4 mr-2" />
          Explorar contenido
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};


// ===== Lista de cursos y asignaturas =====
const AcademicTimeline = ({ academicData }) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
      {academicData.map((yearData, i) => (
        <div key={i} className="mb-20">
          {/* Cabecera del año */}
          <div className="flex items-center mb-12">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-900">{yearData.year}</h2>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    yearData.label === 'Curso Actual'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {yearData.label}
                </span>
              </div>
              <div className="h-1 bg-gradient-to-r from-gray-200 to-transparent rounded-full mt-4 max-w-md"></div>
            </div>
          </div>

          {/* Tarjetas de asignaturas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yearData.subjects.map((subject, idx) => (
              <SubjectCard key={idx} subject={subject} />
            ))}
          </div>
        </div>
      ))}
      </div>
    </section>
  );
};

// ===== Página principal =====
export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const academicData = [
    {
      year: '2025-2026',
      label: 'Curso Actual',
      subjects: [
        {
          name: 'Programación de Inteligencia Artificial',
          code: 'CEIABD',
          icon: <Brain className="w-7 h-7" />,
          gradient: 'from-purple-500 to-pink-500',
          description: 'Algoritmos de ML, redes neuronales y procesamiento de datos',
          link: `${siteConfig.baseUrl}docs/ada/`
        },
        {
          name: 'Programación',
          code: '1ºDAM',
          icon: <Code2 className="w-7 h-7" />,
          gradient: 'from-blue-500 to-cyan-500',
          description: 'Fundamentos de programación y estructuras de datos',
          link: `${siteConfig.baseUrl}docs/ada/`
        },
        {
          name: 'PMDM',
          code: '2ºDAM',
          icon: <Smartphone className="w-7 h-7" />,
          gradient: 'from-green-500 to-emerald-500',
          description: 'Desarrollo de aplicaciones móviles multiplataforma',
          link: `${siteConfig.baseUrl}docs/ada/`
        },
      ],
    },
    {
      year: '2024-2025',
      label: 'Curso Completado',
      subjects: [
        {
          name: 'Acceso a Datos',
          code: '2ºDAM',
          icon: <Database className="w-7 h-7" />,
          gradient: 'from-indigo-500 to-purple-500',
          description: 'Persistencia, ORM y gestión de bases de datos',
          link: `${siteConfig.baseUrl}docs/ada/`
        },
        {
          name: 'Programación Multimedia y Dispositivos Móviles',
          code: '2ºDAM',
          icon: <Layers className="w-7 h-7" />,
          gradient: 'from-orange-500 to-red-500',
          description: 'Interfaces multimedia y desarrollo móvil avanzado',
          link: `${siteConfig.baseUrl}docs/pmdm/`
        },
      ],
    },
  ];

  return (
    <AcademicTimeline academicData={academicData} />
  );
}