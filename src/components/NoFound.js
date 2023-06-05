import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function NoFound()  {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Ooops! Ничего не найдено.</h1>
                    <p style={{textAlign: "center"}}><Link to={goBack} onClick={goBack}  className="login__link" >Назад ⮌</Link></p>
            </div>
        );

}
