import { Link } from 'react-router-dom';

function PageNotFound(): JSX.Element {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to='/'>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <p className='w3-panel w3-pale-yellow w3-topbar w3-bottombar w3-border-yellow'>
          <b>Страница не найдена. <br/><em style= {{ color: 'red' }}>Нажмите</em> чтобы перейти на главную.</b>
        </p>
      </Link>
    </>
  );
}

export default PageNotFound;
