import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class NoFound extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Ooops! Ничего не найдено.</h1>
                    <p style={{textAlign: "center"}}><Link to="/" className="login__link">На главную!</Link></p>
            </div>
        );
    }
}

export default NoFound;