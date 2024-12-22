import clsx from 'clsx';
import Heading from '@theme/Heading';
import ReactLogo from '@site/static/img/react.jpg';
import JavaLogo from '@site/static/img/java-logo.png';
import AndroidLogo from '@site/static/img/android-logo.png';
import styles from './styles.module.css';


const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

/*export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}*/


const projects = [
  {
    id: 1,
    category: '2º DAM',
    title: 'Acceso a Datos',
    description: 'Gestión de ficheros, bases de datos relacionales y documentales desde Java.',
    imageUrl: JavaLogo,
    link: '#',
  },
  {
    id: 2,
    category: '2º DAM',
    title: 'Programación Multimedia y Dispositivos Móviles',
    description: 'Desarrollo de aplicaciones Android con Android Studio y Java.',
    imageUrl: AndroidLogo, // Reemplaza con el enlace de la imagen
    link: '#',
  },
  {
    id: 3,
    category: '1º DAM/DAW',
    title: 'Bases de datos',
    description: 'Diseño conceptual, lógico y físico de bases de datos relacionales.',
    imageUrl: ReactLogo, // Reemplaza con el enlace de la imagen
    link: '#',
  },
];

const ProjectCard = ({ category, title, description, imageUrl, link }) => {
  const handleCardClick = () => {
    window.open(link, "_blank");
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