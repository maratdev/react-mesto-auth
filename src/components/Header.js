import logo from '../images/logo.svg';
export default function Header(props) {
    return (
        <header className="header page__header">
            <img
                className="header__logo"
                src={logo}
                alt="логотип Mesto"
            />
        </header>
    )
}