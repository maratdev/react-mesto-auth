import logo from '../images/logo.svg';
import NavBar from "./NavBar";

export default function Header({ loggedIn }) {
    return (
        <header className="header page__header">
            <img
                className="header__logo"
                src={logo}
                alt="логотип Mesto"
            />
            {
                !loggedIn &&   <NavBar/>
            }

        </header>
    )
}