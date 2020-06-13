import React from 'react';

import { Link } from 'react-router-dom';

import Logo from '../img/GroceryouLogo.png';

import './NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <nav>
                <Link to="/"><img src={Logo} alt="Groceryou Logo" /></Link>
                <Link to="/shop">Shop</Link>
                <Link to="/shopper">Become a courier</Link>
                <Link to="/help">Help</Link>
                <Link to="/login"><button class="login">Login</button></Link>
            </nav>
        );
    }
}

export default NavBar;