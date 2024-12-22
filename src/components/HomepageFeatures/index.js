import clsx from 'clsx';
import Heading from '@theme/Heading';
import ReactLogo from '@site/static/img/react.jpg';
import JavaLogo from '@site/static/img/java-logo.png';
import AndroidLogo from '@site/static/img/android-logo.png';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ProjectCard = ({ category, title, description, imageUrl, link }) => {
  const handleCardClick = () => {
    window.location.href = link;
  };

  return (
    <div className={clsx(styles.card)} onClick={handleCardClick}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h4 className={styles.category}>{category}</h4>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <a href={link} className={styles.link}>
            <span>Apuntes</span>
            <span className={styles.arrow}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};


export default function ProjectList() {
  const { siteConfig } = useDocusaurusContext();
  const projects = [
    {
      id: 1,
      category: '2º DAM',
      title: 'Acceso a Datos',
      description: 'Gestión de ficheros, bases de datos relacionales y documentales desde Java.',
      imageUrl: JavaLogo,
      link: `${siteConfig.baseUrl}docs/ada/`,
    },
    {
      id: 2,
      category: '2º DAM',
      title: 'Programación Multimedia y Dispositivos Móviles',
      description: 'Desarrollo de aplicaciones Android con Android Studio y Java.',
      imageUrl: AndroidLogo, // Reemplaza con el enlace de la imagen
      link: `${siteConfig.baseUrl}docs/pmdm/`,
    }
  ];

  return (
    <div className={styles.parentContainer}>
      <h3 className={styles.courseDescription}>
        DESARROLLO DE APLICACIONES MULTIPLATAFORMA
      </h3>
      <div className={clsx(styles.container)}>
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}