import './register.css'

export const Register = () => {
    return(
    <div className='register'>
        <h2 className='reg-logo'>Регистрация</h2>
        <div className="reg-wrap">
        <form className="reg-form">
            <div className='unputs-wrap'>
                <input className='unput-form' placeholder='Login' type='text'></input>
                <input className='unput-form' placeholder='Password' type='password'></input>
                <input className='unput-form' placeholder='Enter password' type='password'></input>
            </div>
                <button className="reg-btn" type='submit'>Зарегестрироватьса</button>
            </form>
        </div>
    </div>
    )
}