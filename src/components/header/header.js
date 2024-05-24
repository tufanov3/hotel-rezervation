import { Link } from 'react-router-dom'
import './header.css'

export const Header = () => {
    return(
        <div className='header'>
            <Link to='/hotel' className='menu'>Меню</Link>
            <div className='head-logo-menu'>Бронирование номеров и <br></br> резервация отелей </div>
            <div className='head-login'>
                <Link className='authorization-btn' to='/authorization'>Вход</Link>
            </div>
        </div>
    )
}