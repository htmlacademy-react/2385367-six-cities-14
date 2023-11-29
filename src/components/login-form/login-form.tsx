import { useRef, FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { toast } from 'react-toastify';

const DELAY_CLOSE_MESSAGE = 300;

function LoginForm() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d).+$/;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) =>{
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!regexEmail.test(loginRef.current.value)) {
        toast.warn('Введите валидный Email', {autoClose: DELAY_CLOSE_MESSAGE});
        return;
      }

      if (!regexPassword.test(passwordRef.current.value)) {
        toast.warn('Введите валидный пароль', {autoClose: DELAY_CLOSE_MESSAGE});
        return;
      }

      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            ref={loginRef}
            className="login__input form__input"
            type="text"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            ref={passwordRef}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}

export default LoginForm;
