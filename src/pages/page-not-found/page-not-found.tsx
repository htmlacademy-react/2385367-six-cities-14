import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';
import styles from './page-not-found.module.css';

function PageNotFound(): JSX.Element {
  return (
    <div className={ `page ${ styles.pageNotFound }` }>
      <Helmet>
        <title>{ '6 cities - Not Found' }</title>
      </Helmet>
      <h1 className={ styles.title }>404 Not Found</h1>
      <p className={ styles.text }>
        Страница не найдена.
        <br/>
        <Link to={ AppRoute.Main } className={ styles.link }>
          Нажмите
        </Link>
        &nbsp;чтобы перейти на главную.
      </p>
    </div>
  );
}

export default PageNotFound;
