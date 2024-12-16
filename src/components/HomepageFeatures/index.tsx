import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Grafana',
    Svg: require('@site/static/img/grafana-icon.svg').default,
    description: (
      <>
        Guia para configurar Grafana y el sistema de acceso al mismo.
      </>
    ),
  },
  {
    title: 'Istio',
    Svg: require('@site/static/img/istio-icon.svg').default,
    description: (
      <>
       Instrucciones para la instalación y configuración de Istio en el cluster.
      </>
    ),
  },
  {
    title: 'Bases de datos',
    Svg: require('@site/static/img/database.svg').default,
    description: (
      <>
        Recomendaciones para la configuración de bases de datos en el cluster.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
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

export default function HomepageFeatures(): JSX.Element {
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
}
