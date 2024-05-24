import { Link } from 'react-router-dom';
import './authorization.css';

export const Authorization = () => {
    return (
        <div className='authorization'>
            <h2 className='login'>Вход</h2>
            <div className='autho-form'>
                <form className='log-form'>
                    <input className='unput-form' placeholder='Login' type='text'></input>
                    <input className='unput-form' placeholder='Password' type='password'></input>
                    <button className='log__in_button' type='submit'>Войти</button>
                </form>
            </div>
            <Link className='registration' to='/register'>Регистрация</Link>
        </div>
    );
};
