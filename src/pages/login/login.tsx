import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-data/selectors';
import Header from '../../components/header/header';
import { AuthorizationStatus, AppRoute } from '../../const';
import { getRandomCity } from '../../utils/random-city';
import { CityMap } from '../../const';
import { setActiveCity } from '../../store/offers-data/offers-data';
import LoginForm from '../../components/login-form/login-form';

function Login(): JSX.Element {

  const authStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const randomCity = getRandomCity(CityMap);

  const handleButtonRandomClick = () => {
    dispatch(setActiveCity(randomCity));
    navigate(AppRoute.Main);
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>{ '6 cities - Login' }</title>
      </Helmet>
      <Header login/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                type='button'
                className="locations__item-link"
                onClick={handleButtonRandomClick}
              >
                <span>{randomCity.name}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
